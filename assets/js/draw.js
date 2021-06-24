// Draws the paddle
function drawPaddle(){
    context.fillStyle = "rgba(46, 53, 72, 1)";
    context.fillRect(paddle.x, paddle.y, paddleWidth, paddle.height);
    
    context.strokeStyle = "rgba(255, 205, 5, 1)";
    context.strokeRect(paddle.x, paddle.y, paddleWidth, paddle.height);
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

// Draws the bricks
function drawBricks(){
    for(let i = 0; i < brick.row; i++){
        for(let j = 0; j < brick.column; j++){
            let brickMap = bricks[i][j];
            // if the brick isn't broken
            if(brickMap.status && brickMap.type == "normal"){
                context.fillStyle = brick.fillColor;
                context.fillRect(brickMap.x, brickMap.y, brick.width, brick.height);
                
                context.strokeStyle = brick.strokeColor;
                context.strokeRect(brickMap.x, brickMap.y, brick.width, brick.height);
            } else if (brickMap.status && brickMap.type == "widePaddleBrick") {
                context.fillStyle = widePaddleBrick.fillColor;
                context.fillRect(brickMap.x, brickMap.y, brick.width, brick.height);
                
                context.strokeStyle = widePaddleBrick.strokeColor;
                context.strokeRect(brickMap.x, brickMap.y, brick.width, brick.height);
            } else if (brickMap.status && brickMap.type == "speedBrick") {
                context.fillStyle = speedBrick.fillColor;
                context.fillRect(brickMap.x, brickMap.y, brick.width, brick.height);
                
                context.strokeStyle = speedBrick.strokeColor;
                context.strokeRect(brickMap.x, brickMap.y, brick.width, brick.height);
            } else if (brickMap.status && brickMap.type == "ghostBrick") {
                context.fillStyle = ghostBrick.fillColor;
                context.fillRect(brickMap.x, brickMap.y, brick.width, brick.height);
                
                context.strokeStyle = ghostBrick.strokeColor;
                context.strokeRect(brickMap.x, brickMap.y, brick.width, brick.height);
            }
        }
    }
}

// Show score, level and lives
function showGameStats(text, textX, textY, img, imgX, imgY){
    // draw text
    context.fillStyle = "#FFF";
    context.font = "30px Big Shoulders Stencil Display";
    context.fillText(text, textX, textY);
    
    // draw image
    context.drawImage(img, imgX, imgY, width = 40, height = 40);
}

// Draw function (draws all parts of the game to the canvas)
function draw(){
    drawPaddle();
    drawBall();
    drawBricks();
    // Score
    showGameStats(score, 60, 40, scoreImg, 15, 5);
    // Lives
    showGameStats(remainingLives, playSpace.width - 30, 40, lifeImg, playSpace.width-75, 8); 
    // Level
    showGameStats(level, playSpace.width/2 + 20, 40, levelImg, playSpace.width/2 - 25, 5);
}