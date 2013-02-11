var canvas;
var ctx;
var ctx2;
var spriteSheet;


function start_game(){
	//initialization
	spriteSheet = new Image();
	spriteSheet.src = "assets/frogger_sprites.png";
	canvas_init();
	sprite_init();
	
	
	play_game();
	
}

//ctx.drawImage(imageName, sx, sy, swidth, sheight, dx, dy, dwidth, dheight);

function canvas_init(){
	canvas = document.getElementById("static_layer");
	ctx = canvas.getContext("2d");
	
	ctx.fillStyle = "#191970"; //water
	ctx.fillRect(2,2,395,280);
	
	ctx.fillStyle = "#000000"; //road
	ctx.fillRect(2,310,395,253);
	
	ctx.fillStyle = "#00FF00"; //text
	ctx.font = "20pt Helvetica";
	ctx.fillText("Level:", 65,535);
	ctx.font = "14pt Helvetica";
	ctx.fillText("Score:      Highscore:", 2,560);
	
	ctx.drawImage(spriteSheet, 13, 12, 324, 35, 25, 16, 324, 34); //header
	
	ctx.drawImage(spriteSheet, 0, 55, 399, 55, 2, 60, 395, 55); //grass
	
	ctx.drawImage(spriteSheet, 0, 119, 399, 35, 2, 279, 395, 35); //roadside
	ctx.drawImage(spriteSheet, 0, 119, 399, 35, 2, 480, 395, 35); //roadside
	
}

function sprite_init(){
	canvas = document.getElementById("sprite_layer");
	ctx = canvas.getContext("2d");
	
	ctx.drawImage(spriteSheet, 0, 165, 185, 24, 14, 115, 185, 24); //log
	
	ctx.drawImage(spriteSheet, 104, 300, 50, 24, 88, 315, 50, 24); //truck
	
	
}

function play_game(){

}