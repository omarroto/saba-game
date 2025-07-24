
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const pad = {
  x: 130,
  y: 460,
  width: 40,
  height: 20,
  speed: 5,
  moveLeft: false,
  moveRight: false
};

const drops = [];
let score = 0;

function createDrop() {
  const x = Math.random() * (canvas.width - 10);
  drops.push({ x, y: 0, size: 10 });
}

function drawPad() {
  ctx.fillStyle = "#e91e63";
  ctx.fillRect(pad.x, pad.y, pad.width, pad.height);
}

function drawDrops() {
  ctx.fillStyle = "#c2185b";
  drops.forEach(drop => {
    ctx.beginPath();
    ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
    ctx.fill();
  });
}

function movePad() {
  if (pad.moveLeft && pad.x > 0) pad.x -= pad.speed;
  if (pad.moveRight && pad.x + pad.width < canvas.width) pad.x += pad.speed;
}

function updateDrops() {
  for (let i = drops.length - 1; i >= 0; i--) {
    drops[i].y += 2;
    if (
      drops[i].y + drops[i].size > pad.y &&
      drops[i].x > pad.x &&
      drops[i].x < pad.x + pad.width
    ) {
      drops.splice(i, 1);
      score++;
    } else if (drops[i].y > canvas.height) {
      drops.splice(i, 1);
    }
  }
}

function drawScore() {
  ctx.fillStyle = "#000";
  ctx.font = "18px Arial";
  ctx.fillText("Puntos: " + score, 10, 20);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  movePad();
  drawPad();
  drawDrops();
  updateDrops();
  drawScore();
  requestAnimationFrame(gameLoop);
}

setInterval(createDrop, 1000);
gameLoop();

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") pad.moveLeft = true;
  if (e.key === "ArrowRight") pad.moveRight = true;
});

document.addEventListener("keyup", e => {
  if (e.key === "ArrowLeft") pad.moveLeft = false;
  if (e.key === "ArrowRight") pad.moveRight = false;
});
