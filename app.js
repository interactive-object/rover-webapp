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
var serial = new SerialPort("/dev/tty.FireFly-E6F7-SPP", { baudrate : 57600 });
serial.on("data", function (sdata) {
  
});

serial.on("open", function (sdata) {
  console.log('Serial opened');
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


// ----------------------------------------------
// - backward
//     			: 100 -full speed
//     			: 110 -meduim speed
//     			: 120 -slow speed    
// - forward
//     			: 200 -full speed
//     			: 210 -meduim speed
//     			: 220 -slow speed    
// ----------------------------------------------
// ----------------------------------------------
// 
// - brake		: 300
// - left			: 40
// - right		: 50
// - straight	: 10
//
// ----------------------------------------------

var server = app.listen(app.get('port'));
var everyone = require("now").initialize(server);

everyone.now.forward = function(callback){
  serial.write(100);
}

everyone.now.backward = function(callback){
  serial.write(200);
}

everyone.now.left = function(callback){
  serial.write(40);
}

everyone.now.right = function(callback){
  serial.write(50);
}

everyone.now.brake = function(callback){
  serial.write(300);
}

everyone.now.straight = function(callback){
  serial.write(10);
}