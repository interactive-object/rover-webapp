$(function(){

now.ready(function(){
     console.log("ready")
});

     var socket = wIsDown = false,
    aIsDown = false,
    sIsDown = false,
    dIsDown = false;

  $(document).keydown(function(e){
      
    switch(e.which){
      case 38:
        if(wIsDown) return;
        wIsDown = true;
        now.forward();
        $('.up').addClass('active');
        break;
      case 37:
        if(aIsDown) return;
        aIsDown = true;
        now.left();
        $('.left').addClass('active');
        break;
      case 40:
        if(sIsDown) return;
        sIsDown = true;
        now.backward();
        $('.down').addClass('active');
        break;
      case 39:
        if(dIsDown) return;
        dIsDown = true;
        now.right();
        $('.right').addClass('active');
        break;
    }
  });

  $(document).keyup(function(e){
    switch(e.which){
      case 38:
        if(!wIsDown) return;
        wIsDown = false;
        now.stop();
        $('.up').removeClass('active');
        break;
      case 37:
        if(!aIsDown) return;
        aIsDown = false;
        now.staight();
        $('.left').removeClass('active');
        break;
      case 40:
        if(!sIsDown) return;
        sIsDown = false;
        now.stop();
        $('.down').removeClass('active');
        break;
      case 39:
        if(!dIsDown) return;
        dIsDown = false;
        now.straight();
        $('.right').removeClass('active');
        break;
    }
  });
    

});
