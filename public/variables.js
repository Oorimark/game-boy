const SPACE_BAR = 32;

let player1;
let player2;
let createUICanvas;
let playerCharacterImg;
let enemyCharacterImg;

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
    LEFT: 100,
    RIGHT: 102,
    UP: 104,
    DOWN: 98,
    SHOOT: 101,
  },
};
