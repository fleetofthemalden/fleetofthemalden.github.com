var taco;
var mukmuk;
function init(){
	var poop = new Object();
	poop = {"game_title":"poop","username":"catherine","score":69};
	mukmuk = JSON.stringify(poop);
	$.post("http://gentle-shore-6564.herokuapp.com/submit.json", mukmuk);
}
