class Food {
  constructor() {
    this.size = scl;

    const v = this.createFood();
    this.x = constrain(v.x, 0, width - this.size);
    this.y = constrain(v.y, 0, height - this.size);
  }

  createFood() {
    const cols = floor(width / this.size);
    const rows = floor(height / this.size);
    const v = createVector(floor(random(cols)), floor(random(rows)));
    v.mult(this.size);
    return v;
  }

  display() {
    fill(0, 255, 0);
    rect(this.x, this.y, this.size);
  }
}

class BigFood extends Food {
  constructor() {
    super();
    this.size = scl * 2;
  }
}
