var express = require('express'), 
	http = require('http'),
	util = require('util'),
	app = express(),
	_ = require('underscore'),
	nowjs = require("now"),
	wpi = require('wiring-pi'),
	async = require('async');

wpi.setup();

var I1 = 2, I2 =3, I3=13, I4=14;
wpi.pinMode(I1, wpi.modes.OUTPUT);
wpi.pinMode(I2, wpi.modes.OUTPUT);
wpi.pinMode(I3, wpi.modes.OUTPUT);
wpi.pinMode(I4, wpi.modes.OUTPUT);

wpi.digitalWrite(I1, 0);
wpi.digitalWrite(I2, 0);


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
  forward();
}

everyone.now.backward = function(callback){
  backward();
}

everyone.now.left = function(callback){
  left();
}

everyone.now.right = function(callback){
  right();
}

everyone.now.brake = function(callback){
  brake();
}

everyone.now.straight = function(callback){
  straight();
}

function forward(){
        wpi.digitalWrite(I1, 0);
        wpi.digitalWrite(I2, 1);
}


function backward(){
wpi.digitalWrite(I1, 1);
        wpi.digitalWrite(I2, 0);
}

function brake(){
wpi.digitalWrite(I1, 1);
        wpi.digitalWrite(I2, 1);
}


function left(){
wpi.digitalWrite(I3, 0);
        wpi.digitalWrite(I4, 1);
}

function right(){
wpi.digitalWrite(I3, 1);
        wpi.digitalWrite(I4, 0);
}


function straight(){
        wpi.digitalWrite(I3, 1);
        wpi.digitalWrite(I4, 1);
}
