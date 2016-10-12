$(document).ready(function() {
	$("#numero").keydown(function(evento) {
		var ascii = evento.keyCode;
		if (ascii == 8 || (ascii >= 48 && ascii <= 57)) {
			return true;
		} else {
			return false;
		}
	});

	$("#numero").keyup(function(evento) {
		var longitud = $(this).val().length;
		if (longitud == 9) {
			$("#next").attr("href", "registro.html");
			$("#next").removeClass("disabled");
		} else {
			$("#next").removeAttr("href");
			$("#next").addClass("disabled");
		}
	});

	$("#next").click(function(evento){
		var random = "LAB"+(Math.floor(Math.random()*900)+100);
		alert(random);
	});

	$("#countries").msDropdown();
});

// "4".charCodeAt(0) 
// 
// Funcionalidades para Lyft

// - Validar que solo se ingresen #s
// - Validar que sean 9 #s como max.
// - Generar un código aleatorio con la estructura LAB-XYZ
// - Validar lo obvio