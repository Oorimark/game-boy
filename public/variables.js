const SPACE_BAR = 32;

let player1;
let player2;
let level = 1;
let canvasBackgroundColor = [100, 100, 100, 255];
let changeBackground = false;
let showPlayers = [true, true];
let enemys = [];
let enemyNumber = 4;
let enemyBullets = [];
let playerBullets = [];
let bottomPadding = 55;

let playerKeys;
let createUICanvas;
