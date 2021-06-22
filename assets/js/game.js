// Gets the canvas that the game is played on
const playSpace = document.getElementById("game");
const context = playSpace.getContext("2d");

// Game variables and constants
const PADDLE_WIDTH = 150;
const PADDLE_MARGIN_BOTTOM = 75;
const PADDLE_HEIGHT = 20;

// Sets Line Width thicker for visibility
context.lineWidth = 3;

// Create the paddle
const paddle = {
    x : playSpace.width/2 - PADDLE_WIDTH/2,
    y : playSpace.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    width : PADDLE_WIDTH,
    height : PADDLE_HEIGHT,
    dx :5
}

// Draw the paddle
function drawPaddle(){
    context.fillStyle = "#2e3548";
    context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    
    context.strokeStyle = "#ffcd05";
    context.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

drawPaddle();