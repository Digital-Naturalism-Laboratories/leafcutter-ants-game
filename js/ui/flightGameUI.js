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
jungle_background_front_trees.src = 'images/Backgrounds/Jungle_Background_Front_Trees.png';
jungle_background_middle_trees.src = 'images/Backgrounds/Jungle_Background_Middle_Trees.png';
jungle_background_back_trees.src = 'images/Backgrounds/Jungle_Background_Back_Trees.png';
jungle_background_sky.src = 'images/Backgrounds/Jungle_Background_Sky.png';

var flyingGameSFX = [
  document.createElement('audio')
]

var flyingGameSFXPaths = [
  "audio/SFX/Collecting A Mate.wav"
]

//SFX Indexes
var SFX_MATING = 0;

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

  for (let i = 0; i < flyingGameSFX.length; i++) {
    flyingGameSFX[i].setAttribute('src', flyingGameSFXPaths[i]);
    flyingGameSFX[i].volume = 1;
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
  renderer.font = (30 * pixelSize) + "px SmallBoldPixel";
  renderer.fillText("Mates: " + mateCount, 25 * pixelSize, 25 * pixelSize);

  renderer.fillText("Genetic Diversity: ", 25 * pixelSize, 75  * pixelSize);
  renderer.fillText("Energy: ", 140 * pixelSize, 50  * pixelSize);

  //draw genetic diversity bar
  renderer.fillStyle = 'blue';
  renderer.fillRect(225 * pixelSize, 58 * pixelSize, energyBarLength * pixelSize, 20 * pixelSize);
  renderer.beginPath();
  renderer.strokeStyle = 'white';
  renderer.rect(225 * pixelSize, 58 * pixelSize, 100 * pixelSize, 20 * pixelSize);
  renderer.stroke();

  //draw energy bar
  renderer.fillStyle = 'green';
  renderer.fillRect(225 * pixelSize, 32 * pixelSize, energyBarLength * pixelSize, 20 * pixelSize);
  renderer.beginPath();
  renderer.strokeStyle = 'white';
  renderer.rect(225 * pixelSize, 32 * pixelSize, 100 * pixelSize, 20 * pixelSize);
  renderer.stroke();

  //colorRect(20 * pixelSize, 20 * pixelSize, 100 * pixelSize, 50 * pixelSize, 'white');
  //renderer.fillStyle = "black";
  //renderer.font = (24 * pixelSize) + "px SmallBoldPixel";
  //renderer.fillText("Exit Game", 25 * pixelSize, 50 * pixelSize);
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
    resetColonySimGame();
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