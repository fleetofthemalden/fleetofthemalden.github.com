var taco;
function init(){
	var poop = new Object();
	poop = {"game_title" : "poop" , "username" : "catherine" , "score" : 69 };
	var mukmuk = JSON.stringify(poop);
	$.post("http://gentle-shore-6564.herokuapp.com/poop.json", mukmuk);
	
}