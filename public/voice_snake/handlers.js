function createFoodHanlder() {
  food = new Food();
}

function createBigFoodHanlder() {
  bigFood = new BigFood();
  showBigFood = true;
}

function createObstacles(playerScore) {
  const number = playerScore === 0 ? 1 : (playerScore % 3) * 2;

  obstacles = [];
  for (let i = 0; i <= number; i++) {
    obstacles.push(new Obstacle());
  }
}

function displayObstacles() {
  obstacles.forEach((obstacle) => {
    obstacle.display();
  });
}

function displayGameOver() {
  if (showGameOver) {
    textSize(32);
    text("GAME OVER!", width / 2, height / 2);
  }
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

function displayScore() {
  fill(255);
  text("Score: " + snake.score, 30, 30);
}
