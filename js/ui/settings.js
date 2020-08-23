
function uiInit()
{
    uiSettings();
    setupMainMenuUI();
    setupFlightGameIntroUI();
    setupFlightGameUI();
    setupColonyGameIntroUI();
    setupColonyGameUI();
    setupLeafcuttingIntroUI();
    setupLeafcuttingUI();
    setupDefenseGameIntroUI();
    defenseGame.initialize();
    defenseGame.audioManager.populateMasterArrayOfAudioTags();

    uistates = [];
    uistates.push(new UIState(mainMenuUI));
    uistates.push(new UIState(flightGameUI));
    uistates.push(new UIState(colonyGameUI));
    uistates.push(new UIState(leafcuttingUI));
    uistates.push(new UIState(defenseGame.arrayOfUIObjects))
    uistates.push(new UIState(colonyGameIntroUI));
    uistates.push(new UIState(flightGameIntroUI));
    uistates.push(new UIState(leafcuttingIntroUI));
    uistates.push(new UIState(defenseGameIntroUI));
    ui = new UI(uistates, 0);
}

function uiSettings()
{
    if(window.innerWidth > window.innerHeight)
        scrSizeFactor = window.innerHeight;
    else
        scrSizeFactor = window.innerWidth;
    
    btnSize = vec2(scrSizeFactor * 0.16, scrSizeFactor * 0.04);
    squareBtnSize = vec2(scrSizeFactor * 0.05, scrSizeFactor * 0.05);
    tabSize = vec2(scrSizeFactor * 0.15, scrSizeFactor * 0.08);
    sliderSize = vec2(scrSizeFactor * 0.28, scrSizeFactor * 0.04);
    sliderKnobSize = scrSizeFactor * 0.0075;
    panelSize = vec2(scrSizeFactor * 0.32, scrSizeFactor * 0.54);
    uiContext.set(renderer, 2, "SmallBoldPixel", scrSizeFactor * 0.028);
}