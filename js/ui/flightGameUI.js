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

var jungle_background_front_trees = document.createElement('img');
var jungle_background_middle_trees = document.createElement('img');
var jungle_background_back_trees = document.createElement('img');
var jungle_background_sky = document.createElement('img');
jungle_background_front_trees.src = 'images/Backgrounds/jungle_background_front_trees.png';
jungle_background_middle_trees.src = 'images/Backgrounds/jungle_background_middle_trees.png';
jungle_background_back_trees.src = 'images/Backgrounds/jungle_background_back_trees.png';
jungle_background_sky.src = 'images/Backgrounds/jungle_background_sky.png';

var backgrounds = []
backgrounds.push(jungle_background_front_trees);
backgrounds.push(jungle_background_middle_trees);
backgrounds.push(jungle_background_back_trees);
backgrounds.push(jungle_background_sky);

var BG_image_width = jungle_background_sky.width;
var totalMilliseconds = 0;

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

function drawParallaxBackgrounds(deltaTime) {

  totalMilliseconds += deltaTime;
  var vx1 = 0.4; //background1 scroll speed
  var vx2 = 0.3; //background2 scroll speed
  var vx3 = 0.2; //background3 scroll speed
  var vx4 = 0.1; //background4 scroll speed
  var numImages = 2;
  var xpos1 = totalMilliseconds * vx1 % (jungle_background_front_trees.width * (gameHeight / jungle_background_front_trees.height));
  var xpos2 = totalMilliseconds * vx2 % (jungle_background_middle_trees.width * (gameHeight / jungle_background_middle_trees.height));
  var xpos3 = totalMilliseconds * vx3 % (jungle_background_back_trees.width * (gameHeight / jungle_background_back_trees.height));
  var xpos4 = totalMilliseconds * vx4 % (jungle_background_sky.width * (gameHeight / jungle_background_sky.height));

  renderer.save();
  renderer.translate(-xpos4, 0);
  for (var i = 0; i < numImages; i++) {
    renderer.drawImage(jungle_background_sky, i * (jungle_background_sky.width * (gameHeight / jungle_background_sky.height)), 0, jungle_background_sky.width * (gameHeight / jungle_background_sky.height) + 1, gameHeight);
  }
  renderer.restore();

  renderer.save();
  renderer.translate(-xpos3, 0);
  for (var i = 0; i < numImages; i++) {
    renderer.drawImage(jungle_background_back_trees, i * (jungle_background_back_trees.width * (gameHeight / jungle_background_back_trees.height)), 0, jungle_background_back_trees.width * (gameHeight / jungle_background_back_trees.height) + 1, gameHeight);
  }
  renderer.restore();

  renderer.save();
  renderer.translate(-xpos2, 0);
  for (var i = 0; i < numImages; i++) {
    renderer.drawImage(jungle_background_middle_trees, i * (jungle_background_middle_trees.width * (gameHeight / jungle_background_middle_trees.height)), 0, jungle_background_middle_trees.width * (gameHeight / jungle_background_middle_trees.height) + 1, gameHeight);
  }
  renderer.restore();

  renderer.save();
  renderer.translate(-xpos1, 0);
  for (var i = 0; i < numImages; i++) {
    renderer.drawImage(jungle_background_front_trees, i * (jungle_background_front_trees.width * (gameHeight / jungle_background_front_trees.height)), 0, jungle_background_front_trees.width * (gameHeight / jungle_background_front_trees.height) + 1, gameHeight);
  }
  renderer.restore();

}

function flightGameUICustomDraw(deltaTime) {

  drawParallaxBackgrounds(deltaTime);

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
    energyBarLength -= 0.20;
  }

  if (isTouched) {

    if (getDistBtwVec2(vec2(70, 45), vec2(lastTouchPos.x, lastTouchPos.y)) < 50) {
      ui.stateIndex = COLONYGAMEUI;
    }
  }

  if (energyBarLength <= 0 || diversityBarLength >= 100) {
    geneticDiversity = diversityBarLength / 100;
    energyBarLength = 100;
    diversityBarLength = 0;
    mateCount = 0;
    ui.stateIndex = COLONYGAMEUI;
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