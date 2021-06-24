// Brick parameters
const brick = {
    width: 55,
    height: 20,
    offSetLeft: 18,
    offSetTop: 20,
    marginTop: 40,
    row: 8,
    column: 4,
    fillColor: "#2e3548",
    strokeColor: "#FFF"
}

const widePaddleBrick = {
    fillColor: "pink",
    strokeColor: "purple"
}

const speedBrick = {
    fillColor: "white",
    strokeColor: "gold"
}

let bricks = [];

// Special brick behaviours

function widePaddleBehaviour() {
    // Uses setInterval to give a smooth animation to the paddle growth
    let growthCounter = 150;
    setInterval(function () {
        if (growthCounter < 300) {
            growthCounter += 1;
            paddleWidth += 1;
        }
        else clearInterval();
    }, 20);
    let reductionCounter = 300;
    setTimeout(function() {
        setInterval(function () {
        if (reductionCounter <= 300 && reductionCounter > 150 && growthCounter == 300) {
            reductionCounter -= 1;
            paddleWidth -= 1;
        }
        }, 20)}
    , 6000);
    return;
}

function speedBrickBehaviour() {
    ball.speed += 3;
    setTimeout( () => ball.speed -= 3, 8000);
}