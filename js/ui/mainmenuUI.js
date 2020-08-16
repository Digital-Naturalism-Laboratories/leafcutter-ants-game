
const MAINMENUUI = 0;

var mainMenuUI = [];

var mainMenuFontSize;

function setupMainMenuUI()
{
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