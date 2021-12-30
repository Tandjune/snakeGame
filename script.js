const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const reloadButton = document.querySelector("#reload");
const controlButtons = document.querySelector(".buttons");

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

var speed = 3;
const tileCount = 20;
const tileSize = canvas.clientHeight / tileCount - 2;

var headX = 10;
var headY = 10;
const snakeParts = [];
var tailLength = 1;

var mouseX = 5;
var mouseY = 5;
var numberOfMouse = 0;

var xVelocity = 0;
var yVelocity = 0;

var score = 0;

var control = 0;
const sound = new Audio("tone.mp3");
const sound1 = new Audio("tone1.mp3");
const sound2 = new Audio("tone2.mp3");
// game loop
function drawGame() {
    changeSnakePosition();
    var result = isGameOver();

    if (result) {
        document.body.addEventListener("keydown",function(event){
            if(event.keyCode == 13)
                location.reload();
        });
        reloadButton.style.display = "block";
        controlButtons.style.display = "none";
        return;
    }

    clearScreen();
    checkMouseCollision();
    drawSnake();
    drawMouse();
    drawScore();

    if (numberOfMouse == 3) {
        numberOfMouse = 0;
        speed = speed + 0.5;
    }

    setTimeout(drawGame, 1000 / speed);


}

function isGameOver() {
    var gameOver = false;
    if (yVelocity === 0 && xVelocity === 0) {
        return false;
    }

    if (headX < 0) {
        gameOver = true;
    } else if (headX === tileCount) {
        gameOver = true;
    } else if (headY < 0) {
        gameOver = true;
    } else if (headY === tileCount) {
        gameOver = true;
    }

    for (var i = 0; i < snakeParts.length; i++) {
        var part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px verdana";

        var gradient = ctx.createLinearGradient(0, 0, canvas.clientWidth, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0", "blue");
        gradient.addColorStop("1.0", "red");
        ctx.fillStyle = gradient;

        ctx.fillText("Game Over!", canvas.clientWidth / 6.5, canvas.clientHeight / 2);
        sound1.play();
    }

    return gameOver;
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "10px verdana";
    ctx.fillText("score " + score, canvas.width - 50, 10);
}

function clearScreen() {

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

}

function drawSnake() {

    ctx.fillStyle = "#dd5b0f";
    for (var i = 0; i < snakeParts.length; i++) {
        var part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY)); //put an item at the end of the list next to the head
    while (snakeParts.length > tailLength) {
        snakeParts.shift(); //remove the furthers item from the snake parts if have more than our tail size
    }


    ctx.fillStyle = "#0bd40b";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawMouse() {
    ctx.fillStyle = "#f23d06";
    ctx.fillRect(mouseX * tileCount, mouseY * tileCount, tileSize, tileSize)
}

function checkMouseCollision() {
    if (mouseX === headX && mouseY == headY) {
        mouseX = Math.floor(Math.random() * tileCount);
        mouseY = Math.floor(Math.random() * tileCount);
        numberOfMouse++;
        tailLength++;
        score++;
        sound.play();
    }
}

document.body.addEventListener('keydown', keyDown);

function setControl(control) {

    sound2.play();

    // up
    if (control == 38) {
        if (yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
    // down
    if (control == 40) {
        if (yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
    // left
    if (control == 37) {
        if (xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }
    // right
    if (control == 39) {
        if (xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }

}

function keyDown(event) {

    // up
    if (event.keyCode == 38) {
        if (yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
    // down
    if (event.keyCode == 40) {
        if (yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
    // left
    if (event.keyCode == 37) {
        if (xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }
    // right
    if (event.keyCode == 39) {
        if (xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }

}

drawGame();