let classifier;
const soundModelURL =
  "https://teachablemachine.withgoogle.com/models/6R1QtJ8wc/model.json";

function preload() {
  const options = { probabilityThreshold: 0.95 };
  // classifier = ml5.soundClassifier("SpeechCommands18w", options, modelReady);
  classifier = ml5.soundClassifier(soundModelURL, options, modelReady);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  snake = new Snake();
  createFoodHanlder();
}

function draw() {
  frameRate(10);
  background(0);

  food.display();

  snake.move();
  snake.eatFood();
  snake.display();
}

function keyPressed() {
  snake.direct(key);
}

function modelReady() {
  classifier.classify(gotResult);
}

function gotResult(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  // log the result
  console.log(result);
  let cmd = getCommand(result);
  snake.direct(cmd);
}

function getCommand(result) {
  const word = result[0].label;
  console.log(word);
  if (word === "Up" || word === "four") return "ArrowUp";
  if (word === "Down") return "ArrowDown";
  if (word === "Left" || word === "yes") return "ArrowLeft";
  if (word === "Right") return "ArrowRight";
}
