class Snake {
  constructor() {
    this.speed = scl;

    this.x = width / 2;
    this.y = height / 2;
    this.size = scl;
    this.direction = "";
    this.prevDirection = "";

    this.total = 0;
    this.snakeBody = [];
  }

  display() {
    fill(255);

    for (let i = 0; i < this.snakeBody.length; i++) {
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

    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  eatFood() {
    const { x: foodX, y: foodY } = food;
    const d = dist(this.x, this.y, foodX, foodY);
    if (d <= this.size) {
      food = new Food();
      this.total++;
    }
  }
}
