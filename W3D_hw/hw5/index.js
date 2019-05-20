var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = 3000;
server.listen (port, function() {
  console.log ('listening on port ' + port)
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/hw5.html');
});

///////////////////////////////////////
// global variables
// nID: for ID of connecting client
// status: array of status objects {id, turning}
//
var nID = 0;
var status = [];
var start = false;
var counter = 3;

function countDown(){
	if (counter > 0) {
		console.log(counter);
		--counter;
		setTimeout (countDown, 1000);
	}
	else {
		console.log("Let's Go!!");
		start = true;
	}
}
io.on('connect', function(socket){

  //////////////////////////////////////////////////////////  
  // things to do when a client connects
  console.log ('a user connected with socket ');
  
  // assign and return the ID to the new client
  console.log ('client ' + nID + ' login ...')
  socket.emit ('id_set', nID);
  
  // broadcast to all OTHERS of new client 
  // socket.broadcast.emit ('new_id', nID)  
  // inform the status of all other clients ...
  // new kid needs to learn about old fellows
  
  status.push ({id: nID, step: false});
  console.log (status);
  io.emit ('update_status', status)
  
  // this must be the LAST thing to do
  ++nID;
  if(nID == 2){
	countDown();
  }
  //////////////////////////////////////////////////////////  
	
	socket.on('step', function(myID) {
		console.log (myID + ': toggle turning');
		// find myID in status
		let i;
		for (i = 0; i < status.length; i++) {
		  if (status[i].id === myID) break;
		}
		if(start)status[i].step = !status[i].step;
			
		console.log (status);
		io.emit ('update_status', status);
	});

});

