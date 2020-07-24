
const LEAFCUTTINGUI = 3;

var leafcuttingUI = [];

var leaf;
var ant;

var leafcuttingFontSize = 20;

function setupLeafcuttingUI()
{
    leaf = new Leaf();
    ant = new Ant();

    gameplayLabels = [];
    scoreLabel = new Label(tr(), "SCORE: 0",
        leafcuttingFontSize.toString() + "px " + uiContext.fontFamily, undefined, -1);
        gameplayLabels.push(scoreLabel);
    timeLabel = new Label(tr(), "TIME LEFT: 120s",
        leafcuttingFontSize.toString() + "px " + uiContext.fontFamily, undefined, -1);
        gameplayLabels.push(timeLabel);

    leafcuttingUI.push(new FlexGroup(tr(vec2(20, 20), vec2(window.innerWidth, 100)),
        new SubState(tr(), gameplayLabels),false, vec2(0, 20), vec2(1, 2), true));
}

function leafcuttingUICustomDraw(deltaTime)
{
    leaf.draw();
    ant.draw(deltaTime);
}

function leafcuttingUICustomUpdate(deltaTime)
{
    ant.update(deltaTime);
}

function leafcuttingUICustomEvents(deltaTime)
{
    ant.event();
}