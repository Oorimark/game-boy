class Obstacle {
  constructor() {
    this.x = random(20, width);
    this.y = random(20, height);
    this.size = 42;
  }

  display() {
    fill(0, 255, 0);
    rect(this.x, this.y, this.size);
  }
}
