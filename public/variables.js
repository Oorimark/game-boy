const SPACE_BAR = 32;
let width_;
let height_;
let player1;
let player2;
let createUICanvas;
let createTempCanvas;
let gameBackgroundAudio;

let healthGiftImg;
let enemyCharacterImg;
let playerCharacterImg;

let bulletShootAudio;
let playerMoveAudio;
let bonusEarnAudio;
let killEnemyAudio;
let playerLoseAudio;

let toggleCreateGiftItems = true;

let level = 1;
let enemyNumber = 2;
let bottomPadding = 55;

let canvasBackgroundColor = [38, 68, 57];
let changeBackground = false;
let showPlayers = [true, true];
let enemys = [];
let enemyBullets = [];
let playerBullets = [];
let giftItems = [];

let highestLevel = localStorage.getItem("highestLevel") || 0;

let playerKeys = {
  numPadKeys: {
    LEFT: 100, // 4
    RIGHT: 102, // 6
    UP: 104, // 2
    DOWN: 98, // 8
    SHOOT: 101, // 5
  },
};
