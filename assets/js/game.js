// Gets the Canvas that the game is played on
const playSpace = document.getElementById("game");
const context = playSpace.getContext("2d");

// Game Variables and Constants
const PADDLE_WIDTH = 150;
const PADDLE_MARGIN_BOTTOM = 75;
const PADDLE_HEIGHT = 20;

// Create Paddle
const paddle = {
    x : cvs.width/2 - PADDLE_WIDTH/2,
    y : cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    width : PADDLE_WIDTH,
    height : PADDLE_HEIGHT,
    dx :5
}