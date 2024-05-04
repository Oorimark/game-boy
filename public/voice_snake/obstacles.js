class Obstacle {
  constructor() {
    this.size = 42;
    this.x = random(20, width - this.size);
    this.y = random(20, height - this.size);
  }

  display() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.size);
  }
}
