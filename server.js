var http = require('http');
var handler = require('./src/handler.js');

var server = http.createServer(handler).listen(5000, function () {
  console.log('Rewrite codes for a server and handler function');
});
