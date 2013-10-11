$(function(){

now.ready(function(){
    // "Hello World!" will print on server
    console.log("now ready");
  
});
	$(".up").mouseup(function(){
		$.post( "/stop");
	});
	
  $(".up").mousedown(function(){
    $.post( "/forward");
  });
	
	
  $(".down").mousedown(function(){
    $.post( "/backward");
  });

  $(".down").mouseup(function(){
    $.post( "/stop");
  });
	
	
  $(".left").mousedown(function(){
    $.post( "/left");
  });       

  $(".right").mousedown(function(){
    $.post( "/right");
  });       


  $(".left").mouseup(function(){
    $.post( "/straight");
  });       

  $(".right").mouseup(function(){
    $.post( "/straight");
  });  

});
