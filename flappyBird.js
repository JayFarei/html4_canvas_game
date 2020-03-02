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


// Webkit browsers set the height and width property after the image is loaded.
pipeSouth.onload = function() {
    var pipeSouth_height = pipeSouth.height;
    console.log(pipeSouth_height);
    return pipeSouth_height
}



var gap = 75;
var constant = pipeSouth.height + gap;

console.log(constant);

// var constant = pipeSouth.height + gap



// DRAW IMAGES

function draw() {
    requestAnimationFrame(draw); // note this has to be in first to draw the image

    ctx.drawImage(bg,0,0); 
  
    ctx.drawImage(pipeNorth,100,0);

    ctx.drawImage(pipeSouth,100,0+constant)


    
}


draw();