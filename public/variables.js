const SPACE_BAR = 32;

let player1;
let player2;
let playerCharacterImg;
let enemyCharacterImg;
let level = 1;
// let canvasBackgroundColor = [100, 100, 100, 255];
let canvasBackgroundColor = [38, 68, 57];
let changeBackground = false;
let showPlayers = [true, true];
let enemys = [];
let enemyNumber = 2;
let enemyBullets = [];
let playerBullets = [];
let bottomPadding = 55;

let createUICanvas;

let playerKeys = {
  numPadKeys: {
    LEFT: 100,
    RIGHT: 102,
    UP: 104,
    DOWN: 98,
    SHOOT: 101,
  },
};
