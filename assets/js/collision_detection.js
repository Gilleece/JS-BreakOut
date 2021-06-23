// Collision detection for ball and brick
function ballBrickCollision(){
    for(let i = 0; i < brick.row; i++){
        for(let j = 0; j < brick.column; j++){
            let brickMap = bricks[i][j];
            // if the brick isn't broken
            if(brickMap.status){
                if(ball.x + ball.radius > brickMap.x && ball.x - ball.radius < brickMap.x + brick.width && ball.y + ball.radius > brickMap.y && ball.y - ball.radius < brickMap.y + brick.height){
                    ball.dy = - ball.dy;
                    brickMap.status = false; // The brick is removed from play, cannot be collided with.
                    score += scoreUnit;
                }
            }
        }
    }
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