// Gets the canvas that the game is played on
const playSpace = document.getElementById("game");
const context = playSpace.getContext("2d");

// Game constants and variables
const paddleMarginBottom = 75;
const paddleHeight = 20;
const maxLevel = 5;
let paddleWidth = 150;
let remainingLives = 5;
let level = 1;
let score = 0;
let scoreUnit = 10;
let ballRadius = 12;
let leftArrow = false;
let rightArrow = false;

// Sets Line Width thicker for visibility
context.lineWidth = 3;

// Creates the paddle
const paddle = {
    x : playSpace.width/2 - paddleWidth/2,
    y : playSpace.height - paddleMarginBottom - paddleHeight,
    width : paddleWidth,
    height : paddleHeight,
    dx :5
}

// Creates the ball
const ball = {
    x : playSpace.width/2,
    y : paddle.y - ballRadius,
    radius : ballRadius,
    speed : 4,
    dx : 3 * (Math.random() * 2 - 1),
    dy : -3
}

// Paddle input
document.addEventListener("keydown", function(event){
    if(event.keyCode == 37){
        leftArrow = true;
    }else if(event.keyCode == 39){
        rightArrow = true;
    }
 });
 document.addEventListener("keyup", function(event){
    if(event.keyCode == 37){
        leftArrow = false;
    }else if(event.keyCode == 39){
        rightArrow = false;
    }
 });

// Paddle movement
function movePaddle(){
    if(rightArrow && paddle.x + paddle.width < playSpace.width){
        paddle.x += paddle.dx;
    }else if(leftArrow && paddle.x > 0){
        paddle.x -= paddle.dx;
    }
}

// Ball movement
function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
}

// Resets the ball
function resetBall(){
    ball.x = playSpace.width/2;
    ball.y = paddle.y - ballRadius;
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
}


// Update game function (game logic)
function update(){
    movePaddle();
    moveBall();
    ballWallCollision();
    ballPaddleCollision();
    ballBrickCollision();
}

// Game loop
function loop(){
    context.drawImage(bg_img, 0, 0);
    draw();
    update();
    requestAnimationFrame(loop);
}
loop();