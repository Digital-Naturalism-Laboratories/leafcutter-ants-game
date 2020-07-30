const COLONYGAMEUI = 2;
var colonyGameUI = [];

var groundBG = document.createElement('img');
var fungusNest = document.createElement('img');
var tunnel_vertical = document.createElement('img');
var tunnel_horizontal = document.createElement('img');
var tunnel_tile = document.createElement('img');
var worker_right = document.createElement('img');
groundBG.src = 'Visual Assets/Ground_Cross_Section.png';
fungusNest.src = 'Visual Assets/Fungus_Nest.png';
tunnel_vertical.src = 'Visual Assets/tunnel_tile_vert.png';
tunnel_horizontal.src = 'Visual Assets/tunnel_tile_hor.png';
tunnel_tile.src = 'Visual Assets/dirt_tile.png';
worker_right.src = 'Visual Assets/8bit-just-Worker-Right.png';

const COLONY_W = 40;
const COLONY_H = 40;
const COLONY_COLS = 20;
const COLONY_ROWS = 15;

var colonyGrid = [  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0,
                    0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
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
    queen = new Queen(400, 220);
}

function colonyGameUICustomDraw(deltaTime) {

    renderer.drawImage(groundBG, 0, 0, gameWidth, gameHeight - 120);

    drawColonyTiles();
    renderer.drawImage(fungusNest, gameWidth * 0.66, gameHeight * 0.35);

    renderer.drawImage(worker_right, tunnel_vertical.width * 10, tunnel_vertical.height * 7 + 10, worker_right.width / 2, worker_right.height / 2);

    renderer.fillStyle = 'black';
    renderer.fillRect(0, gameHeight - 120, gameWidth, 120);

    renderer.fillStyle = "white";
    renderer.font = "34px Arial";

    renderer.fillText("Fungus: " + fungusMass + "g", 50, gameHeight - 85);
    renderer.fillText("Incoming Leaves: " + incomingLeaves + "g", 50, gameHeight - 50);
    renderer.fillText("Workers: " + workerCount, 50, gameHeight - 15);

    renderer.fillText("Population: " + population, gameWidth - 300, gameHeight - 85);
    renderer.fillText("Eggs: " + eggCount, gameWidth - 300, gameHeight - 50);
    renderer.fillText("Larvae: " + larvaeCount, gameWidth - 300, gameHeight - 15);

}

function colonyGameUICustomEvents(deltaTime) {
    if (isTouched) {
        if (getDistBtwVec2(vec2(tunnel_vertical.width * 10, tunnel_vertical.height * 8 + 10), vec2(touchPos[0].x - canvas.getBoundingClientRect().left, touchPos[0].y - canvas.getBoundingClientRect().top)) < 40) {
            ui.stateIndex = LEAFCUTTINGUI;
        }
    }

}

function colonyTileToIndex(tileCol, tileRow) {
    return (tileCol + COLONY_COLS * tileRow);
}

function getColonyTileAtPixelCoord(pixelX, pixelY) {
    var tileCol = pixelX / COLONY_W;
    var tileRow = pixelY / COLONY_H;

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

            //var colonyTypeHere = colonyGrid[colonyIndex];
            //renderer.drawImage(colonyPics[colonyTypeHere], colonyLeftEdgeX, colonyTopEdgeY);
            if (colonyGrid[colonyIndex] === COLONY_TUNNEL_VERT) {
                renderer.drawImage(tunnel_vertical, colonyLeftEdgeX, colonyTopEdgeY);
            }

            colonyIndex++;
            colonyLeftEdgeX += COLONY_W;

        }

        colonyTopEdgeY += COLONY_H;

    }
}