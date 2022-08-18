const getComputerChoice = function () {
  const choices = ["ROCK", "PAPER", "SCISSORS"];
  const random = Math.floor(Math.random() * 3);
  return choices[random];
};

const playRound = function (playerSelection, computerSelection) {
  playerSelection = playerSelection.toUpperCase();
  // compare first letter to allow for typos
  if (playerSelection[0] === computerSelection[0]) return "Draw!";

  let winner = false;

  winner = playerSelection[0] === "R" && computerSelection[0] === "S" ? true : winner;
  winner = playerSelection[0] === "P" && computerSelection[0] === "R" ? true : winner;
  winner = playerSelection[0] === "S" && computerSelection[0] === "P" ? true : winner;

  return winner;
};

const game = function (rounds) {
  let playerChoice, computerChoice;
  let score = 0;
  let draws = 0;

  for (let i = 1; i <= rounds; i++) {
    console.log("ROUND ", i);

    playerChoice = prompt("Select : Rock, Paper or Scissors?");
    computerChoice = getComputerChoice();
    const roundResult = playRound(playerChoice, computerChoice);

    if (roundResult === "Draw!") {
      console.log(`It was a draw! You both selected ${computerChoice}`);
      draws++;
    } else {
      console.log(roundResult ? `You get a point! Computer selected ${computerChoice}` : `Oh no! Computer got a point by selecting ${computerChoice}`);
      score = roundResult ? score + 1 : score;
    }
  }
  const endMsg = `The Final Score was ${score} Points to you and ${rounds - score - draws} Points for the Computer`;
  if (score === rounds - score - draws) {
    console.log(`It was a draw! -- ${endMsg}`);
    return;
  }
  console.log(score > rounds - score - draws ? `You Win! -- ${endMsg}` : `You Lose! -- ${endMsg}`);
};

game(7);
