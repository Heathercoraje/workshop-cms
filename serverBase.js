var http = require('http');// to have access to modules
var handlers = require('./src/handlersBase.js');

var server = http.createServer(handlers); // handler function is called when request event happens

server.listen(3000, function () {
  console.log('server is listening on port 3000, Ready to accept request');
});
