const COLONYGAMEUI = 2;
var colonyGameUI = [];

//var isAtInfoScreen = false;
var colonyInfoScreenSprite;
var colonyAnimationFrameLength = 6;
var colonyAnimationFrameCount = 29;
var colonyAnimationFrameCurrent = 0;
var colonyAnimationTimer = 0

//Image variables
var groundBG = document.createElement('img');
var grassLayer = document.createElement('img');
var fungusNest = document.createElement('img');
var worker_right = document.createElement('img');
var worker_with_minims = document.createElement('img');
var top_mound = document.createElement('img');
var fullscreen_button = document.createElement('img');
var mute_button = document.createElement('img');
var unmute_button = document.createElement('img');

//SFX variables
var bgmColony = document.createElement('audio');

var fungus_col = 23;
var fungus_row = 7;

// variables from the mini-games that affect colony growth
var geneticDiversity = 0; //from flying game
var leafMaterial = 0; //from leaf cutting game
var badFungusFromLeaves = 0; //from defense game
var timeToReturnWithLeaves = 0; //from defense game
var infectedAntsReturning = 0; //from defense game

var totalMilliseconds = 0;
var cycleLength = 1000; //in ms
var totalCycles = 0;
var colony;
var fungusMass = 5; //grams
var incomingLeaves = 0; //grams
var previousEggTotal = 0;

var deadAnts = [];
var workerCount = 6;
var colonyAntCount = 50;
var workers = [];
var colonyAnts = [];
var eggCount = 0;
var larvaeCount = 0;

//var introTimer = 5000;

var banner;

function setupColonyGameUI() {

  createGrid();
  setDistFromFungusOnEachColonyNode();

  loadImages();
  fungus = new Fungus(fungus_col, fungus_row);
  queen = new Queen(fungus_col, fungus_row, (GRID_NODE_SIZE * 11));
  colony = new Colony();
  banner = new ColonyMessageBanner();

  for (i = 0; i < workerCount; i++) {
    workers[i] = new ColonyWorkerAnt(COLONY_COLS / workerCount * i, 1);
  }

  for (i = 0; i < colony.population; i++) {
    new ColonyAnt(fungus.gridCoord.col, fungus.gridCoord.row, 0);
  }

  //initialize BGM
  bgmColony.setAttribute('src', 'audio/Intro Music.mp3');
  bgmColony.loop = true;
  bgmColony.volume = 0.6;

  colonyInfoScreenSprite = new Sprite(tr(vec2(gameWidth / 2, gameHeight / 2), vec2(gameWidth / 1000, gameHeight / 750)),
    new ImageObject("images/Animations/info_screen_colony_spritesheet.png", vec2(1000, 750)));
}

function animateSprite(sprite, frameLength, framerameCount) {

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
    //isAtInfoScreen = false;
  }
  colonyAnimationTimer++
  animationSprite.drawScIn(inPos, inSize);

  //if (isTouched) {
  //  isAtInfoScreen = false;
  //}

}

function resetColonySimGame() {
  totalMilliseconds = 0;
  previousEggTotal += colony.totalEggsLaid
  colony = new Colony();
  colonyGrid = [];
  createGrid();
  setDistFromFungusOnEachColonyNode();

  for (i = 0; i < colonyAnts.length; i++) {
    colonyAnts[i].killAnt();
  }
  for (i = 0; i < colony.population; i++) {
    new ColonyAnt(fungus.gridCoord.col, fungus.gridCoord.row, 0);
  }
  //reset appropriate stats from colony object
}

function colonyGameUICustomDraw(deltaTime) {

  //if (isAtInfoScreen) {
  //console.log(isAtInfoScreen);
  //animateSprite(colonyInfoScreenSprite, colonyAnimationFrameLength, colonyAnimationFrameCount);
  //} else {

  console.log(leafMaterial);

  fungus.update();
  colony.update();
  for (i = 0; i < colonyAnts.length; i++) {
    colonyAnts[i].update();
  }
  banner.update();

  totalMilliseconds += deltaTime;
  totalCycles = Math.floor(totalMilliseconds / cycleLength);
  console.log("Total Cycles: " + totalCycles);
  //console.log("Ant Age" + colonyAnts[0].age);

  //colony.population = (Math.floor(totalCycles + (1 * geneticDiversity)) - colony.deadCount);

  renderer.drawImage(groundBG, 0, -(groundBG.height * 0.35 * pixelSize), gameWidth, gameHeight * 0.95);
  renderer.drawImage(grassLayer, 0, -(groundBG.height * 0.20 * pixelSize), gameWidth, gameHeight * 0.35);
  renderer.drawImage(top_mound, (GRID_NODE_SIZE * 18.4) * pixelSize, 5 * pixelSize, (top_mound.width / 2) * pixelSize, (top_mound.height / 2) * pixelSize);

  drawColonyTiles();
  //renderer.drawImage(fungusNest, gameWidth * 0.75, gameHeight * 0.4, gameWidth / 10, gameHeight / 10);

  renderer.fillStyle = 'black';
  //renderer.fillRect(0, gameHeight - (120 * pixelSize), gameWidth, 120 * pixelSize);

  fungus.draw();

  drawStatsBlock();
  banner.draw();

  //test circle
  //colorCircle(gameWidth - (50 * pixelSize), 100 * pixelSize, 30 * pixelSize)
  //}

}

function colonyGameUICustomEvents(deltaTime) {
  if (userInteracted && !bgmColony.isPlaying)
    bgmColony.play();

  if (isTouched) {
    lastTouchPos = {
      x: touchPos[0].x - canvas.getBoundingClientRect().left,
      y: touchPos[0].y - canvas.getBoundingClientRect().top
    }

    if (getDistBtwVec2(vec2((colonyTiles[COLONY_TUNNEL_VERT].width * 13) * pixelSize, (colonyTiles[COLONY_TUNNEL_VERT].height + 20) * pixelSize), vec2(touchPos[0].x - canvas.getBoundingClientRect().left, touchPos[0].y - canvas.getBoundingClientRect().top)) < 40 * pixelSize) {
      bgmColony.pause();
      bgmColony.currentTime = 0;

      ui.stateIndex = DEFENSEGAMEUI;
    }

    //click to mute/unmute
    if (getDistBtwVec2(vec2(gameWidth - (50 * pixelSize), 100 * pixelSize), vec2(lastTouchPos.x, lastTouchPos.y)) < 50) {
      defenseGame.audioManager.toggleMuteForAllAudioTags();
    }

    //click to enable fullscreen
    if (getDistBtwVec2(vec2(gameWidth - (50 * pixelSize), 50 * pixelSize), vec2(lastTouchPos.x, lastTouchPos.y)) < 50) {
      enableFullScreen(canvas);

      //reset screen size variables to new screen size
      gameWidth = window.innerWidth;
      gameHeight = window.innerHeight;

      sizeFactor = 0;
      if (gameWidth / gameHeight > 1.25) {
        sizeFactor = gameHeight;
        gameWidth = gameHeight + (gameHeight / 4);
      } else {
        sizeFactor = gameWidth - (gameWidth / 4);
        gameHeight = gameWidth - (gameWidth / 4);
      }

      pixelSize = sizeFactor / 500.0;

      canvas.width = gameWidth;
      canvas.height = gameHeight;
      canvas.style.position = "absolute";
      canvasStartY = (window.innerHeight / 2) - (gameHeight / 2);
      canvas.style.top = canvasStartY.toString() + "px";
      canvasStartX = (window.innerWidth / 2) - (gameWidth / 2);
      canvas.style.left = canvasStartX.toString() + "px";
    }

  }
}

//#region Image Loading

function beginLoadingImage(imgVar, fileName) {
  imgVar.src = "images/" + fileName;
}

function loadImageForColonyTileCode(tunnelCode, fileName) {
  colonyTiles[tunnelCode] = document.createElement("img");
  beginLoadingImage(colonyTiles[tunnelCode], fileName);
}

function loadImages() {

  var imageList = [{
      varName: groundBG,
      fileName: "Backgrounds/Ground_Cross_Section.png"
    },
    {
      varName: grassLayer,
      fileName: "Backgrounds/grassLayer2.png"
    },
    {
      varName: fungusNest,
      fileName: "Fungus_Nest.png"
    },
    {
      varName: worker_right,
      fileName: "8bit-just-Worker-Right.png"
    },
    {
      varName: worker_with_minims,
      fileName: "8bit_Worker_With_Minims.png"
    },
    {
      varName: top_mound,
      fileName: "Top_Mound.png"
    },
    {
      varName: fullscreen_button,
      fileName: "Game-UI-Fullscreen.png"
    },
    {
      varName: mute_button,
      fileName: "Game-UI-mute.png"
    },
    {
      varName: unmute_button,
      fileName: "Game-UI-unmute.png"
    },
    {
      tunnelType: COLONY_TUNNEL_VERT,
      fileName: "tunnel_tile_vert.png"
    },
    {
      tunnelType: COLONY_TUNNEL_HOR,
      fileName: "tunnel_tile_hor.png"
    },
    {
      tunnelType: COLONY_TUNNEL_4WAY,
      fileName: "dirt_tile.png"
    },
    {
      tunnelType: COLONY_TUNNEL_START_VERT,
      fileName: "tunnel_tile_vert.png"
    },
    {
      tunnelType: COLONY_TUNNEL_START_HOR,
      fileName: "tunnel_tile_hor.png"
    },
    {
      tunnelType: COLONY_TUNNEL_START_LEFT_WALL,
      fileName: "dirt_tile_left_wall.png"
    },
    {
      tunnelType: COLONY_TUNNEL_START_UP_WALL,
      fileName: "dirt_tile_up_wall.png"
    },
    {
      tunnelType: COLONY_TUNNEL_START_RIGHT_WALL,
      fileName: "dirt_tile_right_wall.png"
    },
    {
      tunnelType: COLONY_TUNNEL_START_DOWN_WALL,
      fileName: "dirt_tile_down_wall.png"
    },
    {
      tunnelType: COLONY_TUNNEL_START_CORNER_DOWN_RIGHT,
      fileName: "dirt_tile_corner_down_right.png"
    },
    {
      tunnelType: COLONY_TUNNEL_START_CORNER_DOWN_LEFT,
      fileName: "dirt_tile_corner_down_left.png"
    },
    {
      tunnelType: COLONY_TUNNEL_START_CORNER_UP_LEFT,
      fileName: "dirt_tile_corner_up_left.png"
    },
    {
      tunnelType: COLONY_TUNNEL_START_CORNER_UP_RIGHT,
      fileName: "dirt_tile_corner_up_right.png"
    },
    {
      tunnelType: COLONY_TUNNEL_CORNER_DOWN_RIGHT,
      fileName: "dirt_tile_corner_down_right.png"
    },
    {
      tunnelType: COLONY_TUNNEL_CORNER_DOWN_LEFT,
      fileName: "dirt_tile_corner_down_left.png"
    },
    {
      tunnelType: COLONY_TUNNEL_CORNER_UP_LEFT,
      fileName: "dirt_tile_corner_up_left.png"
    },
    {
      tunnelType: COLONY_TUNNEL_CORNER_UP_RIGHT,
      fileName: "dirt_tile_corner_up_right.png"
    },
    {
      tunnelType: COLONY_TUNNEL_LEFT_WALL,
      fileName: "dirt_tile_left_wall.png"
    },
    {
      tunnelType: COLONY_TUNNEL_UP_WALL,
      fileName: "dirt_tile_up_wall.png"
    },
    {
      tunnelType: COLONY_TUNNEL_RIGHT_WALL,
      fileName: "dirt_tile_right_wall.png"
    },
    {
      tunnelType: COLONY_TUNNEL_DOWN_WALL,
      fileName: "dirt_tile_down_wall.png"
    }
  ];

  picsToLoad = imageList.length;

  for (var i = 0; i < imageList.length; i++) {
    if (imageList[i].tunnelType != undefined) {
      loadImageForColonyTileCode(imageList[i].tunnelType, imageList[i].fileName);
    } else {
      beginLoadingImage(imageList[i].varName, imageList[i].fileName);
    }
  }

}

//#endregion Image Loading