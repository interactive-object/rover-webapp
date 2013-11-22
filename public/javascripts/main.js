$(function(){

var sock = new SockJS('/socket');
sock.onopen = function() {
     $(".wrapper").show();
     $(".loader").hide();
     console.log('opened');
};
sock.onmessage = function(e) {
     //console.log('message', e.data);
		 if(e.data == "ready"){
			 console.log("arduino ready");
		 }
};
sock.onclose = function() {
  console.log('closed');
};
   

function forward() {
    sock.send("forward"); 
}

function backward() {
    sock.send("backward"); 
}

function right() {
	sock.send("right");
}

function left() {
	sock.send("left");
}

function straight() {
	sock.send("straight");
}

function brake() {
	sock.send("brake");
}




var wIsDown = false,
    aIsDown = false,
    sIsDown = false,
    dIsDown = false;


$(document).keydown(function(e){

		switch(e.which){
		case 38:
		if(wIsDown) return;
		wIsDown = true;
		forward();
		$('.up').addClass('active');
		break;
		case 37:
		if(aIsDown) return;
		aIsDown = true;
		left();
		$('.left').addClass('active');
		break;
		case 40:
		if(sIsDown) return;
		sIsDown = true;
		backward();
		$('.down').addClass('active');
		break;
		case 39:
		if(dIsDown) return;
		dIsDown = true;
		right();
		$('.right').addClass('active');
		break;
		}
});

$(document).keyup(function(e){
		switch(e.which){
		case 38:
		if(!wIsDown) return;
		wIsDown = false;
		brake();
		$('.up').removeClass('active');
		break;
		case 37:
		if(!aIsDown) return;
		aIsDown = false;
		straight();
		$('.left').removeClass('active');
		break;
		case 40:
		if(!sIsDown) return;
		sIsDown = false;
		brake();
		$('.down').removeClass('active');
		break;
		case 39:
		if(!dIsDown) return;
		dIsDown = false;
		straight();
		$('.right').removeClass('active');
		break;
		}
});



$(".up").mousedown(function(){
		forward();
		}).mouseup(function(){
			brake();
			}).bind( "touchstart", function(e){
				forward();
				}).bind( "touchend", function(e){
					brake();
					});

$(".down").mousedown(function(){
		backward();
		}).mouseup(function(){
			straight();
			}).bind( "touchstart", function(e){
				backward();
				}).bind( "touchend", function(e){
					straight();
					});


$(".left").mousedown(function(){
		left();
		}).mouseup(function(){
			straight();
			}).bind( "touchstart", function(e){
				left();
				}).bind( "touchend", function(e){
					straight();
					});

$(".right").mousedown(function(){
		right();
		}).mouseup(function(){
			straight();
			}).bind( "touchstart", function(e){
				right();
				}).bind( "touchend", function(e){
					straight();
					});


$(".speak").mousedown(function(){
		var speak=prompt("Please enter text to speak","Bonjour");
		if (speak!=null)
		{
		sock.send(speak);
		}
		});

var tp_interval;
$(".tiltplus").mousedown(function(){
		tp_interval = setInterval(function(){
			sock.send("tilt+");
			},200);
		}).mouseup(function(){
			clearInterval(tp_interval);
			});


var tm_interval;
$(".tiltminus").mousedown(function(){
		tm_interval = setInterval(function(){
			sock.send("tilt-");
			},200);
		}).mouseup(function(){
			clearInterval(tm_interval);
			});


var pp_interval;
$(".panplus").mousedown(function(){
		pp_interval = setInterval(function(){
			sock.send("pan+");
			},200);
		}).mouseup(function(){
			clearInterval(pp_interval);
			});


var pm_interval;
$(".panminus").mousedown(function(){
		pm_interval = setInterval(function(){
			sock.send("pan-");
			},200);
		}).mouseup(function(){
			clearInterval(pm_interval);
			});



});
