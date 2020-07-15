
const GAMEPLAYUI = 0;

var gameplayUI = [];

var leaf;

function setupGameplayUI()
{
    leaf = new Leaf();
}

function gameplayUICustomDraw(deltaTime)
{
    leaf.draw();
}

function gameplayUICustomEvents(deltaTime)
{

}