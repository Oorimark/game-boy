function dialogBox(children) {
  dialogContainer = createDiv();
  dialogContainer.class("dialog-container");

  children.forEach((child) => {
    dialogContainer.child(child);
  });
}

function displayRestartGameScreen() {
  const text = createP("Restart the Game");
  const overText = createP("GAME OVER");
  const currentScore = snake.score;
  const scoreStatus =
    currentScore > highestScore
      ? `New High Score: ${currentScore}`
      : `Your Score: ${currentScore}`;
  const statusText = createP(scoreStatus);
  const continueBtn = createButton("Continue");
  continueBtn.mousePressed(function () {
    dialogContainer.remove();
    snake.total = 0;
    Loop();
  });

  dialogBox([text, overText, statusText, continueBtn]);
}

function displayScore() {
  fill(255);
  textSize(15);
  text("SCORE: " + snake.score, 30, 30);
  text("HIGHEST SCORE: " + highestScore, 30, 60);
}
