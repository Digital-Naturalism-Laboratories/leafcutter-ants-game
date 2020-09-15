const COLONYGAMEUI = 2;
var colonyGameUI = [];

var colonyInfoScreenSprite;
var colonyAnimationFrameLength = 6;
var colonyAnimationFrameCount = 29;
var colonyAnimationFrameCurrent = 0;
var colonyAnimationTimer = 0

//Image variables
var groundBG = document.createElement('img');
var grassLayer = document.createElement('img');
var worker_right = document.createElement('img');
var worker_with_minims = document.createElement('img');
var top_mound = document.createElement('img');
var fullscreen_button = document.createElement('img');
var mute_button = document.createElement('img');
var unmute_button = document.createElement('img');

var egg_single = document.createElement('img');
var egg_cluster = document.createElement('img');
var egg_many = document.createElement('img');
var egg_pupae_normal = document.createElement('img');
var egg_pupae_large = document.createElement('img');

//SFX variables
var bgmColony = document.createElement('audio');
var colonyGameSFX = [
  document.createElement('audio'),
  document.createElement('audio'),
  document.createElement('audio'),
]

var colonyGameSFXPaths = [
  "audio/SFX/Digging Sound.wav",
  "audio/SFX/Eating Fungus.wav",
  "audio/SFX/Minigame Trigger.wav",
]

//SFX Indexes
var SFX_DIGGING = 0;
var SFX_EATING = 1;
var SFX_TRIGGER = 2;

var fungus_col = 23;
var fungus_row = 8;

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
var eggClusters = [];
var colonyWingedQueens = [];
var colonyWingedMales = [];

//var previousTunneledTileCount = 0;

var banner;

var circleIndicatorTimer = 60;

function setupColonyGameUI() {

  createGrid();
  setDistFromFungusOnEachColonyNode();
  previousTunneledTileCount = getTunneledTileCount();

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

  for (var i = 0; i < eggChamberGridCoords.length; i++) {
    new EggCluster(eggChamberGridCoords[i].col, eggChamberGridCoords[i].row, eggChamberGridCoords[i].offset);
  }

  //initialize BGM
  bgmColony.setAttribute('src', 'audio/Intro Music.mp3');
  bgmColony.loop = true;
  bgmColony.volume = 0.1;

  for (let i = 0; i < colonyGameSFX.length; i++) {
    colonyGameSFX[i].setAttribute('src', colonyGameSFXPaths[i]);
    colonyGameSFX[i].volume = 0.25;
  }

}

function colonyGameUIResize() {
  queen.resize();
  fungus.resize();

  if (workers != "undefined") {
    for (var i = 0; i < workers.length; i++) {
      workers[i].resize();
    }
  }

  if (colonyAnts != "undefined") {
    for (var i = 0; i < colonyAnts.length; i++) {
      colonyAnts[i].resize();
    }
  }

  if (eggClusters != "undefined") {
    for (var i = 0; i < eggClusters.length; i++) {
      eggClusters[i].resize();
    }
  }

  if (colonyGridNodes != "undefined") {
    for (var i = 0; i < colonyGridNodes.length; i++) {
      for (var j = 0; j < colonyGridNodes[i].length; j++) {
        colonyGridNodes[i][j].resize();
      }
    }
  }
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
  }
  colonyAnimationTimer++
  animationSprite.drawScIn(inPos, inSize);
}

function resetColonySimGame() {

  colonyGrid = [];
  createGrid();
  setDistFromFungusOnEachColonyNode();

  totalMilliseconds = 0;
  previousEggTotal += colony.totalEggsLaid
  colony = new Colony();

  eggClusters = [];
  colonyWingedQueens = [];
  colonyWingedMales = [];

  for (i = 0; i < colonyAnts.length; i++) {
    colonyAnts[i].killAnt();
  }

  for (i = 0; i < colonyGameUI.length; i++) {
    if (colonyGameUI[i].constructor.name == "ColonyWingedQueen") {
      colonyGameUI.splice(i, 1);
    }
  }

  for (i = 0; i < colony.population; i++) {
    new ColonyAnt(fungus.gridCoord.col, fungus.gridCoord.row, 0);
  }

  for (var i = 0; i < eggChamberGridCoords.length; i++) {
    new EggCluster(eggChamberGridCoords[i].col, eggChamberGridCoords[i].row, eggChamberGridCoords[i].offset);
  }

  queen.sprite = new Sprite(tr(vec2(gameWidth * 0.65, 5), vec2(pixelSize * 0.3, pixelSize * 0.3)), new ImageObject("images/Animations/Queen_Fly_250px_Spritesheet.png", vec2(0, 0)));
  queen.pixelCoord = vec2(gameWidth * 0.65, 5);
  queen.movementState = queen.movementStates.LANDING;
  //reset appropriate stats from colony object
}

function colonyGameUICustomDraw(deltaTime) {

  renderer.drawImage(groundBG, 0, -(groundBG.height * 0.35 * pixelSize), gameWidth, gameHeight * 0.95);
  renderer.drawImage(grassLayer, 0, -(groundBG.height * 0.20 * pixelSize), gameWidth, gameHeight * 0.35);

  if (queen.movementState != queen.movementStates.LANDING &&
    queen.movementState != queen.movementStates.LANDED &&
    queen.movementState != queen.movementStates.REMOVINGLEFTWING &&
    queen.movementState != queen.movementStates.REMOVINGRIGHTWING) {
    renderer.drawImage(top_mound, gameWidth * 0.59, 5 * pixelSize, (top_mound.width / 2) * pixelSize, (top_mound.height / 2) * pixelSize);
  }

  drawColonyTiles();

  if (queen.movementState == queen.movementStates.IDLE) {
    fungus.draw();

    renderer.fillStyle = 'white';
    renderer.textAlign = 'center';
    renderer.font = (20 * pixelSize) + "px SmallBoldPixel";
    renderer.fillText(string_CLICK_WORKERS[currentLanguage], gameWidth / 2, 65 * pixelSize);
  }

  if (colonyWingedQueens.length > 0) {
    renderer.fillStyle = 'white';
    renderer.textAlign = 'center';
    renderer.font = (20 * pixelSize) + "px SmallBoldPixel";
    renderer.fillText(string_CLICK_QUEEN[currentLanguage], gameWidth / 2, 75 * pixelSize);
  }

  for (var i = 0; i < colonyAnts.length; i++) {
    colonyAnts[i].draw();
  }

  for (var i = 0; i < eggClusters.length; i++) {
    eggClusters[i].draw();
  }

  for (var i = 0; i < colonyWingedQueens.length; i++) {
    colonyWingedQueens[i].draw();
  }

  for (var i = 0; i < colonyWingedMales.length; i++) {
    colonyWingedMales[i].draw();
  }

  drawStatsBlock();
  banner.draw();

}

function colonyGameUICustomUpdate(deltaTime) {

  if (queen.movementState == queen.movementStates.IDLE) {
    
    totalMilliseconds += deltaTime;
    totalCycles = Math.floor(totalMilliseconds / cycleLength);

    colony.update();

    if (colonyWingedQueens.length < colony.femaleReproductiveCount && colony.femaleReproductiveCount < visibleEggClusterCount) {
      for (var i = 0; i < colony.femaleReproductiveCount;) {
        var randomEggClusterIndex = getRandomInt(0, eggClusters.length);
        if (eggClusters[randomEggClusterIndex].isVisible) {
          new ColonyWingedQueen(eggClusters[randomEggClusterIndex].gridCoord.col, eggClusters[randomEggClusterIndex].gridCoord.row);
          i++;
        }
      }
    }

    if (colonyWingedMales.length < colony.maleReproductiveCount && colony.maleReproductiveCount < visibleEggClusterCount) {
      for (var i = 0; i < colony.maleReproductiveCount;) {
        var randomEggClusterIndex = getRandomInt(0, eggClusters.length);
        if (eggClusters[randomEggClusterIndex].isVisible) {
          new ColonyWingedMale(eggClusters[randomEggClusterIndex].gridCoord.col, eggClusters[randomEggClusterIndex].gridCoord.row);
          i++;
        }
      }
    }

    for (var i = 0; i < colonyAnts.length; i++) {
      colonyAnts[i].update();
    }

    for (var i = 0; i < colonyWingedQueens.length; i++) {
      colonyWingedQueens[i].update();
    }

    for (var i = 0; i < colonyWingedMales.length; i++) {
      colonyWingedMales[i].update();
    }

    visibleEggClusterCount = 0;
    for (var i = 0; i < eggClusters.length; i++) {
      eggClusters[i].update();
    }

    fungus.update();

  }
  banner.update();

}

function colonyGameUICustomEvents(deltaTime) {

  circleIndicatorTimer--
  if (circleIndicatorTimer <= 0) {
    circleIndicatorTimer = 60;
  }

  if (userInteracted && !bgmColony.isPlaying)
    bgmColony.play();

  if (isTouched) {
    lastTouchPos = {
      x: touchPos[0].x - canvas.getBoundingClientRect().left,
      y: touchPos[0].y - canvas.getBoundingClientRect().top
    }

    //defenseGameButton.handleInput(lastTouchPos);

    //if (getDistBtwVec2(vec2((colonyTiles[COLONY_TUNNEL_VERT].width * 13) * pixelSize, (colonyTiles[COLONY_TUNNEL_VERT].height + 20) * pixelSize), vec2(touchPos[0].x - canvas.getBoundingClientRect().left, touchPos[0].y - canvas.getBoundingClientRect().top)) < 40 * pixelSize) {
    //  bgmColony.pause();
    //  bgmColony.currentTime = 0;

    //  ui.stateIndex = DEFENSEGAMEUI;
    //}

    for (var i = 0; i < colonyWingedQueens.length; i++) {
      colonyWingedQueens[i].event();
    }

    for (var i = 0; i < colonyWingedMales.length; i++) {
      colonyWingedMales[i].event();
    }

    for (var i = 0; i < eggClusters.length; i++) {
      eggClusters[i].event();
    }

  }

  //if (getTunneledTileCount() > previousTunneledTileCount) {
  //  colonyGameSFX[SFX_DIGGING].play();
  //}
  //previousTunneledTileCount = getTunneledTileCount();
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
      varName: egg_single,
      fileName: "egg-single.png"
    },
    {
      varName: egg_cluster,
      fileName: "egg-cluster.png"
    },
    {
      varName: egg_many,
      fileName: "egg-many.png"
    },
    {
      varName: egg_pupae_normal,
      fileName: "egg-pupae-normal.png"
    },
    {
      varName: egg_pupae_large,
      fileName: "egg-pupae-large.png"
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
      tunnelType: COLONY_TUNNEL_START_INTERIOR,
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
      fileName: "dirt_tile_start_left_wall.png"
    },
    {
      tunnelType: COLONY_TUNNEL_START_UP_WALL,
      fileName: "dirt_tile_start_up_wall.png"
    },
    {
      tunnelType: COLONY_TUNNEL_START_RIGHT_WALL,
      fileName: "dirt_tile_start_right_wall.png"
    },
    {
      tunnelType: COLONY_TUNNEL_START_DOWN_WALL,
      fileName: "dirt_tile_start_down_wall.png"
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