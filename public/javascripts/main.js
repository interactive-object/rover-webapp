var jQT = new $.jQTouch({
                icon: 'jqtouch.png',
                addGlossToIcon: false,
                startupScreen: 'jqt_startup.png',
                statusBar: 'black'
            });
            
$(function(){
  $(".forward-button").click(function(){
    now.forward();
  });
  $(".backward-button").click(function(){
    now.backward();
  });

  $(".left-button").click(function(){
    now.left();
  });       

  $(".right-button").click(function(){
    now.right();
  });       

           
});