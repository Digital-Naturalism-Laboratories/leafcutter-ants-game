const LEAFCUTTINGINTROUI = 7;
var leafcuttingIntroUI = [];

var cuttingInfoScreenSprites = [];
var cuttingAnimationFrameLength = 6;
var cuttingAnimationFrameCount = 29;
var cuttingAnimationFrameCurrent = 0;
var cuttingAnimationTimer = 0

const CUTTING_INFO_SCREEN = 0;
const CUTTING_INSTRUCTIONS_SCREEN = 1;
var cuttingCurrentScreen = CUTTING_INFO_SCREEN;

var leafcuttingIntroStartDelay = 60;

function setupLeafcuttingIntroUI() {


  cuttingInfoScreenSprites.push(new Sprite(tr(vec2(gameWidth / 2, gameHeight / 2), vec2(gameWidth / 1000, gameHeight / 750)),
  new ImageObject("images/Animations/info_screen_cutting_spritesheet_ES.png", vec2(1000, 750))));
  cuttingInfoScreenSprites.push(new Sprite(tr(vec2(gameWidth / 2, gameHeight / 2), vec2(gameWidth / 1000, gameHeight / 750)),
  new ImageObject("images/Animations/info_screen_cutting_spritesheet.png", vec2(1000, 750))));

  //bgmCutting.setAttribute('src', 'audio/Intro Music.mp3');
  //bgmCutting.loop = true;
  //bgmCutting.volume = 0.6;

}

function leafcuttingAnimateSprite(sprite, frameLength, framerameCount) {

  var animationSprite = sprite;
  var animationFrameLength = frameLength;
  var animationFrameCount = framerameCount;

  var inSize = {
    x: 1000,
    y: 750
  }
  var inPos = {
    x: (cuttingAnimationFrameCurrent * inSize.x),
    y: (cuttingCurrentScreen * inSize.y)
  }

  if (cuttingAnimationTimer > animationFrameLength - 1) {
    cuttingAnimationFrameCurrent++
    cuttingAnimationTimer = 0;
  }

  if (cuttingAnimationFrameCurrent >= animationFrameCount) {
    cuttingAnimationFrameCurrent = 0;
  }

  cuttingAnimationTimer++
  animationSprite.drawScIn(inPos, inSize);

}

function leafcuttingIntroUICustomDraw(deltaTime) {
  leafcuttingIntroStartDelay--;
  leafcuttingAnimateSprite(cuttingInfoScreenSprites[currentLanguage], cuttingAnimationFrameLength, cuttingAnimationFrameCount);

}

function leafcuttingIntroUICustomEvents(deltaTime) {
  //if (userInteracted && !bgmCutting.isPlaying)
  //  bgmCutting.play();
  //}

  if (isTouched && leafcuttingIntroStartDelay <= 0) {
    lastTouchPos = {
      x: touchPos[0].x - canvas.getBoundingClientRect().left,
      y: touchPos[0].y - canvas.getBoundingClientRect().top
    }

    if (cuttingCurrentScreen === CUTTING_INFO_SCREEN) {
      leafcuttingIntroStartDelay = 60;
      cuttingCurrentScreen = CUTTING_INSTRUCTIONS_SCREEN;
    } else {
      leafcuttingIntroStartDelay = 60;
      cuttingCurrentScreen = CUTTING_INFO_SCREEN
      ui.stateIndex = LEAFCUTTINGUI;
    }

  }
}