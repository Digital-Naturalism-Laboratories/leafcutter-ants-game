const FLIGHTGAMEUI = 1;
var flightGameUI = [];

mateCount = 0;

var flyingQueen;
var flyingMaleCount = 20;
var flyingMales = [];
var rivalQueenCount = 2;
var rivalQueens = [];
var energyBarLength = 100;
var diversityBarLength = 0;

var placeholder_BG = document.createElement('img');
placeholder_BG.src = 'Visual Assets/placeholder_BG.png';
var BG_image_width = placeholder_BG.width;
var totalSeconds = 0;

var camPanX = 0.0;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X = 10;


function setupFlightGameUI() {
  flyingQueen = new FlyingQueen(0, 0, true);

  for (i = 0; i < flyingMaleCount; i++) {
    flyingMales[i] = new FlyingMale();
  }
  for (i = 0; i < rivalQueenCount; i++) {
    rivalQueens[i] = new FlyingQueen(Math.random() * gameWidth, Math.random() * gameHeight, false);
  }

}

function flightGameUICustomDraw(deltaTime) {

  totalSeconds += deltaTime;
  var vx = 1;
  var numImages = 2;
  var xpos = totalSeconds * vx % gameWidth;

  renderer.save();
  renderer.translate(-xpos, 0);
  for (var i = 0; i < numImages; i++) {
    renderer.drawImage(placeholder_BG, i * gameWidth, 0, gameWidth, gameHeight);
  }
  renderer.restore();


  flyingQueen.draw(deltaTime);

  renderer.fillStyle = "white";
  renderer.font = "34px Arial";
  renderer.fillText("Mates: " + mateCount, 50, gameHeight - 50);

  renderer.fillText("Genetic Diversity: ", gameWidth - 450, gameHeight - 100);
  renderer.fillText("Energy: ", gameWidth - 300, gameHeight - 50);

  renderer.fillStyle = 'blue';
  renderer.fillRect(gameWidth - 150, gameHeight - 125, diversityBarLength, 34);
  renderer.beginPath();
  renderer.strokeStyle = 'white';
  renderer.rect(gameWidth - 150, gameHeight - 125, 100, 34);
  renderer.stroke();

  renderer.fillStyle = 'green';
  renderer.fillRect(gameWidth - 150, gameHeight - 75, energyBarLength, 34);
  renderer.beginPath();
  renderer.strokeStyle = 'white';
  renderer.rect(gameWidth - 150, gameHeight - 75, 100, 34);
  renderer.stroke();

  colorRect(20, 20, 100, 50, 'white');
  renderer.fillStyle = "black";
  renderer.font = "20px Arial";
  renderer.fillText("Exit Game", 25, 50);
}

function flightGameUICustomEvents(deltaTime) {
  if (flyingQueen.movementState == flyingQueen.movementStates.FLYING) {
    energyBarLength -= 0.15;
  }

  if (isTouched) {

    if (getDistBtwVec2(vec2(70, 45), vec2(lastTouchPos.x, lastTouchPos.y)) < 50) {
      ui.stateIndex = COLONYGAMEUI;
    }
  }

  //cameraFollow();

}

function cameraFollow() {
  var cameraFocusCenterX = camPanX + gameWidth / 2;

  var playerDistFromCameraFocusX = Math.abs(flyingQueen.sprite.transform.position.x - cameraFocusCenterX);

  if (playerDistFromCameraFocusX > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X) {
    if (cameraFocusCenterX < flyingQueen.sprite.transform.position.x) {
      camPanX += flyingQueen.horizontalSpeed;
    } else {
      camPanX -= flyingQueen.horizontalSpeed;
    }
  }

}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  renderer.fillStyle = fillColor;
  renderer.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}