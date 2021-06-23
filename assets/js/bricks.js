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