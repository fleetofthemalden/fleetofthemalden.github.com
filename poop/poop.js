var taco;
var mukmuk;
function init(){
	var poop = new Object();
	poop = {game_title:"poop", username:"cat_mad", score:99};
	mukmuk = JSON.stringify(poop);
	$.post("http://hidden-wave-3744.herokuapp.com/submit.json", poop);
}
