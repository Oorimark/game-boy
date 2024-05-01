const foodLimit = 50;

let food;
let snake;
let bigFood;
let classifier;

let scl = 20;
let highestScore = localStorage.getItem("highestScore") || 0;
let obstacles = [];
let showBigFood = false;
let frameRateValue = 10;
let showGameOver = false;
let bigFoodTimeout = 9000; // milliseconds
