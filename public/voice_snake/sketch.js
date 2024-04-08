const soundModelURL =
  "https://teachablemachine.withgoogle.com/models/6R1QtJ8wc/model.json";

function preload() {
  const options = { probabilityThreshold: 0.95 };
  // classifier = ml5.soundClassifier("SpeechCommands18w", options, modelReady);
  // classifier = ml5.soundClassifier(soundModelURL, options, modelReady);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  createFoodHanlder();
  createObstacles(0);

  snake = new Snake();
}

function draw() {
  frameRate(frameRateValue);
  background(12);

  food.display();

  displayScore();

  displayObstacles();

  snake.move();
  snake.eatFood();
  snake.display();
  snake.checkDeath();

  if (showBigFood) {
    bigFood.display();
    snake.eatBigFood();
    setTimeout(() => {
      showBigFood = false;
    }, bigFoodTimeout);
  }

  if (showGameOver) {
    displayGameOver();
  }
}

function keyPressed() {
  snake.direct(key);
}
