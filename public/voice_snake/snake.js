class Snake {
  constructor() {
    this.size = scl;
    this.speed = scl;
    this.padding = this.size;

    this.x = width / 2;
    this.y = height / 2;
    this.direction = "";
    this.prevDirection = "";

    this.total = 1;
    this.snakeBody = [createVector(this.x, this.y)];

    this.score = 0;
    this.scorePts = 1;
    this.bigFoodScorePts = 5;
  }

  display() {
    fill(255);

    for (let i = this.snakeBody.length - 1; i >= 0; i--) {
      rect(this.snakeBody[i].x, this.snakeBody[i].y, this.size);
    }

    // rect(this.x, this.y, this.size);
  }

  direct(direction) {
    const keyDirections = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];
    if (keyDirections.includes(direction)) {
      const temp = this.direction;
      this.direction = direction;
      this.prevDirection = temp;
    }
  }

  moveRestrainer() {
    // Restrain snake so it doesn't move in the opposite direction
    if (this.prevDirection === "ArrowRight" && this.direction === "ArrowLeft")
      this.direction = "ArrowRight";
    if (this.prevDirection === "ArrowLeft" && this.direction === "ArrowRight")
      this.direction = "ArrowLeft";
    if (this.prevDirection === "ArrowUp" && this.direction === "ArrowDown")
      this.direction = "ArrowUp";
    if (this.prevDirection === "ArrowDown" && this.direction === "ArrowUp")
      this.direction = "ArrowDown";
  }

  move() {
    for (let i = 0; i < this.snakeBody.length - 1; i++) {
      this.snakeBody[i] = this.snakeBody[i + 1];
    }

    if (this.total >= 1) {
      this.snakeBody[this.total - 1] = createVector(this.x, this.y);
    }

    this.moveRestrainer();
    if (this.direction === "ArrowLeft") {
      this.x -= this.speed;
    } else if (this.direction === "ArrowRight") {
      this.x += this.speed;
    } else if (this.direction === "ArrowUp") {
      this.y -= this.speed;
    } else if (this.direction === "ArrowDown") {
      this.y += this.speed;
    }

    // if (this.total >= 1) {
    //   this.x = constrain(this.x, 0, width);
    //   this.y = constrain(this.y, 0, height - this.size);
    // }
  }

  checkBoundaryX(x) {
    let reachedRight = width - x - this.size / 2 < 0 - this.padding;
    let reachedLeft =
      width - x - this.size / 2 >= width - this.size + this.padding;
    return { reachedRight, reachedLeft };
  }

  checkBoundaryY(y) {
    let reachedBottom = height - y - this.size / 2 < 0 - this.padding;
    let reachedTop =
      height - y - this.size / 2 >= height - this.size + this.padding;
    return { reachedBottom, reachedTop };
  }

  eatFood() {
    const { x: foodX, y: foodY } = food;
    const d = dist(this.x, this.y, foodX, foodY);
    if (d <= this.size) {
      food = new Food();
      this.total++;
      this.score += this.scorePts;

      if (!(this.score % 6)) createBigFoodHanlder();
      if (this.score > 20) frameRateValue++;
    }
  }

  eatBigFood() {
    const { x: foodX, y: foodY } = bigFood;
    const d = dist(this.x, this.y, foodX, foodY);
    if (d <= this.size) {
      this.total++;
      this.score += this.bigFoodScorePts;
      showBigFood = false;
    }
  }

  checkBoundary() {
    // for (let i = 0; i < this.snakeBody.length - 1; i++) {
    //   const { reachedRight, reachedLeft } = this.checkBoundaryX(
    //     this.snakeBody[i].x,
    //   );
    //   const { reachedBottom, reachedTop } = this.checkBoundaryY(
    //     this.snakeBody[i].y,
    //   );
    //
    //   if (reachedRight || reachedLeft || reachedBottom || reachedTop)
    //     this.handleDeath();
    // }

    const { reachedRight, reachedLeft } = this.checkBoundaryX(
      this.snakeBody[this.total - 1].x,
    );
    const { reachedTop, reachedBottom } = this.checkBoundaryY(
      this.snakeBody[this.total - 1].y,
    );

    if (reachedRight || reachedLeft || reachedBottom || reachedTop) {
      this.handleDeath();
    }
  }

  checkEatSelf() {
    for (let i = 0; i < this.snakeBody.length - 1; i++) {
      const d = dist(this.x, this.y, this.snakeBody[i].x, this.snakeBody[i].y);
      if (d <= 1) this.handleDeath();
    }
  }

  checkObstacle() {
    obstacles.forEach((obstacle) => {
      const d = dist(this.x, this.y, obstacle.x, obstacle.y);
      if (d <= this.size) this.handleDeath();
    });
  }

  handleDeath() {
    noLoop();
    showGameOver = true;
    console.log("You've eaten yourself");
    parseInt(highestScore) < this.score &&
      localStorage.setItem("highestScore", this.score);
  }
}
