var jQT = new $.jQTouch({
                icon: 'jqtouch.png',
                addGlossToIcon: false,
                startupScreen: 'jqt_startup.png',
                statusBar: 'black'
            });
            
$(function(){
	
	$(".forward-button").mouseup(function(){
		now.stop();
	});
	
  $(".forward-button").mousedown(function(){
    now.forward();
  });
	
	
  $(".backward-button").mousedown(function(){
    now.backward();
  });

  $(".backward-button").mouseup(function(){
    now.stop();
  });
	
	
  $(".left-button").mousedown(function(){
    now.left();
  });       

  $(".right-button").mousedown(function(){
    now.right();
  });       


  $(".left-button").mouseup(function(){
    now.straight();
  });       

  $(".right-button").mouseup(function(){
    now.straight();
  });  
           
});