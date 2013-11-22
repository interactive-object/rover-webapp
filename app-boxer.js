/**
 * Module dependencies.
 */

var express = require('express'), 
	http = require('http'),
	events = require('events'),
	util = require('util'),
	app = express(),
	_ = require('underscore'),
	spawn = require('child_process').spawn,
	sockjs = require('sockjs');



var SerialPort = require("serialport").SerialPort;

const DEBUG_PORT = "/dev/tty.usbserial-AD025FSP";
const PI_PORT = "/dev/ttyAMA0";

var serial = new SerialPort(PI_PORT, { baudrate : 57600 });

serial.send = function(action, value){
	if(value) serial.write(action+","+value+"\n"); 
	else serial.write(action+",0\n");
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
    	
      console.log("socket message:", message);
    	switch(message){
    		case "forward": forward(); break;
    		case "backward": backward(); break;
    		case "left": left(); break;
    		case "right": right(); break;
    		case "brake": brake(); break;
    		case "straight": straight(); break;
		default: speak(message); 
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
    serial.send("arm");
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
	serial.write('F');
}

function speak(value){
	var child = spawn("speech", [value]);
	child.on('error', function() { console.log(arguments); });
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
	serial.write('S');
}

function run_cmd(cmd, args, cb, end) {
    var spawn = require('child_process').spawn,
        child = spawn(cmd, args, {cwd: process.env.HOME, env:_.extend(process.env, { PATH: process.env.PATH + ':/usr/local/bin' }) }),
        me = this;
    child.stdout.on('data', function (buffer) { cb(me, buffer) });
    child.stdout.on('end', end);
}

