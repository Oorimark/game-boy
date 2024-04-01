function preload() {
  // load images
  enemyCharacterUp = loadImage("./assets/characters/enemy_up.png");
  enemyCharacterDown = loadImage("./assets/characters/enemy_down.png");
  enemyCharacterRight = loadImage("./assets/characters/enemy_right.png");
  enemyCharacterLeft = loadImage("./assets/characters/enemy_left.png");

  playerCharacterUp = loadImage("./assets/characters/player_up.png");
  playerCharacterDown = loadImage("./assets/characters/player_down.png");
  playerCharacterRight = loadImage("./assets/characters/player_right.png");
  playerCharacterLeft = loadImage("./assets/characters/player_left.png");

  healthGiftImg = loadImage("./assets/characters/health_gift.png");

  // load audio
  bulletShootAudio = createAudio("./assets/sounds/blaster-2-81267.mp3");
  bonusEarnAudio = createAudio(
    "./assets/sounds/mixkit-bonus-earned-in-video-game-2058.wav",
  );
  killEnemyAudio = createAudio(
    "./assets/sounds/mixkit-game-blood-pop-slide-2363.wav",
  );
  playerLoseAudio = createAudio(
    "./assets/sounds/mixkit-player-losing-or-failing-2042.wav",
  );
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
  canvasBackgroundColor = [38, 68, 57];

  image(createUICanvas, 0, 0);
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
