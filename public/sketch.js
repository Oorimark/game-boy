let player;
let bullets = [];
const SPACE_BAR = 32;
let canvasBottomPadding = 55;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Box();
}

function draw() {
  background(100);

  player.display();
  player.move();
  player.shoot();

  bullets.forEach((bullet) => {
    bullet.display();
    bullet.move();
  });
}

class Box {
  constructor(x = width / 2, y = height - canvasBottomPadding) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.size = 35;
  }

  display() {
    noFill();
    stroke(255);
    strokeWeight(5);
    rect(this.x, this.y, this.size);
  }

  checkBoundaryX() {
    let reachedRight = width - this.size - this.x > 0 ? true : false;
    let reachedLeft =
      width - this.size - this.x <= width - this.size ? true : false;
    return { reachedRight, reachedLeft };
  }

  checkBoundaryY() {
    let reachedBottom = height - this.size - this.y > 0 ? true : false;
    let reachedTop =
      height - this.size - this.y <= height - this.size ? true : false;
    return { reachedBottom, reachedTop };
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      if (this.checkBoundaryX().reachedLeft) this.x += this.speed * -1;
    } else if (keyIsDown(RIGHT_ARROW)) {
      if (this.checkBoundaryX().reachedRight) {
        if (this.speed < 0) this.speed * -1;
        this.x += this.speed;
      }
    } else if (keyIsDown(UP_ARROW)) {
      if (this.checkBoundaryY().reachedTop) this.y -= this.speed;
    } else if (keyIsDown(DOWN_ARROW)) {
      if (this.checkBoundaryY().reachedBottom) this.y += this.speed;
    }
  }

  shoot() {
    if (keyIsDown(SPACE_BAR)) {
      bullets.push(new Bullet(this.x, this.y, this.size));
    }
  }
}

class Bullet {
  constructor(x, y, playerSize) {
    this.x = x - 5 + playerSize / 2;
    this.y = y - playerSize;
    this.speed = 10;
    this.size = 5;
  }

  display() {
    fill(200);
    noStroke();
    rect(this.x, this.y, this.size);
  }

  move() {
    this.y -= this.speed;
  }
}
