
const MAINMENUUI = 0;

var mainMenuUI = [];

var mainMenuFontSize;

var titleScreenSprite;
var animationFrameLength = 5;
var animationFrameCount = 29;
var animationFrameCurrent = 0;
var animationTimer = 0

var gameModes = [
    "CUTTER",
    "FLIGHT",
    "COLONY",
    "DEFENSE"
];

function setupMainMenuUI()
{

    titleScreenSprite = new Sprite(tr(vec2(gameWidth/2, gameHeight/2), vec2(gameWidth/1000, gameHeight/750)),
        new ImageObject("images/Animations/Title_Screen_Spritesheet.png", vec2(1000, 750)));

    mainMenuFontSize = 10 * pixelSize;

    //menuButtons = [];

    // TextButton           constructor(transform, label, button, tooltip)
    // Transform            function tr(pos, sc, rot, orig) { return new Transform(pos, sc, rot, orig); }
    // Vec2                 constructor(x, y)
    // Label                constructor(transform, text, font, textColor, align, tooltip)
    // Button               constructor(transform, btnColor, selectColor, hoverColor, disabledColor)

    /*leafcuttingBtn = new TextButton(tr(vec2(), btnSize),
        new Label(tr(), "  LEAFCUTTING GAME", mainMenuFontSize.toString() + "px Pixelmania", "white", 0),
        new Button(tr(), "#00000022", "#00000066", "#00000044"), 
        "");
    menuButtons.push(leafcuttingBtn);

    colonyBtn = new TextButton(tr(vec2(), btnSize),
        new Label(tr(), "  COLONY GAME", mainMenuFontSize.toString() + "px Pixelmania", "white", 0),
        new Button(tr(), "#00000022", "#00000066", "#00000044"), 
        "");
    menuButtons.push(colonyBtn);

    flightBtn = new TextButton(tr(vec2(), btnSize),
        new Label(tr(), "  FLIGHT GAME", mainMenuFontSize.toString() + "px Pixelmania", "white", 0),
        new Button(tr(), "#00000022", "#00000066", "#00000044"), 
        "");
    menuButtons.push(flightBtn);

    defenseBtn = new TextButton(tr(vec2(), btnSize),
        new Label(tr(), "  FLY DEFENSE GAME", mainMenuFontSize.toString() + "px Pixelmania", "white", 0),
        new Button(tr(), "#00000022", "#00000066", "#00000044"), 
        "");
    menuButtons.push(defenseBtn);*/

// FlexGroup constructor(transform, subState, isAxisVertical, gridSpace, gridSize, scaleFlex)
//function tr(pos, sc, rot, orig) { return new Transform(pos, sc, rot, orig); }
//SubState constructor(transform, uiObjects)
    /*mainMenuUI.push(
        new FlexGroup(tr(vec2(50 * pixelSize, 25 * pixelSize), vec2(gameWidth, gameHeight)),
        new SubState(tr(), menuButtons),
        false, 
        vec2(50 * pixelSize, 20 * pixelSize), 
        vec2(1, 4), 
        true));*/

    menuBigPlayButton = new Button(tr(vec2(gameWidth*0.2,gameHeight*0.67), vec2(gameWidth*0.6, gameHeight*0.2)), "#00000000", "#00000000", "#00000000");
    mainMenuUI.push(menuBigPlayButton);

    gameModeButtons = [];

    emptyMenuBtn = new TextButton(tr(vec2(), btnSize),
        new Label(tr(), "", mainMenuFontSize.toString() + "px Pixelmania", "white", 0),
        new Button(tr(), "#00000000", "#00000000", "#00000000"), 
        "");
    gameModeButtons.push(emptyMenuBtn);

    prevMenuBtn = new TextButton(tr(vec2(), btnSize),
        new Label(tr(), "PREV", mainMenuFontSize.toString() + "px Pixelmania", "white", 0),
        new Button(tr(), "#00000011", "#00000055", "#00000033"), 
        "");
    gameModeButtons.push(prevMenuBtn);
    
    playMenuBtn = new TextButton(tr(vec2(), btnSize),
        new Label(tr(), gameModes[0], mainMenuFontSize.toString() + "px Pixelmania", "white", 0),
        new Button(tr(), "#00000000", "#00000044", "#00000022"), 
        "");
    gameModeButtons.push(playMenuBtn);

    nextMenuBtn = new TextButton(tr(vec2(), btnSize),
        new Label(tr(), "NEXT", mainMenuFontSize.toString() + "px Pixelmania", "white", 0),
        new Button(tr(), "#00000011", "#00000055", "#00000033"), 
        "");
    gameModeButtons.push(nextMenuBtn);

    mainMenuUI.push(
        new FlexGroup(tr(vec2(0, gameHeight*0.86), vec2(gameWidth, 60 * pixelSize)),
        new SubState(tr(), gameModeButtons),
        false, 
        vec2(), 
        vec2(5, 1), 
        true)
    );
}

function mainMenuUICustomDraw(deltaTime)
{
    var inSize = {
        x: 1000,
        y: 750
    }
    var inPos = {
        x: (animationFrameCurrent * inSize.x),
        y: 0
    }
    if (animationTimer > animationFrameLength - 1) {
        animationFrameCurrent++
        animationTimer = 0;
    }
    if (animationFrameCurrent >= animationFrameCount) {
        animationFrameCurrent = 0;
    }
    animationTimer++
    titleScreenSprite.drawScIn(inPos, inSize);
}

function mainMenuUICustomUpdate(deltaTime)
{
}

function mainMenuUICustomEvents(deltaTime)
{
    if(playMenuBtn.button.output == UIOUTPUT_SELECT || menuBigPlayButton.output == UIOUTPUT_SELECT)
    {
        if(//leafcuttingBtn.button.output == UIOUTPUT_SELECT)
        playMenuBtn.label.text == gameModes[0])
        {
            ui.stateIndex = LEAFCUTTINGINTROUI;
            //leafcuttingBtn.button.resetOutput();
        }
        else if(//flightBtn.button.output == UIOUTPUT_SELECT)
        playMenuBtn.label.text == gameModes[1])
        {
            ui.stateIndex = FLIGHTGAMEINTROUI;
            //flightBtn.button.resetOutput();
        }
        else if(//colonyBtn.button.output == UIOUTPUT_SELECT)
        playMenuBtn.label.text == gameModes[2])
        {
            ui.stateIndex = COLONYGAMEINTROUI;
            //colonyBtn.button.resetOutput();
        }
        else if(//defenseBtn.button.output == UIOUTPUT_SELECT)
        playMenuBtn.label.text == gameModes[3])
        {
            ui.stateIndex = DEFENSEGAMEINTROUI;
            //defenseBtn.button.resetOutput();
            
        }
        playMenuBtn.button.resetOutput();
        menuBigPlayButton.resetOutput;
    }
    else if(prevMenuBtn.button.output == UIOUTPUT_SELECT)
    {
        var done = false;
        for(let i = 1; i < gameModes.length; i++)
        {
            if(playMenuBtn.label.text == gameModes[i])
            {
                playMenuBtn.label.text = gameModes[i - 1];
                done = true;
                break;
            }
        }
        if(!done) playMenuBtn.label.text = gameModes[gameModes.length - 1];
        prevMenuBtn.button.resetOutput();
    }
    else if(nextMenuBtn.button.output == UIOUTPUT_SELECT)
    {
        var done = false;
        for(let i = 0; i < gameModes.length - 1; i++)
        {
            if(playMenuBtn.label.text == gameModes[i])
            {
                playMenuBtn.label.text = gameModes[i + 1];
                done = true;
                break;
            }
        }
        if(!done) playMenuBtn.label.text = gameModes[0];
        nextMenuBtn.button.resetOutput();
    }
}