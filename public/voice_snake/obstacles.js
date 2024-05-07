class Obstacle {
  constructor() {
    this.size = 42;
    this.x = constrain(random(20, width - this.size), 0, width - this.size);
    this.y = constrain(random(20, height - this.size), 0, height - this.size);
  }

  display() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.size);
  }
}
