/*var first_click = false;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var geocoder;
geocoder = new google.maps.Geocoder();
              
function convert_addr(latt, lont) {
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
        /*console.log(results[1].formatted_address);
        return results[1].formatted_address;
      } else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  });   
}*/

$(document).ready(function() {

/*console.log(that.map);
directionsDisplay = new google.maps.DirectionsRenderer();
directionsDisplay.setMap(map);
$(".submit").click(function() {*/
  /*$.get("travel-radius-server.herokuapp.com/first8.php?LAT="+lat+"&LONG="+lon+"&DIST="+dist, function(data) {
    var js_return = jQuery.parseJSON(data);
  });*/

  /*var num_poi = 1;
  var js_return = [ {lat:"40.714224", lon:"-73.961452"}];
  var start_lat = $("#start_lat").val();
  var start_lon = $("#start_lon").val();

  var start_addr = convert_addr(start_lat, start_lon);
  for(var i=0; i<num_poi; i++) {
    console.log(44);
     var end_addr = convert_addr(js_return[i].lat, js_return[i].lon);
     var request = {
        origin:start_addr,
        destination:end_addr,
        travelMode: google.maps.TravelMode.DRIVING
     };
     directionsService.route(request, function(response, status) {
       if (status == google.maps.DirectionsStatus.OK) {
         directionsDisplay.setDirections(response);
       }
     });
  }
        
});*/

  $( '#menu' ).multilevelpushmenu({
       menuWidth: 350, // '450px', '30em', '25%' will also work
       menuHeight: "calc(100% - 60px)"
  });


  $(".btn").click(function() {
    if ($(this).hasClass("active") || !$(this).hasClass("t"))
      return;
    $(this).addClass("active")
    var transp_selection = $.trim($(this).text());
    if (transp_selection == "Car") {
      $(".transport_info").animate({"height":"auto"}).css("visibility", "visible");;
    }
    else {
      $(".transport_info").css("visibility", "hidden");
      $(".transport_info").animate({"height":"0px"});
    }
  });

  $(".outer_row").click(function() {
    if ($(this).hasClass("focus"))
      return;

    $(this).addClass("dummy");
    $(".outer_row").each(function() {
      if (first_click && $(this).hasClass("focus")) {
        $(this).css("background-color", "")
        $(this).animate({"padding-left":"-=40px", "opacity":".5"})
        $(this).removeClass("focus");
      }
      else if (!first_click && !$(this).hasClass("dummy")) {
        $(this).animate({"opacity":".5"})
      }
    });

    first_click = true;
    $(this).removeClass("dummy");
    $(this).addClass("focus");
    $(this).animate({"padding-left":"+=40px", "opacity":"1"});
    //$(this).fadeTo("fast", 1)
  });
});

