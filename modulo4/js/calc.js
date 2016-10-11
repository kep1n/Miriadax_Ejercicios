
	function vaciar() {
		document.getElementById("input").value = "";
	}

	function pow() {
		var num = document.getElementById("input");
		var inputNumber = num.value;
		num.value = Math.pow(num.value,2);
		document.getElementById("result").value = num.value;
		document.getElementById("input").value = inputNumber;
	}

	function inverse() {
		var num = document.getElementById("input");
		var inputNumber = num.value;
		num.value = 1/num.value;
		document.getElementById("result").value = num.value;
		document.getElementById("input").value = inputNumber;
	}

	function sqrt() {
		var num = document.getElementById("input");
		var inputNumber = num.value;
		num.value = Math.sqrt(num.value);
		document.getElementById("result").value = num.value;
		document.getElementById("input").value = inputNumber;
	}

	function int() {
		var num = document.getElementById("input");
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