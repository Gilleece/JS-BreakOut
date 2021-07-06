// Collision detection for ball and brick
function ballBrickCollision() {
    for (let i = 0; i < brick.row; i++) {
        for (let j = 0; j < brick.column; j++) {
            let brickMap = bricks[i][j];
            // if the brick isn't broken
            if (brickMap.status && brickMap.type == "normal") {
                if (ball.x + ballRadius > brickMap.x && ball.x - ballRadius < brickMap.x + brick.width && ball.y + ballRadius > brickMap.y && ball.y - ballRadius < brickMap.y + brick.height) {
                    brickHit.play();
                    ball.dy = - ball.dy;
                    brickMap.status = false; // The brick is removed from play, cannot be collided with.
                    score += scoreUnit;
                }
            } else if (brickMap.status && brickMap.type == "widePaddleBrick") {
                if (ball.x + ballRadius > brickMap.x && ball.x - ballRadius < brickMap.x + brick.width && ball.y + ballRadius > brickMap.y && ball.y - ballRadius < brickMap.y + brick.height) {
                    brickHit.play();
                    ball.dy = - ball.dy;
                    brickMap.status = false; 
                    score += scoreUnit;
                    widePaddleBehaviour();
                }
            } else if (brickMap.status && brickMap.type == "speedBrick") {
                if (ball.x + ballRadius > brickMap.x && ball.x - ballRadius < brickMap.x + brick.width && ball.y + ballRadius > brickMap.y && ball.y - ballRadius < brickMap.y + brick.height) {
                    brickHit.play();
                    ball.dy = - ball.dy;
                    brickMap.status = false; 
                    score += scoreUnit;
                    speedBrickBehaviour();
                }
            } else if (brickMap.status && brickMap.type == "speedBrick") {
                if (ball.x + ballRadius > brickMap.x && ball.x - ballRadius < brickMap.x + brick.width && ball.y + ballRadius > brickMap.y && ball.y - ballRadius < brickMap.y + brick.height) {
                    ball.dy = - ball.dy;
                    brickMap.status = false; 
                    score += scoreUnit;
                    speedBrickBehaviour();
                }
            } else if (brickMap.status && brickMap.type == "ghostBrick") {
                if (ball.x + ballRadius > brickMap.x && ball.x - ballRadius < brickMap.x + brick.width && ball.y + ballRadius > brickMap.y && ball.y - ballRadius < brickMap.y + brick.height) {
                    //ball.dy = - ball.dy; Commenting this out allows for the ball to pass through any ghost bricks without bouncing off
                    brickMap.status = false; 
                    score += scoreUnit / 2; // Score is halved for ghost bricks
                }
            } else if (brickMap.status && brickMap.type == "bigBallBrick") {
                if (ball.x + ballRadius > brickMap.x && ball.x - ballRadius < brickMap.x + brick.width && ball.y + ballRadius > brickMap.y && ball.y - ballRadius < brickMap.y + brick.height) {
                    ball.dy = - ball.dy;
                    brickMap.status = false; 
                    score += scoreUnit;
                    bigBallBrickBehaviour();
                }
            }
        }
    }
}

// Collision detection for ball and wall
function ballWallCollision() {
    if (ball.x + ballRadius > playSpace.width || ball.x - ballRadius < 0) {
        ball.dx = - ball.dx;
        wallHit.play();
    }

    if (ball.y - ballRadius < 0) {
        ball.dy = -ball.dy;
        wallHit.play();
    }

    if (ball.y + ballRadius > playSpace.height) {
        lifeLost.play();
        remainingLives--;
        resetBall();
    }
}

// Collision detection for ball and paddle
function ballPaddleCollision() {
    if (ball.x < paddle.x + paddleWidth && ball.x > paddle.x && ball.y < paddle.y + paddle.height - 12 && ball.y > paddle.y) {

        // Sound effect
        paddleHit.play();

        // Calculate position of ball relative to paddle
        let collidePoint = ball.x - (paddle.x + paddleWidth / 2);

        // Normalize the value
        collidePoint = collidePoint / (paddleWidth / 2);

        // Calculate angle of ball from collision
        let angle = collidePoint * Math.PI / 3;


        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = - ball.speed * Math.cos(angle);
    }
}