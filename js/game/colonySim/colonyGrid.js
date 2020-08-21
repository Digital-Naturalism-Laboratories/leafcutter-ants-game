const GRID_NODE_SIZE = 20;
const COLONY_COLS = 32;
const COLONY_ROWS = 19;

var colonyTiles = [];

var colonyGridTileMap = [
  [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
  [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
  [00, 11, 02, 02, 02, 02, 12, 00, 00, 00, 00, 11, 02, 02, 12, 00, 00, 00, 00, 00, 91, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
  [00, 01, 00, 00, 00, 00, 01, 00, 11, 02, 02, 23, 00, 00, 14, 02, 12, 00, 00, 00, 93, 02, 02, 02, 02, 02, 22, 12, 00, 00, 00, 00],
  [00, 21, 12, 00, 00, 00, 14, 02, 23, 00, 00, 21, 12, 00, 00, 00, 21, 02, 02, 02, 94, 00, 00, 00, 00, 00, 14, 13, 00, 00, 00, 00],
  [00, 14, 13, 00, 00, 00, 00, 00, 01, 00, 00, 14, 13, 00, 00, 00, 01, 00, 00, 00, 91, 00, 97, 95, 98, 00, 00, 00, 00, 00, 00, 00],
  [00, 00, 00, 00, 00, 00, 00, 00, 01, 00, 00, 00, 00, 00, 11, 02, 23, 00, 00, 00, 91, 00, 93, 03, 94, 00, 00, 00, 00, 00, 00, 00],
  [00, 11, 22, 02, 22, 02, 02, 02, 13, 00, 00, 00, 11, 02, 23, 00, 01, 00, 00, 00, 93, 92, 96, 96, 99, 00, 00, 00, 00, 00, 00, 00],
  [00, 14, 13, 00, 01, 00, 00, 00, 00, 00, 00, 11, 23, 00, 01, 00, 21, 12, 00, 00, 01, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
  [00, 00, 00, 00, 21, 02, 02, 12, 00, 00, 00, 14, 13, 00, 01, 00, 14, 13, 00, 00, 01, 00, 00, 00, 00, 00, 11, 12, 00, 00, 00, 00],
  [00, 11, 12, 00, 01, 00, 00, 01, 00, 00, 00, 00, 00, 00, 01, 00, 00, 00, 00, 00, 14, 22, 02, 02, 02, 02, 24, 13, 00, 00, 00, 00],
  [00, 14, 24, 02, 23, 00, 00, 14, 22, 12, 00, 00, 00, 00, 14, 02, 12, 00, 00, 00, 00, 01, 00, 00, 00, 00, 00, 00, 00, 11, 12, 00],
  [00, 00, 00, 00, 14, 12, 00, 00, 14, 13, 00, 11, 12, 00, 00, 00, 21, 02, 02, 02, 02, 23, 00, 00, 00, 00, 11, 02, 02, 03, 13, 00],
  [00, 00, 00, 00, 00, 01, 00, 00, 00, 00, 00, 14, 24, 12, 00, 00, 01, 00, 00, 00, 00, 21, 02, 22, 02, 02, 13, 00, 00, 01, 00, 00],
  [00, 00, 00, 00, 00, 21, 02, 22, 12, 00, 00, 00, 00, 14, 12, 00, 01, 00, 11, 12, 00, 01, 00, 01, 00, 00, 00, 00, 00, 01, 00, 00],
  [00, 00, 11, 12, 00, 01, 00, 14, 13, 00, 00, 00, 00, 00, 21, 02, 13, 00, 14, 24, 02, 23, 00, 01, 00, 11, 12, 00, 00, 01, 00, 00],
  [00, 00, 14, 24, 02, 23, 00, 00, 00, 00, 11, 22, 02, 02, 13, 00, 00, 00, 00, 00, 00, 01, 00, 14, 02, 24, 13, 00, 11, 23, 00, 00],
  [00, 00, 00, 00, 00, 01, 00, 11, 12, 00, 14, 13, 00, 00, 00, 00, 00, 11, 12, 00, 00, 01, 00, 00, 00, 00, 00, 00, 14, 13, 00, 00],
  [00, 00, 00, 00, 00, 14, 02, 24, 13, 00, 00, 00, 00, 00, 00, 00, 00, 14, 24, 02, 02, 13, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
];

var colonyGridNodes = [];

const COLONY_WALL = 0;
const COLONY_TUNNEL_VERT = 1;
const COLONY_TUNNEL_HOR = 2;
const COLONY_TUNNEL_4WAY = 3;
const COLONY_TUNNEL_CORNER_DOWN_RIGHT = 11;
const COLONY_TUNNEL_CORNER_DOWN_LEFT = 12;
const COLONY_TUNNEL_CORNER_UP_LEFT = 13;
const COLONY_TUNNEL_CORNER_UP_RIGHT = 14;
const COLONY_TUNNEL_LEFT_WALL = 21;
const COLONY_TUNNEL_UP_WALL = 22;
const COLONY_TUNNEL_RIGHT_WALL = 23;
const COLONY_TUNNEL_DOWN_WALL = 24;
const COLONY_TUNNEL_START_VERT = 91;
const COLONY_TUNNEL_START_HOR = 92;
const COLONY_TUNNEL_START_LEFT_WALL = 93;
const COLONY_TUNNEL_START_RIGHT_WALL = 94;
const COLONY_TUNNEL_START_UP_WALL = 95;
const COLONY_TUNNEL_START_DOWN_WALL = 96;
const COLONY_TUNNEL_START_CORNER_DOWN_RIGHT = 97;
const COLONY_TUNNEL_START_CORNER_DOWN_LEFT = 98;
const COLONY_TUNNEL_START_CORNER_UP_LEFT = 99;
const COLONY_TUNNEL_START_CORNER_UP_RIGHT = 90;


function createGrid() {
  for (var eachRow = 0; eachRow < COLONY_ROWS; eachRow++) {

    colonyGridNodes[eachRow] = []
    for (var eachCol = 0; eachCol < COLONY_COLS; eachCol++) {

      var colonyTypeHere = colonyGridTileMap[eachRow][eachCol];

      colonyGridNodes[eachRow][eachCol] = new ColonyGridNode(eachRow, eachCol, colonyTypeHere)

    }
  }
}

function getNeighbors(node) {
  var neighbors = [];

  for (var x = -1; x <= 1; x++) {
    for (var y = -1; y <= 1; y++) {
      if (x === 0 && y === 0) {
        continue;
      }

      var checkX = node.gridCoord.x + x;
      var checkY = node.gridCoord.y + y;

      if (checkX >= 0 && checkX < COLONY_COLS && checkY >= 0 && checkY < COLONY_ROWS) {
        neighbors.push(colonyGridNodes[checkY][checkX]);
      }

    }
  }

return neighbors;

}

function drawColonyTiles() {
  var colonyIndex = 0;
  var colonyLeftEdgeX = 0;
  //var colonyTopEdgeY = gameHeight * 0.2;


  for (var eachRow = 0; eachRow < colonyGridNodes.length; eachRow++) {

    colonyLeftEdgeX = 0;

    for (var eachCol = 0; eachCol < colonyGridNodes[eachRow].length; eachCol++) {

      colonyGridNodes[eachRow][eachCol].draw();

      colonyIndex++;
      colonyLeftEdgeX += GRID_NODE_SIZE * pixelSize;

    }

    //colonyTopEdgeY += GRID_NODE_SIZE * pixelSize;

  }

}

function digTunnel() {
  //colonyGridTileMap[rowAtYCoord(queen.y / pixelSize)][colAtXCoord(queen.x / pixelSize)] = COLONY_TUNNEL_4WAY;
}

//#region Grid Utility Functions 
function colonyTileToIndex(tileCol, tileRow) {
  return (tileCol + COLONY_COLS * tileRow);
}

function getColonyTileAtPixelCoord(pixelX, pixelY) {
  var tileCol = (pixelX / GRID_NODE_SIZE) * pixelSize;
  var tileRow = (pixelY / GRID_NODE_SIZE) * pixelSize;

  tileCol = Math.floor(tileCol);
  tileRow = Math.floor(tileRow);

  if (tileCol < 0 || tileCol >= COLONY_COLS ||
    tileRow < 0 || tileRow >= COLONY_ROWS) {
    return COLONY_WALL;
  }

  var colonyIndex = colonyTileToIndex(tileCol, tileRow);
  return colonyGridTileMap[colonyIndex];
}

function colAtXCoord(pixelX) {
  return Math.floor(pixelX / GRID_NODE_SIZE);
}

function rowAtYCoord(pixelY) {
  return Math.floor(pixelY / GRID_NODE_SIZE);
}

function mapTileToIndex(tileCol, tileRow) {
  return (tileCol + COLONY_COLS * tileRow);
}

function pixelCoordAtCenterOfTileCoord(col, row) {
  xPixelCoord = ((col * GRID_NODE_SIZE) + (GRID_NODE_SIZE / 2)) * pixelSize;
  yPixelCoord = ((row * GRID_NODE_SIZE) + (GRID_NODE_SIZE / 2)) * pixelSize;

  return {
    x: xPixelCoord,
    y: yPixelCoord
  }
}

function colorCircle(centerX, centerY, radius, fillColor) {
  renderer.fillStyle = fillColor;
  renderer.beginPath();
  renderer.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  renderer.fill();
}
//#endregion Grid Utility Functions