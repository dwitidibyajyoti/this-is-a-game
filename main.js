const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const onClick = document.querySelector(".onclick"); //this is test
let lastHole;
let timeUp = false;
let score = 0;
const gameTime = 13000;
const moleTime = {
  start: 500,
  end: 1000,
};
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
  const time = randomTime(moleTime.start, moleTime.end);
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
  }, gameTime);
}
let timeCler;
function bunk(e) {
  if (!e.isTrusted) return;
  if (timeCler) {
    clearTimeout(timeCler);
  }
  score++;
  timeCler = setTimeout(() => {
    SuttingStar(score);
  }, gameTime - gameTime / 3);
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = score;
}
const throttle = (fun, dely) => {
  let last = 0;
  return (...arg) => {
    const now = new Date().getTime();
    if (now - last < dely) return;
    last = now;

    return fun(...arg);
  };
};

function SuttingStar(score) {
  console.log("sutting star ");
}

onClick.addEventListener("click", throttle(startGame, gameTime + 100));

moles.forEach((mole) => mole.addEventListener("click", bunk));
