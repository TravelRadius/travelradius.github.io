

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
		zoom: 6,
		center: new google.maps.LatLng(39.50, -98.35),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}

	this.init = function() {
		// render map here
		this.map = new google.maps.Map($('#map_canvas')[0], mapOptions);
		polyPath.setMap(this.map);
	}
	var that = this;
	this.points = []; // { lat:0.0, lng:0.0, name: "", time: Date() }
	this.markers = []; // array of markers already on map
	var polyPath;
	var path;
	var interval;
	var distance = 0;
	var polyOptions = {
		geodesic: true,
	    strokeColor: '#FF0000',
	    strokeOpacity: 1.0,
	    strokeWeight: 2
	};
	polyPath = new google.maps.Polyline(polyOptions);
	var counter = 0;

	this.addPoint = function(point) {
		// adds a point to this.points
		if (this.points.length > 0) {
			if (distanceFormula(this.points[this.points.length-1], point) === 0){

			}
			else {
				this.points.push(point);
			}
		}
		else {
			this.points.push(point);
		}
	}

	this.renderAllPoints = function () {
		// remove all old map data, *sort* the points
		// and render each point ever ~300ms
		// don't render the point if dist(this_pt,prev) === 0	
		window.setMilesWrapper('0');
		distance = 0;
		if (this.points.length < 1) {
			return;
		}
		this.points.sort(function(obj1, obj2) {
			return obj1.time - obj2.time;
		});
		polyPath = new google.maps.Polyline(polyOptions);
		polyPath.setMap(this.map);
		path = polyPath.getPath();
		var point = new google.maps.LatLng(this.points[0].lat, this.points[0].lng);
		path.push(point);
		var marker = new google.maps.Marker({
			position: point,
			map: this.map
		});
		this.markers.push(marker);
		this.map.panTo(new google.maps.LatLng(this.points[0].lat, this.points[0].lng));
		polyPath.setMap(this.map);
		interval = setInterval(function() {that.renderSinglePoint()}, 300);
	}

	this.removeData = function() {
		// reset distance, clear polypath and markers
		window.setMilesWrapper('0');
		distance = 0;
		for(var i=0; i<this.markers.length; i++)
			this.markers[i].setMap(null);
		this.markers = [];
		this.points = [];
		distance = 0;
		polyPath.setMap(null);
	}

	this.renderSinglePoint = function(cb) {
		// render a single point on the map
		// pan the map to the new point
		// make sure to update the polypath
		// consider recursion :)
		counter++;
		if (counter >= this.points.length) {
			window.clearInterval(interval);
			counter = 0;
			return;
		}
		distance = distance + Math.floor(distanceFormula(this.points[counter], this.points[counter-1]));
		var point = new google.maps.LatLng(this.points[counter].lat, this.points[counter].lng);
		path.push(point);
		var marker = new google.maps.Marker({
			position: point,
			map: this.map
		});
		this.markers.push(marker);	
		this.map.panTo(new google.maps.LatLng(this.points[counter].lat, this.points[counter].lng));
		polyPath.setMap(this.map);
		window.setMilesWrapper(distance.prettyPrint());
	}

	// call the initializer
	this.init();
}