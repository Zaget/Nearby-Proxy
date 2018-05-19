const http = require('http');
const fs = require('fs');

const file = fs.createWriteStream('./public/Nearby/bundle.js');
http.get('http://nearby-414751775.us-west-1.elb.amazonaws.com:3004/restaurants/bundle.js', (response) => {
  response.pipe(file);
});

const file = fs.createWriteStream('./public/Sidebar/bundle.js');
http.get('http://nearby-414751775.us-west-1.elb.amazonaws.com:3004/restaurants/bundle.js', (response) => {
  response.pipe(file);
});
