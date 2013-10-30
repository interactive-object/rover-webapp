var serialport = require("serialport"),
SerialPort = serialport.SerialPort,
fs = require("fs"),
sys = require("sys"),
port = "/dev/tty.usbserial-AD025FSP";


var serial = new SerialPort(port, {baudrate: 57600});
var b = new Buffer([0xFF,0xB4,0xB4,0x7F]);


serial.on("open", function () {
  console.log('open');
  serial.on('data', function(data) {
    //console.log('data received: ' + data);
	if(data == 0xFF){
		serial.write("tilt,180");
	}else{
		//if(data == 0x7F)
		console.log(data.toString());
	}
  });  
});

