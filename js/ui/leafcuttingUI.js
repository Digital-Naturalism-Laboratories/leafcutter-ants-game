
const LEAFCUTTINGUI = 3;

var leafcuttingUI = [];

var leaf;
var ant;
var ant2;

var leafcuttingFontSize;

const LEAFCUTTINGHINT_START = 0;
const LEAFCUTTINGHINT_JAWS = 1;
const LEAFCUTTINGHINT_SUCCESS = 2;
const LEAFCUTTINGHINT_FAIL = 3;
const LEAFCUTTINGHINT_TIMEOUT = 4;
const LEAFCUTTINGHINT_WIN = 5;
var leafcuttingHints = [
    "Click on any leaf border to start cutting the leaf.",
    "Click on the jaw buttons alternatively. Don't press the wrong jaw button.",
    "Leaf part cut successfully. Now, click on any leaf borders to move on cutting the next part.",
    "You pressed the wrong jaw button! Try cutting again by clicking jaw buttons alternatively!",
    "Time out! You failed to cut the entire leaf within the given time.",
    "Excellent! You finished cutting the entire leaf within time!"
];
var leafcuttingHint = leafcuttingHints[LEAFCUTTINGHINT_START];

var leafcuttingScore = 0;
var leafcuttingTimeLeft = 180000;

function setupLeafcuttingUI()
{
    leafcuttingFontSize = 14 * pixelSize;

    leaf = new Leaf();
    ant = new Ant(leaf);
    ant2 = new Ant(leaf);
    ant.setSecondAnt(ant2);
    ant2.setSecondAnt(ant);
    ant2.disabled = true;

    gameplayLabels = [];
    gameHintLabel = new Label(tr(), leafcuttingHint,
        leafcuttingFontSize.toString() + "px " + uiContext.fontFamily, "white", -1);
    gameplayLabels.push(gameHintLabel);
    scoreLabel = new Label(tr(), "SCORE: " + leafcuttingScore.toString(),
        leafcuttingFontSize.toString() + "px " + uiContext.fontFamily, "white", -1);
    gameplayLabels.push(scoreLabel);
    timeLabel = new Label(tr(), "TIME LEFT: " + (leafcuttingTimeLeft/1000).toString(),
        leafcuttingFontSize.toString() + "px " + uiContext.fontFamily, "white", -1);
    gameplayLabels.push(timeLabel);

    leafcuttingUI.push(new FlexGroup(tr(vec2(20*pixelSize, 20*pixelSize), vec2(window.innerWidth, 80*pixelSize)),
        new SubState(tr(), gameplayLabels),false, vec2(0, 20*pixelSize), vec2(1, 4), true));
}

function leafcuttingUICustomDraw(deltaTime)
{
    leaf.draw();
    ant.draw(deltaTime);
    ant2.draw(deltaTime);
}

function leafcuttingUICustomUpdate(deltaTime)
{
    ant.update(deltaTime);
    ant2.update(deltaTime);
    
    gameHintLabel.text = leafcuttingHint;
    scoreLabel.text = "SCORE: " + leafcuttingScore.toString();
    timeLabel.text = "TIME LEFT: " + (Math.floor(leafcuttingTimeLeft/1000)).toString();
    leafcuttingTimeLeft -= deltaTime;
}

function leafcuttingUICustomEvents(deltaTime)
{
    ant.event();
    ant2.event();
}