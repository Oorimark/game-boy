function preload() {
  playerCharacterImg = loadImage("./assets/characters/player.png");
  enemyCharacterImg = loadImage("./assets//characters/enemy.png");
}

function setup() {
  const arrowKeys = {
    LEFT: LEFT_ARROW,
    RIGHT: RIGHT_ARROW,
    UP: UP_ARROW,
    DOWN: DOWN_ARROW,
    SHOOT: SPACE_BAR,
  };

  playerKeys.arrowKeys = arrowKeys; // register arrow keys to player keys

  createCanvas(windowWidth, windowHeight);
  createUICanvas = createGraphics(windowWidth, windowHeight);

  // (width, height, playerKey, playerNumber)
  player1 = new Player(width / 2, height, "arrowKeys", 1);
  createEnemyHandler();
}

function draw() {
  const [r, g, b] = canvasBackgroundColor;
  background(r, g, b);

  image(createUICanvas, 0, 0);
  createUICanvas.background(r, g, b);

  // canvasBackgroundColor = [100, 100, 100, 255];
  canvasBackgroundColor = [38, 68, 57];

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
