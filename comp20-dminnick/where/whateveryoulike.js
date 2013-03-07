var myLat = 42.4696969;
var myLng = -71.1696969;
var request;
var me;

var waldo;
var carmen;
var myOptions;
var map;
var marker;
var infowindow;

var loaded = {"trains" : false, "weirdos" : false, "you" : false};
var reqaction;
var reqinfo;

var stations;
var plat;
var len;

function stationInit(){
	stations = new Object;
	plat = {"RALEN" : 0, "RDAVN" : 1, "RPORN" : 2, "RHARN" : 3, "RCENN" : 4, "RKENN" : 5, "RMGHN" : 6, "RPRKN" : 7, "RDTCN" : 8, "RSOUN" : 9, "RBRON" : 10, "RANDN" : 11, "RJFKN" : 12, "RSAVN" : 13, "RFIEN" : 14, "RSHAN" : 15, "RASHN": 16, "RNQUN" : 17, "RWOLN" : 18, "RQUCN" : 19, "RQUAN" : 20, "RBRAN" : 21, "RALES" : 0, "RDAVS" : 1, "RPORS" : 2, "RHARS" : 3, "RCENS" : 4, "RKENS" : 5, "RMGHS" : 6, "RPRKS" : 7, "RDTCS" : 8, "RSOUS" : 9, "RBROS" : 10, "RANDS" : 11, "RJFKS" : 12, "RSAVS" : 13, "RFIES" : 14, "RSHAS": 15, "RASHS" : 16, "RNQUS" : 17, "RWOLS" : 18, "RQUCS" : 19, "RQUAS" : 20, "RBRAS" : 21};
	var st_names = ["Alewife", "Davis", "Porter", "Harvard", "Central", "Kendal/MIT", "Charles/MGH", "Park st", "Downtown Crossing", "South Station", "Broadway", "Andrew", "JFK/UMASS", "Savin Hill", "Fields Corner", "Shawmut", "Ashmont", "North Quincy", "Wollast", "Quincy Center", "Quincy Adams", "Braintree"];	
	var latitude = [42.395428, 42.39674, 42.3884, 42.373362, 42.365486, 42.36249079, 42.361166, 42.35639457, 42.355518, 42.352271, 42.342622, 42.330154, 42.320685, 42.31129, 42.300093, 42.29312583, 42.284652, 42.275275, 42.2665139, 42.251809, 42.233391, 42.2078543];
	var longitude = [-71.142483, -71.121815, -71.119149, -71.118956, -71.103802, -71.08617653, -71.0702628, -71.0624242, -71.060225,-71.055242, -71.056967, -71.057655, -71.052391, -71.053331, -71.061667, -71.06573796, -71.064489, -71.029538, -71.0203369, -71.005409, -71.007153, -71.0011385];
	var nor_key = ["RALEN", "RDAVN", "RPORN", "RHARN", "RCENN", "RKENN", "RMGHN", "RPRKN", "RDTCN", "RSOUN", "RBRON", "RANDN", "RJFKN", "RSAVN", "RFIEN", "RSHAN", "RASHN", "RNQUN", "RWOLN", "RQUCN", "RQUAN", "RBRAN"];
	var sth_key = ["RALES", "RDAVS", "RPORS", "RHARS", "RCENS", "RKENS", "RMGHS", "RPRKS", "RDTCS", "RSOUS", "RBROS", "RANDS", "RJFKS", "RSAVS", "RFIES", "RSHAS", "RASHS", "RNQUS", "RWOLS", "RQUCS", "RQUAS", "RBRAS"];	
	var station;
	var red_lines = new Array();
	var icon_T = 'edu.cs.tufts.mchow.mbta_icon.png';
	len = st_names.length;
	for(i=0; i<len; i++){
		station = new Object;
		station.name = st_names[i];
		station.latd = latitude[i];
		station.lngd = longitude[i];
		station.icon = icon_T;
		station.nkey = nor_key[i];
		station.skey = sth_key[i];
		station.trains = new Array();
		station.note = "No Train Data Available";
		station.crnt = false;
		station.updt = updateStationInfo;
		stations[i] = station;
		red_lines.push(new google.maps.LatLng(latitude[i], longitude[i]));
	}
	var ashmont = red_lines.slice(0, 17);
	var braintree = red_lines.slice(17, 22);
	braintree.unshift(red_lines[12]);
	draw_red_line(ashmont);
	draw_red_line(braintree);
}

function humanInit(){
	var icon_W = 'waldo.png';
	var icon_C = 'carmen.png';
	waldo = new Object;
	me = new google.maps.LatLng(myLat, myLng);
	waldo.name = "Waldo";
	waldo.latd = 0;
	waldo.lngd = 0;
	waldo.note = "Where's Waldo? [Hint: Not in Boston]";
	waldo.icon = icon_W;
	waldo.updt = showDistance;
	carmen = new Object;
	carmen.name = "Carmen Sandiego";
	carmen.latd = 0;
	carmen.lngd = 0;
	carmen.note = "Where in the world is Carmen Sandiego? [Hint: Not in Boston]";
	carmen.icon = icon_C;
	carmen.updt = showDistance;
}

function init(){
	infowindow = new google.maps.InfoWindow()
	myOptions = {
		zoom: 13,
		center: me,
		mapTypeId: google.maps.MapTypeId.ROADMAP			
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	humanInit();
	stationInit();
	reqaction = addtrains;
	makeRequest("http://mbtamap-cedar.herokuapp.com/mapper/redline.json");
	getMyLocation();
}

function makeRequest(str){
	request = new XMLHttpRequest();
	request.open("GET", str, true);
	request.send(null);
	request.onreadystatechange = callback;
}

function callback(){
	if(request.readyState == 4){
		try{
			parse(request.responseText);
		}
		catch(err){
			alert("asf;lsn");
			
		}
		
	}
}

function parse(str){
	reqinfo = JSON.parse(str);
	reqaction();
}

function nothing(){
}

function isLoaded(str){
	if(loaded[str] == false && str == "trains"){
		loaded[str] = true;
		reqaction = findWaldo;
		makeRequest("http://messagehub.herokuapp.com/a3.json");
	}
	if(loaded[str] == false && str == "weirdos"){
		loaded[str] = true;
		reqaction = nothing;
	}
}
	
function addtrains(){
	for(i=0; i<reqinfo.length; i++){
		if(reqinfo[i]["InformationType"] == "Predicted"){
			addtrain(reqinfo[i]);
		}
	}
	renderStations();
	isLoaded("trains");
}

function addtrain(red){
	var index = red["PlatformKey"];
	var train = new Object;
	train.time = parseTime(red["TimeRemaining"]);
	if(train.time != 99){
		if(index.charAt(4) == 'S'){
			if(red["Route"] == "0"){
				train.dest = "Braintree";
			}
			else{
				train.dest = "Ashmont";
			}
		}
		else if(index.charAt(4) == 'N'){
			train.dest = "Alewife&nbsp;&nbsp;";
		}
		stations[plat[index]]["trains"].push(train);
	}
}

function trainCompare(train1, train2){
	return train1.time - train2.time;
}

function renderStations(){
	for(i=0; i<len; i++){
		createMarker(stations[i]);
	}
}

function updateStationInfo(){
	var msg;
	if(this.crnt == true){
		this.note = "";
		return
	}
	else{	
		this.trains.sort(trainCompare);
		var tlen = this.trains.length;
		msg = "ARR:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DEST:<br />";
		var min;
		var train;
		for(i=0; i<tlen && i<4; i++){
			train = this.trains[i];
			min = train.time;
			if(min < 10){
				min = "&nbsp;&nbsp;" + min.toString();
			}	
			else{
				min = min.toString();
			}
			msg = msg + min + " min.&nbsp;&nbsp;&nbsp;" + train.dest + "&nbsp;&nbsp;&nbsp;&nbsp;<br />";
		}
		if(tlen > 0){
			this.note = msg;
		}
	}
	this.crnt = true;
}

function parseTime(timeString){
	timeString = timeString.slice(3,5);
	if(timeString.charAt(0) == '-'){timeString = "99"}
	return parseInt(timeString);
}	

function findWaldo(){
	for(i=0; i<reqinfo.length; i++){
		if(reqinfo[i]["name"] == "Waldo"){
			waldo.latd = reqinfo[i]["loc"]["latitude"];
			waldo.lngd = reqinfo[i]["loc"]["longitude"];
			waldo.note = reqinfo[i]["loc"]["note"];
			createMarker(waldo);
		}
		if(reqinfo[i]["name"] == "Carmen Sandiego"){
			carmen.latd = reqinfo[i]["loc"]["latitude"];
			carmen.lngd = reqinfo[i]["loc"]["longitude"];
			carmen.note = reqinfo[i]["loc"]["note"];
			createMarker(carmen);
		}
	}
	isLoaded("weirdos");
}

function showDistance(){
	var dist = getDistanceFromLatLon(myLat, myLng, this.latd, this.lngd);
	dist = dist.toString();
	var msg = "<br />" + this.name + " is " + dist.slice(0,5) + " miles away from your location.";
	this.note = this.note + msg;
}

function getMyLocation(){
	if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
		navigator.geolocation.getCurrentPosition(function(position) {
		myLat = position.coords.latitude;
		myLng = position.coords.longitude;
		renderMe();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}

function nearestStation(){
	var shortest = 0;
	var dist;
	var sdist = getDistanceFromLatLon(myLat, myLng, stations[0]["latd"], stations[0]["lngd"]);
	for(i=1; i<len; i++){
		dist = getDistanceFromLatLon(myLat, myLng, stations[i]["latd"], stations[i]["lngd"]);
		if(dist < sdist){
			sdist = dist;
			shortest = i;
		}
	}
	sdist = sdist.toString();
	return "Your nearest station is: " + stations[shortest]["name"] + ". <br />It is " + sdist.slice(0,5) + " miles away.";
}

function renderMe(){
	me = new google.maps.LatLng(myLat, myLng);
	map.panTo(me);
	var headerString = "<div id='iw'><h3>YOU</h3>";
	marker = new google.maps.Marker({
		position: me,
		title: headerString + nearestStation() + "</div>"
	});
	marker.setMap(map);
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});
	loaded["you"] = true;
}

function draw_red_line(routeCoordinates){
	var route = new google.maps.Polyline({
    path: routeCoordinates,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  route.setMap(map);
}

function createMarker(place){
	var placeLoc = new google.maps.LatLng(place.latd, place.lngd);
	var marker = new google.maps.Marker({
		map: map,
		position: placeLoc,
		icon: place.icon
	});
	var contentString = "<div id='iw'><h4 class='ih'>" + place.name + "</h4>";
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.close();
		place.updt();
		contentString = contentString + place.note + "</div>";
		infowindow.setContent(contentString);
		infowindow.open(map, this);
	});
 }
 
 //Taken from http://stackoverflow.com/questions/27928/how-do-i-calculate-distance-between-two-latitude-longitude-points
function getDistanceFromLatLon(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  var d = d/1.609344; //Distance in miles
  return d;
}
function deg2rad(deg) {
  return deg * (Math.PI/180)
}
//