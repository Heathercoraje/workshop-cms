var http = require('http');
var server = http.createServer();

server.listen(3000, function() {
  console.log("Server is listening on port 3000. We are ready to aceept requests!");
});
