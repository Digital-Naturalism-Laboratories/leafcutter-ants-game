
const FLIGHTGAMEUI = 1;
var flightGameUI = [];

mateCount = 0;

var flyingQueen;
var flyingMaleCount = 6;
var flyingMales = [];
var energyBarLength = 100;
var diversityBarLength = 0;

function setupFlightGameUI()
{
    flyingQueen = new FlyingQueen(50, 250);
    flyingMale = new FlyingMale(350, 250);

    for (i = 0; i < flyingMaleCount; i++) {
        flyingMales[i] = new FlyingMale(Math.random() * gameWidth, Math.random() * gameHeight);
    }

}

function flightGameUICustomDraw(deltaTime)
{
    flyingQueen.draw(deltaTime);

    renderer.fillStyle = "white";
    renderer.font = "34px Arial";
    renderer.fillText("Mates: " + mateCount, 50, gameHeight - 50);

    renderer.fillText("Genetic Diversity: ", gameWidth - 450, gameHeight - 100);
    renderer.fillText("Energy: ", gameWidth - 300, gameHeight - 50);

    renderer.fillStyle = 'blue';
    renderer.fillRect(gameWidth - 150, gameHeight - 125, diversityBarLength, 34);
    renderer.beginPath();
    renderer.strokeStyle = 'white';
    renderer.rect(gameWidth - 150, gameHeight - 125, 100, 34);
    renderer.stroke();        

    renderer.fillStyle = 'green';
    renderer.fillRect(gameWidth - 150, gameHeight - 75, energyBarLength, 34);
    renderer.beginPath();
    renderer.strokeStyle = 'white';
    renderer.rect(gameWidth - 150, gameHeight - 75, 100, 34);
    renderer.stroke();        
}

function flightGameUICustomEvents(deltaTime)
{
    if (flyingQueen.movementState == flyingQueen.movementStates.FLYING){
        energyBarLength -= 0.15;
    }
    
}