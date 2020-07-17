
const FLIGHTGAMEUI = 1;

var flightGameUI = [];

var flyingQueen;

function setupFlightGameUI()
{
    flyingQueen = new FlyingQueen();
}

function flightGameUICustomDraw(deltaTime)
{
    flyingQueen.draw(deltaTime);
}

function flightGameUICustomEvents(deltaTime)
{

}