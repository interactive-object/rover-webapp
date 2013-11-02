/**
 * Module dependencies.
 */

var express = require('express'), 
	http = require('http'),
	events = require('events'),
	util = require('util'),
	app = express(),
	_ = require('underscore'),
	sockjs = require('sockjs');



var SerialPort = require("serialport").SerialPort;

const DEBUG_PORT = "/dev/tty.usbserial-AD025FSP";
const PI_PORT = "/dev/ttyAMA0";

var serial = new SerialPort(DEBUG_PORT, { baudrate : 115200 });

serial.send = function(action, value){
	if(value) serial.write(action+","+value); 
	else serial.write(action+",0");
}

app.configure(function () {
	app.set('port', process.env.PORT || 3003);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	//app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	//app.use(express.static(__dirname + '/public'));
	app.use(express.static(require('path').resolve(__dirname + "/public")));
});

app.configure('development', function () {
	app.use(express.errorHandler());
});

app.get('/', function (req, res) {
	res.render('index');
});


var socket = null;
var sockjs = sockjs.createServer();
sockjs.on('connection', function(s) {
	
		socket = s;
    socket.on('data', function(message) {
    	
    	switch(message){
    		case "forward": forward(); break;
    		case "backward": backward(); break;
    		case "left": left(); break;
    		case "right": right(); break;
    		case "stop": brake(); break;
    		case "straight": straight(); break;
    	};
      
    });
    
    socket.on('close', function() {
    	
    });
    
});

var server = app.listen(app.get('port'));
sockjs.installHandlers(server, {prefix:'/socket'});



serial.on("open", function () {
  console.log("serial opened");
	
  serial.on("data", function(data) {
   console.log("serial data: ",data.toString());
	if(data == 0xFF){
		console.log("ready");
		if(socket) socket.write("ready");
	}else{


	}
  });  
});

serial.on("close", function () {
	console.log("serial closed");
});

serial.on("error", function (err) {
	console.log("serial closed", err);
});


function forward(){
	//serial.send('forward');
	serial.send('tilt+');
}


function backward(){
	//serial.send('backward');
	serial.send('tilt-');  
}

function brake(){
	serial.send('brake');
}


function left(){
	serial.send('left');
}

function right(){
	serial.send('right');
}


function straight(){
	serial.send('straight');
}


