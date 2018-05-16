const http = require('http');
const fs = require('fs');

const file = fs.createWriteStream('./public/Nearby/bundle.js');
http.get('http://52.53.193.160:3004/restaurants/nearby.js', (response) => {
  response.pipe(file);
});
