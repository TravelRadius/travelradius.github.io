var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var geocoder = new google.maps.Geocoder();
var map;


function reset_renderer(){

	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(map);



}

function convert_addr(latt, lont, cb) {
  var lat = parseFloat(latt);
  var lng = parseFloat(lont);
  var latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        /*map.setZoom(11);
        marker = new google.maps.Marker({
          position: latlng,
          map: map
        });*/
        //infowindow.setContent(results[1].formatted_address);
        //infowindow.open(map, marker);
        console.log(results[1].formatted_address);
      } else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  cb(results[1].formatted_address);
  });   
}




function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();

  var mapOptions = {
		// feel free to edit map options
		disableDefaultUI: true,
		zoom: 12,
		center: new google.maps.LatLng(visitor_lat, visitor_lon),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	    zoomControl: true,
	    zoomControlOptions: {
	      style: google.maps.ZoomControlStyle.LARGE,
	      position: google.maps.ControlPosition.TOP_RIGHT
	    },
	    panControl: true,
	    panControlOptions: {
	      position: google.maps.ControlPosition.TOP_RIGHT
	    }
	}
  map = new google.maps.Map($('#map_canvas')[0], mapOptions);
  directionsDisplay.setMap(map);
  var myLatIng = new google.maps.LatLng(visitor_lat, visitor_lon);
	var pinIcon = new google.maps.MarkerImage(
	    "blueCircle.png",
	    null, /* size is determined at runtime */
	    null, /* origin is 0,0 */
	    null, /* anchor is bottom center of the scaled image */
	    new google.maps.Size(15, 15)
	);  

	var marker =  new google.maps.Marker({
	        position: myLatIng,
	        map: this.map,
	        title: 'Hello World!',
	        icon: pinIcon
	});
}



$(document).ready(function() {


	initialize();


	$(".submit").click(function() {

		$('.cursorPointer').click();

		var num_poi = 2;
	    var js_return;
	    js_return = [ {lat:"40.714224", lon:"-73.961452"}, {lat:"41.43206", lon:"-81.38992"}];
	    var start_lat = $("#start_lat").val();
	    var start_lon = $("#start_lon").val();

	    convert_addr(start_lat, start_lon, function(start_addr) {

	      for(var i=0; i<num_poi; i++) {
	        convert_addr(js_return[i].lat, js_return[i].lon, function(end_addr) {
	           console.log("HI: "+end_addr);
	           //start_addr="chicago, il";
	           //end_addr="oklahoma city, ok";
	           var request = {
	              origin:start_addr,
	              destination:end_addr,
	              travelMode: google.maps.TravelMode.DRIVING
	           };
	           console.log(start_addr+"   "+end_addr);
	           
	           directionsService.route(request, function(response, status) {
			       console.log(response);
			       if (status == google.maps.DirectionsStatus.OK) {
			         directionsDisplay.setDirections(response);
			         reset_renderer();
			       }
			       else
			         alert(3);
			    });

	         });
	      }

	    });

	});



});