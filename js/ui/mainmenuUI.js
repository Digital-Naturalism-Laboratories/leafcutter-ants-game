
const MAINMENUUI = 0;

var mainMenuUI = [];

var mainMenuFontSize;

var titleScreenSprite;
var animationFrameLength = 5;
var animationFrameCount = 29;
var animationFrameCurrent = 0;
var animationTimer = 0

function setupMainMenuUI()
{

    titleScreenSprite = new Sprite(tr(vec2(500, 375), vec2(1, 1)), new ImageObject("images/Animations/Title_Screen_Spritesheet.png", vec2(1000, 750)));

    mainMenuFontSize = 18 * pixelSize;

    menuButtons = [];
    // TextButton           constructor(transform, label, button, tooltip)
    // Transform            function tr(pos, sc, rot, orig) { return new Transform(pos, sc, rot, orig); }
    // Vec2                 constructor(x, y)
    // Label                constructor(transform, text, font, textColor, align, tooltip)
    // Button               constructor(transform, btnColor, selectColor, hoverColor, disabledColor)

    leafcuttingBtn = new TextButton(tr(vec2(), btnSize),
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
    menuButtons.push(defenseBtn);

// FlexGroup constructor(transform, subState, isAxisVertical, gridSpace, gridSize, scaleFlex)
//function tr(pos, sc, rot, orig) { return new Transform(pos, sc, rot, orig); }
//SubState constructor(transform, uiObjects)
    mainMenuUI.push(
        new FlexGroup(tr(vec2(50 * pixelSize, 25 * pixelSize), vec2(gameWidth, gameHeight)),
        new SubState(tr(), menuButtons),
        false, 
        vec2(50 * pixelSize, 20 * pixelSize), 
        vec2(1, 4), 
        true));
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
    if(leafcuttingBtn.button.output == UIOUTPUT_SELECT)
    {
        ui.stateIndex = LEAFCUTTINGUI;
        leafcuttingBtn.button.resetOutput();
    }
    else if(flightBtn.button.output == UIOUTPUT_SELECT)
    {
        ui.stateIndex = FLIGHTGAMEUI;
        flightBtn.button.resetOutput();
    }
    else if(colonyBtn.button.output == UIOUTPUT_SELECT)
    {
        ui.stateIndex = COLONYGAMEUI;
        colonyBtn.button.resetOutput();
    }
    else if(defenseBtn.button.output == UIOUTPUT_SELECT)
    {
        ui.stateIndex = DEFENSEGAMEUI;
        defenseBtn.button.resetOutput();
        defenseGame.audioManager.sfxManager.populateArrayOfEatingFungusSounds();
        defenseGame.audioManager.sfxManager.populateArrayOfFlyChasedSounds();
        defenseGame.audioManager.ambienceManager.startAmbience();
        defenseGame.audioManager.sfxManager.calculateAndSetAvoidAwkwardSilenceTimestamps();
        defenseGame.audioManager.sfxManager.flyBuzzingNormal.play();
        defenseGame.audioManager.sfxManager.groundMinimFootsteps.play();
    }
}