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
var gameEndTimerLength = 150;
var gameEndTimer = gameEndTimerLength;

var cicadSFXTimer = 0;
var birdsSFXTimer = 400;

var jungle_background_front_trees = document.createElement('img');
var jungle_background_middle_trees = document.createElement('img');
var jungle_background_back_trees = document.createElement('img');
var jungle_background_sky = document.createElement('img');
jungle_background_front_trees.src = 'images/Backgrounds/Jungle_Background_Front_Trees.png';
jungle_background_middle_trees.src = 'images/Backgrounds/Jungle_Background_Middle_Trees.png';
jungle_background_back_trees.src = 'images/Backgrounds/Jungle_Background_Back_Trees.png';
jungle_background_sky.src = 'images/Backgrounds/Jungle_Background_Sky.png';

var flyingGameSFX = [
  document.createElement('audio'),
  document.createElement('audio'),
  document.createElement('audio'),
  document.createElement('audio'),
  document.createElement('audio')
]

var flyingGameSFXPaths = [
  "audio/SFX/Collecting A Mate.mp3",
  "audio/SFX/Ambience - Birds.mp3",
  "audio/SFX/Ambience - Cicadas and Birds.mp3",
  "audio/SFX/Collision With Queen.mp3",
  "audio/SFX/Wings Buzzing.mp3"
]

//SFX Indexes
var SFX_MATING = 0;
var SFX_BIRDS = 1;
var SFX_CICADAS = 2;
var SFX_COLLISION = 3;
var SFX_WINGS = 4;

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
    flyingGameSFX[i].volume = 0.25;
  }

}

function resetFlightGame() {
  flyingQueen.x = flyingQueen.defaultPos.x;
  flyingQueen.y = flyingQueen.defaultPos.y;

  flyingMales = [];
  for (i = 0; i < flyingMaleCount; i++) {
    flyingMales[i] = new FlyingMale();
  }

  rivalQueens = [];
  for (i = 0; i < rivalQueenCount; i++) {
    rivalQueens[i] = new FlyingQueen(Math.random() * gameWidth, Math.random() * gameHeight, false);
  }

  geneticDiversity = diversityBarLength / 100;
  energyBarLength = 100;
  diversityBarLength = 0;
  mateCount = 0;
  gameEndTimer = 180;
}

function flightGameUIResize() {
  flyingQueen.resize();
  for (i = 0; i < flyingMaleCount; i++) {
    flyingMales[i].resize();
  }
  for (i = 0; i < rivalQueenCount; i++) {
    rivalQueens[i].resize();
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

  for (i = 0; i < flyingMaleCount; i++) {
    flyingMales[i].draw();
  }

  //flyingQueen.draw(deltaTime);

  renderer.textAlign = "left";
  renderer.fillStyle = "white";
  renderer.font = (30 * pixelSize) + "px SmallBoldPixel";
  renderer.fillText(string_Mates[currentLanguage] + mateCount, 16 * pixelSize, 25 * pixelSize);

  renderer.fillText(string_GeneticDiversity[currentLanguage], 15 * pixelSize, 75 * pixelSize);
  renderer.fillText(string_Energy[currentLanguage], 140 * pixelSize, 50 * pixelSize);

  //draw genetic diversity bar
  renderer.fillStyle = 'blue';
  renderer.fillRect(230 * pixelSize, 58 * pixelSize, diversityBarLength * pixelSize, 20 * pixelSize);
  renderer.beginPath();
  renderer.strokeStyle = 'white';
  renderer.rect(230 * pixelSize, 58 * pixelSize, 100 * pixelSize, 20 * pixelSize);
  renderer.stroke();

  //draw energy bar
  renderer.fillStyle = 'green';
  renderer.fillRect(230 * pixelSize, 32 * pixelSize, energyBarLength * pixelSize, 20 * pixelSize);
  renderer.beginPath();
  renderer.strokeStyle = 'white';
  renderer.rect(230 * pixelSize, 32 * pixelSize, 100 * pixelSize, 20 * pixelSize);
  renderer.stroke();

  if (gameEndTimer < gameEndTimerLength) {
    renderer.textAlign = "center";
    renderer.fillStyle = "white";
    renderer.font = (60 * pixelSize) + "px SmallBoldPixel";
    renderer.fillText(string_Mates[currentLanguage] + mateCount, gameWidth / 2, gameHeight * 0.33);
    
    if (mateCount >= 9) {
      renderer.fillText(string_GENETIC_DIVERSITY_VERY_HIGH[currentLanguage], gameWidth / 2, gameHeight * 0.45);
      renderer.fillText(string_INCREDIBLE[currentLanguage], gameWidth / 2, gameHeight * 0.55);
    } else if (mateCount >= 6) {
      renderer.fillText(string_GENETIC_DIVERSITY_HIGH[currentLanguage], gameWidth / 2, gameHeight * 0.45);
      renderer.fillText(string_AMAZING_WORK[currentLanguage], gameWidth / 2, gameHeight * 0.55);
    } else if (mateCount >= 4) {
      renderer.fillText(string_GENETIC_DIVERSITY_MEDIUM[currentLanguage], gameWidth / 2, gameHeight * 0.45);
      renderer.fillText(string_GreatJob[currentLanguage], gameWidth / 2, gameHeight * 0.55);
    } else if (mateCount >= 2) {
      renderer.fillText(string_GENETIC_DIVERSITY_LOW[currentLanguage], gameWidth / 2, gameHeight * 0.45);
      renderer.fillText(string_OK[currentLanguage], gameWidth / 2, gameHeight * 0.55);
    } else if (mateCount >= 0) {
      renderer.fillText(string_GENETIC_DIVERSITY_VERY_LOW[currentLanguage], gameWidth / 2, gameHeight * 0.45);
      renderer.fillText(string_KEEP_TRYING[currentLanguage], gameWidth / 2, gameHeight * 0.55);
    } else {
      renderer.fillText(string_TRY_AGAIN[currentLanguage], gameWidth / 2, gameHeight * 0.55);
    }

  }

  if (gameEndTimer < 0) {
    renderer.fillText(string_ClickToContinue[currentLanguage], gameWidth / 2, gameHeight * 0.66);
  }

}

function flightGameUICustomEvents(deltaTime) {

  for (i = 0; i < flyingMaleCount; i++) {
    flyingMales[i].update();
  }

  if (flyingQueen.movementState == flyingQueen.movementStates.FLYING) {
    energyBarLength -= 0.08;
  }

  if (isTouched) {

    if (gameEndTimer <= 0) {
      resetColonySimGame();
      resetFlightGame();
      ui.stateIndex = COLONYGAMEINTROUI;
      gameEndTimer = gameEndTimerLength;
    }

  }

  if (energyBarLength <= 0 || diversityBarLength >= 100) {
    gameEndTimer--;
  }

  if (energyBarLength < 0) energyBarLength = 0;

  cicadSFXTimer--;
  if (!flyingGameSFX[SFX_CICADAS].isPlaying && cicadSFXTimer <= 0) {
    flyingGameSFX[SFX_CICADAS].play();
    cicadSFXTimer = 600;
  }

  birdsSFXTimer--;
  if (!flyingGameSFX[SFX_BIRDS].isPlaying && birdsSFXTimer <= 0) {
    flyingGameSFX[SFX_BIRDS].play();
    birdsSFXTimer = 200;
  }

}
/*
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
*/