import { updateGround, setupGround } from "./ground.js";
import { updatePlayer, setupPlayer, getPlayerRect } from "./player.js";
import { updateObstacle, setupObstacle, getObstacleRects } from "./obstacle.js";
import { updateNft, setupNft, getNftRects } from "./nft.js";

const GAME_WIDTH = 100;
const GAME_HEIGHT = 30;

const gameElem = document.querySelector("[data-game]");
const scoreElem = document.querySelector("[data-score]");
const startScreenElem = document.querySelector("[data-start-screen]");
const gweiTotalScoreElem = document.querySelector("[data-wei-total-score]");
const nftTotalScoreElem = document.querySelector("[data-nft-total-score]");
const nftScoreElem = document.querySelector("[data-nft-score]");

setPixelToGameScale();
window.addEventListener("resize", setPixelToGameScale);
document.addEventListener("keydown", handleStart, { once: true });

let lastTime;
let speedScale;
let score;
let nftScore = 0;

function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;

  updateGround(delta, speedScale);
  updatePlayer(delta, speedScale);
  updateObstacle(delta, speedScale);
  updateNft(delta, speedScale);
  updateScore(delta);
  checkIfWeGotNft();

  if (checkLose()) return handleLose();
  lastTime = time;
  window.requestAnimationFrame(update);
}

function checkLose() {
  const playerRect = getPlayerRect();
  return getObstacleRects().some((rect) => isCollision(rect, playerRect));
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE - INCREASE;
}

function updateScore(delta) {
  score += delata * 0.01;
  scoreElem.textContent = `Wei score: ${Math.floor(score)}`;
}

function handleStart() {
  lastTime = null;
  speedScale = 1;
  score = 0;
  setupGround();
  setupPlayer();
  setupObstacle();
  setupNft(); ///////////////
}

function isCollision() {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

function checkIfWeGotNft() {
  const playerRect = getPlayerRect();
  if (getNftRects().some((rect) => isCollision(rect, playerRect))) {
    const nftToRemove = document.querySelectorAll("[data-nft]")[0];
    nftScore += 1;
    nftScoreElem.textContent = `nft score: ${nftScore}`;
  }
}

function setPixelToGameScale() {
  let gameToPixelScale;
  if (window.innerWidth / window.innerHeight < GAME_WIDTH / GAME_HEIGHT) {
    gameToPixelScale = window.innerWidth / GAME_WIDTH;
  } else {
    gameToPixelScale = window.innerHeight / GAME_HEIGHT;
  }

  gameElem.style.width = `${GAME_WIDTH * gameToPixelScale}px`;
  gameElem.style.heiht = `${GAME_HEIGHT * gameToPixelScale}px`;
}
