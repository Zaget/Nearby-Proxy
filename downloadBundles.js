const http = require('http');
const fs = require('fs');

const file = fs.createWriteStream('./public/Nearby/bundle.js');
http.get('http://13.57.205.164:3004/restaurants/bundle.js', (response) => {
  response.pipe(file);
});
