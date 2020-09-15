const GRID_NODE_SIZE = 20;
const COLONY_COLS = 32;
const COLONY_ROWS = 19;

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
const COLONY_TUNNEL_START_INTERIOR = 89;
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

var colonyTiles = [];
var colonyGridNodes = [];

var row_queue = [];
var col_queue = [];
var direction_row = [-1, 1, 0, 0];
var direction_col = [0, 0, 1, -1];
var move_count = 1;
var nodes_left_in_layer = 1;
var nodes_in_next_layer = 0;
var reached_end = false;
var visited = [];

var colonyGridTileMap = [
  [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
  [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
  [00, 11, 02, 02, 02, 02, 12, 00, 00, 00, 00, 11, 02, 02, 12, 00, 00, 00, 00, 00, 91, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
  [00, 01, 00, 00, 00, 00, 01, 00, 11, 02, 02, 23, 00, 00, 14, 02, 12, 00, 00, 00, 93, 02, 02, 02, 02, 02, 02, 22, 12, 00, 00, 00],
  [00, 21, 12, 00, 00, 00, 14, 02, 23, 00, 00, 21, 12, 00, 00, 00, 21, 02, 02, 02, 94, 00, 00, 00, 00, 00, 00, 14, 13, 00, 00, 00],
  [00, 14, 13, 00, 00, 00, 00, 00, 01, 00, 00, 14, 13, 00, 00, 00, 01, 00, 00, 00, 91, 00, 97, 95, 95, 98, 00, 00, 00, 00, 00, 00],
  [00, 00, 00, 00, 00, 00, 00, 00, 01, 00, 00, 00, 00, 00, 11, 02, 23, 00, 00, 00, 91, 00, 93, 89, 89, 94, 00, 00, 00, 00, 00, 00],
  [00, 11, 22, 02, 22, 02, 02, 02, 13, 00, 00, 00, 11, 02, 23, 00, 01, 00, 00, 00, 91, 00, 93, 89, 89, 94, 00, 00, 00, 00, 00, 00],
  [00, 14, 13, 00, 01, 00, 00, 00, 00, 00, 00, 11, 23, 00, 01, 00, 21, 12, 00, 00, 93, 92, 96, 96, 96, 99, 00, 00, 00, 00, 00, 00],
  [00, 00, 00, 00, 21, 02, 02, 12, 00, 00, 00, 14, 13, 00, 01, 00, 14, 13, 00, 00, 01, 00, 00, 00, 00, 00, 11, 12, 00, 00, 00, 00],
  [00, 11, 12, 00, 01, 00, 00, 01, 00, 00, 00, 00, 00, 00, 01, 00, 00, 00, 00, 00, 14, 22, 02, 02, 02, 02, 24, 13, 00, 00, 00, 00],
  [00, 14, 24, 02, 23, 00, 00, 14, 22, 12, 00, 00, 00, 00, 14, 02, 12, 00, 00, 00, 00, 01, 00, 00, 00, 00, 00, 00, 00, 11, 12, 00],
  [00, 00, 00, 00, 14, 12, 00, 00, 14, 13, 00, 11, 12, 00, 00, 00, 21, 02, 02, 02, 02, 23, 00, 00, 00, 00, 11, 02, 02, 03, 13, 00],
  [00, 00, 00, 00, 00, 01, 00, 00, 00, 00, 00, 14, 24, 12, 00, 00, 01, 00, 00, 00, 00, 21, 02, 22, 02, 02, 13, 00, 00, 01, 00, 00],
  [00, 00, 00, 00, 00, 21, 02, 22, 12, 00, 00, 00, 00, 14, 12, 00, 01, 00, 00, 00, 00, 01, 00, 01, 00, 00, 00, 00, 00, 01, 00, 00],
  [00, 00, 11, 12, 00, 01, 00, 14, 13, 00, 00, 00, 00, 00, 21, 02, 13, 00, 11, 12, 00, 01, 00, 01, 00, 11, 12, 00, 00, 01, 00, 00],
  [00, 00, 14, 24, 02, 13, 00, 00, 00, 00, 11, 22, 02, 02, 13, 00, 00, 00, 14, 24, 02, 13, 00, 14, 02, 24, 13, 00, 11, 23, 00, 00],
  [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 14, 13, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 14, 13, 00, 00],
  [00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
];

var eggChamberGridCoords = [{
  col: 2,
  row: 5,
  offset: -0.5 * GRID_NODE_SIZE
},
{
  col: 1,
  row: 8,
  offset: 0.5 * GRID_NODE_SIZE
},
{
  col: 1,
  row: 11,
  offset: 0.5 * GRID_NODE_SIZE
},
{
  col: 2,
  row: 16,
  offset: 0.5 * GRID_NODE_SIZE
},
{
  col: 8,
  row: 15,
  offset: -0.5 * GRID_NODE_SIZE
},
{
  col: 9,
  row: 12,
  offset: -0.5 * GRID_NODE_SIZE
},
{
  col: 10,
  row: 17,
  offset: 0.5 * GRID_NODE_SIZE
},
{
  col: 12,
  row: 5,
  offset: -0.5 * GRID_NODE_SIZE
},
{
  col: 11,
  row: 13,
  offset: 0.5 * GRID_NODE_SIZE
},
{
  col: 11,
  row: 9,
  offset: 0.5 * GRID_NODE_SIZE
},
{
  col: 17,
  row: 9,
  offset: -0.5 * GRID_NODE_SIZE
},
{
  col: 18,
  row: 15,
  offset: 0.5 * GRID_NODE_SIZE
},
{
  col: 26,
  row: 16,
  offset: -0.5 * GRID_NODE_SIZE
},
{
  col: 28,
  row: 4,
  offset: -0.5 * GRID_NODE_SIZE
},
{
  col: 27,
  row: 10,
  offset: -0.5 * GRID_NODE_SIZE
},
{
  col: 28,
  row: 17,
  offset: 0.5 * GRID_NODE_SIZE
}
];

function createGrid() {
  for (var eachRow = 0; eachRow < COLONY_ROWS; eachRow++) {

    colonyGridNodes[eachRow] = []
    for (var eachCol = 0; eachCol < COLONY_COLS; eachCol++) {

      var colonyTypeHere = colonyGridTileMap[eachRow][eachCol];

      colonyGridNodes[eachRow][eachCol] = new ColonyGridNode(eachRow, eachCol, colonyTypeHere)

    }
  }
}

function setDistFromFungusOnEachColonyNode() {

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

    move_count++
    row_queue.push(neighbor_row);
    col_queue.push(neighbor_col);
    visited[neighbor_row][neighbor_col] = 1;
    colonyGridNodes[neighbor_row][neighbor_col].distanceFromFungus = move_count;
    nodes_in_next_layer++;
  }
}

function drawColonyTiles() {
  for (var eachRow = 0; eachRow < colonyGridNodes.length; eachRow++) {
    for (var eachCol = 0; eachCol < colonyGridNodes[eachRow].length; eachCol++) {
      colonyGridNodes[eachRow][eachCol].draw();
    }
  }
}

function getTunneledTileCount() {

  var tunneledCount = 0;

  for (var i = 0; i < colonyGridNodes.length; i++) {
    for (var j = 0; j < colonyGridNodes[i].length; j++) {
      if (colonyGridNodes[i][j].isTunneled) {
        tunneledCount++;
      }
    }
  }

  return tunneledCount;
}

//#region Grid Utility Functions 

function getDistance(nodeA, nodeB) {
  var distanceX = nodeA.gridCoord.col - nodeB.gridCoord.col;
  var distanceY = nodeA.gridCoord.row - nodeB.gridCoord.row;

  return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
}

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

function drawCustomCircle(centerX, centerY, radius, width, strokeColor) {
  var prevLineWidth = renderer.lineWidth;
  renderer.strokeStyle = strokeColor;
  renderer.lineWidth = 4;
  renderer.beginPath();
  renderer.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  renderer.stroke();
  renderer.lineWidth = prevLineWidth;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

//#endregion Grid Utility Functions