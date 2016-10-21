
var num, accum = 0, op = "";

$ (function () {

	function vaciar (){
		$("#input").val("");
	}

	//Cuando se presiona el cajetín se vacía el contenido
	$("#input").on("click", function (){
		$("#input").val("");
	});
	
	//Calcula el cuadrado del número incluido
	var cuadrado = $("#pow");

	cuadrado.on("click", function () {
		num = $("#input");
		var inputNumber = num.val(); //Para mantener el número visible en el input
		num.val(Math.pow(num.val(),2));
		$("#result").val(num.val());
		$("#input").val(inputNumber);
	})
	
	//Calcula el inverso de 1/x
	var inverse = $("#1divx");
	
	inverse.on("click", function () {
		num = $("#input");
		var inputNumber = num.val(); //Para mantener el número visible en el input
		num.val(1/num.val());
		$("#result").val(num.val());
		$("#input").val(inputNumber);
	});

	//Calcula la raíz cuadrada
	var raizCuadrada = $("#squareroot");
	
	raizCuadrada.on("click", function () {
		num = $("#input");
		var inputNumber = num.val(); 
		num.val(Math.sqrt(num.val()));
		$("#result").val(num.val());
		$("#input").val(inputNumber);
	});

	//Calcula la parte entera de un número
	var entero = $("#integer");
	
	entero.on("click", function () {
		num = $("#input");
		var inputNumber = num.val();
		if (num.val() >= 0) {
			num.val(Math.floor(num.val()));
			$("#result").val(num.val());
		} else {
			num.val(Math.ceil(num.val())) ;
			$("#result").val(num.val());
		}
		$("#input").val(inputNumber);
	});

	//Recoge el primero de los operandos y determina el cálculo a realizar
	var suma = $("#suma");

	suma.on("click", function () {
		op = "+";
		num = $("#input");
		accum = num.val();
	});

	var resta = $("#resta");

	resta.on("click", function () {
		op = "-";
		num = $("#input");
		accum = num.val();
	});
	
	var division = $("#division");

	division.on("click", function () {
		op = "/";
		num = $("#input");
		accum = num.val();

	});

	var multiplicar = $("#multiplicar");

	multiplicar.on("click", function () {
		op = "*";
		num = $("#input");
		accum = num.val();

	});

	var elevadoY = $("#powery");

	elevadoY.on("click", function () {
		op = "**";
		num = $("#input");
		accum = num.val();

	});

	var calcular =$("#calculate");

	calcular.on("click", function () {
		if (op === '+'){
			num.val(+accum + +num.val());
			$("#result").val(num.val());
			vaciar();
		}
		else if (op ==='-') {
			num.val(+accum - +num.val());
			$("#result").val(num.val());
			vaciar();
		}
		else if (op === '**') {
			num.val(Math.pow(+accum, +num.val()));
			$("#result").val(num.val());
			accum = num.val();
			vaciar();
		}
		else if (op === '/') {
			num.val(+accum / +num.val());
			$("#result").val(num.val());
			accum = num.val();
			vaciar();
		}
		else if (op === '*') {
			num.val(+accum * +num.val());
			$("#result").val(num.val());
			accum = num.val();
			vaciar();
		}
	});

	var limpia = $("#clear");

	limpia.on("click", function () {
		$("#result").val("");
		$("#input").val("");
		accum = 0;
		op = "";
		num  = 0;
	});

	var sumatorio = $("#sumatorio");

	sumatorio.on("click", function () {
		num = $("#input");
		var valores = num.val();
		var lista = valores.split(",");
		var accum = 0;
		for (var i = 0; i < lista.length; i++) {
			accum += (+lista[i]);
		}
		$("#result").val(accum);
		vaciar();
	});

	var producto = $("#producto");

	producto.on("click", function () {
		num = $("#input");
		var valores = num.val();
		var lista = valores.split(",");
		var accum = 1;
		for (var i = 0; i < lista.length; i++) {
			accum *= (+lista[i]);
		}
		$("#result").val(accum);
		vaciar();
	});

});
	// function addValue (num) {
	// 	$("input").value = num;

	// }