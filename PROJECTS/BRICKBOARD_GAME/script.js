//BEGIN LIBRARY CODE
//the goal here is to set a library to keep track of the various variable and functions at work in the script. a sorta list i suppose. so changing values on this list does not neccessarily change it in the code itself. but deleting a variable, will.

var x = 25; //ball start point x
var y = 250; //ball start point y
var dx = 1.5; //ball horizontal push 
var dy = -4; //ball vertical push
//the variable x and y are indicators of where the ball iniatiates. the dx, is an indicator of how much the ball is pushed horizontally on the x coordinates, and the dy is an indicator of the vertical push this can be manipulated to account for ball speed.
var canvas;
//canvas id being called from html
var WIDTH;
var HEIGHT;
//the width and height are the canvas width and height on the html being called from javascript to edit and change the width and height from javascript without needing to do so in html.
var paddlex; //paddle start location on the x-axis
var paddleh; //paddle height
var paddlew; //paddle width
var rightDown; //keyboard right arrow
var leftDown; //keyboard left arrow
var canvasMinX; //this indicates the far offscreen left of the canvas
var canvasMaxX; //this indicated the far offscreen right of the canvas
var intervalId; //ball speed. hight value equal slower
var bricks; //an array set up to auto-populate screen till set value for rows and column are met
var NROWS; //number of rows
var NCOLS; //number of columns
var BRICKWIDTH; //width of each brick
var BRICKHEIGHT; //height of each brick
var PADDING = 1;
var ballr = 05; //ball radius so essentially ball size
var rowcolors = ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093"];
var paddlecolor = "#000000";
var ballcolor = "#FFFFFF";
var backcolor = "#000000";
var score = 0;
$(document).keydown(onKeyDown);//the keydown jquery caller
$(document).keyup(onKeyUp);    //the key up jquery caller
$(document).mousemove(onMouseMove); //mouse event caller



function init() {
  canvas = $('#canvas')[0].getContext("2d");
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();
  paddlex = WIDTH / 2;
  BRICKWIDTH = (WIDTH/NCOLS) - 1;//number of colums divided by canvas width minus one
  canvasMinX = $("#canvas").offset().left;
  canvasMaxX = canvasMinX + WIDTH;
  intervalId = setInterval(draw, 12);//intervals in ball animation, higher value equals more intervals between frames and lower speed.
}
function circle(x,y,r) {//drawing my ball using variable z y and radius
  canvas.beginPath(); //ball path
  canvas.arc(x, y, r, 0, Math.PI*2, true);
  canvas.closePath(); 
  canvas.fill();
}

function rect(x,y,w,h) { //this function draws my paddle
  canvas.beginPath();
  canvas.rect(x,y,w,h);
  canvas.closePath(); 
  canvas.fill();
}

function clear() { //this function wipes the canvas for redrawability
  canvas.clearRect(0, 0, WIDTH, HEIGHT);
}
function onKeyDown(evt) {//this is my keyboard event listener for controls
  if (evt.keyCode == 39) rightDown = true;
  else if (evt.keyCode == 37) leftDown = true;//not sure what 37 or 39 is
}//chances are it is a keyboard callibration setting where 37 and 39 are the computer input for right and left arrow.
//this function calls for right or left down variable to be true.

function onKeyUp(evt) { //for when right and left are released
  if (evt.keyCode == 39) rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
}

function onMouseMove(evt) { //mouse control event listener function
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    paddlex = evt.pageX - canvasMinX - (paddlew/2);
  }
}

function initbricks() {
    bricks = new Array(NROWS);
    for (i=0; i < NROWS; i++) {
        bricks[i] = new Array(NCOLS);
        for (j=0; j < NCOLS; j++) {
            bricks[i][j] = 1;
        }
    }
}

function drawbricks() {//the draw brick function uses array to draw multiple
  for (i=0; i < NROWS; i++) {//bricks at once
    canvas.fillStyle = rowcolors[i];
    for (j=0; j < NCOLS; j++) {
      if (bricks[i][j] == 1) {
        rect((j * (BRICKWIDTH + PADDING)) + PADDING,
             (i * (BRICKHEIGHT + PADDING)) + PADDING,
             BRICKWIDTH, BRICKHEIGHT);
      }
    }
  }
}
//END LIBRARY CODE











//get a reference to the canvas
  var canvas = $('#canvas')[0].getContext("2d");

//this specific function declares paddle x and y starting coordinate using the width of canvas divided by 2. so beginning of paddle starts at half the canvas the paddlew is the width of the paddle 
function init_paddle() {
  paddlex = WIDTH / 2;
  paddleh = 10;
  paddlew = 75;
}

function draw() {
  clear();  //animation function so frame by frame
  circle(x, y, 10); //ball drawing function so ball
  rect(paddlex, HEIGHT-paddleh, paddlew, paddleh); //the paddle drawer function
 
  if (x + dx > WIDTH || x + dx < 0)//if ball and ball horizontal push is greater
    dx = -dx; //than the width or less than zero, reverse ball direction

  if (y + dy < 0) //if ball and ball vertical push is less than zero reverse
    dy = -dy;     //ball direction on the y axis
  else if (y + dy > HEIGHT) { //if ball vertical push is greater than height
    if (x > paddlex && x < paddlex + paddlew)//if on paddle reverse ball also
      dy = -dy;
    else                //else if ball touches the floor instead, game over.
      clearInterval(intervalId);
      rightDown = false; //stop paddle movement
      leftDown = false;
  }
}
function drawScore() {
    canvas.font = "30px Arial";
    canvas.fillStyle = "#FFFFFF";
    canvas.fillText("Score: "+score, 20, 400);
}

//set rightDown or leftDown if the right or left keys are down
function onKeyDown(evt) {
  if (evt.keyCode == 39) rightDown = true;
  else if (evt.keyCode == 37) leftDown = true;
}

//and unset them when the right or left key is released
function onKeyUp(evt) {
  if (evt.keyCode == 39) rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
}
       
function draw() {
  clear();
  circle(x, y, 10);

  //move the paddle if left or right is currently pressed
  if (rightDown) paddlex += 5;
  else if (leftDown) paddlex -= 5;
  rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
}

function init_mouse() {
  canvasMinX = $("#canvas").offset().left; //oh my what a code. thought process here is brilliant, i am just impressed. this code sets canvas offset perimeters to be on the same size as the canvas itself, there may be better ways to do this, i however find such language to be playful and cool.
  canvasMaxX = canvasMinX + WIDTH; //this is the max far off right of the x coordinates you can go
}
     
function draw() {
  clear();
  circle(x, y, 10);

  if (rightDown) paddlex += 5;
  else if (leftDown) paddlex -= 5;
  rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
 
  if (x + dx > WIDTH || x + dx < 0)
    dx = -dx;

  if (y + dy < 0)
    dy = -dy;
  else if (y + dy > HEIGHT) {
    if (x > paddlex && x < paddlex + paddlew)
      dy = -dy;
    else
      clearInterval(intervalId);
  }
 
  x += dx;
  y += dy;
}

function initbricks() {
  NROWS = 10;
  NCOLS = 10;
  BRICKWIDTH = (WIDTH/NCOLS) - 1;
  BRICKHEIGHT = 15;
  PADDING = 1;

  bricks = new Array(NROWS);
  for (i=0; i < NROWS; i++) {
    bricks[i] = new Array(NCOLS);
    for (j=0; j < NCOLS; j++) {
      bricks[i][j] = 1;
    }
  }
}
       
function draw() {
  clear();
  circle(x, y, 10);
  drawScore();

  if (rightDown) paddlex += 5;
  else if (leftDown) paddlex -= 5;
  rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);

  //draw bricks
  for (i=0; i < NROWS; i++) {
    for (j=0; j < NCOLS; j++) {
      if (bricks[i][j] == 1) {
        rect((j * (BRICKWIDTH + PADDING)) + PADDING, 
             (i * (BRICKHEIGHT + PADDING)) + PADDING,
             BRICKWIDTH, BRICKHEIGHT);
      }
    }
  }

  //have we hit a brick?
  rowheight = BRICKHEIGHT + PADDING;
  colwidth = BRICKWIDTH + PADDING;
  row = Math.floor(y/rowheight);
  col = Math.floor(x/colwidth);
  //if so, reverse the ball and mark the brick as broken
  if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
    dy = -dy;
    bricks[row][col] = 0;
  }
 
  if (x + dx > WIDTH || x + dx < 0)
    dx = -dx;

  if (y + dy < 0)
    dy = -dy;
  else if (y + dy > HEIGHT) {
    if (x > paddlex && x < paddlex + paddlew)
      dy = -dy;
    else
      clearInterval(intervalId);
  }
 
  x += dx;
  y += dy;
}
 
function draw() {
  canvas.fillStyle = backcolor;
  clear();
  canvas.fillStyle = ballcolor;
  circle(x, y, ballr);
 
  if (rightDown) paddlex += 5;
  else if (leftDown) paddlex -= 5;
  canvas.fillStyle = paddlecolor;
  rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
 
  drawbricks();
  rowheight = BRICKHEIGHT + PADDING;
  colwidth = BRICKWIDTH + PADDING;
  row = Math.floor(y/rowheight);
  col = Math.floor(x/colwidth);
  //reverse the ball and mark the brick as broken
  if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
    dy = -dy;
    bricks[row][col] = 0;
  }
 
  if (x + dx + ballr > WIDTH || x + dx - ballr < 0)
    dx = -dx;
 
  if (y + dy - ballr < 0)
    dy = -dy;
  else if (y + dy + ballr > HEIGHT - paddleh) {
    if (x > paddlex && x < paddlex + paddlew) {
      //move the ball differently based on where it hit the paddle
      dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
      dy = -dy;
    }
    else if (y + dy + ballr > HEIGHT)
      clearInterval(intervalId);
  }
 
  x += dx;
  y += dy;
}

init();
initbricks();
init_mouse();
init_paddle();