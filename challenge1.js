/*
    1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next
    player's turn. (Hint: Always save the previous dice roll in a separate variable)
    2. Add an input field to the HTML where players can set the winning score, so that they can
    change the predefined score of 100. (Hint: you can read that value with the .value property
        in javaScript. This is a good opportunity to google to figure this out)
    3. Add another dice to the game, so that there are two dices now. The player looses his 
    current score when one of them is a 1. (Hint: You will need CSS to position the second dice,
        so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, dice, gamePlaying, prevRollNum, newScore;
var sixCounter, sixCounterSD;
init();

//Rolling the dice
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //1. Random Number
    var dice = Math.floor(Math.random() * 6) + 1;
    var secondDice = Math.floor(Math.random() * 6) + 1;

    // Save previous dice number
    prevRollNum = dice;
    prevRollNum2 = secondDice;

    //Verifies if dice hit 6 twice in a row
    if (prevRollNum === 6) {
      sixCounter++;
    } else if (prevRollNum2 === 6) {
      sixCounterSD++;
    } else{
      sixCounter = 0;
      sixCounterSD = 0;
    }

    //2. Display the result
    updateDice(dice, "dice-1", "block");
    updateDice(secondDice, "dice-2", "block");

    //3. Update the round score IF the rolled number was NOT a 1
    if (dice !== 1 && secondDice !== 1 && sixCounter !== 2 && sixCounterSD != 2) {
      //Add score
      var dices = dice + secondDice;
      roundScore += dices;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else if (sixCounter === 2 || sixCounterSD === 2) {
      //Resetting current score of current Player
      resetCurrentPlayer();
      //Next Player
      nextPlayer();
    } else {
      nextPlayer();
    }
  }
});

function updateDice(diceNumber, diceId, displayResult) {
  document.getElementById(diceId).style.display = displayResult;
  document.getElementById(diceId).src = "dice-" + diceNumber + ".png";
}

//Hold button
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    //Add current score to GLOBAL score
    scores[activePlayer] += roundScore;

    //Verifies if there's a Score set by the user, if not we use the default
    var winningScore;
    if (newScore) {
      winningScore = newScore;
    } else {
      winningScore = 100;
    }

    //Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    //Check If player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent =
        "Player " + (activePlayer + 1) + " is the WINNER!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

//New Game
document.querySelector(".btn-new").addEventListener("click", init);

function nextPlayer() {
  //Next Player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //Removing active class from one div and adding it to another
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
}

function resetCurrentPlayer() {
  //Set back to 0 from UI
  document.getElementById("score-" + activePlayer).textContent = "0";
  //Set back the score from the active player to 0
  scores[activePlayer] = 0;
}

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice2").style.display = "none";

  //Setting scores and current scores to 0
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //setting players to their original names
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  //Removing class winner and active of the DOM
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

function getScore() {
  newScore = document.getElementById("scoreInput").value;
}
