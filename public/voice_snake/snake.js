class Snake {
  constructor() {
    this.padding = 9;
    this.speed = scl;

    this.x = width / 2;
    this.y = height / 2;
    this.size = scl;
    this.direction = "";
    this.prevDirection = "";

    this.total = 0;
    this.snakeBody = [];

    this.score = 0;
    this.scorePts = 1;
    this.bigFoodScorePts = 5;
  }

  display() {
    fill(255);

    for (let i = this.snakeBody.length - 1; i >= 0; i--) {
      rect(this.snakeBody[i].x, this.snakeBody[i].y, this.size);
    }

    rect(this.x, this.y, this.size);
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

    if (this.total >= 1) {
      this.x = constrain(this.x, 0, width);
      this.y = constrain(this.y, 0, height - this.size);
    }
  }

  checkBoundaryX(x) {
    let reachedLeft = width - x - this.size / 2 < 0 - this.padding;
    let reachedRight =
      width - x - this.size / 2 >= width - this.size + this.padding;
    return { reachedRight, reachedLeft };
  }

  checkBoundaryY(y) {
    let reachedTop = height - y - this.size / 2 < 0 - this.padding;
    let reachedBottom =
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

  checkDeath() {
    // Snake touching the boundary
    for (let i = 2; i < this.snakeBody.length - 1; i++) {
      const { reachedRight, reachedLeft } = this.checkBoundaryX(
        this.snakeBody[i].x,
      );
      const { reachedBottom, reachedTop } = this.checkBoundaryY(
        this.snakeBody[i].y,
      );

      if (reachedRight || reachedLeft || reachedBottom || reachedTop)
        this.__handleDeath();
    }

    // Snake touching itself
    for (let i = 0; i < this.snakeBody.length - 1; i++) {
      const d = dist(this.x, this.y, this.snakeBody[i].x, this.snakeBody[i].y);
      if (d <= 1) this.__handleDeath();
    }
  }

  __handleDeath() {
    noLoop();
    showGameOver = true;
    console.log("You've eaten yourself");
    parseInt(highestScore) < this.score &&
      localStorage.setItem("highestScore", this.score);
  }
}
