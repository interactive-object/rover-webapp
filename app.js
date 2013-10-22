/**
 * Module dependencies.
 */

var express = require('express'), 
	http = require('http'),
	events = require('events'),
	util = require('util'),
	app = express(),
	_ = require('underscore'),
	nowjs = require("now");



var SerialPort = require("serialport").SerialPort;


var serial = new SerialPort("/dev/ttyAMA0", { baudrate : 57600 });
serial.on("data", function (sdata) {
  
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


var server = app.listen(app.get('port'));
var everyone = require("now").initialize(server);

everyone.now.forward = function(callback){
  serial.write('F');
  stop();
}

everyone.now.backward = function(callback){
  serial.write('B');
  stop();
}

everyone.now.left = function(callback){
  serial.write('L');
  stop();
}

everyone.now.right = function(callback){
  serial.write('R');
  stop();
}

function stop(){
  setTimeout(function(){
  serial.write('S');  
  }, 500);
}

