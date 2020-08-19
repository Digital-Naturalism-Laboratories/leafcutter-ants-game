const GRID_NODE_SIZE = 20;
const COLONY_COLS = 32;
const COLONY_ROWS = 19;

var colonyTiles = [];

var colonyGridTileMap = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 3, 2, 2, 2, 2, 3, 0, 0, 0, 0, 3, 2, 2, 3, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 3, 2, 2, 3, 0, 0, 3, 2, 3, 0, 0, 0, 9, 2, 2, 2, 2, 2, 3, 2, 2, 3, 0, 0],
  [0, 3, 3, 0, 0, 0, 3, 2, 3, 0, 0, 3, 3, 0, 0, 0, 3, 2, 2, 2, 9, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 3, 3, 0, 0, 0, 0, 0, 1, 0, 0, 3, 3, 0, 0, 0, 1, 0, 0, 0, 9, 0, 9, 9, 9, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 2, 3, 0, 0, 0, 9, 0, 9, 9, 9, 0, 3, 2, 3, 3, 0, 0],
  [0, 3, 3, 2, 3, 2, 2, 2, 3, 0, 0, 0, 3, 2, 3, 0, 1, 0, 0, 0, 9, 9, 9, 9, 9, 0, 0, 0, 3, 3, 0, 0],
  [0, 3, 3, 0, 1, 0, 0, 0, 0, 0, 0, 3, 3, 0, 1, 0, 3, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 3, 2, 2, 3, 3, 0, 0, 3, 3, 0, 1, 0, 3, 3, 0, 0, 1, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0],
  [0, 3, 3, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 3, 2, 2, 2, 2, 3, 3, 0, 0, 0, 0],
  [0, 3, 3, 2, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 3, 2, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0],
  [0, 0, 0, 0, 3, 3, 0, 0, 3, 3, 0, 3, 3, 0, 0, 0, 3, 2, 2, 2, 2, 3, 0, 0, 0, 0, 3, 2, 2, 3, 3, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 1, 0, 0, 0, 0, 3, 2, 3, 2, 2, 3, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 3, 2, 3, 3, 0, 0, 0, 0, 3, 3, 0, 1, 0, 3, 2, 3, 3, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 3, 3, 0, 1, 0, 3, 3, 0, 0, 0, 0, 0, 3, 2, 3, 0, 1, 0, 1, 0, 0, 1, 0, 3, 3, 0, 0, 1, 0, 0],
  [0, 0, 3, 3, 2, 3, 0, 0, 0, 0, 3, 3, 2, 2, 3, 0, 0, 0, 0, 0, 3, 3, 0, 3, 2, 3, 3, 0, 3, 3, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 3, 3, 0, 3, 3, 0, 0, 0, 0, 0, 3, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0],
  [0, 0, 0, 0, 0, 3, 2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

var colonyGridNodes = [];

const COLONY_WALL = 0;
const COLONY_TUNNEL_VERT = 1;
const COLONY_TUNNEL_HOR = 2;
const COLONY_TUNNEL_4WAY = 3;
const COLONY_TUNNEL_START = 9;

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