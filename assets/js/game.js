// Gets the canvas that the game is played on
const playSpace = document.getElementById("game");
const context = playSpace.getContext("2d");

// Game variables and constants
const PADDLE_WIDTH = 150;
const PADDLE_MARGIN_BOTTOM = 75;
const PADDLE_HEIGHT = 20;
let remainingLives = 5;
let ballRadius = 12;
let leftArrow = false;
let rightArrow = false;

// Sets Line Width thicker for visibility
context.lineWidth = 3;

// Creates the paddle
const paddle = {
    x : playSpace.width/2 - PADDLE_WIDTH/2,
    y : playSpace.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    width : PADDLE_WIDTH,
    height : PADDLE_HEIGHT,
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

// Draws the paddle
function drawPaddle(){
    context.fillStyle = "rgba(46, 53, 72, 1)";
    context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    
    context.strokeStyle = "rgba(255, 205, 5, 1)";
    context.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Draws the ball
function drawBall(){
    context.beginPath();
    
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    context.fillStyle = "#ffcd05";
    context.fill();
    
    context.strokeStyle = "#2e3548";
    context.stroke();
    
    context.closePath();
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

// Collision detection for ball and wall
function ballWallCollision(){
    if(ball.x + ball.radius > playSpace.width || ball.x - ball.radius < 0){
        ball.dx = - ball.dx;
    }
    
    if(ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
    }
    
    if(ball.y + ball.radius > playSpace.height){
        remainingLives--;
        resetBall();
    }
}

// Collision detection for ball and paddle
function ballPaddleCollision(){
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y){
        
        // Calculate position of ball relative to paddle
        let collidePoint = ball.x - (paddle.x + paddle.width/2);
        
        // Normalize the value
        collidePoint = collidePoint / (paddle.width/2);
        
        // Calculate angle of ball from collision
        let angle = collidePoint * Math.PI/3;
            
            
        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = - ball.speed * Math.cos(angle);
    }
}

// Resets the ball
function resetBall(){
    ball.x = playSpace.width/2;
    ball.y = paddle.y - ballRadius;
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
}

// Draw function (draws all parts of the game to the canvas)
function draw(){
    drawPaddle();
    drawBall();
}

// Update game function (game logic)
function update(){
    movePaddle();
    moveBall();
    ballWallCollision();
    ballPaddleCollision();
}

// Game loop
function loop(){
    context.drawImage(bg_img, 0, 0)

    draw();

    update();

    requestAnimationFrame(loop);
}
loop();