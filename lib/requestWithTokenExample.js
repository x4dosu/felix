const request = require('request');

let res;

options = {
  url: 'url',
  headers: {
    'Token': token
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    res = JSON.parse(body);
  }
};

request(options, callback);
console.log(res);
//do what you need with response here