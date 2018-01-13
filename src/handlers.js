var fs = require('fs');
var path = require('path');
var querystring = require('querystring');

function handlers (request, response) {
  const endpoint = request.url;
  // first request
  if (endpoint === '/') {
    response.writeHead(200, {'Content-Type': 'text/html'}); // information of response I am sending

    fs.readFile( __dirname.replace('src', '') + '/public/index.html', function (error, file) {
      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  } else {
    const extension = request.url.split('.')[1];
    const extensionType = {
      html: 'text/html',
      css: 'text/css',
      jpg: 'image/jpg'
    };
    const filePath = path.join(__dirname.replace('src', ''), 'public', endpoint);
    console.log(filePath);

    fs.readFile(filePath, function (error, file) {
      if (error) {
        console.log(error);
      } else {
        response.writeHead(200, {'Content-Type': `${extensionType[extension]}`});
        response.end(file);
        console.log('yeah!');
      }
    });
  }
  if (request.method === 'POST') {
    console.log('this is POST request! yeah!');
    var allTheData = '';
    request.on('data', function (chunkOfData) {
      allTheData += chunkOfData;
    });
     // gradually collecting the data
    request.on('end', function () {
      var convertedData = querystring.parse(allTheData);
      console.log(convertedData);
      response.writeHead(301, {'Location': '/'}); // http status code 301 for redirect
      response.end();
    });
  }
}

module.exports = handlers;
