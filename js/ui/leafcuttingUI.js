
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
var leafcuttingTimeLeft = 0;

var prevBGM = -1;
var currentBGM = -1;

var leafcuttingBGM = [
    document.createElement('audio'),
    document.createElement('audio')
];
var leafcuttingBGMPaths = [
    "audio/Transporting Leaves Scene.mp3",
    "audio/Slicing Leaves Scene.mp3"
]
var BGM_TRANSPORTING = 0;
var BGM_SLICING = 1;

var leafcuttingSFX = [
    document.createElement('audio'),
    document.createElement('audio'),
    document.createElement('audio'),
    document.createElement('audio'),
    document.createElement('audio'),
    document.createElement('audio')
]
var leafcuttingSFXPaths = [
    "audio/SFX/UI Menu Buttons.wav",
    "audio/SFX/Positive Feedback - Beef Up Trail.wav",
    "audio/SFX/Clock Ticking.wav",
    "audio/SFX/Leaf Minim Footsteps.wav",
    "audio/SFX/Positive Feedback - Player Wins.wav",
    "audio/SFX/Game Over.wav"
]
var SFX_JAWBUTTON = 0;
var SFX_JAWTIMED = 1;
var SFX_LOWTIME = 2;
var SFX_ANTWALK = 3;
var SFX_PLAYERWIN = 4;
var SFX_TIMEOUT = 5;

function setupLeafcuttingUI()
{
    leafcuttingTimeLeft = 180000;

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

    for(let i = 0; i < leafcuttingBGM.length; i++)
    {
        leafcuttingBGM[i].setAttribute('src', leafcuttingBGMPaths[i]);
        leafcuttingBGM[i].loop = true;
        leafcuttingBGM[i].volume = 0.6;
    }
    for(let i = 0; i < leafcuttingSFX.length; i++)
    {
        leafcuttingSFX[i].setAttribute('src', leafcuttingSFXPaths[i]);
    }
}

function leafcuttingUICustomDraw(deltaTime)
{
    leaf.draw();
    ant.draw(deltaTime);
    ant2.draw(deltaTime);
}

function leafcuttingUICustomUpdate(deltaTime)
{
    prevBGM = currentBGM;

    ant.update(deltaTime);
    ant2.update(deltaTime);
    
    gameHintLabel.text = leafcuttingHint;
    scoreLabel.text = "SCORE: " + leafcuttingScore.toString();
    timeLabel.text = "TIME LEFT: " + (Math.floor(leafcuttingTimeLeft/1000)).toString();
    leafcuttingTimeLeft -= deltaTime;

    leafcuttingAudioHandling();
}

function leafcuttingUICustomEvents(deltaTime)
{
    ant.event();
    ant2.event();
}

function leafcuttingAudioHandling()
{
    if((!ant.disabled && ant.rotationMode) || (!ant2.disabled && ant2.rotationMode))
        currentBGM = 1;
    else
        currentBGM = 0;

    if(!leafcuttingBGM[currentBGM].isPlaying)
    {
        leafcuttingBGM[currentBGM].play();

        if(prevBGM != currentBGM && prevBGM >= 0)
        {
            leafcuttingBGM[prevBGM].pause();
            leafcuttingBGM[prevBGM].currentTime = 0;
        }
    }

    if(leafcuttingTimeLeft < 10000 && leafcuttingTimeLeft > 0)
    {
        if(!leafcuttingSFX[SFX_LOWTIME].isPlaying())
            leafcuttingSFX[SFX_LOWTIME].play();
    }
    else
    {
        leafcuttingSFX[SFX_LOWTIME].pause();
        leafcuttingSFX[SFX_LOWTIME].currentTime = 0;
    }
}