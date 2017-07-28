var http = require('http');
var fs = require('fs');

var server = http.createServer(handler);
var message = ' I am happy to be part of the node girls project, I have a strong feeling that I will take this week to be a mentor.'
var lunchMessage = ' I am hungry, I need to go home and cooook for my lunch'

server.listen(3000, function() {
  console.log("Server is listening on port 3000. We are ready to aceept requests!");
});

function handler(request, response) {
  var method = request.method;
  //console.log(method); //it returns get because we GET response by sending our url
  var endpoint = request.url;
  //console.log(endpoint);

  if (endpoint === "/") {
    response.writeHead(200,
      "Content-Type: text/html"
    ); //using writehead method to check status code
    fs.readFile(__dirname + "/public/index.html", function(error, file) {
      if (error) {
        console.log(error);
        return
      } else { // then let it know we will send text in body
        response.end(file);

      }
    });

  } else {
    const extension = endpoint.split('.')[1];
    const extensionType = {
      html: 'text/html',
      css: 'text/css',
      jpg: 'image/jpg'
    }
    const filePath = path.join(__dirname, '..', endpoint)
    fs.readFile(filePath, function(error, file) {
      if (error) {
        console.log(error);
        return
      } else {
        response.writeHead(200, `Content-Type: ${type[extension]}`);
        //response.writeHead(200, `Content-Type:${extensionType[extension]}`);

        response.end(file);
      }
    });

  }
}
