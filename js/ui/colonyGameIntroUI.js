const COLONYGAMEINTROUI = 5;
var colonyGameIntroUI = [];

//var colonyInfoScreenSprite;
var colonyInfoScreenSprites = [];
var colonyAnimationFrameLength = 6;
var colonyAnimationFrameCount = 29;
var colonyAnimationFrameCurrent = 0;
var colonyAnimationTimer = 0

var colonyGameIntroStartDelay = 60;

function setupColonyGameIntroUI() {

  colonyInfoScreenSprites.push(new Sprite(tr(vec2(gameWidth / 2, gameHeight / 2), vec2(gameWidth / 1000, gameHeight / 750)),
  new ImageObject("images/Animations/info_screen_colony_spritesheet_ES.png", vec2(1000, 750))));

  colonyInfoScreenSprites.push(new Sprite(tr(vec2(gameWidth / 2, gameHeight / 2), vec2(gameWidth / 1000, gameHeight / 750)),
    new ImageObject("images/Animations/info_screen_colony_spritesheet.png", vec2(1000, 750))));

  bgmColony.setAttribute('src', 'audio/Intro Music.mp3');
  bgmColony.loop = true;
  bgmColony.volume = 0.6;
}

function colonyAnimateSprite(sprite, frameLength, framerameCount) {

  var animationSprite = sprite;
  var animationFrameLength = frameLength;
  var animationFrameCount = framerameCount;

  var inSize = {
    x: 1000,
    y: 750
  }
  var inPos = {
    x: (colonyAnimationFrameCurrent * inSize.x),
    y: 0
  }

  if (colonyAnimationTimer > animationFrameLength - 1) {
    colonyAnimationFrameCurrent++
    colonyAnimationTimer = 0;
  }

  if (colonyAnimationFrameCurrent >= animationFrameCount) {
    colonyAnimationFrameCurrent = 0;
  }

  colonyAnimationTimer++
  animationSprite.drawScIn(inPos, inSize);

}

function colonyGameIntroUICustomDraw(deltaTime) {
  colonyGameIntroStartDelay--;
  colonyAnimateSprite(colonyInfoScreenSprites[currentLanguage], colonyAnimationFrameLength, colonyAnimationFrameCount);
}

function colonyGameIntroUICustomEvents(deltaTime) {
  if (userInteracted && !bgmColony.isPlaying)
    bgmColony.play();

  if (isTouched && colonyGameIntroStartDelay <= 0) {
    lastTouchPos = {
      x: touchPos[0].x - canvas.getBoundingClientRect().left,
      y: touchPos[0].y - canvas.getBoundingClientRect().top
    }

    colonyGameIntroStartDelay = 60;
    ui.stateIndex = COLONYGAMEUI;
  }
}