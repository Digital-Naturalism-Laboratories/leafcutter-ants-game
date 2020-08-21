const COLONYGAMEUI = 2;
var colonyGameUI = [];

var isGameMuted = false;

var groundBG = document.createElement('img');
var grassLayer = document.createElement('img');
var fungusNest = document.createElement('img');
var worker_right = document.createElement('img');
var worker_with_minims = document.createElement('img');
var top_mound = document.createElement('img');
var fullscreen_button = document.createElement('img');
var mute_button = document.createElement('img');
var unmute_button = document.createElement('img');

var fungus_col = 23;
var fungus_row = 7;

var totalMilliseconds = 0;

var bgmColony = document.createElement('audio');

var row_queue = [];
var col_queue = [];

var direction_row = [-1, 1, 0, 0];
var direction_col = [0, 0, 1, -1];

var move_count = 1;
var nodes_left_in_layer = 1;
var nodes_in_next_layer = 0;

var reached_end = false;

var visited = [];


function distToTargetTile() {

  move_count = 0;
  reached_end = false;
  row_queue.push(fungus_row);
  col_queue.push(fungus_col);
  nodes_left_in_layer = 1;
  nodes_in_next_layer = 0;

  visited = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  visited[fungus_row][fungus_col] = 1;

  while (row_queue.length > 0) {
    var row = row_queue.pop();
    var col = col_queue.pop();

    explore_neighbors(row, col);
    nodes_left_in_layer--;
    if (nodes_left_in_layer === 0) {
      nodes_left_in_layer = nodes_in_next_layer;
      nodes_in_next_layer = 0;
      //move_count++
    }
  }
  if (reached_end) {
    return move_count;
  }
}

function explore_neighbors(row, col) {
  for (i = 0; i < 4; i++) {
    neighbor_row = row + direction_row[i];
    neighbor_col = col + direction_col[i];

    if (neighbor_row < 0 || neighbor_row >= COLONY_ROWS || neighbor_col < 0 || neighbor_col >= COLONY_COLS) {
      continue;
    }

    if (visited[neighbor_row][neighbor_col] === 1) {
      continue;
    }

    if (colonyGridTileMap[neighbor_row][neighbor_col] === 0) {
      continue;
    }

    //if (move_count < (totalMilliseconds / 1000)){
    //  renderer.drawImage(colonyTiles[COLONY_TUNNEL_4WAY], neighbor_col * GRID_NODE_SIZE * pixelSize, (neighbor_row * GRID_NODE_SIZE * pixelSize) + gridStartHeightFromTop, GRID_NODE_SIZE * pixelSize, GRID_NODE_SIZE * pixelSize);
    //}
    move_count++
    row_queue.push(neighbor_row);
    col_queue.push(neighbor_col);
    visited[neighbor_row][neighbor_col] = 1;
    colonyGridNodes[neighbor_row][neighbor_col].distanceFromFungus = move_count;
    nodes_in_next_layer++;
  }
}

// variables from the mini-games that affect colony growth
var geneticDiversity = 0; //from flying game
var leafMaterial = 0; //from leaf cutting game
var badFungusFromLeaves = 0; //from defense game
var timeToReturnWithLeaves = 0; //from defense game
var infectedAntsReturning = 0; //from defense game

var fungusMass = 5; //grams
var incomingLeaves = 0; //grams
var workerCount = 6;
var colonyAntCount = 50;
var workers = [];
var colonyAnts = [];
var eggCount = 0;
var larvaeCount = 0;
var population = 1000;

var introTimer = 5000;
var gridStartHeightFromTop;

var banner;

function setupColonyGameUI() {

  //var gridStartHeightFromTop = gameHeight * 0.2;

  createGrid();
  distToTargetTile();

  loadImages();
  fungus = new Fungus(fungus_col, fungus_row);
  queen = new Queen(fungus_col, fungus_row, (GRID_NODE_SIZE * 11));

  banner = new ColonyMessageBanner();

  for (i = 0; i < workerCount; i++) {
    workers[i] = new ColonyWorkerAnt(COLONY_COLS / workerCount * i, 1);
  }

  for (i = 0; i < colonyAntCount; i++) {
    colonyAnts[i] = new ColonyAnt(fungus.gridCoord.col, fungus.gridCoord.row);
  }
  /*
    for (var i = 0; i < colonyGridNodes.length; i++) {
      for (var ii = 0; ii < colonyGridNodes[i].length; ii++) {
        colonyGridNodes[i][ii].distanceFromFungus = getDistance(colonyGridNodes[i][ii], colonyGridNodes[fungus.gridCoord.row][fungus.gridCoord.col]);
      }
    }
  */
  bgmColony.setAttribute('src', 'audio/Intro Music.mp3');
  bgmColony.loop = true;
  bgmColony.volume = 0.6;

}

function resetColonySimGame() {
  totalMilliseconds = 0;
  //reset appropriate stats from colony object
}

function colonyGameUICustomDraw(deltaTime) {

  fungus.update();

  totalMilliseconds += deltaTime;
  var population = Math.floor(1000 + (totalMilliseconds / 1000) + (1 * geneticDiversity));

  renderer.drawImage(groundBG, 0, -(groundBG.height * 0.35 * pixelSize), gameWidth, gameHeight * 0.95);
  renderer.drawImage(grassLayer, 0, -(groundBG.height * 0.20 * pixelSize), gameWidth, gameHeight * 0.35);
  renderer.drawImage(top_mound, (GRID_NODE_SIZE * 18.4) * pixelSize, 5 * pixelSize, (top_mound.width / 2) * pixelSize, (top_mound.height / 2 ) * pixelSize);

  //digTunnel();
  drawColonyTiles();
  //renderer.drawImage(fungusNest, gameWidth * 0.75, gameHeight * 0.4, gameWidth / 10, gameHeight / 10);

  renderer.fillStyle = 'black';
  //renderer.fillRect(0, gameHeight - (120 * pixelSize), gameWidth, 120 * pixelSize);

  fungus.draw();

  drawStatsBlock();
  banner.draw();

  //test circle
  //colorCircle(gameWidth - (50 * pixelSize), 100 * pixelSize, 30 * pixelSize)

}

function colonyGameUICustomEvents(deltaTime) {
  if (userInteracted && !bgmColony.isPlaying)
    bgmColony.play();

  if (isTouched) {

    if (getDistBtwVec2(vec2((colonyTiles[COLONY_TUNNEL_VERT].width * 13) * pixelSize, (colonyTiles[COLONY_TUNNEL_VERT].height + 20) * pixelSize), vec2(touchPos[0].x - canvas.getBoundingClientRect().left, touchPos[0].y - canvas.getBoundingClientRect().top)) < 40 * pixelSize) {
      bgmColony.pause();
      bgmColony.currentTime = 0;

      ui.stateIndex = DEFENSEGAMEUI;
    }

    if (getDistBtwVec2(vec2(gameWidth - 50, gameHeight * 0.84), vec2(lastTouchPos.x, lastTouchPos.y)) < 50) {
      //enableFullScreen(canvas);
    }

    //click to mute/unmute
    if (getDistBtwVec2(vec2(gameWidth - (50 * pixelSize), 100 * pixelSize), vec2(lastTouchPos.x, lastTouchPos.y)) < 50) {
      isGameMuted = !isGameMuted;
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
      tunnelType: COLONY_TUNNEL_START,
      fileName: "dirt_tile.png"
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