let x;
let y;
let counter = 0;
let fg = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = 0;
  y = height / 2;
}

function draw() {
  background(100);

  noFill();
  stroke(255);
  strokeWeight(5);
  rect(x, y, 20);

  if (fg) {
    fg = false;
    trigger();
  }
}

function keyPressed() {
  x += 10;
}

function trigger() {
  x += 30;
  setTimeout(() => {
    fg = true;
  }, 1000);
}
