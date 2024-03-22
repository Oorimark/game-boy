function preload() {
  // load images
  enemyCharacterImg = loadImage("./assets/characters/enemy.png");
  playerCharacterImg = loadImage("./assets/characters/player.png");
  healthGiftImg = loadImage("./assets/characters/health_gift.png");

  // load audio
  // gameBackgroundAudio = createAudio(
  //   "./assets/sounds/mixkit-game-level-music-689.wav",
  // );
  bulletShootAudio = createAudio(
    "./assets/sounds/mixkit-game-ball-tap-2073.wav",
  );
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

  // gameBackgroundAudio.loop();
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
