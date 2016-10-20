var cargarPagina = function(evento) {

	$("#next").click(randomNumber);
	
	$("#numero").keyup(registroVal).focus();

	$("#numero").keydown(soloNumeros);

	$("#nextVerify").click(compararCode);

	$("#resendBtn").click(nuevoRandom);

	$("#nextDatos").click(setNames);

	$("#nextDatos").click(datosVal);

	$("#countries").msDropdown();

	$(".infocus").focus();
	
	$("input.num").keyup(imputVal)

	$("input.num").keydown(soloNumeros);

	$("#phone").text(numeroVal);
	
	$("#user").text(inputName + " " + inputLastname);

	$("#correo").text(inputEmail);

	if (navigator.geolocation) { 
		// también se puede usar if ("geolocation" in navigator) {}
		navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
	}
	$(".button-collapse").sideNav({
		menuWidth: 220, 
		// closeOnClick: true        // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });	
};

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

//Nuevo código de registro - RESEND CODE BUTTON
var nuevoRandom = function(evento){
	var resend = (Math.floor(Math.random()*900)+100);
	alert("LAB" + "-" + resend);
	localStorage.setItem("code", resend);
	ranCode = resend;
};

// Validación de código - focus para 3 inputs
var imputVal = function(evento){
	var ascii = evento.keyCode;
	$(this).attr("maxlength", 1);

   	if($(this).val().length == $(this).attr("maxlength")){
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
		$("#next").attr("href", "verify.html").removeClass("disabled");
	} else {
		$("#next").removeAttr("href").addClass("disabled");
	}
};

// Variables almacenadas en localstorage
var numeroVal = localStorage.getItem("phone");
var ranCode = localStorage.getItem("codigo");
var inputName = localStorage.getItem("nombre");
var inputLastname = localStorage.getItem("apellido");
var inputEmail = localStorage.getItem("email");


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
var setNames = function(evento){
	var inputName = $("input.name").val();
	localStorage.setItem("nombre", inputName);
	var inputLastname = $("input.lastName").val();
	localStorage.setItem("apellido", inputLastname);
	var inputEmail = $("input.email").val();
	localStorage.setItem("email", inputEmail);
};
// Validación formulario datos - nombre y apellido 
var datosVal = function(evento){ //function expression
	var name = $("input.name").val().length;
	var lname = $("input.lastName").val().length;
	var email = $("input.email").val().length;
	var correo =  $("input.email").val();
	if(name > 2 && name <= 20) {
		$(this).attr("href", "maps.html");
	} else {
		alert("Ingresa tu nombre");
		return false;
	}
	if(lname > 2 && lname <= 20) {
		$(this).attr("href", "maps.html");
	} else {
		alert("Ingresa tu apellido");
		return false;
	}
	if(email > 5 && email <= 50){
		$(this).attr("href", "maps.html");
	} else {
		alert("Ingresa un email válido");
		return false;
	}
	if (validateEmail(correo)) {
		
	} else {
		alert("Email inválido");
		return false;
	}
};

// Function statement que valida el email usando una regular expression.
function validateEmail(correo) {
	var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
	if (filter.test(correo)) {
		return true;
	}
	else {
		return false;
	}
};

var funcionExito = function(posicion) {
	var lat = posicion.coords.latitude;
    var lon = posicion.coords.longitude;
    var maps = new GMaps({
	  div: '#map',
	  lat: lat ,
	  lng: lon ,
	  mapTypeControl: false,
	  zoomControl: false,
	  streetViewControl: false
	});

	maps.addMarker({
	  lat: lat ,
	  lng: lon ,
	  title: 'Lima',
	  click: function(e) {
	    alert('You clicked in this marker');
	  }
	});
};

var funcionError = function (error) {
	console.log(error);
};

$(document).ready(cargarPagina);


