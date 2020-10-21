const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
let lastHole;
let timeUp = false;
let score = 0;
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function randomHole(holes) {
  indx = Math.floor(Math.random() * holes.length);
  const hole = holes[indx];
  if (hole === lastHole) {
    console.log("!oo thats the same hole");
    return randomHole(holes);
  }

  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}
function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => {
    return (timeUp = true);
  }, 13000);
}
function bunk(e) {
  if (!e.isTrusted) return;
  score++;
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = score;
}
moles.forEach((mole) => mole.addEventListener("click", bunk));
