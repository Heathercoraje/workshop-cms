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
    script: 'text/javascript'
  };
  if (endpoint === '/posts') {
    console.log('CHALLENGE FUCKING ACCEPTED!');
    fs.readFile(dataPath, function (error, file) {
      if (error) {
        console.log(error);
      } else {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(file);
      }
    });
  } else if (request.method === 'POST') {
    console.log('handling POST method ...');
    var allData = '';
    request.on('data', function (chunk) {
      allData += chunk;
    });
    request.on('end', function () {
      var convertedData = querystring.parse(allData); // convertedData is an object
      var comment = convertedData['post'];
      var objFile = fs.readFileSync(dataPath);
      var obj = JSON.parse(objFile); // build JSON string to an object
      console.log('JAVASCRIPT OBJECT', obj);
      obj[Date.now()] = comment; // adding new property to an object
      obj = JSON.stringify(obj); // make into a json
      console.log('JSON', obj);
      fs.writeFile(dataPath, obj, function (error) {
        if (error) {
          console.log(error);
        }
        console.log('new comment added!');
        console.log(obj);
      });
      response.writeHead(301, {'Location': '/'}); // http status code 301 for redirec
      response.end();
    });
  } else if (endpoint === '/') {
    fs.readFile(filePathBase.concat('index.html'), function (error, file) {
      if (error) {
        console.log(error);
      } else {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(file);
      }
    });
  } else {
    fs.readFile(filePathBase.concat(endpoint), function (error, file) {
      if (error) {
        console.log(error);
      }
      response.writeHead(200, {'Content-Type': `${extensionType[extension]}`});
      response.end(file);
      console.log('Animo!');
    });
  }
}

module.exports = handler;
