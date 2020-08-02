const COLONYGAMEUI = 2;
var colonyGameUI = [];

const COLONY_W = 40;
const COLONY_H = 40;
const COLONY_COLS = 20;
const COLONY_ROWS = 15;

var groundBG = document.createElement('img');
var fungusNest = document.createElement('img');
var worker_right = document.createElement('img');

var colonyTiles = [];

var colonyGrid = [  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 3, 2, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 2, 2, 2, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 3, 2, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

const COLONY_WALL = 0;
const COLONY_TUNNEL_VERT = 1;
const COLONY_TUNNEL_HOR = 2;
const COLONY_TUNNEL_4WAY = 3;

var fungusMass = 0; //grams
var incomingLeaves = 0; //grams
var workerCount = 0;
var eggCount = 0;
var larvaeCount = 0;
var population = 0;

function setupColonyGameUI() {

    loadImages();
    queen = new Queen(400 * pixelSize, 220 * pixelSize);
}

function colonyGameUICustomDraw(deltaTime) {

    renderer.drawImage(groundBG, 0, 0, gameWidth, gameHeight - (120 * pixelSize));

    drawColonyTiles();
    renderer.drawImage(fungusNest, gameWidth * 0.75, gameHeight * 0.4, gameWidth / 5, gameHeight / 5);

    renderer.drawImage(worker_right, (colonyTiles[COLONY_TUNNEL_VERT].width * 10) * pixelSize, (colonyTiles[COLONY_TUNNEL_VERT].height * 7 + 10) * pixelSize, (worker_right.width / 2) * pixelSize, (worker_right.height / 2) * pixelSize);

    renderer.fillStyle = 'black';
    renderer.fillRect(0, gameHeight - (120 * pixelSize), gameWidth, 120 * pixelSize);

    renderer.fillStyle = "white";
    renderer.font = (24 * pixelSize).toString() + "px Arial";

    renderer.fillText("Fungus: " + fungusMass + "g", 50 * pixelSize, gameHeight - (85 * pixelSize));
    renderer.fillText("Incoming Leaves: " + incomingLeaves + "g", 50 * pixelSize, gameHeight - (50 * pixelSize));
    renderer.fillText("Workers: " + workerCount, 50 * pixelSize, gameHeight - (15 * pixelSize));

    renderer.fillText("Population: " + population, gameWidth - (300 * pixelSize), gameHeight - (85 * pixelSize));
    renderer.fillText("Eggs: " + eggCount, gameWidth - (300 * pixelSize), gameHeight - (50 * pixelSize));
    renderer.fillText("Larvae: " + larvaeCount, gameWidth - (300 * pixelSize), gameHeight - (15 * pixelSize));

}

function colonyGameUICustomEvents(deltaTime) {
    if (isTouched) {
        if (getDistBtwVec2(vec2((colonyTiles[COLONY_TUNNEL_VERT].width * 10) * pixelSize, (colonyTiles[COLONY_TUNNEL_VERT].height * 7 + 10) * pixelSize), vec2(touchPos[0].x - canvas.getBoundingClientRect().left, touchPos[0].y - canvas.getBoundingClientRect().top)) < 40 * pixelSize) {
            ui.stateIndex = LEAFCUTTINGUI;
        }
    }

}

function colonyTileToIndex(tileCol, tileRow) {
    return (tileCol + COLONY_COLS * tileRow);
}

function getColonyTileAtPixelCoord(pixelX, pixelY) {
    var tileCol = (pixelX / COLONY_W) * pixelSize;
    var tileRow = (pixelY / COLONY_H) * pixelSize;

    tileCol = Math.floor(tileCol);
    tileRow = Math.floor(tileRow);

    if (tileCol < 0 || tileCol >= COLONY_COLS ||
        tileRow < 0 || tileRow >= COLONY_ROWS) {
        return COLONY_WALL;
    }

    var colonyIndex = colonyTileToIndex(tileCol, tileRow);
    return colonyGrid[colonyIndex];
}

function drawColonyTiles() {
    var colonyIndex = 0;
    var colonyLeftEdgeX = 0;
    var colonyTopEdgeY = 0;

    for (var eachRow = 0; eachRow < COLONY_ROWS; eachRow++) {

        colonyLeftEdgeX = 0;

        for (var eachCol = 0; eachCol < COLONY_COLS; eachCol++) {

            var colonyTypeHere = colonyGrid[colonyIndex];

            if (colonyGrid[colonyIndex] != COLONY_WALL) {
                renderer.drawImage(colonyTiles[colonyTypeHere], colonyLeftEdgeX, colonyTopEdgeY, COLONY_W * pixelSize, COLONY_H * pixelSize);
            }

            colonyIndex++;
            colonyLeftEdgeX += COLONY_W * pixelSize;

        }

        colonyTopEdgeY += COLONY_H * pixelSize;

    }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.src="Visual Assets/"+fileName;
}

function loadImageForTrackCode(tunnelCode, fileName) {
    colonyTiles[tunnelCode] = document.createElement("img");
  beginLoadingImage(colonyTiles[tunnelCode],fileName);
}

function loadImages() {

  var imageList = [
    {varName:groundBG, fileName:"Ground_Cross_Section.png"},
    {varName:fungusNest, fileName:"Fungus_Nest.png"},
    {varName:worker_right, fileName:"8bit-just-Worker-Right.png"},
    
    {tunnelType:COLONY_TUNNEL_VERT, fileName:"tunnel_tile_vert.png"},
    {tunnelType:COLONY_TUNNEL_HOR, fileName:"tunnel_tile_hor.png"},
    {tunnelType:COLONY_TUNNEL_4WAY, fileName:"dirt_tile.png"}
    ];

  picsToLoad = imageList.length;

  for(var i=0;i<imageList.length;i++) {
    if(imageList[i].tunnelType != undefined) {
      loadImageForTrackCode(imageList[i].tunnelType, imageList[i].fileName);
    } else {
      beginLoadingImage(imageList[i].varName, imageList[i].fileName);
    }
  }

}