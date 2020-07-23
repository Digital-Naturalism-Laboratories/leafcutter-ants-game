
const GAMEPLAYUI = 0;

var gameplayUI = [];

var leaf;
var ant;

function setupGameplayUI()
{
    leaf = new Leaf();
    ant = new Ant();
}

function gameplayUICustomDraw(deltaTime)
{
    leaf.draw();
    ant.draw(deltaTime);
}

function gameplayUICustomUpdate(deltaTime)
{
    ant.update(deltaTime);
}

function gameplayUICustomEvents(deltaTime)
{
    ant.event();
}