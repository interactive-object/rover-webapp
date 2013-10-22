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


var serial = new SerialPort("/dev/ttyAMA0", { baudrate : 57600 });
serial.on("data", function (sdata) {
  console.log(sdata);
});

serial.on("open", function (sdata) {
  console.log('serial opened');
});

  
app.configure(function () {
	app.set('port', process.env.PORT || 3003);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
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



var sockjs = sockjs.createServer();
sockjs.on('connection', function(socket) {
	
    socket.on('data', function(message) {
    	
    	switch(message){
    		case "forward": forward(); break;
    		case "backward": backward(); break;
    		case "left": left(); break;
    		case "right": right(); break;
    		case "stop": brake(); break;
    		case "straight": straight(); break;
    	};
       	//conn.write(message);
    });
    
    socket.on('close', function() {
    	
    });
    
});

var server = app.listen(app.get('port'));
sockjs.installHandlers(server, {prefix:'/socket'});




function forward(){
	serial.write('F');
}


function backward(){
	serial.write('B');
}

function brake(){
	serial.write('S');
}


function left(){
	serial.write('L');
}

function right(){
	serial.write('R');
}


function straight(){
	serial.write('T');
}


