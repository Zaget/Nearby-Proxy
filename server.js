require('newrelic');
const express = require('express');
const path = require('path');
const React = require('react');
const App = require('./public/Nearby/bundle.js').default;
const { renderToString } = require('react-dom/server');
const template = require('./template.js');

const fillerData = {name:'', google_rating: 0, zagat_rating: 0, photos:[], neighborhood:'', price_level:1, types: ''};

const info = {currentRestaurant:fillerData, nearbyRestaurants:[fillerData, fillerData, fillerData, fillerData, fillerData, fillerData]}; 

const app = express();

const port = 3000;

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/loaderio-c2b8fbbdc1dc9dc0676e809a3fa5b4b3', (req, res) => {
  res.send('loaderio-c2b8fbbdc1dc9dc0676e809a3fa5b4b3');
})

app.use('/restaurants', express.static(path.join(__dirname, './public')));

app.get('/restaurants/:id', (req, res) => {
  const nearby = renderToString(React.createElement(App, info));
  res.send(template(nearby));
});

app.use(express.static(path.join(__dirname, './public')));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
