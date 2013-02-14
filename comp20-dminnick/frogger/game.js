var canvas;
var ctx;
var spriteSheet = new Image();
spriteSheet.src = "assets/frogger_sprites.png";

var w1 = 120, w2 = 153, w3 = 186, w4 = 219, w5 = 250;
var r1 = 315, r2 = 348, r3 = 381, r4 = 414, r5 = 450;

var fx = 184, fy = 485;

var lv = 1;
var lives = 3;
var delay = 5000;
var pos = 40;

function start_game(){
	//initialization

	canvas_init();
	
	//test_render();

	play_game();
	
}

//ctx.drawImage(imageName, sx, sy, swidth, sheight, dx, dy, dwidth, dheight);

function canvas_init(){
	canvas = document.getElementById("game_canvas");
	ctx = canvas.getContext("2d");
	
	ctx.fillStyle = "#191970"; //water
	ctx.fillRect(2,2,395,280);
	
	ctx.fillStyle = "#000000"; //road
	ctx.fillRect(2,310,395,253);
	
	ctx.fillStyle = "#00FF00"; //text
	ctx.font = "20pt Helvetica";
	ctx.fillText("Level:", 95,535);
	ctx.fillText(lv, 185,535);//level
	ctx.font = "14pt Helvetica";
	ctx.fillText("Score:                  Highscore:", 2,560);
	
	ctx.drawImage(spriteSheet, 13, 12, 324, 35, 25, 16, 324, 34); //header
	
	ctx.drawImage(spriteSheet, 0, 55, 399, 55, 2, 60, 395, 55); //grass
	
	ctx.drawImage(spriteSheet, 0, 119, 399, 35, 2, 279, 395, 35); //roadside
	ctx.drawImage(spriteSheet, 0, 119, 399, 35, 2, 480, 395, 35); //roadside
	
	draw_frog_static_up(4, 516); //initialize lives
	draw_frog_static_up(32, 516);
	draw_frog_static_up(60, 516);
	
	ctx.save();
}

function play_game(){
	while(!game_over()){
		ctx.save();
		render_all();
		setInterval(render_all, delay);
		ctx.restore();
	}
}

function render_all(){
	draw_frog();
	pos = pos % 500 + 4;
	draw_logs_long(pos);
}

function game_over(){
	return false;
}

function lose_life(){
	if(lives == 0){
		game_over();
	}
	ctx.restore();
	lives = lives -1;
	ctx.fillStyle = "#000000"; //cover lost life
	ctx.fillRect(3 + (lives*28),512,28,26);
	fx = 184;
	fy = 485;
	ctx.save();
}

function display_score(score){
	ctx.restore();
	ctx.fillStyle = "#000000"; //hide old score
	ctx.fillRect(70, 540, 75, 23);
	ctx.fillStyle = "#00FF00"; //text
	ctx.font = "14pt Helvetica";
	ctx.fillText(score, 80,560);
	ctx.save();
}

function display_high_score(score){
	ctx.restore();
	ctx.fillStyle = "#000000"; //hide old score
	ctx.fillRect(242, 540, 75, 23);
	ctx.fillStyle = "#00FF00"; //text
	ctx.font = "14pt Helvetica";
	ctx.fillText(score, 255,560);
	ctx.save();
}

function draw_frog(){
	draw_frog_static_up(fx,fy); //write full func later
}

function draw_frog_static_up(dx, dy){
	ctx.drawImage(spriteSheet, 11, 368, 22, 22, dx, dy, 23, 22);
}

function draw_frog_static_down(dx, dy){
	ctx.drawImage(spriteSheet, 79, 368, 22, 21, dx, dy, 23, 22);
}

function draw_frog_static_left(dx, dy){
	ctx.drawImage(spriteSheet, 81, 335, 21, 22, dx, dy, 22, 23);
}

function draw_frog_static_right(dx, dy){
	ctx.drawImage(spriteSheet, 12, 335, 21, 22, dx, dy, 22, 23);
}

function draw_frog_move_up(dx, dy){
	ctx.drawImage(spriteSheet, 45, 365, 24, 24, dx, dy, 25, 25);
}

function draw_frog_move_down(dx, dy){
	ctx.drawImage(spriteSheet, 113, 365, 24, 24, dx, dy, 25, 25);
}

function draw_frog_move_left(dx, dy){
	ctx.drawImage(spriteSheet, 112, 338, 24, 24, dx, dy, 25, 25);
}

function draw_frog_move_right(dx, dy){
	ctx.drawImage(spriteSheet, 42, 336, 24, 24, dx, dy, 25, 25);
}

function draw_logs_long(dx){
	ctx.drawImage(spriteSheet, 0, 165, 185, 24, dx      , w3, 185, 24);
	ctx.drawImage(spriteSheet, 0, 165, 185, 24, dx + 240, w3, 185, 24);
}

function draw_logs_med(dx){
	ctx.drawImage(spriteSheet, 0, 196, 125, 24, dx - 180, w1, 125, 24);
	ctx.drawImage(spriteSheet, 0, 196, 125, 24, dx      , w1, 125, 24);
	ctx.drawImage(spriteSheet, 0, 196, 125, 24, dx + 180, w1, 125, 24);	
}

function draw_logs_short(dx){
	ctx.drawImage(spriteSheet, 0, 230, 93, 24, dx - 180, w4, 93, 24);
	ctx.drawImage(spriteSheet, 0, 230, 93, 24, dx      , w4, 93, 24);
	ctx.drawImage(spriteSheet, 0, 230, 93, 24, dx + 180, w4, 93, 24);
}

function draw_double_turtles_pos1(dx){
	ctx.drawImage(spriteSheet, 14, 406, 32, 22, dx     , w2, 32, 22);
	ctx.drawImage(spriteSheet, 14, 406, 32, 22, dx + 38, w2, 32, 22);
}

function draw_double_turtles_pos2(dx){
	ctx.drawImage(spriteSheet, 52, 406, 32, 22, dx     , w2, 32, 22);
	ctx.drawImage(spriteSheet, 52, 406, 32, 22, dx + 38, w2, 32, 22);
}

function draw_double_turtles_pos3(dx){
	ctx.drawImage(spriteSheet, 93, 406, 32, 22, dx     , w2, 32, 22);
	ctx.drawImage(spriteSheet, 93, 406, 32, 22, dx + 38, w2, 32, 22);
}

function draw_2_dive_turtles_pos2(dx){
	ctx.drawImage(spriteSheet, 133, 406, 32, 22, dx     , w2, 32, 22);
	ctx.drawImage(spriteSheet, 133, 406, 32, 22, dx + 38, w2, 32, 22);
}

function draw_2_dive_turtles_pos3(dx){
	ctx.drawImage(spriteSheet, 175, 407, 32, 22, dx     , w2, 32, 22);
	ctx.drawImage(spriteSheet, 175, 407, 32, 22, dx + 38, w2, 32, 22);
}

function draw_w2_turtles_pos1(dx){
	draw_double_turtles_pos1(dx);
	draw_double_turtles_pos1(dx + 130);
	draw_double_turtles_pos1(dx + 260);
	draw_double_turtles_pos1(dx + 390);
}

function draw_w2_turtles_pos2(dx){
	draw_2_dive_turtles_pos2(dx);
	draw_double_turtles_pos2(dx + 130);
	draw_double_turtles_pos2(dx + 260);
	draw_double_turtles_pos2(dx + 390);
}

function draw_w2_turtles_pos3(dx){
	draw_2_dive_turtles_pos3(dx);
	draw_double_turtles_pos3(dx + 130);
	draw_double_turtles_pos3(dx + 260);
	draw_double_turtles_pos3(dx + 390);
}

function draw_double_turtles(dx){
	if(dx % 3 == 1){
		draw_w2_turtles_pos1(dx);
	}
	else if(dx % 3 == 2){
		draw_w2_turtles_pos2(dx);
	}
	else{
		draw_w2_turtles_pos3(dx);
	}
}

function draw_triple_turtles_pos1(dx){
	ctx.drawImage(spriteSheet, 14, 406, 32, 22, dx - 38, w5, 32, 22);
	ctx.drawImage(spriteSheet, 14, 406, 32, 22, dx     , w5, 32, 22);
	ctx.drawImage(spriteSheet, 14, 406, 32, 22, dx + 38, w5, 32, 22);
}

function draw_triple_turtles_pos2(dx){
	ctx.drawImage(spriteSheet, 52, 406, 32, 22, dx - 38, w5, 32, 22);
	ctx.drawImage(spriteSheet, 52, 406, 32, 22, dx     , w5, 32, 22);
	ctx.drawImage(spriteSheet, 52, 406, 32, 22, dx + 38, w5, 32, 22);
}

function draw_triple_turtles_pos3(dx){
	ctx.drawImage(spriteSheet, 93, 406, 32, 22, dx - 38, w5, 32, 22);
	ctx.drawImage(spriteSheet, 93, 406, 32, 22, dx     , w5, 32, 22);
	ctx.drawImage(spriteSheet, 93, 406, 32, 22, dx + 38, w5, 32, 22);
}

function draw_3_dive_turtles_pos2(dx){
	ctx.drawImage(spriteSheet, 133, 406, 32, 22, dx - 38, w5, 32, 22);
	ctx.drawImage(spriteSheet, 133, 406, 32, 22, dx     , w5, 32, 22);
	ctx.drawImage(spriteSheet, 133, 406, 32, 22, dx + 38, w5, 32, 22);
}

function draw_3_dive_turtles_pos3(dx){
	ctx.drawImage(spriteSheet, 175, 407, 32, 22, dx - 38, w5, 32, 22);
	ctx.drawImage(spriteSheet, 175, 407, 32, 22, dx     , w5, 32, 22);
	ctx.drawImage(spriteSheet, 175, 407, 32, 22, dx + 38, w5, 32, 22);
}

function draw_w5_turtles_pos1(dx){
	draw_triple_turtles_pos1(dx);
	draw_triple_turtles_pos1(dx + 130);
	draw_triple_turtles_pos1(dx + 260);
	draw_triple_turtles_pos1(dx + 390);
	draw_triple_turtles_pos1(dx + 520);
}

function draw_w5_turtles_pos2(dx){
	draw_triple_turtles_pos2(dx);
	draw_triple_turtles_pos2(dx + 130);
	draw_triple_turtles_pos2(dx + 260);
	draw_triple_turtles_pos2(dx + 390);
	draw_3_dive_turtles_pos2(dx + 520);
}

function draw_w5_turtles_pos3(dx){
	draw_triple_turtles_pos3(dx);
	draw_triple_turtles_pos3(dx + 130);
	draw_triple_turtles_pos3(dx + 260);
	draw_triple_turtles_pos3(dx + 390);
	draw_3_dive_turtles_pos3(dx + 520);
}

function draw_triple_turtles(dx){
	if(dx % 3 == 1){
		draw_w5_turtles_pos1(dx);
	}
	else if(dx % 3 == 2){
		draw_w5_turtles_pos2(dx);
	}
	else{
		draw_w5_turtles_pos3(dx);
	}
}

function draw_trucks(dx){	
	ctx.drawImage(spriteSheet, 104, 300, 50, 24, dx      , r1, 50, 24);
	ctx.drawImage(spriteSheet, 104, 300, 50, 24, dx + 150, r1, 50, 24);
}

function draw_fast_cars(dx){
	ctx.drawImage(spriteSheet, 45, 265, 30, 24, dx     , r2, 30, 24);
	ctx.drawImage(spriteSheet, 45, 265, 30, 24, dx + 80, r2, 30, 24);
}

function draw_pink_cars(dx){
	ctx.drawImage(spriteSheet, 9, 265, 30, 24, dx      , r3, 30, 24);
	ctx.drawImage(spriteSheet, 9, 265, 30, 24, dx + 100, r3, 30, 24);
	ctx.drawImage(spriteSheet, 9, 265, 30, 24, dx + 200, r3, 30, 24);
	ctx.drawImage(spriteSheet, 9, 265, 30, 24, dx + 300, r3, 30, 24);
}

function draw_tractor_things_pos1(dx){
	ctx.drawImage(spriteSheet, 9, 300, 30, 24, dx  - 100, r4, 30, 24);
	ctx.drawImage(spriteSheet, 9, 300, 30, 24, dx       , r4, 30, 24);
	ctx.drawImage(spriteSheet, 9, 300, 30, 24, dx  + 100, r4, 30, 24);
}

function draw_tractor_things_pos2(dx){
	ctx.drawImage(spriteSheet, 40, 300, 30, 24, dx  - 100, r4, 30, 24);
	ctx.drawImage(spriteSheet, 40, 300, 30, 24, dx       , r4, 30, 24);
	ctx.drawImage(spriteSheet, 40, 300, 30, 24, dx  + 100, r4, 30, 24);
}

function draw_tractor_things_pos3(dx){
	ctx.drawImage(spriteSheet, 72, 300, 30, 24, dx  - 100, r4, 30, 24);
	ctx.drawImage(spriteSheet, 72, 300, 30, 24, dx       , r4, 30, 24);
	ctx.drawImage(spriteSheet, 72, 300, 30, 24, dx  + 100, r4, 30, 24);
}

function draw_tractor_things(dx){
	if(dx % 3 == 1){
		draw_tractor_things_pos1(dx);
	}
	else if(dx % 3 == 2){
		draw_tractor_things_pos2(dx);
	}
	else{
		draw_tractor_things_pos3(dx);
	}
}

function draw_yellow_cars(dx){
	ctx.drawImage(spriteSheet, 81, 265, 30, 24, dx      , r5, 30, 24);
	ctx.drawImage(spriteSheet, 81, 265, 30, 24, dx + 100, r5, 30, 24);
	ctx.drawImage(spriteSheet, 81, 265, 30, 24, dx + 200, r5, 30, 24);
	ctx.drawImage(spriteSheet, 81, 265, 30, 24, dx - 100, r5, 30, 24);
}

function test_render(){
	
	display_high_score(9001);
	display_score(9000);
	draw_frog_move_right(fx, fy);
	//lose_life();
	//lose_life();
	draw_trucks(100);
	draw_fast_cars(100);
	draw_pink_cars(10);
	draw_tractor_things(169);
	draw_yellow_cars(10);
	draw_logs_med(100);
	draw_logs_long(10);
	draw_logs_short(30);
	draw_triple_turtles(-200);
	draw_double_turtles(8);
}	

