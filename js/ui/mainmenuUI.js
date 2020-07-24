
const MAINMENUUI = 0;

var mainMenuUI = [];

var mainMenuFontSize = 32;

function setupMainMenuUI()
{
    menuButtons = [];
    leafcuttingBtn = new TextButton(tr(vec2(), btnSize),
        new Label(tr(), "  LEAFCUTTING GAME",
        mainMenuFontSize.toString() + "px " + uiContext.fontFamily, "black", 0),
        new Button(tr(), "#ffffffff", "#99ff99ff", "#bbffbbff"), "");
    menuButtons.push(leafcuttingBtn);
    colonyBtn = new TextButton(tr(vec2(), btnSize),
        new Label(tr(), "  COLONY GAME",
        mainMenuFontSize.toString() + "px " + uiContext.fontFamily, "black", 0),
        new Button(tr(), "#ffffffff", "#99ff99ff", "#bbffbbff"), "");
    menuButtons.push(colonyBtn);
    flightBtn = new TextButton(tr(vec2(), btnSize),
        new Label(tr(), "  FLIGHT GAME",
        mainMenuFontSize.toString() + "px " + uiContext.fontFamily, "black", 0),
        new Button(tr(), "#ffffffff", "#99ff99ff", "#bbffbbff"), "");
    menuButtons.push(flightBtn);

    mainMenuUI.push(new FlexGroup(tr(vec2(50, 25), vec2(gameWidth, gameHeight)),
        new SubState(tr(), menuButtons),false, vec2(50, 20), vec2(1, 3), true));
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
}