$(function(){

var sock = new SockJS('/socket');
sock.onopen = function() {
     $(".wrapper").show();
     $(".loader").hide();
};
sock.onmessage = function(e) {
     //console.log('message', e.data);
     //sock.send("");
};
sock.onclose = function() {
  //console.log('close');
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

function stop() {
     sock.send("stop");
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
        stop();
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
        stop();
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
    

});
