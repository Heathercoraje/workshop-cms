var fs = require('fs');
var path = require('path');
var querystring = require('querystring')

function handler (request, response) {
  var endpoint = request.url;
  var extension = request.url.split('.')[1];
  var filePathBase = __dirname.replace('src', 'public/');
  var dataPath = filePathBase.replace('public/', 'src/posts.json');
  var extensionType = {
    html: 'text/html',
    css: 'text/css',
    jpg: 'image/jpg',
    script: 'text/javascript',
    json: 'application/json'
  };
  // generic function
  function readFile (path) {
    fs.readFile(path, function (error, file) {
      if (error) {
        console.log(error);
      } else {
        response.writeHead(200, {'Content-Type': `${extensionType[extension]}`});
        response.end(file);
      }
    });
  }
  if (request.method === 'GET') {
    console.log('GET request');
    if (endpoint === '/') {
      readFile(filePathBase.concat('index.html'));
    } else if (endpoint === '/posts') {
      readFile(dataPath);
    } else {
      readFile(filePathBase.concat(endpoint));
    }
  } else if (request.method === 'POST') {
    console.log('POST request');
    var allData = '';
    request.on('data', function (chunk) {
      allData += chunk;
    });
    request.on('end', function () {
      var convertedData = querystring.parse(allData); // convertedData is an object
      var comment = convertedData['post'];
      var objFile = fs.readFileSync(dataPath);
      var obj = JSON.parse(objFile); // build JSON string to an object
      obj[Date.now()] = comment; // adding new property to an object
      obj = JSON.stringify(obj); // make into a json
      fs.writeFile(dataPath, obj, function (error) {
        if (error) {
          console.log(error);
        }
        console.log('new comment added!');
        console.log('new JSON', obj);
      });
      response.writeHead(301, {'Location': '/'}); // http status code 301 for redirec
      response.end();
    });
  }
}

module.exports = handler;
