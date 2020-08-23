const DEFENSEGAMEINTROUI = 8;
var defenseGameIntroUI = [];

var defenseInfoScreenSprite;
var defenseAnimationFrameLength = 6;
var defenseAnimationFrameCount = 29;
var defenseAnimationFrameCurrent = 0;
var defenseAnimationTimer = 0

const DEFENSE_INFO_SCREEN = 0;
const DEFENSE_INSTRUCTIONS_SCREEN = 1;
var defenseCurrentScreen = DEFENSE_INFO_SCREEN;

var defenseIntroStartDelay = 60;

function setupDefenseGameIntroUI() {


  defenseInfoScreenSprite = new Sprite(tr(vec2(gameWidth / 2, gameHeight / 2), vec2(gameWidth / 1000, gameHeight / 750)),
    new ImageObject("images/Animations/info_screen_defense_spritesheet.png", vec2(1000, 750)));

  //bgmDefensegame.setAttribute('src', 'audio/Intro Music.mp3');
  //bgmDefensegame.loop = true;
  //bgmDefensegame.volume = 0.6;

}

function defenseGameAnimateSprite(sprite, frameLength, framerameCount) {

  var animationSprite = sprite;
  var animationFrameLength = frameLength;
  var animationFrameCount = framerameCount;

  var inSize = {
    x: 1000,
    y: 750
  }
  var inPos = {
    x: (defenseAnimationFrameCurrent * inSize.x),
    y: (defenseCurrentScreen * inSize.y)
  }

  if (defenseAnimationTimer > animationFrameLength - 1) {
    defenseAnimationFrameCurrent++
    defenseAnimationTimer = 0;
  }

  if (defenseAnimationFrameCurrent >= animationFrameCount) {
    defenseAnimationFrameCurrent = 0;
  }

  defenseAnimationTimer++
  animationSprite.drawScIn(inPos, inSize);

}

function defenseGameIntroUICustomDraw(deltaTime) {
  defenseIntroStartDelay--;
  defenseGameAnimateSprite(defenseInfoScreenSprite, defenseAnimationFrameLength, defenseAnimationFrameCount);

}

function defenseGameIntroUICustomEvents(deltaTime) {
  //if (userInteracted && !bgmDefense.isPlaying)
  //  bgmDefense.play();
  //}

  if (isTouched && defenseIntroStartDelay <= 0) {
    lastTouchPos = {
      x: touchPos[0].x - canvas.getBoundingClientRect().left,
      y: touchPos[0].y - canvas.getBoundingClientRect().top
    }

    if (defenseCurrentScreen === DEFENSE_INFO_SCREEN) {
      defenseIntroStartDelay = 60;
      defenseCurrentScreen = DEFENSE_INSTRUCTIONS_SCREEN;
    } else {
      defenseIntroStartDelay = 60;
      ui.stateIndex = DEFENSEGAMEUI;
    }

  }
}