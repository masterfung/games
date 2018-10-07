"use-strict";

const cards = document.querySelectorAll(".memory-card");
let hasCardFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
let totalFlips = 0;

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
  } else {
    unflipCards();
  }
  totalFlips++;
  spanScore.innerHTML = totalFlips;
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
  }, 1500);
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
