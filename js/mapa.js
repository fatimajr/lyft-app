var cargarPagina = function(evento) {
	if (navigator.geolocation) { 
		// también se puede usar if ("geolocation" in navigator) {}
		navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
	}

	$("#nextDatos").click(setNames);

    $("#user").text(inputName + " " + inputLastname);

	$("#correo").text(inputEmail);


	$(".button-collapse").sideNav({
		menuWidth: 220, 
		// closeOnClick: true        // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });	
};

var inputName = localStorage.getItem("nombre");
var inputLastname = localStorage.getItem("apellido");
var inputEmail = localStorage.getItem("email");

var setNames = function(evento){
	var inputName = $("input.name").val();
	localStorage.setItem("nombre", inputName);
	var inputLastname = $("input.lastName").val();
	localStorage.setItem("apellido", inputLastname);
	var inputEmail = $("input.email").val();
	localStorage.setItem("email", inputEmail);
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

$(document).ready(cargarPagina);
