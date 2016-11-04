$(function(){ 
    var t, cl = $("#crono");

    function mostrar() {
    	cl.html((+cl.html() + 0.1).toFixed(1));
    };

    function arrancar() {
    	t=setInterval(mostrar, 100);
    };

    function parar() {
    	clearInterval(t);  t=undefined;
    };

    function cambiar() {
    	if (!t) {
    		arrancar();
    	} else {
    		parar();
    	}
    };

    $("#body").on('tap', cambiar);
    $("#body").on('swipe', function(){
    	cl.html("0.0");
    });

 });