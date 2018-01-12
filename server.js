var http = require('http');// to have access to modules
var server = http.createServer();

server.listen(3000, function(){
  console.log("server is listening on port 3000, Ready to accept request");
})
