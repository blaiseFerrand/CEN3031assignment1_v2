var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;


// code is based on documentation from nodejs.org

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  console.log("request made");

  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */

    if(request.method === 'GET' && request.url === '/listings') {
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.write(JSON.stringify(listingData));
      response.end();

    } 
    else {
      response.statusCode = 404;
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("Bad gateway error");
      response.end();
    }

};

server = http.createServer(requestHandler);

fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */

   if(err) {
      throw err;
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(err + "\n");
      response.end();
    }
    else{
      listingData = JSON.parse(data);
      // http.createServer(requestHandler).listen(port);
      server.listen(port);
      console.log("server is running...");
    }
});

