const canvas = document.querySelector("#board");
const context = board.getContext("2d");
const scoreDisplay = document.querySelector(".score");
const resetBtn = document.querySelector(".reset");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const canvasBackground = "black";
const paddle1Color = "white";
const paddle2Color = "white";
const paddleBorder = "navy";
const ballColor = "white";
const ballBorderColor = "#white";
const ballRadius = 12.5;
const paddleSpeed = 50;
let intervalID;
let ballSpeed = 1;
let ballX = canvasWidth / 2;
let ballY = canvasHeight / 2;
let ballXVelocity = 0;
let ballYVelocity = 0;
let player1Score = 0;
let player2Score = 0;
let leftPaddle = {
    width: 25,
    height: 100,
    x:0,
    y:0
};
let rightPaddle = {
    width: 25,
    height: 100,
    x: canvasWidth - 25,
    y: canvasHeight - 100
};

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

startGame();



function startGame(){
    createBall();
    tick();
};
function tick(){
    intervalID = setTimeout(() => {
        clearCanvas();
        drawPaddles();
        moveBall();
        drawBall(ballX, ballY);
        checkCollision();
        tick();
    }, 10)
};
function clearCanvas(){
    context.fillStyle = canvasBackground;
    context.fillRect(0,0, canvasWidth, canvasHeight);
};
function drawPaddles(){
    context.strokeStyle = paddleBorder;

    context.fillStyle = paddle1Color;
    context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    context.strokeRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);

    context.fillStyle = paddle2Color;
    context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    context.strokeRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
};
function createBall(){
    ballSpeed = 1;
    if(Math.round(Math.random()) == 1){
        ballXVelocity = 1;
    }
    else{
        ballXVelocity = -1;
    }
    if(Math.round(Math.random()) == 1){
        ballYVelocity = 1;
    }
    else{
        ballYVelocity = -1;
    }
    ballX = canvasWidth / 2;
    ballY = canvasHeight / 2;
    drawBall(ballX, ballY);
};
function moveBall(){
    ballX += (ballSpeed * ballXVelocity);
    ballY += (ballSpeed * ballYVelocity);
};
function drawBall(ballX, ballY){
    context.fillStyle = ballColor;
    context.strokeStyle = ballBorderColor;
    context.lineWidth = 2;
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
};
function checkCollision(){
    if(ballY <= 0 + ballRadius){
        ballYVelocity *= -1;
    }
    if(ballY >= canvasHeight - ballRadius){
        ballYVelocity *= -1;
    }
    if(ballX <= 0){
        player2Score += 1;
        updateScore();
        createBall();
        return;
    }
    if(ballX >= canvasWidth){
        player1Score += 1;
        updateScore();
        createBall();
        return;
    }
    if(ballX <= (leftPaddle.x + leftPaddle.width + ballRadius)){
        if(ballY > leftPaddle.y && ballY < leftPaddle.y + leftPaddle.height){
            ballX = (leftPaddle.x + leftPaddle.width) + ballRadius;
            ballXVelocity *= -1;
            ballSpeed += 1
        }
    };
    if(ballX >= (rightPaddle.x - ballRadius)){
        if(ballY > rightPaddle.y && ballY < rightPaddle.y + leftPaddle.height){
            ballX = rightPaddle.x - ballRadius;
            ballXVelocity *= -1;
            ballSpeed += 1
        }
    };
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    console.log(keyPressed);
    const leftPaddleUp = 87;
    const leftPaddleDown = 83;
    const rightPaddleUp = 38;
    const rightPaddleDown = 40;
    

    switch(keyPressed){
        case(leftPaddleUp):
        if(leftPaddle.y > 0){
            leftPaddle.y -= paddleSpeed;
        }
        break;
        case(leftPaddleDown):
            if(leftPaddle.y < canvas.height - leftPaddle.height){
                leftPaddle.y += paddleSpeed;
            }
            break;
        case(rightPaddleUp):
        if(rightPaddle.y > 0){
            rightPaddle.y -= paddleSpeed;
        }
        break;
        case(rightPaddleDown):
        if(rightPaddle.y < canvas.height - rightPaddle.height){
            rightPaddle.y += paddleSpeed;
        }
        break;
    }

};

function updateScore(){
    scoreDisplay.textContent = `${player1Score} : ${player2Score}`;
};
function resetGame(){
    player1Score = 0;
    player2Score = 0;

    leftPaddle = {
        width: 25,
        height: 100,
        x:0,
        y:0
    };
    rightPaddle = {
        width: 25,
        height: 100,
        x: canvasWidth - 25,
        y: canvasHeight - 100
    };
    ballSpeed = 1;
    ballX = 0;
    ballY = 0;
    ballXVelocity = 0;
    ballYVelocity = 0;
    updateScore();
    clearInterval(intervalID);
    startGame();
};


