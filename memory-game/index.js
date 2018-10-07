"use-strict";

const cards = document.querySelectorAll(".memory-card");
let hasCardFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
let totalFlips = 0;
let matchedPairs = 8;

let spanScore = document.getElementsByClassName("score")[0];

let restartBtn = document.getElementsByTagName("button")[0];

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.toggle("flip");

  if (!hasCardFlipped) {
    hasCardFlipped = true;
    firstCard = this;
    return;
  }
  hasCardFlipped = false;
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.info === secondCard.dataset.info) {
    disableCards();
    matchedPairs--;
  } else {
    unflipCards();
  }
  totalFlips++;
  spanScore.innerHTML = totalFlips;
  if (matchedPairs === 0) {
    alert(
      `Congrats! You finished! Your score is: ${totalFlips}. Try to beat this score!`
    );
    if (confirm("Do you want to play again?")) {
      location.reload();
    } else {
      return;
    }
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 800);
}

function resetBoard() {
  [hasCardFlipped, lockBoard] = [false, false];
  [firstCard, firstCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomNum = Math.floor(Math.random() * 12);
    card.style.order = randomNum;
  });
})();

cards.forEach(card => card.addEventListener("click", flipCard));

restartBtn.addEventListener("click", () => {
  location.reload();
});
