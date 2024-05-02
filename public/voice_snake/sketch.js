const soundModelURL =
  "https://teachablemachine.withgoogle.com/models/6R1QtJ8wc/model.json";

function preload() {
  // const options = { probabilityThreshold: 0.95 };
  // classifier = ml5.soundClassifier("SpeechCommands18w", options, modelReady);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  createFoodHanlder();
  createObstacles();

  snake = new Snake();
}

function draw() {
  frameRate(frameRateValue); // starts increasing by 1 when the score hits 20
  background(12);

  food.display();
  displayScore();
  displayObstacles();

  showBigFoodHandler();

  snake.move();
  snake.eatFood();
  snake.display();
  snake.checkDeath();

  if (showGameOver) {
    displayRestartGameScreen();
  }
}

function keyPressed() {
  snake.direct(key);
}
