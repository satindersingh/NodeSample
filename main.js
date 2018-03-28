console.log('Start Main');

var http = require('http');

server = http.createServer(function(request, response){
  // Send the HTTP header
  // HTTP Status: 200 : OK
  // Content Type: text/plain
  console.log("handling request", request);
  response.writeHead(200, {'Content-Type': 'text/plain'});

  // Send the response body as "Hello World"
  response.end('Hello World\n');
});

server.listen(8082);

console.log('address: ', server.address());
