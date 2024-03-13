function playerActionHandler() {
  if (showPlayers[0]) {
    player1.display();
    player1.move();
    player1.shoot();
    player1.checkIncomingBullet();
  }

  // if (showPlayers[1]) {
  //   player2.display();
  //   player2.move();
  //   player2.shoot();
  //   player2.checkIncomingBullet();
  // }
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

function createEnemyHandler() {
  let counter = 0;
  while (counter++ < enemyNumber) {
    const _id = random(1000, 2000);
    enemys.push(new Enemy(_id));
  }
}

function respawnEnemyHandler() {
  if (!enemys.length) {
    level++;
    enemyNumber += 2; // multiply enemy by 2
    player1.health += 25; // Add 40 to player health
    createEnemyHandler(); // create more enemys
  }
}

function displayUI() {
  createUICanvas.fill(255);
  createUICanvas.text("LEVEL: " + level, 50, 50);
  createUICanvas.text(
    "PLAYER HEALTH: " + player1.displayHealth(),
    width - 150,
    50,
  );
}
