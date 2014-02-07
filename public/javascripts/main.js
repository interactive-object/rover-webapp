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



var tp_interval, tm_interval, pp_interval, pm_interval;

$(".tiltplus").mousedown(function(){
			tiltplus();
		}).mouseup(function(){
			tiltplus_stop();
			}).bind( "touchstart", function(e){
				tiltplus();
				}).bind( "touchend", function(e){
					tiltplus_stop();
					});

function tiltplus(){
	if(tp_interval) clearInterval(tp_interval);
	if(tm_interval) clearInterval(tm_interval);
	tp_interval = setInterval(function(){
		sock.send("tilt+");
	},100);
}

function tiltplus_stop(){
	clearInterval(tp_interval);
}


$(".tiltminus").mousedown(function(){
			tiltminus();
		}).mouseup(function(){
			tiltminus_stop();
			}).bind( "touchstart", function(e){
				tiltminus();
				}).bind( "touchend", function(e){
					tiltminus_stop();
					});

function tiltminus(){
	if(tp_interval) clearInterval(tp_interval);
	if(tm_interval) clearInterval(tm_interval);
	tm_interval = setInterval(function(){
		sock.send("tilt-");
	},100);
}

function tiltminus_stop(){
	clearInterval(tm_interval);
}




$(".panplus").mousedown(function(){
			panplus();
		}).mouseup(function(){
			panplus_stop();
			}).bind( "touchstart", function(e){
				panplus();
				}).bind( "touchend", function(e){
					panplus_stop();
					});;

			
function panplus(){
	if(pp_interval) clearInterval(pp_interval);
	if(pm_interval) clearInterval(pm_interval);
	pp_interval = setInterval(function(){
		sock.send("pan+");
	},100);
}

function panplus_stop(){
	clearInterval(pp_interval);
}




$(".panminus").mousedown(function(){
			panminus();
		}).mouseup(function(){
			panminus_stop();
			}).bind( "touchstart", function(e){
				panminus();
				}).bind( "touchend", function(e){
					panminus_stop();
					});
			
function panminus(){
		if(pp_interval) clearInterval(pp_interval);
	if(pm_interval) clearInterval(pm_interval);
	pm_interval = setInterval(function(){
		sock.send("pan-");
	},100);
}

function panminus_stop(){
	clearInterval(pm_interval);
}



});
