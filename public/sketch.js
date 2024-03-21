function preload() {
  playerCharacterImg = loadImage("./assets/characters/player.png");
  enemyCharacterImg = loadImage("./assets/characters/enemy.png");
  healthGiftImg = loadImage("./assets/characters/health_gift.png");
}

function setup() {
  width_ = windowWidth;
  height_ = windowHeight;

  const arrowKeys = {
    LEFT: LEFT_ARROW,
    RIGHT: RIGHT_ARROW,
    UP: UP_ARROW,
    DOWN: DOWN_ARROW,
    SHOOT: SPACE_BAR,
  };

  createCanvas(windowWidth, windowHeight);
  createUICanvas = createGraphics(windowWidth, windowHeight);
  createTempCanvas = createGraphics(windowWidth, windowHeight);

  playerKeys.arrowKeys = arrowKeys; // register arrow keys to player keys
  player1 = new Player(width / 2, height, "arrowKeys", 1);
  createEnemyHandler();
}

function draw() {
  const [r, g, b] = canvasBackgroundColor;

  background(r, g, b);
  image(createUICanvas, 0, 0);
  canvasBackgroundColor = [38, 68, 57];
  createUICanvas.background(r, g, b);

  displayUI();
  playerActionHandler();
  enemyActionHandler();
  bulletsDisplayHandler();
  bulletsCleaner();
  respawnEnemyHandler();
  createGiftItemsDelay();
  displayGifts();
}
