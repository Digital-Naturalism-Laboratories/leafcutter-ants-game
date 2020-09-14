
const LEAFCUTTINGUI = 3;

var leafcuttingUI = [];

var leaf;
var ant;
var ant2;
var autoAnts;
var autoAnts2;
var totalAutoAnts = 0;
var maxAutoAnts = 3;

var leafcuttingScore = 0;
var leafcuttingTimeLeft = 0;
var leafcuttingStartTime = 180000;
var leafcuttingLowTimeAlert = 15000;

var leafcuttingWinBonus = 2;
var leafcuttingLosePenalty = 2;

var prevBGM = -1;
var currentBGM = 0;

var leafcuttingBGMMaxVolume = 0.1;
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
    "audio/SFX/Leaf Minim Footsteps Fast.wav",
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

var clickEdgeDisplayStart = true;
var clickGreenDisplayStart = 1500;

var topDownSoldierAntImageObject;
var cutLeafImageObjects = [];

function loadLeafCuttingGameTextures()
{
    topDownSoldierAntImageObject = new ImageObject("images/Animations/TopDown_Soldier_Ant_Spritesheet.png", vec2(4950, 150));
    cutLeafImageObjects = [
        new ImageObject("images/CutLeaves/1.png", vec2(500, 500)),
        new ImageObject("images/CutLeaves/2.png", vec2(500, 500)),
        new ImageObject("images/CutLeaves/3.png", vec2(500, 500)),
        new ImageObject("images/CutLeaves/4.png", vec2(500, 500)),
        new ImageObject("images/CutLeaves/5.png", vec2(500, 500)),
        new ImageObject("images/CutLeaves/6.png", vec2(500, 500)),
        new ImageObject("images/CutLeaves/7.png", vec2(500, 500)),
        new ImageObject("images/CutLeaves/8.png", vec2(500, 500)),
        new ImageObject("images/CutLeaves/9.png", vec2(500, 500)),
        new ImageObject("images/CutLeaves/10.png", vec2(500, 500)),
        new ImageObject("images/CutLeaves/11.png", vec2(500, 500)),
        new ImageObject("images/CutLeaves/12.png", vec2(500, 500)),
        new ImageObject("images/CutLeaves/13.png", vec2(500, 500))
    ];
    antHeadImageObject = new ImageObject("images/Animations/Ant_Head_Spritesheet.png", vec2(5600, 250));
    leadingJawImageObject = new ImageObject("images/LeadingJaw.png", vec2(41, 86));
    cuttingJawImageObject = new ImageObject("images/CuttingJaw.png", vec2(39, 84));
}

function leafcuttingResetGame()
{
    leafcuttingScore = 0;
    leafcuttingTimeLeft = leafcuttingStartTime;

    leaf = new Leaf();
    ant = new Ant(leaf);
    ant2 = new Ant(leaf);
    ant.setSecondAnt(ant2);
    ant2.setSecondAnt(ant);
    ant2.disabled = true;

    autoAnts = [];
    autoAnts2 = [];
    totalAutoAnts = 0;

    clickEdgeDisplayStart = true;
    clickGreenDisplayStart = 1500;
}

function setupLeafcuttingUI()
{
    loadLeafCuttingGameTextures();
    leafcuttingResetGame();

    gameplayTopLeftLabels = [];
    scoreLabel = new Label(tr(), string_LeavesCollected_COLON[currentLanguage] + leafcuttingScore.toString(),
        (54*pixelSize).toString() + "px " + uiContext.fontFamily, "white", -1);
    gameplayTopLeftLabels.push(scoreLabel);
    timeLabel = new Label(tr(), "TIME: " + (leafcuttingTimeLeft/1000).toString(),
        (54*pixelSize).toString() + "px " + uiContext.fontFamily, "white", -1);
    gameplayTopLeftLabels.push(timeLabel);

    leafcuttingUI.push(new FlexGroup(tr(vec2(20*pixelSize, 20*pixelSize), vec2(window.innerWidth, 80*pixelSize)),
        new SubState(tr(), gameplayTopLeftLabels), false, vec2(0, 10*pixelSize), vec2(1, 2), true));

    //centerLabel1 = new Label(tr(vec2(0, -40 * pixelSize), vec2(gameWidth, gameHeight)), string_CLICK_EDGE_TO[currentLanguage],
    //    (96*pixelSize).toString() + "px " + uiContext.fontFamily, "white", 0);
    centerLabel1 = new Label(tr(vec2(gameWidth / 2, -40 * pixelSize), vec2(gameWidth, gameHeight)), string_CLICK_EDGE_TO[currentLanguage],
        (60*pixelSize).toString() + "px " + uiContext.fontFamily, "white", "center");
    leafcuttingUI.push(centerLabel1);
    //centerLabel2 = new Label(tr(vec2(0, 40 * pixelSize), vec2(gameWidth, gameHeight)), string_START_CUTTING[currentLanguage],
    //    (96*pixelSize).toString() + "px " + uiContext.fontFamily, "white", 0);
    centerLabel2 = new Label(tr(vec2(gameWidth / 2, 40 * pixelSize), vec2(gameWidth, gameHeight)), string_START_CUTTING[currentLanguage],
        (60*pixelSize).toString() + "px " + uiContext.fontFamily, "white", "center");
    leafcuttingUI.push(centerLabel2);

    controlHintLabel = new Label(tr(vec2(350 * pixelSize, 280 * pixelSize), vec2(240 * pixelSize, 40 * pixelSize)), string_CLICK_WHEN_GREEN[currentLanguage],
        (40*pixelSize).toString() + "px " + uiContext.fontFamily, "#ffffffdd", 0);
    leafcuttingUI.push(controlHintLabel);
    controlHintLabel.enabled = false;

    for(let i = 0; i < leafcuttingBGM.length; i++)
    {
        leafcuttingBGM[i].setAttribute('src', leafcuttingBGMPaths[i]);
        leafcuttingBGM[i].loop = true;
        leafcuttingBGM[i].volume = 0;
    }
    for(let i = 0; i < leafcuttingSFX.length; i++)
    {
        leafcuttingSFX[i].setAttribute('src', leafcuttingSFXPaths[i]);
        leafcuttingSFX[i].volume = 0.25;
    }
}

function leafcuttingUIResize()
{
    scoreLabel.font = timeLabel.font = (54*pixelSize).toString() + "px " + uiContext.fontFamily;

    leafcuttingUI[0].transform.position = vec2(20*pixelSize, 20*pixelSize);
    leafcuttingUI[0].transform.scale = vec2(window.innerWidth, 80*pixelSize);
    leafcuttingUI[0].gridSpace = vec2(0, 10*pixelSize);

    //centerLabel1.transform.position = vec2(0, -40 * pixelSize);
    centerLabel1.transform.position = vec2(gameWidth / 10, -40 * pixelSize);
    //centerLabel2.transform.position = vec2(0, 40 * pixelSize);
    centerLabel2.transform.position = vec2(gameWidth / 10, 40 * pixelSize);
    centerLabel1.transform.scale = centerLabel2.transform.scale = vec2(gameWidth, gameHeight);
    centerLabel1.font = centerLabel2.font = (60*pixelSize).toString() + "px " + uiContext.fontFamily;

    controlHintLabel.transform.position = vec2(350 * pixelSize, 280 * pixelSize);
    controlHintLabel.transform.scale = vec2(240 * pixelSize, 40 * pixelSize);
    controlHintLabel.font = (40*pixelSize).toString() + "px " + uiContext.fontFamily;

    leaf.resize();

    if(typeof autoAnts != "undefined")
        for(let i = 0; i < autoAnts.length; i++)
            autoAnts[i].resize();
    if(typeof autoAnts2 != "undefined")
        for(let i = 0; i < autoAnts2.length; i++)
            autoAnts2[i].resize();

    ant.resize();
    ant2.resize();
}

function leafcuttingUICustomDraw(deltaTime)
{
    leaf.draw(deltaTime);

    if(typeof autoAnts != "undefined")
        for(let i = 0; i < autoAnts.length; i++)
            autoAnts[i].draw(deltaTime);
    if(typeof autoAnts2 != "undefined")
        for(let i = 0; i < autoAnts2.length; i++)
            autoAnts2[i].draw(deltaTime);

    ant.draw(deltaTime);
    ant2.draw(deltaTime);
}

function leafcuttingUICustomUpdate(deltaTime)
{
    leaf.update(deltaTime);

    if(typeof autoAnts != "undefined")
        for(let i = 0; i < autoAnts.length; i++)
            autoAnts[i].update(deltaTime);
    if(typeof autoAnts2 != "undefined")
        for(let i = 0; i < autoAnts2.length; i++)
            autoAnts2[i].update(deltaTime);

    ant.update(deltaTime);
    ant2.update(deltaTime);
    
    scoreLabel.text = string_LeavesCollected_COLON[currentLanguage] + leafcuttingScore.toString();
    if(leafcuttingTimeLeft > 0)
        timeLabel.text = string_Time[currentLanguage] + (Math.floor(leafcuttingTimeLeft/1000)).toString();
    else
        timeLabel.text = string_TIME_OUT[currentLanguage];

    if((!ant.rotationMode && ant.pointIndex == -1 && !ant.disabled && !ant.forcedDestination)
    || (!ant2.rotationMode && ant2.pointIndex == -1 && !ant2.disabled && !ant2.forcedDestination))
    {
        if(clickEdgeDisplayStart)
        {
            centerLabel1.text = string_CLICK_EDGE_TO[currentLanguage];
            centerLabel2.text = string_START_CUTTING[currentLanguage];
            centerLabel1.enabled = centerLabel2.enabled = true;
            clickEdgeDisplayStart = false;
        }
    }
    else if(!(ant.disabled && ant2.disabled))
    {
        centerLabel1.enabled = centerLabel2.enabled = false;
    }

    if((ant.rotationMode && (clickGreenDisplayStart > 0 || ant.timedJawSpeedFactor <= ant.timedJawSpeedFactorMin * 1.5))
    || (ant2.rotationMode && (clickGreenDisplayStart > 0 || ant2.timedJawSpeedFactor <= ant2.timedJawSpeedFactorMin * 1.5)))
    {
        controlHintLabel.text = string_CLICK_WHEN_GREEN[currentLanguage];
        controlHintLabel.enabled = true;
        clickGreenDisplayStart -= deltaTime;
    }
    else
    {
        controlHintLabel.enabled = false;
    }

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
    //leaf.event();

    if(typeof autoAnts != "undefined")
        for(let i = 0; i < autoAnts.length; i++)
            autoAnts[i].event();
    if(typeof autoAnts2 != "undefined")
        for(let i = 0; i < autoAnts2.length; i++)
            autoAnts2[i].event();

    ant.event();
    ant2.event();
    
    bgmColony.volume = 0;
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

                if(leafcuttingScore >= 2400)
                    centerLabel1.text = string_AMAZING_AMOUNT_OF[currentLanguage];
                else if(leafcuttingScore >= 1200)
                    centerLabel1.text = string_GOOD_AMOUNT_OF[currentLanguage];
                else if(leafcuttingScore >= 600)
                    centerLabel1.text = string_OK_AMOUNT_OF[currentLanguage];
                else
                    centerLabel1.text = string_BARELY_ANY[currentLanguage];
                
                centerLabel2.text = string_LeavesCollected[currentLanguage];
                centerLabel1.enabled = centerLabel2.enabled = true;

                leafcuttingDisableBothAnts();
            }
            else if(!leafcuttingSFX[SFX_TIMEOUT].isPlaying && leafcuttingSFX[SFX_TIMEOUT].volume <= 0.4)
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

                leafMaterial += leafcuttingScore / leafcuttingLosePenalty;
                leafcuttingResetGame();
                ui.stateIndex = DEFENSEGAMEINTROUI;
            }
            else if(leafcuttingSFX[SFX_TIMEOUT].volume > 0.4)
            {
                leafcuttingSFX[SFX_TIMEOUT].volume -= 0.00005 * deltaTime;
            }
        }
    }
}