var bgmIntro = document.createElement('audio');
var fullScreenActive = false;
window.onload = function()
{
    init();
    bgmIntro.setAttribute('src', 'audio/Intro Music.mp3');
    bgmIntro.loop = true;

    frame();
};

function events(deltaTime)
{
    switch(ui.stateIndex)
    {
        case MAINMENUUI: mainMenuUICustomEvents(deltaTime); ui.event(); break;
        case FLIGHTGAMEUI: flightGameUICustomEvents(deltaTime); ui.event(); break;
        case COLONYGAMEUI: colonyGameUICustomEvents(deltaTime); ui.event(); break;
        case LEAFCUTTINGUI: leafcuttingUICustomEvents(deltaTime); ui.event(); break;
        case COLONYGAMEINTROUI: colonyGameIntroUICustomEvents(deltaTime); ui.event(); break;
        case FLIGHTGAMEINTROUI: flightGameIntroUICustomEvents(deltaTime); ui.event(); break;
        case LEAFCUTTINGINTROUI:leafcuttingIntroUICustomEvents(deltaTime); ui.event(); break;
        case DEFENSEGAMEINTROUI: defenseGameIntroUICustomEvents(deltaTime); ui.event(); break;
    }
}

function update(deltaTime)
{
    switch(ui.stateIndex)
    {
        case MAINMENUUI: mainMenuUICustomUpdate(deltaTime); ui.update(); break;
        //case FLIGHTGAMEUI: flightGameUICustomUpdate(deltaTime); ui.update(); break;
        //case COLONYGAMEUI: colonyGameUICustomUpdate(deltaTime); ui.update(); break;
        case LEAFCUTTINGUI: leafcuttingUICustomUpdate(deltaTime); ui.update(); break;
        case DEFENSEGAMEUI: defenseGame.update(); break;
    }
}

function draw(deltaTime)
{
    renderer.clearRect(0, 0, window.innerWidth, window.innerHeight);
    drawRect(renderer, vec2(0, 0), vec2(window.innerWidth, window.innerHeight), true, bgHEX);
    switch(ui.stateIndex)
    {
        case MAINMENUUI: mainMenuUICustomDraw(deltaTime); ui.update(); break;
        case FLIGHTGAMEUI: flightGameUICustomDraw(deltaTime); ui.update(); break;
        case COLONYGAMEUI: colonyGameUICustomDraw(deltaTime); ui.update(); break;
        case LEAFCUTTINGUI: leafcuttingUICustomDraw(deltaTime); ui.update(); break;
        case DEFENSEGAMEUI: defenseGame.draw(); break;
        case COLONYGAMEINTROUI: colonyGameIntroUICustomDraw(deltaTime); ui.update(); break;
        case FLIGHTGAMEINTROUI: flightGameIntroUICustomDraw(deltaTime); ui.update(); break;
        case LEAFCUTTINGINTROUI: leafcuttingIntroUICustomDraw(deltaTime); ui.update(); break;
        case DEFENSEGAMEINTROUI: defenseGameIntroUICustomDraw(deltaTime); ui.update(); break;
    }
    
    ui.draw();
}

function frame()
{
    if (ImageObject.areAllLoaded())
    {
        if (!gamePaused)
        {
            var deltaTime = getDeltaTime();
            events(deltaTime);
            update(deltaTime);
            draw(deltaTime);
        }
    }
    else
    {
        loadingAntSprite.drawScIn(vec2(), vec2(32, 19));
        drawRect(renderer, vec2(0, 0), vec2(gameWidth, gameHeight), true, bgHEX);
        drawRect(renderer, vec2(gameWidth/4, (gameHeight/2) - (15*pixelSize)), vec2(gameWidth/2, 30*pixelSize), false, "black");
        drawRect(renderer, vec2(gameWidth/4, (gameHeight/2) - (15*pixelSize)), vec2((gameWidth/2)*((totalImagesToLoad - imagesLoadingLeft)/totalImagesToLoad), 30*pixelSize), true, "black");
    }
    setTimeout(frame, 15);
}