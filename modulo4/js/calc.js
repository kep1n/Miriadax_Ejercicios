
	var num, accum = 0, op = "";

	function vaciar() {
		document.getElementById("input").value = "";
	}

	function pow() {
		num = document.getElementById("input");
		var inputNumber = num.value; //Para mantener el número visible en el input
		num.value = Math.pow(num.value,2);
		document.getElementById("result").value = num.value;
		document.getElementById("input").value = inputNumber;
		
	}

	function inverse() {
		num = document.getElementById("input");
		var inputNumber = num.value; //Para mantener el número visible en el input
		num.value = 1/num.value;
		document.getElementById("result").value = num.value;
		document.getElementById("input").value = inputNumber;
		
	}

	function sqrt() {
		num = document.getElementById("input");
		var inputNumber = num.value; 
		num.value = Math.sqrt(num.value);
		document.getElementById("result").value = num.value;
		document.getElementById("input").value = inputNumber;
		
	}

	function int() {
		num = document.getElementById("input");
		var inputNumber = num.value;
		if (num.value >= 0) {
			num.value = Math.floor(num.value);
			document.getElementById("result").value = num.value;
		} else {
			num.value = Math.ceil(num.value);
			document.getElementById("result").value = num.value;
		}
		document.getElementById("input").value = inputNumber;
		
	}

	function sum() {
		op = "+";
		num = document.getElementById("input");
		accum = num.value;

	}

	function subs() {
		op = "-";
		num = document.getElementById("input");
		accum = num.value;

	}

	function powy() {
		op = "**";
		num = document.getElementById("input");
		accum = num.value;

	}

	function calc() {
		if (op === '+'){
			num.value =  (+accum + +num.value)
			document.getElementById("result").value = num.value;
			accum = num.value;
			vaciar();
		}
		else if (op ==='-') {
			num.value = (+accum - +num.value)
			document.getElementById("result").value = num.value;
			accum = num.value;
			vaciar();
		}
		else if (op === '**') {
			num.value = (Math.pow(+accum, +num.value))
			document.getElementById("result").value = num.value;
			accum = num.value;
			vaciar();
		}
	}

	function limpiar () {
		document.getElementById("result").value = "";
		document.getElementById("input").value="";
		accum = 0;
		op = "";
		num  = 0;
	}