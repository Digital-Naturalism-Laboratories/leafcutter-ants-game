
const MAINMENUUI = 0;

var mainMenuUI = [];

var mainMenuFontSize;

var titleScreenSprite;
var animationFrameLength = 5;
var animationFrameCount = 29;
var animationFrameCurrent = 0;
var animationTimer = 0

var isGameSelectEnabled = false;

var gameModes = [
    "COLONY",
    "CUTTER",
    "DEFENSE",
    "FLIGHT"
];

var languages = [
    "Español",
    "English"
]

var currentLanguage = "Español";

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

    if (!isGameSelectEnabled) {

        languageBtn = new TextButton(tr(vec2(), btnSize),
        new Label(tr(), "LANGUAGE: " + languages[0], 30 * pixelSize + "px SmallBoldPixel", "white", 0),
        new Button(tr(), "#00000000", "#00000000", "#00000000"), 
        "");
        gameModeButtons.push(languageBtn);

    } else {

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
    }

    if (isGameSelectEnabled){
        mainMenuUI.push(
        new FlexGroup(tr(vec2(0, gameHeight*0.86), vec2(gameWidth, 60 * pixelSize)),
        new SubState(tr(), gameModeButtons),
        false, 
        vec2(), 
        vec2(5, 1), 
        true));
    } else {
        mainMenuUI.push(
        new FlexGroup(tr(vec2(gameHeight / 2 + 30, gameHeight*0.86), vec2(gameWidth, 60 * pixelSize)),
        new SubState(tr(), gameModeButtons),
        false, 
        vec2(), 
        vec2(5, 1), 
        true));
    }
    
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

    //renderer.strokeStyle = 'red';
    //renderer.lineWidth = 5;
    //renderer.strokeRect(0, 0, gameWidth, gameHeight*0.87, 'white');
}

function mainMenuUICustomUpdate(deltaTime)
{
}

function mainMenuUICustomEvents(deltaTime)
{
    if (!isGameSelectEnabled) {
        if(menuBigPlayButton.output == UIOUTPUT_SELECT) {
            ui.stateIndex = COLONYGAMEINTROUI;
        } else if(languageBtn.button.output == UIOUTPUT_SELECT)
        {
            var done = false;
            for(let i = 1; i < languages.length; i++)
            {
                if(languageBtn.label.text == "LANGUAGE: " + languages[i])
                {
                    languageBtn.label.text = "LANGUAGE: " + languages[i - 1];
                    done = true;
                    break;
                }
            }
            if(!done) languageBtn.label.text = "LANGUAGE: " + languages[languages.length - 1];
            languageBtn.button.resetOutput();

            if(languageBtn.label.text == "LANGUAGE: Español"){
                currentLanguage = "Español";
            } else {
                currentLanguage = "English";
            }
            
        }
    } else if(playMenuBtn.button.output == UIOUTPUT_SELECT || menuBigPlayButton.output == UIOUTPUT_SELECT) {

        if(//leafcuttingBtn.button.output == UIOUTPUT_SELECT)
        playMenuBtn.label.text == gameModes[0]) 
        {
            ui.stateIndex = COLONYGAMEINTROUI;
            //leafcuttingBtn.button.resetOutput();
        }
        else if(//flightBtn.button.output == UIOUTPUT_SELECT)
        playMenuBtn.label.text == gameModes[1])
        {
            ui.stateIndex = LEAFCUTTINGINTROUI;
            //flightBtn.button.resetOutput();
        }
        else if(//colonyBtn.button.output == UIOUTPUT_SELECT)
        playMenuBtn.label.text == gameModes[2])
        {
            ui.stateIndex = DEFENSEGAMEINTROUI;
            //colonyBtn.button.resetOutput();
        }
        else if(//defenseBtn.button.output == UIOUTPUT_SELECT)
        playMenuBtn.label.text == gameModes[3])
        {
            ui.stateIndex = FLIGHTGAMEINTROUI;
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