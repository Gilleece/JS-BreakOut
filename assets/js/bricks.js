// Default brick parameters
const brick = {
    width : 55,
    height : 20,
    offSetLeft : 18,
    offSetTop : 20,
    marginTop : 40,
    row : 8,
    column : 3,
    fillColor : "#2e3548",
    strokeColor : "#FFF"
}

let bricks = [];

// Maps out the bricks
function createBricks(){
    // i is the row, j is the column. This maps out the bricks.
    for(let i = 0; i < brick.row; i++){
        bricks[i] = [];
        for(let j = 0; j < brick.column; j++){
            bricks[i][j] = {
                x : i * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                y : j * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                status : true
            }
        }
    }
}

createBricks();

// Draws the bricks
function drawBricks(){
    for(let i = 0; i < brick.row; i++){
        for(let j = 0; j < brick.column; j++){
            let brickMap = bricks[i][j];
            // if the brick isn't broken
            if(brickMap.status){
                context.fillStyle = brick.fillColor;
                context.fillRect(brickMap.x, brickMap.y, brick.width, brick.height);
                
                context.strokeStyle = brick.strokeColor;
                context.strokeRect(brickMap.x, brickMap.y, brick.width, brick.height);
            }
        }
    }
}

// Collision detection for ball and brick
function ballBrickCollision(){
    for(let i = 0; i < brick.row; i++){
        for(let j = 0; j < brick.column; j++){
            let brickMap = bricks[i][j];
            // if the brick isn't broken
            if(brickMap.status){
                if(ball.x + ball.radius > brickMap.x && ball.x - ball.radius < brickMap.x + brick.width && ball.y + ball.radius > brickMap.y && ball.y - ball.radius < brickMap.y + brick.height){
                    ball.dy = - ball.dy;
                    brickMap.status = false; // The brick is already gone
                    SCORE += SCORE_UNIT;
                }
            }
        }
    }
}