const COLONYGAMEUI = 2;
var colonyGameUI = [];

var groundBG = document.createElement('img');
var grassLayer = document.createElement('img');
var fungusNest = document.createElement('img');
var worker_right = document.createElement('img');
var worker_with_minims = document.createElement('img');

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
var workers = [];
var eggCount = 0;
var larvaeCount = 0;
var population = 1000;

var introTimer = 5000;
var gridStartHeightFromTop;

function setupColonyGameUI() {

  //var gridStartHeightFromTop = gameHeight * 0.2;

  createGrid();
  distToTargetTile();

  loadImages();
  fungus = new Fungus(fungus_col, fungus_row);
  queen = new Queen(fungus_col, fungus_row, (GRID_NODE_SIZE * 11));

  for (i = 0; i < workerCount; i++) {
    workers[i] = new ColonyWorkerAnt(COLONY_COLS / workerCount * i, 1);
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

function colonyGameUICustomDraw(deltaTime) {

  fungus.update();

  totalMilliseconds += deltaTime;
  var population = Math.floor(1000 + (totalMilliseconds / 1000) + (1 * geneticDiversity));

  renderer.drawImage(groundBG, 0, -(groundBG.height * 0.35 * pixelSize), gameWidth, gameHeight * 0.95);
  renderer.drawImage(grassLayer, 0, -(groundBG.height * 0.20 * pixelSize), gameWidth, gameHeight * 0.35);

  //digTunnel();
  drawColonyTiles();
  //renderer.drawImage(fungusNest, gameWidth * 0.75, gameHeight * 0.4, gameWidth / 10, gameHeight / 10);

  renderer.fillStyle = 'black';
  //renderer.fillRect(0, gameHeight - (120 * pixelSize), gameWidth, 120 * pixelSize);

  renderer.fillStyle = "white";
  renderer.textAlign = "left";
  renderer.font = (24 * pixelSize).toString() + "px SmallBoldPixel";

  renderer.fillText("Fungus: " + fungusMass + "g", 50 * pixelSize, gameHeight - (85 * pixelSize));
  renderer.fillText("Leaf Material: " + leafMaterial + "g", 50 * pixelSize, gameHeight - (50 * pixelSize));
  renderer.fillText("Workers: " + workerCount, 50 * pixelSize, gameHeight - (15 * pixelSize));

  renderer.fillText("Population: " + population, gameWidth - (300 * pixelSize), gameHeight - (85 * pixelSize));
  renderer.fillText("Eggs: " + eggCount, gameWidth - (300 * pixelSize), gameHeight - (50 * pixelSize));
  renderer.fillText("Genetic Diversity: " + (geneticDiversity * 100) + "%", gameWidth - (300 * pixelSize), gameHeight - (15 * pixelSize));


  renderer.fillStyle = "white";
  renderer.textAlign = "center";
  renderer.font = (10 * pixelSize).toString() + "px Pixelmania";
  //renderer.fillText("Click to mate and start a new colony!", queen.x * pixelSize, (queen.y + 30) * pixelSize);
  //renderer.fillText("Click to protect the colony's leaves!", 800, 75);
  renderer.textAlign = "left";

  renderer.fillStyle = "white";
  renderer.textAlign = "center";
  renderer.font = (10 * pixelSize).toString() + "px Pixelmania";
  //renderer.fillText("Click to help the workers collect leaves!", 200, 75);
  renderer.textAlign = "left";

  fungus.draw();

  colorRect(gameWidth - 105, gameHeight * 0.8, 100, 50, 'white');
  //renderer.fillStyle = "black";
  renderer.font = "24px SmallBoldPixel";
  //renderer.fillText("Full Screen", gameWidth - 100, gameHeight * 0.84);

  //renderer.fillStyle = 'black';
  //renderer.fillRect(0, 0, GRID_NODE_SIZE * COLONY_COLS, GRID_NODE_SIZE * COLONY_ROWS);
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