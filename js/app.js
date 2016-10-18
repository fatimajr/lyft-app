$(document).ready(function() {
	var soloNumeros = function(evento) {
		var ascii = evento.keyCode;
		if (ascii == 8 || (ascii >= 48 && ascii <= 57)) {
			return true;
		} else {
			return false;
		}
	};
	var randomNumber = function(evento){
		var random = "LAB"+ "-"+(Math.floor(Math.random()*900)+100);
		alert(random);
		localStorage.setItem("codigo", random);
	};
	var imputVal = function(){
   		$(this).attr("maxlength", 1);
	   	if($(this).val().length==$(this).attr("maxlength")){
	    $(this).next().focus();
	   }
	};
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

	$("#numero").keyup(registroVal);

	$("#countries").msDropdown();

	$("#numero").keydown(soloNumeros);

	$("input.num").keyup(imputVal);

	$("input.num").keydown(soloNumeros);
});