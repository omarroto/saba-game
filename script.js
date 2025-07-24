const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const toallaImg = new Image();
toallaImg.src = "saba.png";

const gotaImg = new Image();
gotaImg.src = "gota_sangre.png";

let toallaX = 120;
let toallaY = 420;
let gotas = [];

let leftPressed = false;
let rightPressed = false;

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") leftPressed = true;
  if (e.key === "ArrowRight") rightPressed = true;
});
document.addEventListener("keyup", e => {
  if (e.key === "ArrowLeft") leftPressed = false;
  if (e.key === "ArrowRight") rightPressed = false;
});

function crearGota() {
  const x = Math.random() * (canvas.width - 30);
  gotas.push({ x: x, y: -30 });
}

function detectarColision(gota) {
  return (
    gota.y + 30 > toallaY &&
    gota.x + 20 > toallaX &&
    gota.x < toallaX + 60
  );
}

function update() {
  if (leftPressed && toallaX > 0) toallaX -= 5;
  if (rightPressed && toallaX < canvas.width - 60) toallaX += 5;

  for (let i = 0; i < gotas.length; i++) {
    gotas[i].y += 4;

    if (detectarColision(gotas[i])) {
      gotas.splice(i, 1);
      i--;
    } else if (gotas[i].y > canvas.height) {
      gotas.splice(i, 1);
      i--;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(toallaImg, toallaX, toallaY, 60, 80);

  for (let gota of gotas) {
    ctx.drawImage(gotaImg, gota.x, gota.y, 20, 30);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

setInterval(crearGota, 1000);
loop();
