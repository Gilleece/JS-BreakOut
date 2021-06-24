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

const ghostBrick = {
    fillColor: "rgba(255,0,0,0.3)",
    strokeColor: "rgba(0,255,0,0.3)"
}

const bigBallBrick = {
    fillColor: "orange",
    strokeColor: "blue"
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

function bigBallBrickBehaviour() {
    // Uses setInterval to give a smooth animation to the ball growth
    let growthCounter = 12;
    setInterval(function () {
        if (growthCounter < 18) {
            growthCounter += 1;
            ballRadius += 1;
        }
        else clearInterval();
    }, 50);
    let reductionCounter = 18;
    setTimeout(function() {
        setInterval(function () {
        if (reductionCounter <= 18 && reductionCounter > 12 && growthCounter == 18) {
            reductionCounter -= 1;
            ballRadius -= 1;
        }
        }, 50)}
    , 10000);
    return;
}