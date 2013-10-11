$(function(){
	
	$(".up").mouseup(function(){
		now.stop();
	});
	
  $(".up").mousedown(function(){
    now.forward();
  });
	
	
  $(".down").mousedown(function(){
    now.backward();
  });

  $(".down").mouseup(function(){
    now.stop();
  });
	
	
  $(".left").mousedown(function(){
    now.left();
  });       

  $(".right").mousedown(function(){
    now.right();
  });       


  $(".left").mouseup(function(){
    now.straight();
  });       

  $(".right").mouseup(function(){
    now.straight();
  });  
           
});
