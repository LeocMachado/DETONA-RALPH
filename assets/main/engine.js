const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    time: document.querySelector("#time"),
    score: document.querySelector("#score"),
  },
  values: {
    timerID: null,
    CountDownTimerID: setInterval(countDown, 1000),
    GameVelocity: 1000,
    HitPosition: 0,
    result: 0,
    currintTime: 60,
  },
};

function playSound() {
  let audio = new Audio("./assets/audios/hit.m4a");
  audio.volume = 0.1;
  audio.play();
}

function GameOverSound() {
  let audio = new Audio("./assets/audios/Game Over - Sound Effect [HD].mp3");
  audio.play();
}

function countDown() {
  state.values.currintTime--;

  state.view.time.textContent = state.values.currintTime;

  if (state.values.currintTime <= 0) {
    clearInterval(state.values.CountDownTimerID);
    clearInterval(state.values.timerID);
    GameOverSound();
    alert("GAME OVER!! A sua pontuação foi de " + state.values.result);
  }
}

function Random() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let rNumber = Math.floor(Math.random() * 9);
  let rSquares = state.view.squares[rNumber];
  rSquares.classList.add("enemy");
  state.values.HitPosition = rSquares.id;
}

function moveEnemy() {
  state.values.timerID = setInterval(Random, state.values.GameVelocity);
}

function Listener() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.HitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.HitPosition = null;
        playSound();
      }
    });
  });
}

function init() {
  moveEnemy();
  Listener();
}

init();
