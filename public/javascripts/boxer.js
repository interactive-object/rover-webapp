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
     sock.send("forward");
}

function left() {
     sock.send("left");
     sock.send("forward");
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
        brake();
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
        brake();
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
	brake();
}).bind( "touchstart", function(e){
   backward();
}).bind( "touchend", function(e){
   brake();
});


$(".left").mousedown(function(){
	left();
}).mouseup(function(){
	brake();
}).bind( "touchstart", function(e){
   left();
}).bind( "touchend", function(e){
   brake();
});

$(".right").mousedown(function(){
	right();
}).mouseup(function(){
	brake();
}).bind( "touchstart", function(e){
   right();
}).bind( "touchend", function(e){
   brake();
});


$(".speak").mousedown(function(){
	var speak=prompt("Please enter text to speak","Bonjour");

if (speak!=null)
  {
	sock.send(speak);
  }
});
});
