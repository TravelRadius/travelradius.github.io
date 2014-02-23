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
		mapTypeId: google.maps.MapTypeId.ROADMAP
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
