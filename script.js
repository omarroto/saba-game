// script.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Cargar imágenes
const toallaImg = new Image();
toallaImg.src = "assets/saba.png";

const gotaImg = new Image();
gotaImg.src = "assets/gota_sangre.png";

// Posición inicial de la toalla
let toallaX = canvas.width / 2 - 50;
const toallaY = canvas.height - 80;
const toallaWidth = 100;
const toallaHeight = 50;

// Gotas
let gotas = [];
const gotaWidth = 20;
const gotaHeight = 30;

function crearGota() {
  const x = Math.random() * (canvas.width - gotaWidth);
  gotas.push({ x: x, y: 0 });
}

function moverToalla(e) {
  if (e.key === "ArrowLeft") {
    toallaX -= 20;
  } else if (e.key === "ArrowRight") {
    toallaX += 20;
  }
  toallaX = Math.max(0, Math.min(canvas.width - toallaWidth, toallaX));
}

document.addEventListener("keydown", moverToalla);

function detectarColision(gota) {
  return (
    gota.y + gotaHeight >= toallaY &&
    gota.x < toallaX + toallaWidth &&
    gota.x + gotaWidth > toallaX
  );
}

function dibujar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar toalla
  ctx.drawImage(toallaImg, toallaX, toallaY, toallaWidth, toallaHeight);

  // Dibujar gotas y actualizar posición
  for (let i = 0; i < gotas.length; i++) {
    const gota = gotas[i];
    gota.y += 3;
    ctx.drawImage(gotaImg, gota.x, gota.y, gotaWidth, gotaHeight);

    if (detectarColision(gota)) {
      gotas.splice(i, 1);
      i--;
    } else if (gota.y > canvas.height) {
      gotas.splice(i, 1);
      i--;
    }
  }
}

setInterval(() => {
  crearGota();
}, 1000);

function gameLoop() {
  dibujar();
  requestAnimationFrame(gameLoop);
}

gameLoop();
