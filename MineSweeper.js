
var boxes;
var totalBombs = 10;
var gameOver = false;

//creates minefield on loading
window.onload=function() {
  createTable();
	};

//Displays the  cell that is clicked
//if already clicked or flagged, does nothing
function displayClick(cell, gameOver){
	//alert(cell.id);
	if(boxes[parseInt(cell.id)].clicked == false){
		if(boxes[parseInt(cell.id)].numBombs > 0){
			//code to change the text of the cell to the numberofBombs around box
			cell.firstChild.data = boxes[parseInt(cell.id)].numBombs;
			ChangeColor(cell, 3);
			boxes[parseInt(cell.id)].clicked = true;
			//alert("here");
		}else if(boxes[parseInt(cell.id)].numBombs == 0){
			//change the text to a blank space
			cell.firstChild.data = "0";
			ChangeColor(cell, 2);
			boxes[parseInt(cell.id)].clicked = true;
			c = parseInt(cell.id);
			if(c > 7 && boxes[c-8].bomb == false){
				if(boxes[c-8].clicked == false)
					displayClick(document.getElementById(c-8));
			}
				
			if(c > 7 && c%8 != 0 && boxes[c-9].bomb == false){
				if(boxes[c-9].clicked == false)
					displayClick(document.getElementById(c-9));
			}
			if(c > 7 && (c+1)%8 != 0 && boxes[c-7].bomb == false){
				if(boxes[c-7].clicked == false)
					displayClick(document.getElementById(c-7));
			}
				
			if(c < 56 && boxes[c+8].bomb == false){
				if(boxes[c+8].clicked == false)
					displayClick(document.getElementById(c+8));
			}
				
			if(c < 56 && (c+1)%8 != 0 && boxes[c+9].bomb == false){
				if(boxes[c+9].clicked == false)
					displayClick(document.getElementById(c+9));
			}
				
			if(c < 56 && c%8 != 0 && boxes[c+7].bomb == false){
				if(boxes[c+7].clicked == false)
					displayClick(document.getElementById(c+7));
			}
				
			if(c % 8 != 0 && boxes[c-1].bomb == false){
				if(boxes[c-1] == false)
					displayClick(document.getElementById(c-1));
			}
				
			if((c+1) % 8 != 0 && boxes[c+1].bomb == false){
				if(boxes[c+1].clicked == false)
					displayClick(document.getElementById(c+1));
			}
			
		}else{
			ChangeColor(cell, 3);
			boxes[parseInt(cell.id)].clicked = true;
			cell.firstChild.data = "X";
			if(!gameOver)
				endGame();
			
		}
			
	}
	
}

function ChangeColor(cell, highLight){
	if(boxes[parseInt(cell.id)].clicked == false){
		if (highLight ==0){
			cell.style.backgroundColor = '#0489B1';
			cell.style.color = '#0489B1';
		}
		else if(highLight == 1)
		{
			cell.style.backgroundColor = '#2062B8';
			cell.style.color = '#2062B8';
		} else if(highLight ==2){
			cell.style.backgroundColor = '#D8D8D8';
			cell.style.color = '#D8D8D8';
		} else if(highLight ==3){
			cell.style.backgroundColor = '#D8D8D8';
			var n = boxes[parseInt(cell.id)].numBombs;
			if(n == -1)
				cell.style.color = "black";
			if(n == 1)
				cell.style.color = "blue";
			else if(n == 2)
				cell.style.color = "green";
			else if(n == 3)
				cell.style.color = "red";
			else if(n == 4)
				cell.style.color = "purple";
			else if(n == 5)
				cell.style.color = "maroon";
			else if(n == 6)
				cell.style.color = "turquoise";
			else if(n == 7)
				cell.style.color = "black";
			else if(n == 8)
				cell.style.color = "grey";
		}
	}
	
}

//a function that creates a box object at an index 
//sn - index, numBombs - number of Bombs around box
//bomb - whether or not the box has a bomb 
//clicked - whether box has been clicked 
//flagged - whether box has been flagged
function box(sn,numBombs, bomb, clicked, flagged)
{
	
	this.sn=sn;
	this.numBombs=numBombs;
	this.bomb=bomb;
	this.clicked=clicked;
	this.flagged=flagged;
	//alert("here");
}

//a function that creates an 8 by 8 minesweeper table
function createTable() {
	//alert(size);
	row=new Array();
	cell=new Array();
	boxes = new Array();
	numrows = 8; //edit this value to suit
	numcells = 8; //edit this value to suit
	var c = 0;
	var k = 0;
	tab = document.createElement("table");
	tab.setAttribute("id","newtable");
	
	tbod = document.createElement("tbody");
	
	for(c=0;c<numrows;c++){
		row[c]=document.createElement("tr");
//		alert(c);
		for(k=0;k<numcells;k++) {
			cell[k]=document.createElement("td");
			cont=document.createTextNode("X");
			cell[k].appendChild(cont);
			cell[k].id = (k+8*c).toString();
			cell[k].onmouseover = function(){ChangeColor(this, 0);};
			cell[k].onmouseout = function(){ChangeColor(this, 1);};
			cell[k].onmousedown = function(){ChangeColor(this, 2);};
			cell[k].onmouseup = function(){ChangeColor(this, 2);};
			cell[k].onclick = function(){displayClick(this, gameOver);};
			row[c].appendChild(cell[k]);
			//this creates 64 box objects for all the cells of the table
			boxes[k+8*c] = new box(k+8*c, 0, false, false, false);
			//alert(k+8*c + " array");
		}
		tbod.appendChild(row[c]);
	}
	setBombs();
	getBombs();
	tab.appendChild(tbod);
	document.getElementById("minefield").appendChild(tab);
}

//function that sets bombs on the table
function setBombs(){
	bombLocations = new Array();
	c = 0;
	while(totalBombs > 0){
		if(boxes[c].bomb == false){
			if(Math.random() <0.1){
				boxes[c].bomb = true;
				totalBombs--;
				//alert(totalBombs + " bombs left")
			}
				
		}
		c++;
		if(c == 64) c = 0;
	}
	
	
}

//function that gets number of surrounding bombs
function getBombs(){
	var c = 0;
	for(c = 0; c < 64; c++){
		if(boxes[c].bomb == true){
			boxes[c].numBombs = -1;
		}
		else{
			if(c > 7 && boxes[c-8].bomb == true)
				boxes[c].numBombs++;
			if(c > 7 && c%8 != 0 && boxes[c-9].bomb == true)
				boxes[c].numBombs++;
			if(c > 7 && (c+1)%8 != 0 && boxes[c-7].bomb == true)
				boxes[c].numBombs++;
			if(c < 56 && boxes[c+8].bomb == true)
				boxes[c].numBombs++;
			if(c < 56 && (c+1)%8 != 0 && boxes[c+9].bomb == true)
				boxes[c].numBombs++;
			if(c < 56 && c%8 != 0 && boxes[c+7].bomb == true)
				boxes[c].numBombs++;
			if(c % 8 != 0 && boxes[c-1].bomb == true)
				boxes[c].numBombs++;
			if((c+1) % 8 != 0 && boxes[c+1].bomb == true)
				boxes[c].numBombs++;
		}
	}
}

//function that starts a new game
function reset(){
	var i;
	for(i = 0; i < 64; i++){
		boxes[i].numBombs=0;
		boxes[i].bomb=false;
		boxes[i].clicked=false;
		boxes[i].flagged=false;
		ChangeColor(document.getElementById(i.toString()), 1);
		document.getElementById(i.toString()).firstChild.data = "X";
	}
	totalBombs = 10;
	gameOver = false;
	setBombs();
	getBombs();
}

//function that ends the game
function endGame(){
	gameOver = true;
	displayMines();
	var game = confirm("You Lose, Do you Want to Play Again?");
	if(game)
		reset();
	else
		window.close();
}

//Function that Checks that all the clicked tiles to assure Victory or Failure
function validate(){
	var i, win;
	for(i = 0; i< 64; i++){
		if(boxes[i].clicked == false && !boxes[i].bomb){
			endGame();
			return;
		}
			
	}
	win = confirm("You have Won the Game! Want to Play Again?");
	if(win)
		reset();
	else
		window.close();
}

//function that displays all the mines on the MineField
function displayMines(){
	var i;
	for(i = 0; i < 64; i++){
		if(boxes[i].clicked == false && boxes[i].bomb)
			displayClick(document.getElementById(i.toString()), gameOver);
	}
}

function cheat(mouse){
	var i;
	if(mouse == 0){
		for(i = 0; i < 64; i++){
			if(boxes[i].clicked == false && boxes[i].bomb)
				ChangeColor(document.getElementById(i.toString()), 3);
		}		
	}else
		for(i = 0; i < 64; i++){
			if(boxes[i].clicked == false && boxes[i].bomb)
				ChangeColor(document.getElementById(i.toString()), 1);
		}		
		
}
