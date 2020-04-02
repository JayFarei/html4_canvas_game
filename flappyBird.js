// SETTING UP CANVAS

// searching HTML doc for HTML doc = canvas and assign it
var canvas = document.getElementById("canvas");

// loading functions to draw in variable c
var ctx = canvas.getContext("2d");

// defining canvas size
canvas.width = "288";
canvas.height = "512";

// LOADING IMAGES
// loading images and assigning them to the Image object
var bird = new Image();
var bg = new Image(); //background
var fg = new Image(); //foreground
var pipeNorth = new Image();
var pipeSouth = new Image();

// sourcing images
bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

// DEFINING VARIABLES & CONSTANTS

// Adding constants to solve for cache loading issues in measuring png on webkit at load time
const pipeNorthHeight = 242;

// Defining gap between pipes
var gap = 100;
var constant = pipeNorthHeight + gap; // defining Y coordinate by adding a gap from north pipe Y

// Starting position & bird gravity
var bX = 10;
var bY = 150;

var bGravity = 1;

// Preparing the array for pipe loop
var pipe = [];

pipe[0] = {
  x: canvas.width,
  y: 0 // I start on top and outside of the frame
};

// Defining distance between pipes

var pipeDistance = 100;

// Preparing score count
var score = 0;

// CAPTURE USER INPUT

// Defining function when user input is detected
function moveUp() {
  bY -= 20; // I decrease Y (move up) on every key press
}

// Input
document.addEventListener("keydown", moveUp);

// DRAW IMAGES

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (var i = 0; i < pipe.length; i++) {
    if (pipe[i].x == pipeDistance) {
      // whenever a pipe reaches pipeDistance, I push a new pipe in the array
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
        // getting the largest integer of a random subset of pipeNorth.height - then subtracting to pipeNorth.height to get a negative Y number & pulling everything up.
      });
    }

    pipe[i].x--;

    // x: pipes start outside of the canvas and move in frame by frame by 1px with x--

    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant); // gap + the random pipeNorth Y

    // Collision detection

    // in this case pipe [i] is the closest pipe to the bird
    if (
      // pipeNorth collision detection
      (bY > 0 &&
        bY + bird.height <= pipe[i].y + pipeNorth.height &&
        bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width) ||
      // pipeSouth collision detection
      (bY + bird.height >= pipe[i].y + pipeNorth.height + gap &&
        bX + bird.width >= pipe[i].x &&
        bX <= pipe[i].x + pipeNorth.width) ||
      // Y axis collision detection with foreground
      bY + bird.height >= canvas.height - fg.height ||
      // Y axis collision with the top of the canvas
      bY + bird.height <= 0
    ) {
      location.reload(); // reloading the page
      console.log("collision detected");
    }

    if (pipe[i].x == 5) {
      score++;
    }
  }

  ctx.drawImage(fg, 0, canvas.height - fg.height); // to align it at the bottom

  ctx.drawImage(bird, bX, bY, 50, 50);

  // updating bird Y position by the linear gravity
  bY += bGravity;

  // displaying user score

  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score : " + score, 10, canvas.height - 20);

  requestAnimationFrame(draw); // this will animate draw on every frame
}

// Running the animation
draw();

// Action triggered by user input
moveUp();
