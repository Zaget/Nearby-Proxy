const express = require('express');
// require('newrelic');
const path = require('path');
const axios = require('axios');

const app = express();
const React = require('react');

const port = 3000;
const { renderToString } = require('react-dom/server');
const App = require('./public/Nearby/bundle.js').default;

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/loaderio-e5decec6f900b7fd867ad6eaaa03b82d/', (req, res) => {
  res.send('loaderio-e5decec6f900b7fd867ad6eaaa03b82d');
})

app.use('/restaurants', express.static(path.join(__dirname, './public')));

app.get('/restaurants/:id', (req, res) => {
  axios.get(`http://13.57.205.164:3004/api/restaurants/${req.params.id}/nearby`)
  .then(data => {
    let data = {currentRestaurant:data[0], nearbyRestaurants:data[1], id}
    const markup = renderToString(React.createElement(App, data));
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="/style.css">
      <link rel="icon" href="https://s3-us-west-1.amazonaws.com/apateezassets/apateez-logo-small-red.jpeg" type="image/x-icon">
      <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400" rel="stylesheet">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
      <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">
      <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" rel="stylesheet">
      <title>Zaget</title>
      <link rel="stylesheet" href="http://13.57.205.164:3004/restaurants/styles.css">
    </head>
    <body>
      <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script>
      <div id="app"></div>
      <div class="proxy-container">
        <div>
          <div id="description"></div>
          <div id="reviews"></div>
        </div>
        <div id="apateezSidebar"></div>
      </div>
      <div id="nearby-app">${markup}</div>
      <script src="http://13.57.205.164:3004/restaurants/bundle.js"></script>
    </body>
    </html>
    `);
  })
});

app.use(express.static(path.join(__dirname, './public')));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
