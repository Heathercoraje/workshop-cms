var http = require('http');// to have access to modules
var server = http.createServer(handler); // handler function is called when request event happens
var fs = require('fs');
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
  var endpoint = request.url;
  if (endpoint === '/') {
    response.writeHead(200, {'Content-Type': 'text/html'}); // information of response I am sending

    fs.readFile(__dirname + '/public/index.html', function (error, file) {
      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  }
}
