class Box {
  constructor(x, y, speed, color) {
    this.x = x;
    this.y = y - bottomPadding;
    this.speed = speed;
    this.size = 35;
    this.color = color;
  }

  display() {
    const [r, g, b] = this.color || [255, 255, 255];

    noFill();
    stroke(r, g, b);
    strokeWeight(5);
    rect(this.x, this.y, this.size);
  }

  checkBoundaryX() {
    let reachedRight = width - this.x - this.size > 0 ? false : true;
    let reachedLeft =
      width - this.x - this.size <= width - this.size ? false : true;
    return { reachedRight, reachedLeft };
  }

  checkBoundaryY() {
    let reachedBottom = height - this.y - this.size > 0 ? false : true;
    let reachedTop =
      height - this.y - this.size <= height - this.size ? false : true;
    return { reachedBottom, reachedTop };
  }

  bullet(x, y, speed, playerType, keyType) {
    if (playerType === "Enemy") {
      enemyBullets.push(
        new Bullet(x + this.size / 2, y + this.size, speed, playerType),
      );
    } else {
      if (keyIsDown(keyType)) {
        playerBullets.push(new Bullet(x + this.size / 2, y - this.size, speed));
      }
    }
  }
}

class Bullet {
  constructor(x, y, speed = 10, playerType) {
    this.x = x - 5;
    this.y = y;
    this.speed = speed;
    this.size = 5;
    this.playerType = playerType;
    this.bulletStepFlag = false;
    this.bulletStepInterval = 500;
  }

  display() {
    fill(200);
    noStroke();
    rect(this.x, this.y, this.size);
  }

  stepMovement() {
    this.y += this.speed;
    setTimeout(() => {
      this.bulletStepFlag = true;
    }, this.bulletStepInterval);
  }

  move() {
    if (this.playerType === "Enemy") {
      this.y += this.speed;
    } else {
      this.y -= this.speed;
    }
  }
}

class Player extends Box {
  speed = 20;
  health = 100;
  healthDecayRate = 3;

  constructor(x, y, selectedKey, playerNumber) {
    super(x, y, Player.speed);
    this.bulletSpped = 20;
    this.playerKey = playerKeys[selectedKey];
    this.playerNumber = playerNumber;
  }

  move() {
    const { LEFT, RIGHT, UP, DOWN } = this.playerKey;

    if (keyIsDown(LEFT)) {
      if (!this.checkBoundaryX().reachedLeft) this.x += this.speed * -1;
    } else if (keyIsDown(RIGHT)) {
      if (!this.checkBoundaryX().reachedRight) {
        if (this.speed < 0) this.speed * -1;
        this.x += this.speed;
      }
    } else if (keyIsDown(UP)) {
      if (!this.checkBoundaryY().reachedTop) this.y -= this.speed;
    } else if (keyIsDown(DOWN)) {
      if (!this.checkBoundaryY().reachedBottom) this.y += this.speed;
    }
  }

  shoot() {
    this.bullet(this.x, this.y, this.bulletSpped, null, this.playerKey.SHOOT);
  }

  checkIncomingBullet() {
    enemyBullets.forEach((bullet) => {
      let d = dist(bullet.x, bullet.y, this.x, this.y);
      if (d <= this.size / 2) {
        canvasBackgroundColor = [255, 0, 0, 20];
        this.health -= this.healthDecayRate;
        print("hit");
        if (this.health <= 0) this.remove();
      }
    });
  }

  remove() {
    showPlayers[this.playerNumber - 1] = false;
  }
}

class Enemy extends Box {
  speed = 20;
  health = 100;
  healthDecayRate = 10;
  color = [255, 0, 0];
  playerType = "Enemy";

  x = random(width);
  y = random(height * 0.2, height * 0.4);

  constructor(_id) {
    super(Enemy.x, Enemy.y, Enemy.speed, Enemy.color);
    this._id = _id;
    this.bulletSpeed = 20;
    this.moveByStepFlag = true;
    this.moveStepDelay = 500; // milliseconds
    this.stepCounter = 0;
  }

  direction(type) {
    const { reachedLeft, reachedRight } = this.checkBoundaryX();
    const { reachedTop, reachedBottom } = this.checkBoundaryY();

    switch (type) {
      case "LEFT":
        if (!reachedLeft) this.x -= this.speed;
        break;
      case "RIGHT":
        if (!reachedRight) this.x += this.speed;
        break;
      case "UP":
        if (!reachedTop) this.y -= this.speed;
        break;
      case "BOTTOM":
        if (!reachedBottom) this.y += this.speed;
    }

    setTimeout(() => {
      this.moveByStepFlag = true;
    }, this.moveStepDelay);
  }

  move() {
    const directions = ["LEFT", "RIGHT", "UP", "BOTTOM"];
    const direction = random(directions);

    if (this.moveByStepFlag) {
      this.moveByStepFlag = false;
      this.shoot();
      this.direction(direction);
    }
  }

  shoot() {
    this.bullet(this.x, this.y, this.bulletSpeed, this.playerType);
  }

  checkIncomingBullet() {
    playerBullets.forEach((bullet) => {
      let d = dist(bullet.x, bullet.y, this.x, this.y);
      if (d <= this.size / 2) {
        canvasBackgroundColor = [0, 255, 0, 20];
        this.health -= this.healthDecayRate;
        if (this.health <= 0) this.remove();
      }
    });
  }

  remove() {
    enemys = enemys.filter((enemy) => enemy._id !== this._id);
  }
}
