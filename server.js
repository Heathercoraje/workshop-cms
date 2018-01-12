var http = require('http');// to have access to modules
var server = http.createServer(handler); // handler function is called when request event happens
var message = 'I am happy to redo a node girl project';
server.listen(3000, function () {
  console.log('server is listening on port 3000, Ready to accept request');
});

function handler (request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(message);
  response.end(); // finish response
}
