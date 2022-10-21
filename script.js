const game = {};

replayBtn = document.createElement("button");
replayBtn.textContent = "Play Again?";
replayBtn.classList.add("replay");

const ui = {
  playArea: document.querySelector(".play-area"),
  message: document.querySelector(".message"),
  roundDisplay: document.querySelector(".round-display"),
  scoreRounds: document.querySelector(".score-round"),
  scoreWins: document.querySelector(".score-wins"),
  scoreLosses: document.querySelector(".score-losses"),
  scoreDraws: document.querySelector(".score-draws"),
  playerDisplayImg: document.querySelector(".player-display img"),
  compDisplayImg: document.querySelector(".comp-display img"),

  updateScores: function () {
    this.scoreRounds.textContent = 5 - game.rounds;
    this.scoreWins.textContent = game.wins;
    this.scoreLosses.textContent = game.losses;
    this.scoreDraws.textContent = game.draws;
  },

  showRoundResult: function (result) {
    this.message.textContent = "";
    if (result === "Draw") {
      this.message.append(result);
      return;
    }
    ui.message.append(result ? `You won!` : `You lost!`);
  },

  gameOver: function () {
    //this.message.textContent = "This is the end!";
    this.message.textContent = `Game over, Score: ${game.wins}`;
    startBtn.textContent = "Play Again?";
    startBtn.classList.remove("hidden");
    buttons.forEach((btn) => btn.setAttribute("disabled", true));
  },
};

const setup = function (rounds) {
  startBtn.classList.add("hidden");
  ui.roundDisplay.classList.remove("hidden");
  ui.message.textContent = "";
  game.rounds = rounds;
  game.wins = 0;
  game.losses = 0;
  game.draws = 0;
  game.playerSelection = "";
  game.computerSelection = "";

  buttons.forEach((btn) => btn.removeAttribute("disabled"));
  ui.updateScores();
};

const gameOver = function () {
  // pass
  ui.gameOver();
};

const getComputerChoice = function () {
  const choices = ["Rock", "Paper", "Scissors"];
  const random = Math.floor(Math.random() * 3);
  return choices[random];
};

const sleep = function (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const playRound = async function (playerSelection, computerSelection) {
  ui.compDisplayImg.src = `images/question.png`;
  game.rounds--;
  ui.updateScores();
  game.playerSelection = playerSelection;
  game.computerSelection = computerSelection;

  ui.playerDisplayImg.src = `images/${playerSelection}.png`;

  ui.message.textContent = "3";
  await sleep(300);
  ui.message.textContent = "2";
  await sleep(300);
  ui.message.textContent = "1";
  await sleep(300);

  ui.compDisplayImg.src = `images/${computerSelection}.png`;

  if (playerSelection === computerSelection) {
    game.draws++;
    ui.showRoundResult("Draw");
  } else {
    let winner = false;

    winner = playerSelection === "Rock" && computerSelection === "Scissors" ? true : winner;
    winner = playerSelection === "Paper" && computerSelection === "Rock" ? true : winner;
    winner = playerSelection === "Scissors" && computerSelection === "Paper" ? true : winner;

    if (winner) game.wins++;
    if (!winner) game.losses++;
    console.log("wins: ", game.wins, " losses: ", game.losses, " draws: ", game.draws);
    ui.showRoundResult(winner);
  }

  ui.updateScores();

  if (game.rounds <= 0) {
    gameOver();
    return;
  }
};

const startBtn = document.querySelector(".play-area button");
const buttons = document.querySelectorAll("button[data-rps]");

startBtn.addEventListener("click", function () {
  setup(5);
});

ui.playArea.addEventListener("click", function (e) {
  if (e.target.classList.contains("replay")) {
    setup(5);
  }
});

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    playRound(e.target.dataset.rps, getComputerChoice());
  });
});
