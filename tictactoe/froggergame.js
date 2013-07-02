var canvas;
var ctx;
var spriteSheet = new Image();
spriteSheet.src = "assets/frogger_sprites.png";
var deadFrog = new Image();
deadFrog.src = "assets/dead_frog.png";

var w1 = 120, w2 = 153, w3 = 186, w4 = 219, w5 = 250;
var r1 = 315, r2 = 348, r3 = 381, r4 = 414, r5 = 450;
var p1 = 485, p2 = 282, g3 = 85;
var fx_i = 184, fy_i = 485;

var frog;
var fypos;
var collision;

var lv = 1;
var lives = 3;
var score = 0;
var hi_score = 0;

var scalar = 399;
var c_scale = 1197;
var delay = 75;
var position = 40;
var timeout = 0;

function start_game(){
	frog_init();
	canvas_init();
	
	//test_render();
	//render_all();
	play_game();
	
}

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
	
	display_lives();
	
	ctx.save();
}

function frog_init(){
	frog = new Object;
	frog.fx = fx_i;
	frog.fy = fy_i;
	frog.rel = fx_i;
	frog.draw = draw_frog_static_up;
	
	var p = new Object;
	p.fun = function(){return true;};
	p.clear = function(){return;};
	
	fypos = new Object;
	fypos[p1] = [p1, r5, function (wx){}, function(){return 0;}, p, "fun"];
	fypos[r5] = [p1, r4, function (wx){}, function(){return 0;}, new_collision(), "roadsafe"];
	fypos[r4] = [r5, r3, function (wx){}, function(){return 0;}, new_collision(), "roadsafe"];
	fypos[r3] = [r4, r2, function (wx){}, function(){return 0;}, new_collision(), "roadsafe"];
	fypos[r2] = [r3, r1, function (wx){}, function(){return 0;}, new_collision(), "roadsafe"];
	fypos[r1] = [r2, p2, function (wx){}, function(){return 0;}, new_collision(), "roadsafe"];
	fypos[p2] = [r1, w5, function (wx){}, function(){return 0;}, p, "fun"];
	fypos[w5] = [p2, w4, function (wx){this.wx = wx;}, function (){return this.wx;}, new_collision(), "riversafe"];
	fypos[w4] = [w5, w3, function (wx){this.wx = wx;}, function (){return this.wx;}, new_collision(), "riversafe"];
	fypos[w3] = [w4, w2, function (wx){this.wx = wx;}, function (){return this.wx;}, new_collision(), "riversafe"];
	fypos[w2] = [w3, w1, function (wx){this.wx = wx;}, function (){return this.wx;}, new_collision(), "riversafe"];
	fypos[w1] = [w2, g3, function (wx){this.wx = wx;}, function (){return this.wx;}, new_collision(), "riversafe"];
	fypos[g3] = [w1, g3, function (wx){}, function(){return 0;}, new_collision(), "home"];
	
	fypos[g3][4].loc = [[13, 40],[97, 128], [183, 210], [267, 300], [349, 375]];
	fypos[g3][4].clear = p.clear;
	
	document.addEventListener("keyup", key_handle);
}

function new_collision(){
	var collision = new Object();
	collision.loc = new Array();
	collision.add = function (dx, dwidth) {
		var zone = [dx, dwidth];
		this.loc.push(zone);
	}
	collision.roadsafe = function (){
		var len = this.loc.length;
		var rx, rw;
		for(i=0; i<len; i++){
			rx = this.loc[i][0];
			rw = this.loc[i][1];
			if(frog.fx < rw - 3){
				if(frog.fx + 23 > rx + 3 || frog.fx > rx + 3){
					return false;
				}
			}
		}
		return true;
	}
	collision.riversafe = function () {
		var len = this.loc.length;
		var rx, rw;
		for(i=0; i<len; i++){
			rx = this.loc[i][0];
			rw = this.loc[i][1];
			if(frog.fx >= rx - 3 && frog.fx + 23 <= rw + 3){
				return true;
			}
		}
		return false;
	}
	collision.home = function(){
		var len = this.loc.length;
		var rx, rw;
		for(i=0; i<len; i++){
			rx = this.loc[i][0];
			rw = this.loc[i][1];
			if(frog.fx >= rx - 3 && frog.fx + 23 <= rw + 3){
				score = score + 50;
				var temp1 = this.loc.slice(0, i);
				var temp2 = this.loc.slice(i+1, len);
				this.loc = temp1.concat(temp2);
				if(this.loc.length < 1){
					fypos[g3][4].loc = [[13, 40],[97, 128], [183, 210], [267, 300], [349, 375]];
					score = score + 1000;
					lv++;
					hi_score = score;
					lives = 3;
					if(lv == 2){ //Shitty level difficulty change. Improve if time.
						scalar = 359;
					}
					else{
						scalar = scalar + 80;
					}
				}
				frog.fx = fx_i;
				frog.fy = fy_i;
				frog.rel = fx_i;
				frog.draw = draw_frog_static_up;
				return true;
			}
		}
		return false;
	}
	collision.clear = function(){
		this.loc = null;
		this.loc = new Array();
	}
	collision.fun = function(){return true;};
	return collision;
}

function collision_check(){
	var funspec = fypos[frog.fy][5];
	var safe = fypos[frog.fy][4][funspec]();
	if(!safe){
		lose_life();
	}
}

function key_handle(event){
	if(event.keyCode == 37){
		frog_move_left();
	}
	else if(event.keyCode == 38){
		frog_move_up();
	}
	else if(event.keyCode == 39){
		frog_move_right();
	}
	else if(event.keyCode == 40){
		frog_move_down();
	}
}

function play_game(){ 
	setInterval(render_all, delay);
}

function render_all(){
	draw_canvas();
	position = position%c_scale + 2;
	draw_1x_speed(position);
	draw_2x_speed(position);
	draw_3x_speed(position);
	fx_update();
	collision_check();
	frog.draw();
}

function fx_update(){
	var newx = frog.rel + fypos[frog.fy][3]();
	if(Math.abs(newx-frog.fx) < 75){
		frog.fx = newx;
	}
	else{
		frog.rel = frog.fx - fypos[frog.fy][3]();
	}
	if(frog.fx < 2){
		lose_life();
	}
	if(frog.fx > 390){
		lose_life();
	}
	
}

function frog_move_up(){
	draw_frog_move_up();
	frog.fy = fypos[frog.fy][1];
	frog.rel = frog.fx - fypos[frog.fy][3]();
	frog.draw = draw_frog_move_up;
	score = score + 10;
	fypos[frog.fy][4].clear();	
}

function frog_move_down(){
	draw_frog_move_down();
	frog.fy = fypos[frog.fy][0];
	frog.rel = frog.fx - fypos[frog.fy][3]();
	frog.draw = draw_frog_move_down;
	fypos[frog.fy][4].clear();
}

function frog_move_right(){
	draw_frog_move_right();
	frog.rel = frog.rel + 25;
	frog.draw = draw_frog_move_right;
	fypos[frog.fy][4].clear();
}

function frog_move_left(){
	draw_frog_move_left();
	frog.rel = frog.rel - 25;
	frog.draw = draw_frog_move_left;
	fypos[frog.fy][4].clear();
}

function game_over(){
	alert("Game Over. Your Score: " + score);
	
	document.location.reload(true);
}

function openHiScoreWin(){
	myWindow=window.open('','','width=200,height=100');
	myWindow.document.write("<p>This is 'myWindow'</p>");
	myWindow.focus();
}

function lose_life(){
	ctx.drawImage(deadFrog, 4, 3, 22, 24, frog.fx, frog.fy, 23, 22);
	ctx.drawImage(deadFrog, 4, 3, 22, 24, frog.fx, frog.fy, 23, 22);
	if(lives == 0){
		game_over();
	}
	ctx.drawImage(deadFrog, 4, 3, 22, 24, frog.fx, frog.fy, 23, 22);
	lives = lives -1;
	frog.fx = fx_i;
	frog.fy = fy_i;
	rel = fx_i;
	frog.draw = draw_frog_static_up;
}

function display_score(){
	if(9999 < score - hi_score){
		lives = 5;
	}
	ctx.fillStyle = "#00FF00"; //text
	ctx.font = "14pt Helvetica";
	ctx.fillText(score, 80,560);
	ctx.fillText(hi_score, 255,560);
}

function display_lives(){
	var lx = 28*lives + 4;
	while(lx > 0){
		lx = lx - 28;
		draw_frog_life(lx, 516);
	}
}

function draw_canvas(){
	ctx.clearRect(0, 0, 399, 565); //refresh
	
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
	
	display_score();
	display_lives();
	
	draw_lily_pads();
}

function draw(sx, sy, swidth, sheight, dx, dy, dwidth, dheight){
	ctx.drawImage(spriteSheet, sx, sy, swidth, sheight, dx, dy, dwidth, dheight);
	if(dx < 400 && dx > 0){
		fypos[dy][4]["add"](dx, dwidth + dx);
	}
}

function draw_frog_life(dx, dy){
	ctx.drawImage(spriteSheet, 11, 368, 22, 22, dx, dy, 23, 22);
}

function draw_frog_static_up(){
	ctx.drawImage(spriteSheet, 11, 368, 22, 22, frog.fx, frog.fy, 23, 22);
}

function draw_frog_static_down(){
	ctx.drawImage(spriteSheet, 79, 368, 22, 21, frog.fx, frog.fy, 23, 22);
}

function draw_frog_static_left(){
	ctx.drawImage(spriteSheet, 81, 335, 21, 22, frog.fx, frog.fy, 22, 23);
}

function draw_frog_static_right(){
	ctx.drawImage(spriteSheet, 12, 335, 21, 22, frog.fx, frog.fy, 22, 23);
}

function draw_frog_move_up(){
	ctx.drawImage(spriteSheet, 45, 365, 24, 24, frog.fx, frog.fy, 25, 25);
	frog.draw = draw_frog_static_up;
}

function draw_frog_move_down(){
	ctx.drawImage(spriteSheet, 113, 365, 24, 24, frog.fx, frog.fy, 25, 25);
	frog.draw = draw_frog_static_down;
}

function draw_frog_move_left(){
	ctx.drawImage(spriteSheet, 112, 338, 24, 24, frog.fx, frog.fy, 25, 25);
	frog.draw = draw_frog_static_left;
}

function draw_frog_move_right(){
	ctx.drawImage(spriteSheet, 42, 336, 24, 24, frog.fx, frog.fy, 25, 25);
	frog.draw = draw_frog_static_right;
}

function draw_1x_speed(pos){
	var scaled = pos;
	fypos[w4][2](scaled);
	fypos[w4][4].clear();
	fypos[r2][4].clear();
	fypos[r5][4].clear();
	for(i=0; i<4; i++){
		draw_logs_short(scaled);
		draw_white_cars(scaled);
		draw_tractor_things(scaled);
		scaled = scaled - scalar;
	}
	scaled = scalar - pos;
	for(i=0; i<4; i++){
		draw_yellow_cars(scaled);
		scaled = scaled + scalar;
	}
}

function draw_2x_speed(pos){
	var scaled2 = 3*pos/2;
	var scalar2 = 3*scalar/2;
	fypos[w1][2](scaled2);
	fypos[w1][4].clear();
	for(i=0; i<4; i++){
		draw_logs_med(scaled2);
		scaled2 = scaled2 - scalar2;
	}
	scaled2 = scalar2 - 3*pos/2
	fypos[w2][2](scaled2);
	fypos[w5][2](scaled2);
	fypos[w2][4].clear();
	fypos[w5][4].clear();
	fypos[r1][4].clear();
	fypos[r3][4].clear();
	for(i=0; i<4; i++){
		draw_double_turtles(scaled2);
		draw_triple_turtles(scaled2);
		draw_trucks(scaled2);
		draw_pink_cars(scaled2);
		scaled2 = scaled2 + scalar2;
	}
}

function draw_3x_speed(pos){
	var scaled3 = 2*pos;
	var scalar3 = 2*scalar;
	fypos[w3][2](scaled3);
	fypos[w3][4].clear();
	for(i=0; i<4; i++){
		draw_logs_long(scaled3);
		scaled3 = scaled3 - scalar3;
	}
}

function draw_lily_pads(){
	var pads = [13,97, 183, 267, 349];
	for(i=0; i<5; i++){
		ctx.drawImage(spriteSheet, 9, 265, 30, 24, pads[i], g3, 30, 24);//artistic liberty
		//ctx.drawImage(spriteSheet, 110, 10, 32, 32, pads[i], g3, 30, 24);//lilypads
	}
	var len = fypos[g3][4]["loc"].length;
	var rx;
	ctx.fillStyle = "#191970";
	for(i=0; i<len; i++){
		rx = fypos[g3][4]["loc"][i][0];
		ctx.fillRect(rx, g3, 30, 24);
	}
}

function draw_logs_long(dx){
	draw(0, 165, 185, 24, dx      , w3, 185, 24);
	draw(0, 165, 185, 24, dx + 240, w3, 185, 24);
}

function draw_logs_med(dx){
	draw(0, 196, 125, 24, dx      , w1, 125, 24);
	draw(0, 196, 125, 24, dx + 180, w1, 125, 24);	
	draw(0, 196, 125, 24, dx + 360, w1, 125, 24);	
}

function draw_logs_short(dx){
	draw(0, 230, 93, 24, dx      , w4, 93, 24);
	draw(0, 230, 93, 24, dx + 150, w4, 93, 24);
	draw(0, 230, 93, 24, dx + 300, w4, 93, 24);
}

function draw_double_turtles_pos1(dx){
	draw(14, 406, 32, 22, dx     , w2, 32, 22);
	draw(14, 406, 32, 22, dx - 38, w2, 32, 22);
}

function draw_double_turtles_pos2(dx){
	draw(52, 406, 32, 22, dx     , w2, 32, 22);
	draw(52, 406, 32, 22, dx - 38, w2, 32, 22);
}

function draw_double_turtles_pos3(dx){
	draw(93, 406, 32, 22, dx     , w2, 32, 22);
	draw(93, 406, 32, 22, dx - 38, w2, 32, 22);
}

function draw_2_dive_turtles_pos3(dx){
	draw(133, 406, 32, 22, dx     , w2, 32, 22);
	draw(133, 406, 32, 22, dx - 38, w2, 32, 22);
}

function draw_2_dive_turtles_pos4(dx){
	draw(175, 407, 32, 22, dx     , w2, 32, 22);
	draw(175, 407, 32, 22, dx - 38, w2, 32, 22);
}

function draw_w2_turtles_pos1(dx){
	draw_double_turtles_pos1(dx);
	draw_double_turtles_pos1(dx - 130);
	draw_double_turtles_pos1(dx - 260);
}

function draw_w2_turtles_pos2(dx){
	draw_double_turtles_pos2(dx);
	draw_double_turtles_pos2(dx - 130);
	draw_double_turtles_pos2(dx - 260);
}

function draw_w2_turtles_pos3(dx){
	draw_2_dive_turtles_pos3(dx);
	draw_double_turtles_pos3(dx - 130);
	draw_double_turtles_pos3(dx - 260);
}

function draw_w2_turtles_pos4(dx){
	draw_2_dive_turtles_pos4(dx);
	draw_double_turtles_pos1(dx - 130);
	draw_double_turtles_pos1(dx - 260);
}

function draw_w2_turtles_pos5(dx){
	draw_double_turtles_pos2(dx - 260);
	draw_double_turtles_pos2(dx - 130);
}

function draw_w2_turtles_pos6(dx){
	draw_2_dive_turtles_pos4(dx);
	draw_double_turtles_pos3(dx - 130);
	draw_double_turtles_pos3(dx - 260);
}

function draw_double_turtles(dx){
	if(Math.abs(dx)%108 < 18){
		draw_w2_turtles_pos6(dx);
	}
	else if(Math.abs(dx)%108 < 36){
		draw_w2_turtles_pos5(dx);
	}
	else if(Math.abs(dx)%108 < 54){
		draw_w2_turtles_pos4(dx);
	}
	else if(Math.abs(dx)%108 < 72){
		draw_w2_turtles_pos3(dx);
	}
	else if(Math.abs(dx)%108 < 90){
		draw_w2_turtles_pos2(dx);
	}
	else{
		draw_w2_turtles_pos1(dx);
	}
}

function draw_triple_turtles_pos1(dx){
	draw(14, 406, 32, 22, dx - 38, w5, 32, 22);
	draw(14, 406, 32, 22, dx     , w5, 32, 22);
	draw(14, 406, 32, 22, dx - 76, w5, 32, 22);
}

function draw_triple_turtles_pos2(dx){
	draw(52, 406, 32, 22, dx - 38, w5, 32, 22);
	draw(52, 406, 32, 22, dx     , w5, 32, 22);
	draw(52, 406, 32, 22, dx - 76, w5, 32, 22);
}

function draw_triple_turtles_pos3(dx){
	draw(93, 406, 32, 22, dx - 38, w5, 32, 22);
	draw(93, 406, 32, 22, dx     , w5, 32, 22);
	draw(93, 406, 32, 22, dx - 76, w5, 32, 22);
}

function draw_3_dive_turtles_pos3(dx){
	draw(133, 406, 32, 22, dx - 38, w5, 32, 22);
	draw(133, 406, 32, 22, dx     , w5, 32, 22);
	draw(133, 406, 32, 22, dx - 76, w5, 32, 22);
}

function draw_3_dive_turtles_pos4(dx){
	draw(175, 407, 32, 22, dx - 38, w5, 32, 22);
	draw(175, 407, 32, 22, dx     , w5, 32, 22);
	draw(175, 407, 32, 22, dx - 76, w5, 32, 22);
}

function draw_w5_turtles_pos1(dx){
	draw_triple_turtles_pos1(dx);
	draw_triple_turtles_pos1(dx - 130);
	draw_triple_turtles_pos1(dx - 260);
}

function draw_w5_turtles_pos2(dx){
	draw_triple_turtles_pos2(dx);
	draw_triple_turtles_pos2(dx - 130);
	draw_triple_turtles_pos2(dx - 260);
}

function draw_w5_turtles_pos3(dx){
	draw_triple_turtles_pos3(dx);
	draw_triple_turtles_pos3(dx - 130);
	draw_3_dive_turtles_pos3(dx - 260);
}

function draw_w5_turtles_pos4(dx){
	draw_triple_turtles_pos1(dx);
	draw_triple_turtles_pos1(dx - 130);
	draw_3_dive_turtles_pos4(dx - 260);
}

function draw_w5_turtles_pos5(dx){
	draw_triple_turtles_pos2(dx);
	draw_triple_turtles_pos2(dx - 130);
}

function draw_w5_turtles_pos6(dx){
	draw_triple_turtles_pos3(dx);
	draw_triple_turtles_pos3(dx - 130);
	draw_3_dive_turtles_pos4(dx - 260);
}

function draw_triple_turtles(dx){
	if(Math.abs(dx)%108 < 18){
		draw_w5_turtles_pos6(dx);
	}
	else if(Math.abs(dx)%108 < 36){
		draw_w5_turtles_pos5(dx);
	}
	else if(Math.abs(dx)%108 < 54){
		draw_w5_turtles_pos4(dx);
	}
	else if(Math.abs(dx)%108 < 72){
		draw_w5_turtles_pos3(dx);
	}
	else if(Math.abs(dx)%108 < 90){
		draw_w5_turtles_pos2(dx);
	}
	else{
		draw_w5_turtles_pos1(dx);
	}
}

function draw_trucks(dx){	
	draw(104, 300, 50, 24, dx      , r1, 50, 24);
	draw(104, 300, 50, 24, dx - 150, r1, 50, 24);
}

function draw_white_cars(dx){
	draw(45, 265, 30, 24, dx     , r2, 30, 24);
	draw(45, 265, 30, 24, dx + 80, r2, 30, 24);
}

function draw_pink_cars(dx){
	draw(9, 265, 30, 24, dx      , r3, 30, 24);
	draw(9, 265, 30, 24, dx - 100, r3, 30, 24);
	draw(9, 265, 30, 24, dx - 200, r3, 30, 24);
	draw(9, 265, 30, 24, dx - 300, r3, 30, 24);
}

function draw_tractor_things_pos1(dx){
	draw(9, 300, 30, 24, dx  + 200, r4, 30, 24);
	draw(9, 300, 30, 24, dx       , r4, 30, 24);
	draw(9, 300, 30, 24, dx  + 100, r4, 30, 24);
}

function draw_tractor_things_pos2(dx){
	draw(40, 300, 30, 24, dx  + 200, r4, 30, 24);
	draw(40, 300, 30, 24, dx       , r4, 30, 24);
	draw(40, 300, 30, 24, dx  + 100, r4, 30, 24);
}

function draw_tractor_things_pos3(dx){
	draw(72, 300, 30, 24, dx  + 200, r4, 30, 24);
	draw(72, 300, 30, 24, dx       , r4, 30, 24);
	draw(72, 300, 30, 24, dx  + 100, r4, 30, 24);
}

function draw_tractor_things(dx){
	if(dx%9 < 3){
		draw_tractor_things_pos1(dx);
	}
	else if(dx%9 < 6){
		draw_tractor_things_pos2(dx);
	}
	else{
		draw_tractor_things_pos3(dx);
	}
}

function draw_yellow_cars(dx){
	draw(81, 265, 30, 24, dx      , r5, 30, 24);
	draw(81, 265, 30, 24, dx - 100, r5, 30, 24);
	draw(81, 265, 30, 24, dx - 200, r5, 30, 24);
	draw(81, 265, 30, 24, dx - 300, r5, 30, 24);
}

//FOR TESTING ONLY
/*
function turn_collisions_off(){
	fypos[w1][5] = "fun";
	fypos[w2][5] = "fun";
	fypos[w3][5] = "fun";
	fypos[w4][5] = "fun";
	fypos[w5][5] = "fun";
	fypos[r1][5] = "fun";
	fypos[r2][5] = "fun";
	fypos[r3][5] = "fun";
	fypos[r4][5] = "fun";
	fypos[r5][5] = "fun";
}

function test_render(){
	
}
*/
