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
  createUICanvas = createGraphics(windowWidth, windowHeight);

  // args => (width, height, playerKey, playerNumber)
  player1 = new Player(width / 2, height, "arrowKeys", 1);
  createEnemyHandler();
}

function draw() {
  const [r, g, b, a] = canvasBackgroundColor;
  background(r, g, b, a);

  image(createUICanvas, 0, 0);
  createUICanvas.background(r, g, b, a);

  canvasBackgroundColor = [100, 100, 100, 255];

  // display score
  displayUI();

  // display player
  playerActionHandler();

  // display enemy
  enemyActionHandler();

  /* display bullets */
  bulletsDisplayHandler();

  // cleaning bullets
  bulletsCleaner();

  // respawn Enemy when they are killed
  respawnEnemyHandler();
}
