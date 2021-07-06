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
    speed : 6,
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
    gameover.style.display = "block";
    youWon.style.display = "block";
    restart.style.display = "block";
}

// Lose Screen
function loseScreen() {
    gameover.style.display = "block";
    youLose.style.display = "block";
    restart.style.display = "block";
}

// Select mute button
const muteButton  = document.getElementById("mute-button");

muteButton.addEventListener("click", muteFunction);

function muteFunction(initial){
    // Update image to show if muted or not muted
    let imgSrc = muteButton.getAttribute("src");
    let muteIcon = imgSrc == "assets/img/SOUND_ON.png" ? "assets/img/SOUND_OFF.png" : "assets/img/SOUND_ON.png";
    
    muteButton.setAttribute("src", muteIcon);

    // Local storage so that user's choice is remembered
    if (localStorage.getItem("muted") == "true" && initial != true) {
        localStorage.setItem("muted", "false")
    } else if (initial != true) {
        localStorage.setItem("muted", "true")
    }
    
    // If statements for muting and unmuting sounds
    wallHit.muted = wallHit.muted ? false : true;
    paddleHit.muted = paddleHit.muted ? false : true;
    brickHit.muted = brickHit.muted ? false : true;
    win.muted = win.muted ? false : true;
    lifeLost.muted = lifeLost.muted ? false : true;
    bgMusic.muted = bgMusic.muted ? false : true;
}

// Select start screen elements
const playButton  = document.getElementById("play");
const wideText  = document.getElementById("wide-paddle-brick");
const speedText  = document.getElementById("speed-brick");
const normalText  = document.getElementById("normal-brick");
const ghostText  = document.getElementById("ghost-brick");
const growthText  = document.getElementById("big-ball-brick");
const logo  = document.getElementById("logo");

playButton.addEventListener("click", playButtonFunction);

function playButtonFunction() {
    bgMusic.play();
    playButton.style.display = "none";
    wideText.style.display = "none";
    speedText.style.display = "none";
    normalText.style.display = "none";
    ghostText.style.display = "none";
    growthText.style.display = "none";
    logo.style.display = "none";
    level = 1;
    createBricks();
    loop();
}

// Maps out the bricks
function createBricks(){
    // Level "0" - Start screen
    if(level == 0) {
        for(let i = 0; i < brick.row; i++){
            bricks[i] = [];
            for(let j = 0; j < brick.column; j++){
                if(i == 1 && j == 0) {
                    bricks[i][j] = {
                        x : i * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                        y : j * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                        status : true,
                        type : "widePaddleBrick"
                    }
                } else if (i == 6 && j == 0) {
                    bricks[i][j] = {
                        x : i * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                        y : j * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                        status : true,
                        type : "speedBrick"
                    }
                } else if (i == 1 && j == 3) {
                    bricks[i][j] = {
                        x : i * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                        y : j * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                        status : true,
                        type : "ghostBrick"
                    }
                } else if (i == 6 && j == 3) {
                    bricks[i][j] = {
                        x : i * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                        y : j * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                        status : true,
                        type : "bigBallBrick"
                    }
                } else if (i == 3 && j == 1 || i == 3 && j == 2 || i == 4 && j == 1 || i == 4 && j == 2) {
                    bricks[i][j] = {
                        x : i * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                        y : j * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                        status : true,
                        type : "normal"
                    }
                } else {
                    bricks[i][j] = {
                        x : i * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                        y : j * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                        status : false,
                        type : "normal"
                    }
                }
            }
        }
    // Level 1
    } else if(level == 1) {
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
    // Level 5 - Introduces bigBallBrick
    } else if(level == 5) {
        for(let i = 0; i < brick.row; i++){
            bricks[i] = [];
            for(let j = 0; j < brick.column; j++){
                if(i == 4 && j == 0 || i == 4 && j == 4) {
                    bricks[i][j] = {
                        x : i * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                        y : j * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                        status : true,
                        type : "widePaddleBrick"
                    }
                } else if (i == 3 && j == 0 || i == 3 && j == 4) {
                    bricks[i][j] = {
                        x : i * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                        y : j * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                        status : true,
                        type : "speedBrick"
                    }
                } else if ( 
                        i == 1 && j == 1 || i == 1 && j == 2 || i == 1 && j == 3 || i == 2 && j == 1 || i == 2 && j == 2 || i == 2 && j == 3 ||
                        i == 5 && j == 1 || i == 5 && j == 2 || i == 5 && j == 3 || i == 6 && j == 1 || i == 6 && j == 2 || i == 6 && j == 3 ||
                        i == 5 && j == 5 || i == 5 && j == 6 || i == 6 && j == 5 || i == 6 && j == 6 ||
                        i == 1 && j == 5 || i == 1 && j == 6 || i == 2 && j == 5 || i == 2 && j == 6
                        ) {
                    bricks[i][j] = {
                        x : i * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                        y : j * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                        status : true,
                        type : "ghostBrick"
                    }
                } else if (i == 0 && j == 7 || i == 7 && j == 7 || i == 0 && j == 0 || i == 7 && j == 0) {
                    bricks[i][j] = {
                        x : i * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                        y : j * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                        status : true,
                        type : "bigBallBrick"
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
    context.drawImage(bg_img, 0, 0); // Alternatively, if a transparent background is desired: context.context.clearRect(0, 0, playSpace.width, playSpace.height);
    draw();
    update();
    if(! gameOverState){
        requestAnimationFrame(loop);
    }
}

// Starts the game
function startGameScreenLoop() {
    context.drawImage(bg_img, 0, 0);
    drawBricks();
    if(! gameOverState){
        requestAnimationFrame(startGameScreenLoop);
    }
}

function startGame() {
    // Checks player's preference for audio muted or not
    if (localStorage.getItem("muted") == "true") {
        muteFunction(true);
    }
    startGameScreenLoop();
}

startGame();