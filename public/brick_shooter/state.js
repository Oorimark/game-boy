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
    let reachedLeft = width - this.x - this.size / 2 <= 0;
    let reachedRight = width - this.x - this.size / 2 >= width - this.size;
    return { reachedRight, reachedLeft };
  }

  checkBoundaryY() {
    let reachedBottom = !(height - this.y - this.size / 2 >= 0);
    let reachedTop = !(height - this.y - this.size / 2 <= height - this.size);

    return { reachedBottom, reachedTop };
  }

  shooting(x, y, speed, playerType, shootKeyType, playerDirection) {
    if (playerType === "Enemy") {
      enemyBullets.push(
        new Bullet(
          x + this.size / 2,
          y + this.size,
          speed,
          playerDirection,
          playerType,
        ),
      );
    } else {
      if (keyIsDown(shootKeyType)) {
        bulletShootAudio.play();
        playerBullets.push(
          new Bullet(x + this.size / 2, y + this.size, speed, playerDirection),
        );
      } else {
        bulletShootAudio.stop();
      }
    }
  }
}

class Bullet {
  constructor(x, y, speed = 10, playerDirection, playerType) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = 5;
    this.playerType = playerType;
    this.bulletStepFlag = false;
    this.bulletStepInterval = 500;
    this.playerDirection = playerDirection;
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
    switch (this.playerDirection) {
      case "LEFT":
        this.x -= this.speed;
        break;
      case "RIGHT":
        this.x += this.speed;
        break;
      case "UP":
        this.y -= this.speed;
        break;
      case "DOWN":
        this.y += this.speed;
        break;
    }
  }
}

class Player extends Box {
  speed = 20;
  health = 100;
  healthDecayRate = 10;

  constructor(x, y, selectedKey, playerNumber) {
    super(x, y, Player.speed, playerCharacterUp);
    this.bulletSpped = 20;
    this.playerKey = playerKeys[selectedKey];
    this.playerNumber = playerNumber;
    this.receivedHealthGift = 0;
    this.direction = "UP";
  }

  _boundaryConstrainer() {
    this.x = constrain(this.x, 0, width - this.size);
    this.y = constrain(this.y, 0, height - this.size);
  }

  directional() {
    const { LEFT, RIGHT, UP, DOWN } = this.playerKey;

    if (keyIsDown(LEFT)) {
      if (this.direction !== "LEFT") {
        this.direction = "LEFT";
        this.characterImg = playerCharacterLeft;
      } else {
        this.x += this.speed * -1;
      }
    } else if (keyIsDown(RIGHT)) {
      if (this.direction !== "RIGHT") {
        this.direction = "RIGHT";
        this.characterImg = playerCharacterRight;
      } else {
        this.speed < 0 && this.speed * -1;
        this.x += this.speed;
      }
    } else if (keyIsDown(UP)) {
      if (this.direction !== "UP") {
        this.direction = "UP";
        this.characterImg = playerCharacterUp;
      } else {
        this.y -= this.speed;
      }
    } else if (keyIsDown(DOWN)) {
      if (this.direction !== "DOWN") {
        this.characterImg = playerCharacterDown;
        this.direction = "DOWN";
      } else {
        this.y += this.speed;
      }
    }

    this._boundaryConstrainer();
  }

  shoot() {
    this.shooting(
      this.x,
      this.y - this.size / 2,
      this.bulletSpped,
      null,
      this.playerKey.SHOOT,
      this.direction,
    );
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
        bonusEarnAudio.play();
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
  y = random(height * 0.2, height * 0.4); // keeps the height at 20% - 40%

  constructor(_id) {
    super(Enemy.x, Enemy.y, Enemy.speed, enemyCharacterDown);
    this._id = _id;
    this.bulletSpeed = 20;
    this.moveByStepFlag = true;
    this.moveStepDelay = 2000; // milliseconds
    this.stepCounter = 0;
    this.directions = ["LEFT", "RIGHT", "UP", "DOWN"];
  }

  direction(type) {
    switch (type) {
      case "LEFT":
        this.characterImg = enemyCharacterLeft;
        this.x -= this.speed;
        break;
      case "RIGHT":
        this.characterImg = enemyCharacterRight;
        this.x += this.speed;
        break;
      case "UP":
        this.characterImg = enemyCharacterUp;
        this.y -= this.speed;
        break;
      case "DOWN":
        this.characterImg = enemyCharacterDown;
        this.y += this.speed;
    }

    this.x = constrain(this.x, 0, width - this.size);
    this.y = constrain(this.y, 0, height - this.size);

    setTimeout(() => {
      this.moveByStepFlag = true;
    }, this.moveStepDelay);
  }

  move() {
    const direction = random(this.directions);

    if (this.moveByStepFlag) {
      this.moveByStepFlag = false;
      this.shoot(direction);
      this.direction(direction);
    }
  }

  shoot(direction) {
    this.shooting(
      this.x,
      this.y,
      this.bulletSpeed,
      this.playerType,
      null,
      direction,
    );
  }

  checkIncomingBullet() {
    playerBullets.forEach((bullet, idx) => {
      let d = dist(bullet.x, bullet.y, this.x, this.y);
      if (d <= this.size) {
        this.health -= this.healthDecayRate;
        canvasBackgroundColor = [43, 137, 103];
        if (this.health <= 0) {
          killEnemyAudio.play();
          this.remove();
        } else {
          killEnemyAudio.stop();
        }
        playerBullets.splice(idx, 1);
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
    this.width = 74.14 - 20; // 20 - padding, 74.14 - original width
    this.height = 20 + 71.17; // 20 - padding, 71.17 - original height
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
  speed = 3;
  constructor() {
    super("health", HealthGift.value, HealthGift.speed, healthGiftImg);
  }
  t;
}
