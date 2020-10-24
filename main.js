const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const onClick = document.querySelector(".onclick"); //this is test
const celebrate = document.querySelector(".celebrate");

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
    //console.log("!oo thats the same hole");
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
    timeUp = true;
    setTimeout(() => {
      SuttingStar();
    }, moleTime.end);
  }, gameTime);
}

let corratescore;

function bunk(e) {
  if (!e.isTrusted) return;

  score++;
  corratescore = score;

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

function SuttingStar() {
  switch (true) {
    case corratescore === 0:
      console.log("tray again");
      break;
    case corratescore <= 5:
      celebrate.classList.add("score1");
      setTimeout(() => {
        celebrate.classList.remove("score1");
      }, moleTime.end);

      break;
    case corratescore > 5 && corratescore < 11:
      celebrate.classList.add("score2");
      setTimeout(() => {
        celebrate.classList.remove("score2");
      }, moleTime.end);

      break;
    case corratescore >= 12:
      celebrate.classList.add("score3");
      setTimeout(() => {
        celebrate.classList.remove("score3");
      }, moleTime.end);

      break;
    default:
  }
}

onClick.addEventListener("click", throttle(startGame, gameTime + 100));

moles.forEach((mole) => mole.addEventListener("click", bunk));
