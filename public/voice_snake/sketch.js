const soundModelURL =
  "https://teachablemachine.withgoogle.com/models/6R1QtJ8wc/model.json";

function preload() {
  const options = { probabilityThreshold: 0.95 };
  classifier = ml5.soundClassifier("SpeechCommands18w", options, modelReady);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  createFoodHanlder();
  createObstacles();

  snake = new Snake();
}

function draw() {
  frameRate(frameRateValue); // frame rate = 10 but starts increasing by 1 when the score hits 20
  background(12);

  food.display();
  displayScore();
  displayObstacles();

  showBigFoodHandler();

  snake.move();
  snake.eatFood();
  snake.display();
  snake.checkEatSelf();
  snake.checkObstacle();
  snake.checkBoundary();

  if (showGameOver) {
    displayRestartGameScreen();
  }
}

function keyPressed() {
  snake.direct(key);
}
