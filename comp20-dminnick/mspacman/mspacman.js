var canvas;
var ctx;
var spriteSheet;


function start_game(){
	//initialization
	spriteSheet = new Image();
	spriteSheet.src = "pacman10-hp-sprite.png";
	canvas_init();

	
}

//ctx.drawImage(imageName, sx, sy, swidth, sheight, dx, dy, dwidth, dheight);

function canvas_init(){
	canvas = document.getElementById("pacman");
	ctx = canvas.getContext("2d");
	
	ctx.drawImage(spriteSheet, 320, 1, 465, 140, 0, 0, 465, 140); //gameboard
	
	ctx.drawImage(spriteSheet, 80, 0, 20, 20, 130, 27, 20, 20); //pacman
	
	ctx.drawImage(spriteSheet, 40, 80, 20, 20, 280, 28, 20, 20); //ghost (red)
	
}