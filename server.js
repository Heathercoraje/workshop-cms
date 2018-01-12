var http = require('http');// to have access to modules
var server = http.createServer(handler); // handler function is called when request event happens
var fs = require('fs');
var path = require('path');

var node = 'Programming is hard, I know';
var girls = 'Challenge fucking accepted !';
server.listen(3000, function () {
  console.log('server is listening on port 3000, Ready to accept request');
});
//
// function handler (request, response) {
//   var endpoint = request.url;
//   var message = '';
//
//   if (endpoint === '/node') {
//     message = node;
//   }
//   if (endpoint === '/girls') {
//     message = girls;
//   }
//
//   response.writeHead(200, {'Content-Type': 'text/html'});
//   response.write(message);
//   response.end(); // finish response
// }

function handler (request, response) {
  const endpoint = request.url;
  // first request
  if (endpoint === '/') {
    response.writeHead(200, {'Content-Type': 'text/html'}); // information of response I am sending

    fs.readFile(__dirname + '/public/index.html', function (error, file) {
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
    const filePath = path.join(__dirname, 'public', endpoint);
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
}
