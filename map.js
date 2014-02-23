/*
	hints:
	-implement the line with a google.maps.Polyline
	-let google redraw the polyline (see .getPath()) when a new
	point is added - don't delete the whole thing and add it again 
	-use google.maps.Marker for markers
	-use .setMap(null) do remove/delete either of these from your map
	you're making work for yourself if you do it any other way
*/

var Map = function Map(view) {

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
  
	this.init = function() {
		// render map here
		this.map = new google.maps.Map($('#map_canvas')[0], mapOptions);
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

	this.points = []; // { lat:0.0, lng:0.0, name: "", time: Date() }
	this.markers = []; // array of markers already on map

	this.addPoint = function(point) {

	}

	this.renderAllPoints = function () {
		// remove all old map data, *sort* the points
		// and render each point ever ~300ms
		// don't render the point if dist(this_pt,prev) === 0		
	}

	this.removeData = function() {
		// reset distance, clear polypath and markers
	}

	this.renderSinglePoint = function(cb) {
		// render a single point on the map
		// pan the map to the new point
		// make sure to update the polypath
		// consider recursion :)
	}

	// call the initializer
	this.init();
}

var first_click = false;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var geocoder;
var map;
geocoder = new google.maps.Geocoder();
              
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

function init() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  map = Map(this);
  directionsDisplay.setMap(map);
}

$(document).ready(function() {
  init();
  $(".submit").click(function() {
    /*$.get("travel-radius-server.herokuapp.com/first8.php?LAT="+lat+"&LONG="+lon+"&DIST="+dist, function(data) {
      var js_return = jQuery.parseJSON(data);
    });*/

    var num_poi = 1;
    var js_return = [ {lat:"40.714224", lon:"-73.961452"}];
    var start_lat = $("#start_lat").val();
    var start_lon = $("#start_lon").val();

    convert_addr(start_lat, start_lon, function(start_addr) {
      for(var i=0; i<num_poi; i++) {
         var end_addr = convert_addr(js_return[i].lat, js_return[i].lon, function(end_addr) {
           console.log("HI: "+end_addr);
           start_addr="chicago, il";
           end_addr="oklahoma city, ok";
           var request = {
              origin:start_addr,
              destination:end_addr,
              travelMode: google.maps.TravelMode.DRIVING
           };
           console.log(start_addr+"   "+end_addr);
           directionsService.route(request, function(response, status) {
             console.log(response+"    !"+status);
             if (status == google.maps.DirectionsStatus.OK) {
               directionsDisplay.setDirections(response);
              directionsDisplay.setMap(map);
             }
             else
               alert(3);
           });
         });
      }
    });
  });
});
