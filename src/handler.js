var fs = require('fs');
var path = require('path');



function handler (request, response) {
  var endpoint = request.url;
  var extension = request.url.split('.')[1];
  var filePathBase = __dirname.replace('src', 'public/');
  var extensionType = {
    html: 'text/html',
    css: 'text/css',
    jpg: 'image/jpg',
    script: 'text/javascript'
  };

  if (endpoint === '/') {
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
