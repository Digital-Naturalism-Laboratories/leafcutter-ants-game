
const COLONYGAMEUI = 2;
var colonyGameUI = [];

var groundBG = document.createElement('img');
var fungusNest = document.createElement('img');
var tunnel_vertical = document.createElement('img');
var tunnel_horizontal = document.createElement('img');
var tunnel_tile = document.createElement('img');
var worker_right = document.createElement('img');
groundBG.src = 'Visual Assets/Ground_Cross_Section.png';
fungusNest.src = 'Visual Assets/fungus_Nest.png';
tunnel_vertical.src = 'Visual Assets/tunnel_tile_vert.png';
tunnel_horizontal.src = 'Visual Assets/tunnel_tile_hor.png';
tunnel_tile.src = 'Visual Assets/dirt_tile.png';
worker_right.src = 'Visual Assets/8bit-just-Worker-Right.png';

var fungusMass = 0;  //grams
var incomingLeaves = 0; //grams
var workerCount = 0;
var eggCount = 0;
var larvaeCount = 0;
var population = 0;

function setupColonyGameUI()
{
    queen = new Queen(400, 220);
}

function colonyGameUICustomDraw(deltaTime)
{

    renderer.drawImage(groundBG, 0, 0, gameWidth, gameHeight - 120);

    renderer.drawImage(tunnel_vertical, tunnel_vertical.width * 8, tunnel_vertical.height * 4);
    renderer.drawImage(tunnel_vertical, tunnel_vertical.width * 8, tunnel_vertical.height * 5);
    renderer.drawImage(tunnel_vertical, tunnel_vertical.width * 8, tunnel_vertical.height * 6);
    renderer.drawImage(tunnel_vertical, tunnel_vertical.width * 8, tunnel_vertical.height * 7);
    renderer.drawImage(tunnel_tile, tunnel_vertical.width * 8, tunnel_vertical.height * 8);
    renderer.drawImage(tunnel_vertical, tunnel_vertical.width * 8, tunnel_vertical.height * 9);
    renderer.drawImage(tunnel_vertical, tunnel_vertical.width * 8, tunnel_vertical.height * 10);

    renderer.drawImage(tunnel_horizontal, tunnel_vertical.width * 9, tunnel_vertical.height * 8);
    renderer.drawImage(tunnel_horizontal, tunnel_vertical.width * 10, tunnel_vertical.height * 8);
    renderer.drawImage(tunnel_horizontal, tunnel_vertical.width * 11, tunnel_vertical.height * 8);
    renderer.drawImage(tunnel_horizontal, tunnel_vertical.width * 12, tunnel_vertical.height * 8);
    renderer.drawImage(tunnel_horizontal, tunnel_vertical.width * 13, tunnel_vertical.height * 8);
    renderer.drawImage(tunnel_horizontal, tunnel_vertical.width * 14, tunnel_vertical.height * 8);
    renderer.drawImage(tunnel_horizontal, tunnel_vertical.width * 15, tunnel_vertical.height * 8);

    renderer.drawImage(fungusNest, gameWidth * 0.66, gameHeight * 0.35);

    renderer.drawImage(worker_right, tunnel_vertical.width * 10, tunnel_vertical.height * 8 + 10, worker_right.width / 2, worker_right.height / 2 );
       
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

function colonyGameUICustomEvents(deltaTime)
{
    if (isTouched){
        if (getDistBtwVec2(vec2(tunnel_vertical.width * 10, tunnel_vertical.height * 8 + 10), vec2(touchPos[0].x - canvas.getBoundingClientRect().left, touchPos[0].y - canvas.getBoundingClientRect().top)) < 40){
            ui.stateIndex = LEAFCUTTINGUI;
        } 
    }

}  