var shelljs = require('shelljs');
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/hw4.html');
});

app.get ('/api', function (req, res) {

	var bMX = req.query.bMX;
	var bMY = req.query.bMY;
	var bmX = req.query.bmX;
	var bmY = req.query.bmY;
	var cX = req.query.cX;
	var cY = req.query.cY;
	var r = req.query.r;
	//console.log("x: " + cX + " y: " + cY + " r: " + r);
		
	shelljs.exec('circleRect.exe ' + bMX + ' ' + bMY + ' ' + bmX + ' ' + bmY + ' ' + cX + ' ' + cY + ' ' + r, function(status, output) {
	  //console.log('Exit status:', status);
	  //console.log('Program output:', output);

      var output = {
        status: status,
        output: output
      };

		
      /*
        The response header for supporting CORS:
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      */

	  res.writeHead(200, {
		  "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type"
	  });
	
	  res.write( JSON.stringify(output) );
	  res.end();

	});

});


// or simply
// app.listen (1337); 
// will do

var server = app.listen (1337, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log ('server started on http://' + host + ':' + port);
});

