const COLONYGAMEINTROUI = 5;
var colonyGameIntroUI = [];

//var colonyInfoScreenSprite;
var colonyInfoScreenSprites = [];
var colonyInfoScreenSprites2 = [];
var colonyAnimationFrameLength = 6;
var colonyAnimationFrameCount = 29;
var newColonyAnimationFrameCount = 23;
var colonyAnimationFrameCurrent = 0;
var colonyAnimationTimer = 0

const COLONY_INFO_SCREEN = 0;
const COLONY_INSTRUCTIONS_SCREEN = 1;
var colonyCurrentScreen = COLONY_INFO_SCREEN;

var colonyGameIntroStartDelay = 60;

function setupColonyGameIntroUI() {

  colonyInfoScreenSprites.push(new Sprite(tr(vec2(gameWidth / 2, gameHeight / 2), vec2(gameWidth / 1000, gameHeight / 750)),
    new ImageObject("images/Animations/info_screen_colony_new_spritesheet.png", vec2(1000, 750))));

  colonyInfoScreenSprites.push(new Sprite(tr(vec2(gameWidth / 2, gameHeight / 2), vec2(gameWidth / 1000, gameHeight / 750)),
    new ImageObject("images/Animations/info_screen_colony_new_spritesheet.png", vec2(1000, 750))));

  colonyInfoScreenSprites2.push(new Sprite(tr(vec2(gameWidth / 2, gameHeight / 2), vec2(gameWidth / 1000, gameHeight / 750)),
    new ImageObject("images/Animations/info_screen_colony_spritesheet.png", vec2(1000, 750))));

  colonyInfoScreenSprites2.push(new Sprite(tr(vec2(gameWidth / 2, gameHeight / 2), vec2(gameWidth / 1000, gameHeight / 750)),
    new ImageObject("images/Animations/info_screen_colony_spritesheet.png", vec2(1000, 750))));

  //fix for english title on sencond ES colony info screen
  titleESSprite = new Sprite(tr(vec2(gameWidth / 2, 40 * pixelSize), vec2(gameWidth / 1000, gameHeight / 750)),
    new ImageObject("images/Animations/info_screen_colony_spritesheet_ES.png", vec2(1000, 750)));

  bgmColony.setAttribute('src', 'audio/Intro Music.mp3');
  bgmColony.loop = true;
  bgmColony.volume = 0.1;
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
    y: (colonyCurrentScreen * inSize.y)
  }

  //fix for english title on sencond ES colony info screen
  var titleInSize = {
    x: 1000,
    y: 120
  }

  //fix for english title on sencond ES colony info screen
  var titleInPos = {
    x: (colonyAnimationFrameCurrent * titleInSize.x),
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

  //fix for english title on sencond ES colony info screen
  if (currentLanguage == ESPAÑOL && workerScreenDismissed) titleESSprite.drawScIn(titleInPos, titleInSize);
}

function colonyGameIntroUIResize() {
  for (let i = 0; i < colonyInfoScreenSprites.length; i++) {
    colonyInfoScreenSprites[i].transform.position = vec2(gameWidth / 2, gameHeight / 2);
    colonyInfoScreenSprites[i].transform.scale = vec2(gameWidth / 1000, gameHeight / 750);
    titleESSprite.transform.position = vec2(gameWidth / 2, 40 * pixelSize);
    titleESSprite.transform.scale = vec2(gameWidth / 1000, gameHeight / 750);
  }
}

function colonyGameIntroUICustomDraw(deltaTime) {
  colonyGameIntroStartDelay--;

  if (workerScreenDismissed) {
    colonyAnimateSprite(colonyInfoScreenSprites2[currentLanguage], colonyAnimationFrameLength, colonyAnimationFrameCount);
  } else {
    colonyAnimateSprite(colonyInfoScreenSprites[currentLanguage], colonyAnimationFrameLength, newColonyAnimationFrameCount);
  }
}

function colonyGameIntroUICustomEvents(deltaTime) {
  if (userInteracted && !bgmColony.isPlaying)
    bgmColony.play();

  if (isTouched && colonyGameIntroStartDelay <= 0) {
    lastTouchPos = {
      x: touchPos[0].x - canvas.getBoundingClientRect().left,
      y: touchPos[0].y - canvas.getBoundingClientRect().top
    }

    if (colonyCurrentScreen === COLONY_INFO_SCREEN && !workerScreenDismissed) {
      colonyGameIntroStartDelay = 60;
      //colonyCurrentScreen = COLONY_INSTRUCTIONS_SCREEN;
      ui.stateIndex = COLONYGAMEUI;
    } else if (colonyCurrentScreen === COLONY_INFO_SCREEN && workerScreenDismissed) {
      colonyGameIntroStartDelay = 60;
      colonyCurrentScreen = COLONY_INSTRUCTIONS_SCREEN;
    } else if (colonyCurrentScreen === COLONY_INSTRUCTIONS_SCREEN && workerScreenDismissed) {
      colonyGameIntroStartDelay = 60;
      //banner = new ColonyMessageBanner();
      ui.stateIndex = COLONYGAMEUI;
    }

    //colonyGameIntroStartDelay = 60;
    //ui.stateIndex = COLONYGAMEUI;
  }
}