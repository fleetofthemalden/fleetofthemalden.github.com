var canvas;
var ctx;
var board;
var game_board;
var wins;
var mx, my;

function start_game(){
	init();
	//test_render();
	board.player = board.p1;
}

function test_render(){
	for(var i=0; i<9; i++){
		for(var j=0; j<9; j++){
			draw_x(i,j);
		}
	
	drawBig(i,-1);
	}
}

function init(){
	canvas_init();
	wins = new Object();
	wins[0] = [0, 1, 2];
	wins[1] = [0, 3, 6];
	wins[2] = [0, 4, 8];
	wins[3] = [1, 4, 7];
	wins[4] = [2, 5, 8];
	wins[5] = [2, 4, 6];
	wins[6] = [3, 4, 5];
	wins[7] = [6, 7, 8];
	board = new Object();
	board.current = 9;
	board.boards = new Array();
	for(var i=0; i<9; i++){
		board.boards[i] = new_board(i);
	}
	board.check = function(){
		var temp = 0;
		for(var i=0; i<8; i++){
			if(temp != 0){
				game_over(temp);
			}
			else{
				temp = check(this.boards[wins[i][0]]["status"], this.boards[wins[i][1]]["status"], this.boards[wins[i][2]]["status"]);
			}
		}
	}
	game_board = document.getElementById("game_canvas");
	game_board.addEventListener("mousedown", function(event){play_move(event);});
	var n=0;
	board.moves = new Array();
	for(var j=0; j<9; j++){
		for(var i=0; i<9; i++){
			var bd = Math.floor(i/3) + Math.floor(j/3)*3;
			var sq = 3*(j%3) + i%3;
			board.moves[n] = new Array();
			board.moves[n] = [bd, sq];
			n++;
		}
	}
	board.p1 = new Object();
	board.p2 = new Object();
	board.p1.val = 1;
	board.p1.draw = draw_x;
	board.p2.val = -1;
	board.p2.draw = draw_o;
	board.p1.take_turn = board.p2;
	board.p2.take_turn = board.p1;
}	

function canvas_init(){
	canvas = document.getElementById("game_canvas");
	ctx = canvas.getContext("2d");
	
	ctx.fillStyle = "#000000"; //lines
	ctx.fillRect(197,6,6,588);
	ctx.fillRect(397,6,6,588);
	ctx.fillRect(6,197,588,6);
	ctx.fillRect(6,400,588,6);
	
	ctx.fillStyle = "#404040"; //lines
	for(var i=0; i<3; i++){
		for(var j=0; j<3; j++){
			ctx.fillRect(66+i*200,9+j*203,3,179);
			ctx.fillRect(132+i*200,9+j*203,3,179);
			ctx.fillRect(9+i*200,66+j*203,179,3);
			ctx.fillRect(9+i*200,132+j*203,179,3);
		}
	}
	
}

function play_move(event){
	var x = event.pageX - game_board.offsetLeft;
	var y = event.pageY - game_board.offsetTop;
	var sqn = Math.floor(x/66.66667) + 9*Math.floor(y/66.66667);
	var bd = board.moves[sqn][0];
	var sq = board.moves[sqn][1];
	
	if(board.current == bd || board.current == 9){
		board.boards[bd].play(sq);
	}
		
	
}

function game_over(result){
	start_game();
	alert('game over');
	document.location = "http://boingboing.net/2013/06/26/tic-tac-toe-squared.html";
}

function new_board(n){
	var b = new Object();
	b.num = n;
	b.status = 0;
	b.spots = [0,0,0,0,0,0,0,0,0];
	b.check = function(){
		var temp = this.status;
		for(var i=0; i<8; i++){
			if(temp==0){
				temp = check(this.spots[wins[i][0]], this.spots[wins[i][1]], this.spots[wins[i][2]]);
			}
			if(temp != 0){
				this.status = temp;
				drawBig(this.num, temp);
				i = 8;
				this.check = function(){
					var j=0;
					var t=0;
					for(j; j<9; j++){
						var temp2 = this.spots[j];
						t = temp2 + t;
						if(temp2 == 0){
							j = 10;
						}
					}
					if(j<10){
						board.current = 9;
						if(this.status == 0){
							this.status = temp2;
							drawBig(this.num, temp2);
						}
						this.check = function(){return;};
					}
				};
			}
		}
	}
	b.play = function(sq){
		if(this.spots[sq] == 0){
			this.spots[sq] = board.player.val;
			board.player.draw(this.num,sq);
			this.check();
			board.check();
			board.player = board.player.take_turn;
			board.current = sq;
		}
		return;
	}
	return b;
}
				
function check(a, b, c){
	if(a + b + c == 3){return 1;}
	else if (a + b + c == -3){return -1;}
	else{return 0;}
}

function draw_x(board, square){
	var bdy = Math.floor(board/3);
	var bdx = board%3;
	var sqx = square%3;
	var sqy = Math.floor(square/3);
	
	var sx = 10 + bdx*200 + sqx*66;
	var sy = 10 + bdy*203 + sqy*66;
	
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.moveTo(sx,sy);
	ctx.lineTo(sx+50,sy+50);
	ctx.strokeStyle="red";
	ctx.stroke();
	sx = sx + 50;
	ctx.beginPath();
	ctx.moveTo(sx,sy);
	ctx.lineTo(sx-50,sy+50);
	ctx.strokeStyle="red";
	ctx.stroke();
}

function draw_o(board, square){
	var bdy = Math.floor(board/3);
	var bdx = board%3;
	var sqx = square%3;
	var sqy = Math.floor(square/3);
	
	var sx = 34 + bdx*200 + sqx*66;
	var sy = 34 + bdy*203 + sqy*66;
	
	ctx.lineWidth = 4;
	ctx.beginPath();
	ctx.arc(sx,sy,25,0,2*Math.PI);
	ctx.strokeStyle="blue";
	ctx.stroke();
}

function drawBig(board, status){
	if(status == 1){
		drawBig_x(board);
	}
	if(status == -1){
		drawBig_o(board);
	}
}

function drawBig_x(board){
	var bdy = Math.floor(board/3);
	var bdx = board%3;
	
	var sx = 10 + bdx*200;
	var sy = 10 + bdy*203;
	
	ctx.lineWidth = 12;
	ctx.beginPath();
	ctx.moveTo(sx,sy);
	ctx.lineTo(sx+180,sy+180);
	ctx.strokeStyle="red";
	ctx.stroke();
	sx = sx + 180;
	ctx.beginPath();
	ctx.moveTo(sx,sy);
	ctx.lineTo(sx-180,sy+180);
	ctx.strokeStyle="red";
	ctx.stroke();
}

function drawBig_o(board, square){
	var bdy = Math.floor(board/3);
	var bdx = board%3;
	
	var sx = 100 + bdx*200;
	var sy = 100 + bdy*203;
	
	ctx.lineWidth = 10;
	ctx.beginPath();
	ctx.arc(sx,sy,75,0,2*Math.PI);
	ctx.strokeStyle="blue";
	ctx.stroke();
}