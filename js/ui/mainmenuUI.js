
const MAINMENUUI = 0;

var mainMenuUI = [];

var mainMenuFontSize = 32;

function setupMainMenuUI()
{
    menuButtons = [];
    // TextButton           constructor(transform, label, button, tooltip)
    // Transform            function tr(pos, sc, rot, orig) { return new Transform(pos, sc, rot, orig); }
    // Vec2                 constructor(x, y)
    // Label                constructor(transform, text, font, textColor, align, tooltip)
    // Button               constructor(transform, btnColor, selectColor, hoverColor, disabledColor)

    leafcuttingBtn = new TextButton(tr(vec2(), btnSize),
        new Label(tr(), "  LEAFCUTTING GAME", mainMenuFontSize.toString() + "px " + uiContext.fontFamily, "black", 0),
        new Button(tr(), "#ffffffff", "#99ff99ff", "#bbffbbff"), 
        "");
    menuButtons.push(leafcuttingBtn);

    colonyBtn = new TextButton(tr(vec2(), btnSize),
        new Label(tr(), "  COLONY GAME", mainMenuFontSize.toString() + "px " + uiContext.fontFamily, "black", 0),
        new Button(tr(), "#ffffffff", "#99ff99ff", "#bbffbbff"), 
        "");
    menuButtons.push(colonyBtn);

    flightBtn = new TextButton(tr(vec2(), btnSize),
        new Label(tr(), "  FLIGHT GAME", mainMenuFontSize.toString() + "px " + uiContext.fontFamily, "black", 0),
        new Button(tr(), "#ffffffff", "#99ff99ff", "#bbffbbff"), 
        "");
    menuButtons.push(flightBtn);

    defenseBtn = new TextButton(tr(vec2(), btnSize),
        new Label(tr(), "  FLY DEFENSE GAME", mainMenuFontSize.toString() + "px " + uiContext.fontFamily, "black", 0),
        new Button(tr(), "#ffffffff", "#99ff99ff", "#bbffbbff"), 
        "");
    menuButtons.push(defenseBtn);

// FlexGroup constructor(transform, subState, isAxisVertical, gridSpace, gridSize, scaleFlex)
//function tr(pos, sc, rot, orig) { return new Transform(pos, sc, rot, orig); }
//SubState constructor(transform, uiObjects)
    mainMenuUI.push(
        new FlexGroup(tr(vec2(50, 25), vec2(gameWidth, gameHeight)),
        new SubState(tr(), menuButtons),
        false, 
        vec2(50, 20), 
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
    }
}