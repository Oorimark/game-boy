const SPACE_BAR = 32;

let player1;
let player2;
let canvasBackgroundColor = [100, 100, 100, 255];
let changeBackground = false;
let showPlayers = [true, true];
let counter = 0;
let enemys = [];
let enemyNumber = 4;
let enemyBullets = [];
let playerBullets = [];
let bottomPadding = 55;

let playerKeys;

function setup() {
  playerKeys = {
    arrowKeys: {
      LEFT: LEFT_ARROW,
      RIGHT: RIGHT_ARROW,
      UP: UP_ARROW,
      DOWN: DOWN_ARROW,
      SHOOT: SPACE_BAR,
    },

    numPadKeys: {
      LEFT: 100,
      RIGHT: 102,
      UP: 104,
      DOWN: 98,
      SHOOT: 101,
    },
  };

  createCanvas(windowWidth, windowHeight);

  // args => (width, height, playerKey, playerNumber)
  player1 = new Player(width / 2, height, "arrowKeys", 1);
  player2 = new Player(width / 2, height, "numPadKeys", 2);

  while (counter++ < enemyNumber) {
    const _id = random(1000, 2000);
    enemys.push(new Enemy(_id));
  }
}

function draw() {
  const [r, g, b, a] = canvasBackgroundColor;
  background(r, g, b);

  canvasBackgroundColor = [100, 100, 100, 255];

  // display player
  playerActionHandler();

  // display enemy
  enemyActionHandler();

  /* display bullets */
  bulletsDisplayHandler();

  // cleaning bullets
  bulletsCleaner();
}

function playerActionHandler() {
  if (showPlayers[0]) {
    player1.display();
    player1.move();
    player1.shoot();
    player1.checkIncomingBullet();
  }

  if (showPlayers[1]) {
    player2.display();
    player2.move();
    player2.shoot();
    player2.checkIncomingBullet();
  }
}

function enemyActionHandler() {
  if (enemys.length) {
    enemys.forEach((enemy) => {
      enemy.display();
      enemy.move();
      enemy.checkIncomingBullet();
    });
  }
}

function bulletsDisplayHandler() {
  if (enemyBullets.length || playerBullets.length) {
    enemyBullets.forEach((bullet) => {
      bullet.display();
      bullet.move();
    });

    playerBullets.forEach((bullet) => {
      bullet.display();
      bullet.move();
    });
  }
}

function bulletsCleaner() {
  enemyBullets = enemyBullets.filter((bullet) => bullet.y < height);
  playerBullets = playerBullets.filter((bullet) => bullet.y > 0);
}

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
  healthDecayRate = 5;

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
  healthDecayRate = 5;
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
