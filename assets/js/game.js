// Gets the canvas that the game is played on
const playSpace = document.getElementById("game");
const context = playSpace.getContext("2d");

// Sets Line Width thicker for visibility
context.lineWidth = 3;

// Creates the paddle
const paddle = {
    x : playSpace.width/2 - paddleWidth/2,
    y : playSpace.height - paddleMarginBottom - paddleHeight,
    height : paddleHeight, // Width is not set here as it can be modified by certain brick behaviours
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
    if(rightArrow && paddle.x + paddleWidth < playSpace.width){
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

// Next level
function nextLevel(){
    let isLevelDone = true;
    
    // check if all the bricks are broken
    for(let i = 0; i < brick.row; i++){
        for(let j = 0; j < brick.column; j++){
            isLevelDone = isLevelDone && ! bricks[i][j].status;
        }
    }
    
    if(isLevelDone){     
        win.play();   
        if(level >= maxLevel){
            winScreen();
            gameOverState = true;
            return;
        }
        level++;
        brick.column++;
        createBricks();
        ball.speed += 0.5;
        resetBall();
    }
}

// Game over
function gameOver(){
    if(remainingLives <= 0){
        loseScreen();
        gameOverState = true;
    }
}

// Game over Screen
const gameover = document.getElementById("gameover")
const restart = document.getElementById("play-again")
const youWon = document.getElementById("youwon")
const youLose = document.getElementById("youlose")

restart.addEventListener("click", function() {
    location.reload(); // Reloads page to restart the game
})

// Win Screen
function winScreen() {
    playSpace.style.display = "none";
    gameover.style.display = "block";
    youWon.style.display = "block";
    restart.style.display = "block";
}

// Lose Screen
function loseScreen() {
    playSpace.style.display = "none";
    gameover.style.display = "block";
    youLose.style.display = "block";
    restart.style.display = "block";
}

// Select mute button
const muteButton  = document.getElementById("mute-button");

muteButton.addEventListener("click", muteFunction);

function muteFunction(){
    // Update image to show if muted or not muted
    let imgSrc = muteButton.getAttribute("src");
    let muteIcon = imgSrc == "assets/img/SOUND_ON.png" ? "assets/img/SOUND_OFF.png" : "assets/img/SOUND_ON.png";
    
    muteButton.setAttribute("src", muteIcon);
    
    // If statements for muting and unmuting sounds
    wallHit.muted = wallHit.muted ? false : true;
    paddleHit.muted = paddleHit.muted ? false : true;
    brickHit.muted = brickHit.muted ? false : true;
    win.muted = win.muted ? false : true;
    lifeLost.muted = lifeLost.muted ? false : true;
}

// Maps out the bricks
function createBricks(){
    // Level 1 - Only default bricks
    if(level == 1) {
        for(let i = 0; i < brick.row; i++){ // i is the row, j is the column. This maps out the bricks. 
            bricks[i] = [];
            for(let j = 0; j < brick.column; j++){
                bricks[i][j] = {
                    x : i * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                    y : j * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                    status : true,
                    type : "normal"
                }
            }
        }
    // Level 2 - Introduces widePaddleBrick
    } else if(level == 2) {
        for(let i = 0; i < brick.row; i++){
            bricks[i] = [];
            for(let j = 0; j < brick.column; j++){
                if(i == 1 && j == 2 || i == 6 && j == 2) {
                    bricks[i][j] = {
                        x : i * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                        y : j * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                        status : true,
                        type : "widePaddleBrick"
                    }
                } else {
                    bricks[i][j] = {
                        x : i * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                        y : j * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                        status : true,
                        type : "normal"
                    }
                }
            }
        }
    // Level 3 - Introduces speedBrick     
    } else if(level == 3) {
        for(let i = 0; i < brick.row; i++){
            bricks[i] = [];
            for(let j = 0; j < brick.column; j++){
                if(i == 1 && j == 1 || i == 6 && j == 1 || i == 1 && j == 4 || i == 6 && j == 4) {
                    bricks[i][j] = {
                        x : i * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                        y : j * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                        status : true,
                        type : "widePaddleBrick"
                    }
                } else if (i == 0 && j == 0 || i == 0 && j == 5 || i == 7 && j == 0 || i == 7 && j == 5) {
                    bricks[i][j] = {
                        x : i * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                        y : j * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                        status : true,
                        type : "speedBrick"
                    }
                } else {
                    bricks[i][j] = {
                        x : i * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                        y : j * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                        status : true,
                        type : "normal"
                    }
                }
            }
        }
    // Level 4 - Introduces ghostBrick (not as spooky as it sounds)
    } else if(level == 4) {
        for(let i = 0; i < brick.row; i++){
            bricks[i] = [];
            for(let j = 0; j < brick.column; j++){
                if(i == 2 && j == 3 || i == 5 && j == 3) {
                    bricks[i][j] = {
                        x : i * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                        y : j * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                        status : true,
                        type : "widePaddleBrick"
                    }
                } else if (i == 1 && j == 2 || i == 1 && j == 4 || i == 6 && j == 2 || i == 6 && j == 4) {
                    bricks[i][j] = {
                        x : i * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                        y : j * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                        status : true,
                        type : "speedBrick"
                    }
                } else if (j == 6 || j == 5 || j == 0 || j == 1 || i == 0 || i == 7) {
                    bricks[i][j] = {
                        x : i * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                        y : j * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                        status : true,
                        type : "ghostBrick"
                    }
                } else {
                    bricks[i][j] = {
                        x : i * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                        y : j * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                        status : true,
                        type : "normal"
                    }
                }
            }
        }
    }
}

createBricks();

// Update game function (game logic)
function update(){
    movePaddle();
    moveBall();
    ballWallCollision();
    ballPaddleCollision();
    ballBrickCollision();
    nextLevel();
    gameOver();
}

// Game loop
function loop(){
    context.drawImage(bg_img, 0, 0);
    draw();
    update();
    if(! gameOverState){
        requestAnimationFrame(loop);
    }
}
loop();