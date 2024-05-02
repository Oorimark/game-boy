function createFoodHanlder() {
  food = new Food();
}

function createBigFoodHanlder() {
  bigFood = new BigFood();
  showBigFood = true;
}

function showBigFoodHandler() {
  if (showBigFood) {
    bigFood.display();
    snake.eatBigFood();
    setTimeout(() => {
      showBigFood = false;
    }, bigFoodTimeout);
  }
}

function createObstacles() {
  // const number = playerScore === 0 ? 1 : (playerScore % 3) * 2;
  const number = random(2, 5);

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

function modelReady() {
  classifier.classify(gotResult);
}

function gotResult(error, result) {
  if (error) {
    console.log(error);
    return;
  }

  let cmd = getCommand(result);
  snake.direct(cmd);
}

function getCommand(result) {
  const word = result[0].label;

  if (word === "up" || word === "four") return "ArrowUp";
  if (word === "down") return "ArrowDown";
  if (word === "left" || word === "yes") return "ArrowLeft";
  if (word === "right") return "ArrowRight";
}
