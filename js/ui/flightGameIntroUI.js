const FLIGHTGAMEINTROUI = 6;
var flightGameIntroUI = [];

var flightInfoScreenSprites = [];
var flightAnimationFrameLength = 6;
var flightAnimationFrameCount = 29;
var flightAnimationFrameCurrent = 0;
var flightAnimationTimer = 0

const FLIGHT_INFO_SCREEN = 0;
const FLIGHT_INSTRUCTIONS_SCREEN = 1;
var flightCurrentScreen = FLIGHT_INFO_SCREEN;

var flightGameIntroStartDelay = 60;

function setupFlightGameIntroUI() {


  flightInfoScreenSprites.push(new Sprite(tr(vec2(gameWidth / 2, gameHeight / 2), vec2(gameWidth / 1000, gameHeight / 750)),
  new ImageObject("images/Animations/info_screen_flight_spritesheet_ES.png", vec2(1000, 750))));

  flightInfoScreenSprites.push(new Sprite(tr(vec2(gameWidth / 2, gameHeight / 2), vec2(gameWidth / 1000, gameHeight / 750)),
  new ImageObject("images/Animations/info_screen_flight_spritesheet.png", vec2(1000, 750))));

  //bgmFlight.setAttribute('src', 'audio/Intro Music.mp3');
  //bgmFlight.loop = true;
  //bgmFlight.volume = 0.6;

}

function flightAnimateSprite(sprite, frameLength, framerameCount) {

  var animationSprite = sprite;
  var animationFrameLength = frameLength;
  var animationFrameCount = framerameCount;

  var inSize = {
    x: 1000,
    y: 750
  }
  var inPos = {
    x: (flightAnimationFrameCurrent * inSize.x),
    y: (flightCurrentScreen * inSize.y)
  }

  if (flightAnimationTimer > animationFrameLength - 1) {
    flightAnimationFrameCurrent++
    flightAnimationTimer = 0;
  }

  if (flightAnimationFrameCurrent >= animationFrameCount) {
    flightAnimationFrameCurrent = 0;
  }

  flightAnimationTimer++
  animationSprite.drawScIn(inPos, inSize);

}

function flightGameIntroUICustomDraw(deltaTime) {
  flightGameIntroStartDelay--;
  flightAnimateSprite(flightInfoScreenSprites[currentLanguage], flightAnimationFrameLength, flightAnimationFrameCount);

}

function flightGameIntroUICustomEvents(deltaTime) {
  //if (userInteracted && !bgmFlight.isPlaying)
  //  bgmFlight.play();
  //}

  if (isTouched && flightGameIntroStartDelay <= 0) {
    lastTouchPos = {
      x: touchPos[0].x - canvas.getBoundingClientRect().left,
      y: touchPos[0].y - canvas.getBoundingClientRect().top
    }

    if (flightCurrentScreen === FLIGHT_INFO_SCREEN) {
      flightGameIntroStartDelay = 60;
      flightCurrentScreen = FLIGHT_INSTRUCTIONS_SCREEN;
    } else {
      flightGameIntroStartDelay = 60;
      flightCurrentScreen = FLIGHT_INFO_SCREEN;
      ui.stateIndex = FLIGHTGAMEUI;
    }

  }
}