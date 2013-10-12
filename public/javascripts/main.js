$(function(){

now.ready(function(){
    
     var socket = io.connect(),
    wIsDown = false,
    aIsDown = false,
    sIsDown = false,
    dIsDown = false;

  $(document).keydown(function(e){
      
      console.log(e.which);
      console.log(now);
      console.log(window.now);
    switch(e.which){
      case 87:
        if(wIsDown) return;
        wIsDown = true;
        now.forward();
        $('.up').addClass('active');
        break;
      case 65:
        if(aIsDown) return;
        aIsDown = true;
        now.left();
        $('.left').addClass('active');
        break;
      case 83:
        if(sIsDown) return;
        sIsDown = true;
        now.backward();
        $('.down').addClass('active');
        break;
      case 68:
        if(dIsDown) return;
        dIsDown = true;
        now.left();
        $('.right').addClass('active');
        break;
    }
  });

  $(document).keyup(function(e){
    switch(e.which){
      case 87:
        if(!wIsDown) return;
        wIsDown = false;
        now.stop();
        $('.up').removeClass('active');
        break;
      case 65:
        if(!aIsDown) return;
        aIsDown = false;
        now.staight();
        $('.left').removeClass('active');
        break;
      case 83:
        if(!sIsDown) return;
        sIsDown = false;
        now.stop();
        $('.down').removeClass('active');
        break;
      case 68:
        if(!dIsDown) return;
        dIsDown = false;
        now.staight();
        $('.right').removeClass('active');
        break;
    }
  });
    
});
  

});
