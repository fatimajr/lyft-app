var cargarPagina = function(evento) {
	
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

	$("#join").text(fecha);

	 $("#inputFile").change(function () {
        readURL(this);
    });

    $("#savebutton").click(guardaDatos);

    $("#home").text(city);

    $("#note").text(music);

    $("#perm").text(me);

	$("#inputFile").change(savePhoto);
	if(image != null){
		$("#profilePhoto").attr("src", image);
	}
	
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

//Nuevo código de registro - RESEND CODE BUTTON
var nuevoRandom = function(evento){
	var resend = (Math.floor(Math.random()*900)+100);
	sweetAlert("LAB" + "-" + resend);
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
		$("#next").attr("href", "verify.html").removeClass("disabled").click(randomNumber);
	} else {
		$("#next").removeAttr("href").addClass("disabled");
	}
};

// Campo de registro - Código LAB Random 
var randomNumber = function(evento){
	var random = (Math.floor(Math.random()*900)+100);
	alert("LAB" + "-" + random);
	localStorage.setItem("codigo", random);
};


// Variables almacenadas en localstorage
var numeroVal = localStorage.getItem("phone");
var ranCode = localStorage.getItem("codigo");
var inputName = localStorage.getItem("nombre");
var inputLastname = localStorage.getItem("apellido");
var inputEmail = localStorage.getItem("email");
var fecha = localStorage.getItem("dateJoin");
var city = localStorage.getItem("ciudad");
var music = localStorage.getItem("musica");
var me = localStorage.getItem("yo");
var image = localStorage.getItem("photoPreview");


var guardaDatos = function(){
	var city = $("#city").val();
	localStorage.setItem("ciudad", city);
	var music = $("#music").val();
	localStorage.setItem("musica", music);
	var me = $("#me").val();
	localStorage.setItem("yo", me);
	$(this).attr("href","profile.html");
}

// Validación de código - 3 inputs (alerts) 
var compararCode = function(evento){
	var userCode = $("input.num").eq(0).val() + $("input.num").eq(1).val() + $("input.num").eq(2).val();
	var noCode = $("input.num").eq(0).val().length;
	if(userCode == ranCode){
		$(this).attr("href", "datos.html");
	} else if(noCode == 0){
		sweetAlert ("Please enter your code");
		return false;
	}else if(userCode != ranCode){
		sweetAlert ("Invalid code");
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
var datosVal = function(){ //function expression
	var name = $("input.name").val().trim().length;
	var lname = $("input.lastName").val().trim().length;
	var email = $("input.email").val().trim().length;
	var correo = $("input.email").val();
	var filter = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	dateJoin();

	if(name > 2 && name <= 20) {
		$(this).attr("href", "maps.html");
	} else {
		sweetAlert("Please enter your name");
		return false;
	}
	if(lname > 2 && lname <= 20) {
		$(this).attr("href", "maps.html");
	} else {
		sweetAlert("Please enter your last name");
		return false;
	}
	if(email > 5 && email <= 50 && filter.test(correo)){
		$(this).attr("href", "maps.html");
	} else {
		sweetAlert("Please enter a valid email");
		return false;
	}
	if($("#filled-in-box").is(":checked")) {
		$(this).attr("href", "maps.html");
	} else{
		sweetAlert("Please accept terms and conditions")
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
	    sweetAlert('You clicked in this marker');
	  }
	});

	var dir = "";
	var latlng = new google.maps.LatLng(lat, lon);
	geocoder = new google.maps.Geocoder();
	geocoder.geocode({"latLng": latlng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0]) {
				dir = results[0].formatted_address;
			} else {
				dir = "No se ha podido obtener ninguna dirección en esas coordenadas.";
			}
		}
		$("#ubicacion").text(dir);
	});
};

var funcionError = function (error) {
	console.log(error);
};

var dateJoin = function() {
    var meses = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "December"];
    var f = new Date();
    var d = f.getMonth();
    var a = f.getFullYear();
    var fecha = meses[d] + " " + a;
    localStorage.setItem("dateJoin", fecha);
};

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#image_upload_preview').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}
var savePhoto = function(event) {
    if(event.target.files && event.target.files[0]){
		var reader = new FileReader();

		reader.onload = function(event){
			var preview = event.target.result;
			$("#image_upload_preview").attr("src", preview);
			localStorage.setItem("photoPreview", preview);
		}
		reader.readAsDataURL(event.target.files[0]);
	}	
};

$(document).ready(cargarPagina);


