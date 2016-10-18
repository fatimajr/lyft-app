var cargarPagina = function(evento) {
	$("#nextVerify").click(compararCode);

	$("#numero").keyup(registroVal);

	$("#countries").msDropdown();

	$("#numero").keydown(soloNumeros);

	$("input.num").keyup(imputVal);

	$("input.num").keydown(soloNumeros);

	$("#phone").text(numeroVal);
};

$(document).ready(cargarPagina);

// Validación Registro y código - Solo se aceptan números
var soloNumeros = function(evento) {
	var ascii = evento.keyCode;
	if (ascii == 8 || (ascii >= 48 && ascii <= 57)) {
		return true;
	} else {
		return false;
	}
};

// Campo de registro - Código LAB Random 
var randomNumber = function(evento){
	var random = (Math.floor(Math.random()*900)+100);
	alert("LAB" + "-" + random);
	localStorage.setItem("codigo", random);
};

// Validación de código - focus para 3 inputs
var imputVal = function(evento){
	var ascii = evento.keyCode;
		$(this).attr("maxlength", 1);
   	if($(this).val().length==$(this).attr("maxlength")){
    	$(this).next().focus();
   	} else if(ascii === 8) {
        $(this).prev().focus();
    }
};
// Campo de teléfono (Registro)
var registroVal = function(evento) {
		$(this).attr("maxlength", 9);
		var longitud = $(this).val().length;
		var numeroVal = $(this).val();
		localStorage.setItem("phone", numeroVal);
		if (longitud == 9) {
			$("#next").attr("href", "verify.html").removeClass("disabled").click(randomNumber);
		} else {
			$("#next").removeAttr("href").addClass("disabled");
		}
	};

// Variables almacenadas en localstorage
var numeroVal = localStorage.getItem("phone");
var ranCode = localStorage.getItem("codigo");

// Validación de código - 3 inputs (alerts) 
var compararCode = function(evento){
	var userCode = $("input.num").eq(0).val() + $("input.num").eq(1).val() + $("input.num").eq(2).val();
	var noCode = $("input.num").eq(0).val().length;
	if(userCode == ranCode){
		$(this).attr("href", "datos.html");
	} else if(noCode == 0){
		alert ("Ingrese su código por favor");
		return false;
	}else if(userCode != ranCode){
		alert ("Código inválido");
		return false;
	} 
};


