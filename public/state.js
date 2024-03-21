class Box {
  constructor(x, y, speed, characterImg) {
    this.x = x;
    this.y = y - bottomPadding;
    this.speed = speed;
    this.size = 39;
    this.color = color;
    this.characterImg = characterImg;
  }

  display() {
    image(this.characterImg, this.x, this.y);
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
    this.x = x;
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
    super(x, y, Player.speed, playerCharacterImg);
    this.bulletSpped = 20;
    this.playerKey = playerKeys[selectedKey];
    this.playerNumber = playerNumber;
    this.receivedHealthGift = 0;
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
    enemyBullets.forEach((bullet, idx) => {
      let d = dist(bullet.x, bullet.y, this.x, this.y);
      if (d <= this.size / 2) {
        canvasBackgroundColor = [130, 29, 29];
        this.health -= this.healthDecayRate;
        if (this.health <= 0) {
          this.remove();
          enemyBullets.splice(idx, 1);
          parseInt(highestLevel) < level &&
            localStorage.setItem("highestLevel", level);
        }
      }
    });
  }

  checkIncomingGifts() {
    giftItems.forEach((gift, idx) => {
      let d = dist(this.x, this.y, gift.x, gift.y);
      if (d <= this.size) {
        this.health += gift.value;
        this.receivedHealthGift = gift.value;
        displayGiftScore(gift.value);
        giftItems.splice(idx, 1);
      }
    });
  }

  remove() {
    showPlayers[this.playerNumber - 1] = false;
  }

  displayHealth() {
    if (this.health < 0) return "0%";
    return int((this.health / 100) * 100) + "%";
  }
}

class Enemy extends Box {
  speed = 20;
  health = 100;
  healthDecayRate = 10;
  playerType = "Enemy";

  x = random(width);
  y = random(height * 0.2, height * 0.4);

  constructor(_id) {
    super(Enemy.x, Enemy.y, Enemy.speed, enemyCharacterImg);
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
    playerBullets.forEach((bullet, idx) => {
      let d = dist(bullet.x, bullet.y, this.x, this.y);
      if (d <= this.size / 2) {
        this.health -= this.healthDecayRate;
        canvasBackgroundColor = [43, 137, 103];
        if (this.health <= 0) {
          playerBullets.splice(idx, 1);
          this.remove();
        }
      }
    });
  }

  remove() {
    enemys = enemys.filter((enemy) => enemy._id !== this._id);
  }
}

class GiftItems {
  constructor(itemType, value, speed, giftImg) {
    this.x = random(width_);
    this.y = 20;
    this.itemType = itemType;
    this.value = value;
    this.speed = speed;
    this.giftImg = giftImg;
    this.width = 74.14; // original width
    this.height = 71.17; // original height
  }

  move() {
    this.y += this.speed;
  }

  display() {
    image(this.giftImg, this.x, this.y);
    text(`+${this.value}%`, this.x + this.width / 2, this.y + this.height);
  }
}

class HealthGift extends GiftItems {
  value = random([20, 50, 70, 100]);
  speed = random([2, 3, 4, 7]);
  constructor() {
    super("health", HealthGift.value, HealthGift.spped, healthGiftImg);
  }
  t;
}
