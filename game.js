const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const spanLives = document.querySelector("#lives");
const spanTime = document.querySelector("#time");
const spanRecord = document.querySelector("#record");
const pResult = document.querySelector("#result");
const botonReiniciar = document.querySelector("#reset");

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayert;
let timeInterval;

const playerPosition = {
  x: undefined,
  y: undefined,
};

const giftPosition = {
  x: undefined,
  y: undefined,
};

let enemyPositions = [];

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);
botonReiniciar.addEventListener("click", reiniciarJuego);
function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }

  canvasSize = Number(canvasSize.toFixed(0));
  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10.2;

  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function startGame() {
  console.log({ canvasSize, elementsSize });

  game.font = Math.floor(Number(elementsSize)) + "px Poppins";
  game.textAlign = "start";
  game.direction = "rtl";
  game.letterSpacing = canvasSize <= 263 ? "-5px" : "-10px";

  //elemento que corresponde al nivel
  const map = maps[level];
  if (!map) {
    gameWin();
    return;
  }

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
    showRecord();
  }
  // variable: filas del mapa,metodo .trim: limpiar el estrin, quitar los espacios. metodo .split : creando un arreglo a partir de un estrin. ("\n") cada vez que alla un salto de linea
  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));
  console.log({ map, mapRows, mapRowCols });

  showLives();

  enemyPositions = [];

  //vamos a recorrer este array bidimencional
  // forEach() ejecuta la función indicada una vez por cada elemento del arreglo.
  game.clearRect(0, 0, canvasSize, canvasSize);
  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      //coordenadas : tamaño de nuestros elementos , por lo que hay en el indice + 1 para comenzar desde el primer elemento
      //por aqui las coordenades que uno le de para inicio la toma de final
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      if (col == "O") {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log({ playerPosition });
        }
      } else if (col == "I") {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col == "X") {
        enemyPositions.push({
          x: posX,
          y: posY,
        });
      } else if (col == "H") {
        enemyPositions.push({
          x: posX,
          y: posY,
        });
      }

      game.fillText(emoji, posX, posY);
    });
  });

  movePlayer();
}
//metodo toFixed para limitar decimales
function movePlayer() {
  const giftCollisionX =
    playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftCollisionY =
    playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
  const giftCollision = giftCollisionX && giftCollisionY;

  if (giftCollision) {
    levelWin();
  }

  const enemyCollision = enemyPositions.find((enemy) => {
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;
  });

  if (enemyCollision) {
    levelFail();
  }

  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}
window.addEventListener("keydown", moveByKeys);
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

function levelWin() {
  console.log("subiste de nivel");
  level++;
  startGame();
  0;
}

function levelFail() {
  console.log("Chocaste contra un enemigo :(");
  lives--;

  console.log(lives);

  if (lives <= 0) {
    level = 0;
    lives = 3;
    timeStart = undefined;
  }

  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function gameWin() {
  console.log("terminas el juego");
  clearInterval(timeInterval);

  const recordTime = localStorage.getItem("record_time");
  const playerTime = Date.now() - timeStart;
  if (recordTime) {
    if (recordTime >= playerTime) {
      localStorage.setItem("record_time", playerTime);
      pResult.innerHTML = "Superaste el record";
    } else {
      pResult.innerHTML = "No se supero el record";
    }
  } else {
    localStorage.setItem("record_time", playerTime);
    pResult.innerHTML = "Crea un record";
  }
  console.log({ recordTime, playerTime });
}

function showLives() {
  const heartArray = Array(lives).fill(emojis["HEART"]);
  spanLives.innerHTML = "";

  heartArray.forEach((heart) => spanLives.append(heart));
}
function showTime() {
  spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord() {
  spanRecord.innerHTML = localStorage.getItem("record_time");
}

function moveByKeys(event) {
  if (event.key == "ArrowUp") moveUp();
  else if (event.key == "ArrowLeft") moveLeft();
  else if (event.key == "ArrowRight") moveRight();
  else if (event.key == "ArrowDown") moveDown();
}

function moveUp() {
  if (playerPosition.y <= elementsSize) return;
  playerPosition.y -= elementsSize;
  startGame();
}

function moveLeft() {
  if (playerPosition.x == elementsSize) return;
  playerPosition.x -= elementsSize;
  startGame();
}

function moveRight() {
  if (playerPosition.x > canvasSize) return;
  playerPosition.x += elementsSize;
  startGame();
}

function moveDown() {
  if (playerPosition.y == canvasSize) return;
  playerPosition.y += elementsSize;
  startGame();
}

function reiniciarJuego() {
  location.reload();
}
