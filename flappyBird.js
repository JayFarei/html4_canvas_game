// SETTING UP CANVAS

// searching HTML doc for HTML doc = canvas and assign it
var canvas = document.getElementById('canvas');

// loading functions to draw in variable c
var ctx = canvas.getContext('2d');

// defining canvas size
canvas.width = "288";
canvas.height= "512";


// LOADING IMAGES
// loading images and assigning them to the Image object
var bird = new Image();
var bg = new Image(); //background
var fg = new Image(); //foreground
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";




// DEFINING VARIABLES & CONSTANTS

var gap = 80; // gap between pipes
var constant = 242 + gap; // defining Y coordinate by adding a gap from north pipe Y

// had to replace pipeNorth.height due to cache loading issues

// Starting position & bird gravity
var birdX = 10;
var birdY = 150;

var birdGravity = 1.5;


// CAPTURE USER INPUT

// Action
function moveUp () {
    birdY -= 20; // I decrease Y (move up) on every key press
}

// Input
document.addEventListener("keydown", moveUp );



// ANIMATION OF THE PIPES

var pipe = []

pipe [0] = {
    x: canvas.width, y: 0 // I start on top and outside of the frame
}





// DRAW IMAGES

function draw() {

    ctx.drawImage(bg,0,0); 

    for(var i = 0; i < pipe.length; i++) {
        if (pipe[i].x == 125) { // whenever a pipe reaches 125, I push a new pipe in the array
            pipe.push({
                x: canvas.width, y: Math.floor(Math.random() * pipeNorth.height)-pipeNorth.height
                // getting the largest integer of a random subset of pipeNorth.height - then subtracting to pipeNorth.height to get a negative Y number & pulling everything up.
    
            })
        }

        pipe[i].x--; 

        // x: pipes start outside of the canvas and move in frame by frame with x--

        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y + constant); // gap + pipeNorth
    
    }
   
    ctx.drawImage(fg,0,canvas.height-fg.height); // to align it at the bottom

    ctx.drawImage(bird,birdX,birdY)

    birdY += birdGravity;

    requestAnimationFrame(draw); // this will animate draw on every frame
    

}

// Running the animation
draw();

// Action triggered by user input
moveUp();




// ctx.drawImage(pipeNorth,100, 1);

// ctx.drawImage(pipeSouth,125, 0 + constant); 
