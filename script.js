"use strict";
// Handles the Modial/Overlay Instructions
const overlay = $("div.overlay");
const modalButton = $(".close-modal");
const instructions = $(".btn--instructions");

overlay.on("click", function () {
  $(".overlay").addClass("hidden");
  $(".modal").addClass("hidden");
});

modalButton.on("click", function () {
  $(".overlay").addClass("hidden");
  $(".modal").addClass("hidden");
});

$(document).keydown(function (e) {
  if (e.key === "Escape" || e.key === "esc") {
    $(".overlay").addClass("hidden");
    $(".modal").addClass("hidden");
  }
});

instructions.on("click", function () {
  overlay.toggleClass("hidden");
  $(".modal").toggleClass("hidden");
});

// Handles the game functionality
const player1 = $(".player--0");
const player2 = $(".player--1");
const activeClass = "player--active";
let currentScore;
let playerScore;
const roll = $(".btn--roll");

// start with player 1
player1.addClass(activeClass);
// click roll dice button for new image
roll.on("click", function () {
  // put the inner text of the image into current score
  let diceValue = Math.floor(Math.random() * 6 + 1);
  console.log(diceValue);
  let diceSrc = "dice-" + diceValue + ".png";
  let dice = $(".dice").attr("src", diceSrc);
  if ($(".player--0").hasClass(activeClass)) {
    currentScore = $("#current--0");
  } else if ($(".player--1").hasClass(activeClass)) {
    currentScore = $("#current--1");
  }
  let score = Number(currentScore.text()) + diceValue;
  currentScore.text(score);
  // if dice = 1 then make current score 0
  if (diceValue === 1) {
    score = 0;
    currentScore.text(score);
    // switch to next player
    player1.toggleClass(activeClass);
    player2.toggleClass(activeClass);
  }
});

const hold = $(".btn--hold");
// click hold button put current score into player score
hold.on("click", function () {
  if ($(".player--0").hasClass(activeClass)) {
    playerScore = $("#score--0");
  } else if ($(".player--1").hasClass(activeClass)) {
    playerScore = $("#score--1");
  }
  let score = Number(currentScore.text()) + Number(playerScore.text());
  playerScore.text(score);
  if ($(".player--0").hasClass(activeClass)) {
    currentScore = $("#current--0");
  } else if ($(".player--1").hasClass(activeClass)) {
    currentScore = $("#current--1");
  }
  score = 0;
  currentScore.text(score);

  // if player score >= 100 then player wins
  if (Number(playerScore.text() >= 100)) {
    if ($(".player--0").hasClass(activeClass)) {
      $(".player--0").toggleClass("player--winner");
      hold.toggleClass("button-disabled");
      roll.toggleClass("button-disabled");
    } else if ($(".player--1").hasClass(activeClass)) {
      $(".player--1").toggleClass("player--winner");
      hold.toggleClass("button-disabled");
      roll.toggleClass("button-disabled");
    }
  }

  // switch to next player
  player1.toggleClass(activeClass);
  player2.toggleClass(activeClass);
});

// set new game button
const newGame = $(".btn--new");
newGame.on("click", function () {
  hold.removeClass("button-disabled");
  roll.removeClass("button-disabled");
  player1.addClass(activeClass);
  player2.removeClass(activeClass);
  $(".player").removeClass("player--winner");
  $(".dice").attr("src", "dice-5.png");
  $("#score--0").text("0");
  $("#score--1").text("0");
  $("#current--0").text("0");
  $("#current--1").text("0");
});
