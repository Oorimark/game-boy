class Food {
  constructor() {
    const v = this.createFood();
    this.x = v.x;
    this.y = v.y;
  }

  createFood() {
    const cols = floor(width / scl);
    const rows = floor(height / scl);
    const v = createVector(floor(random(cols)), floor(random(rows)));
    v.mult(scl);
    return v;
  }

  display() {
    fill(255, 0, 0);
    rect(this.x, this.y, scl);
  }
}
