var http = require('http');
var server = http.createServer(handler);
var message = ' I am happy to be part of the node girls project, I have a strong feeling that I will take this week to be a mentor.'
server.listen(3000, function() {
  console.log("Server is listening on port 3000. We are ready to aceept requests!");
});

function handler(request, response) {
  response.writeHead(200, {
    "Content-Type": "text/html"
  }); //using writehead method to check status code
  // then let it know we will send text in body
  response.write(message); // write the message on body

  response.end(); // finish this response

}
