
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
var leafcuttingStartTime = 200000;
var leafcuttingLowTimeAlert = 15000;

var leafcuttingWinBonus = 2;
var leafcuttingLosePenalty = 2;

var prevBGM = -1;
var currentBGM = 0;

var leafcuttingBGMMaxVolume = 0.6;
var leafcuttingBGMVolumeStep = 0.0004;
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
    document.createElement('audio'),
    document.createElement('audio'),
    document.createElement('audio')
]
var leafcuttingSFXPaths = [
    "audio/SFX/Jaw Penalty ALT.wav",
    "audio/SFX/Positive Feedback - Beef Up Trail.wav",
    "audio/SFX/Clock Ticking.wav",
    "audio/SFX/Leaf Minim Footsteps.wav",
    "audio/SFX/Positive Feedback - Player Wins.wav",
    "audio/SFX/Game Over.wav",
    "audio/SFX/Jaw Penalty.wav",
    "audio/SFX/Positive Feedback - Leaf Cut Success ALT.wav"
]
var SFX_JAWBUTTON = 0;
var SFX_JAWTIMED = 1;
var SFX_LOWTIME = 2;
var SFX_ANTWALK = 3;
var SFX_PLAYERWIN = 4;
var SFX_TIMEOUT = 5;
var SFX_JAWPENALTY = 6;
var SFX_LEAFSUCCESS = 7;

function leafcuttingResetGame()
{
    leafcuttingScore = 0;
    leafcuttingTimeLeft = leafcuttingStartTime;

    leafcuttingFontSize = 14 * pixelSize;

    leaf = new Leaf();
    ant = new Ant(leaf);
    ant2 = new Ant(leaf);
    ant.setSecondAnt(ant2);
    ant2.setSecondAnt(ant);
    ant2.disabled = true;
}

function setupLeafcuttingUI()
{
    leafcuttingResetGame();

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
        leafcuttingBGM[i].volume = 0;
    }
    for(let i = 0; i < leafcuttingSFX.length; i++)
    {
        leafcuttingSFX[i].setAttribute('src', leafcuttingSFXPaths[i]);
        leafcuttingSFX[i].volume = 1;
    }
}

function leafcuttingUICustomDraw(deltaTime)
{
    leaf.draw(deltaTime);
    ant.draw(deltaTime);
    ant2.draw(deltaTime);
}

function leafcuttingUICustomUpdate(deltaTime)
{
    leaf.update(deltaTime);
    ant.update(deltaTime);
    ant2.update(deltaTime);
    
    gameHintLabel.text = leafcuttingHint;
    scoreLabel.text = "SCORE: " + leafcuttingScore.toString();
    if(leafcuttingTimeLeft > 0)
        timeLabel.text = "TIME LEFT: " + (Math.floor(leafcuttingTimeLeft/1000)).toString();
    else
        timeLabel.text = "TIME OUT!";

    if(!ant.disabled || !ant2.disabled)
        leafcuttingTimeLeft -= deltaTime;

    if(ui.stateIndex == LEAFCUTTINGUI)
    {
        leafcuttingAudioHandling(deltaTime);
    }
    else
    {
        //Resetting/Stopping all Leaf Cutting Game Audio
        for(let i = 0; i < leafcuttingBGM.length; i++)
        {
            leafcuttingBGM[i].currentTime = 0;
            leafcuttingBGM[i].pause();
        }
        for(let i = 0; i < leafcuttingSFX.length; i++)
        {
            leafcuttingSFX[i].currentTime = 0;
            leafcuttingSFX[i].pause();
        }
    }
}

function leafcuttingUICustomEvents(deltaTime)
{
    ant.event();
    ant2.event();
}

function areLeafcuttingAntsDisabled()
{
    return ant.disabled && ant2.disabled;
}

function leafcuttingDisableBothAnts()
{
    ant.disabled = ant2.disabled = true;
}

function leafcuttingAudioHandling(deltaTime)
{
    if(currentBGM >= 0 && currentBGM < leafcuttingBGM.length
        && leafcuttingBGM[currentBGM].readyState == 4)
    {
        if((!ant.disabled && ant.rotationMode) || (!ant2.disabled && ant2.rotationMode))
        {
            prevBGM = 0;
            currentBGM = 1;
        }
        else
        {
            prevBGM = 1;
            currentBGM = 0;
        }

        if(!leafcuttingBGM[currentBGM].isPlaying)
        {
            leafcuttingBGM[currentBGM].play();
        }
        if(leafcuttingBGM[currentBGM].volume < leafcuttingBGMMaxVolume)
        {
            var value = leafcuttingBGMVolumeStep * deltaTime;
            if(leafcuttingBGM[currentBGM].volume + value <= leafcuttingBGMMaxVolume)
            {
                leafcuttingBGM[currentBGM].volume += value;
            }
            else
            {
                leafcuttingBGM[currentBGM].volume = leafcuttingBGMMaxVolume;
            }
        }
    }

    if(prevBGM != currentBGM && prevBGM >= 0)
    {
        if(leafcuttingBGM[prevBGM].volume > 0)
        {
            if(leafcuttingBGM[prevBGM].volume - (leafcuttingBGMVolumeStep * deltaTime) >= 0)
                leafcuttingBGM[prevBGM].volume -= leafcuttingBGMVolumeStep * deltaTime;
            else
                leafcuttingBGM[prevBGM].volume = 0;
        }
        else
        {
            leafcuttingBGM[prevBGM].pause();
            leafcuttingBGM[prevBGM].currentTime = 0;
        }
    }

    if(leafcuttingTimeLeft < leafcuttingLowTimeAlert && leafcuttingTimeLeft > 0)
    {
        if(leafcuttingSFX[SFX_LOWTIME].currentTime <= 0 || leafcuttingSFX[SFX_LOWTIME].currentTime > 2.9)
        {
            prevBGM = currentBGM;
            currentBGM = -1;

            leafcuttingSFX[SFX_LOWTIME].volume = leafcuttingBGMMaxVolume;
            leafcuttingSFX[SFX_LOWTIME].currentTime = 0;
            leafcuttingSFX[SFX_LOWTIME].play();
        }
    }
    else
    {
        leafcuttingSFX[SFX_LOWTIME].pause();
        leafcuttingSFX[SFX_LOWTIME].currentTime = 0;

        if(leafcuttingTimeLeft < 0 && leafcuttingTimeLeft > -1000)
        {
            if(!areLeafcuttingAntsDisabled())
            {
                leafcuttingSFX[SFX_TIMEOUT].volume = leafcuttingBGMMaxVolume;
                leafcuttingSFX[SFX_TIMEOUT].play();
                leafcuttingDisableBothAnts();
            }
            else if(!leafcuttingSFX[SFX_TIMEOUT].isPlaying && leafcuttingSFX[SFX_TIMEOUT].volume <= 0.4)
            {
                leafMaterial += leafcuttingScore / leafcuttingLosePenalty;
                leafcuttingResetGame();
                ui.stateIndex = COLONYGAMEUI;
            }
            else if(leafcuttingSFX[SFX_TIMEOUT].volume > 0.4)
            {
                leafcuttingSFX[SFX_TIMEOUT].volume -= 0.00005 * deltaTime;
            }
        }
    }
}