var bgmIntro = document.createElement('audio');

window.onload = function()
{
    init();
    
    setInterval(frame, 1000 / 60);

    bgmIntro.setAttribute('src', 'audio/Intro Music.mp3');
    bgmIntro.loop = true;

};

function events(deltaTime)
{
    switch(ui.stateIndex)
    {
        case MAINMENUUI: mainMenuUICustomEvents(deltaTime); ui.event(); break;
        case FLIGHTGAMEUI: flightGameUICustomEvents(deltaTime); ui.event(); break;
        case COLONYGAMEUI: colonyGameUICustomEvents(deltaTime); ui.event(); break;
        case LEAFCUTTINGUI: leafcuttingUICustomEvents(deltaTime); ui.event(); break;
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
    drawRect(renderer, vec2(0, 0), vec2(gameWidth, gameHeight), true, bgHEX);
    switch(ui.stateIndex)
    {
        case MAINMENUUI: mainMenuUICustomDraw(deltaTime); ui.update(); break;
        case FLIGHTGAMEUI: flightGameUICustomDraw(deltaTime); ui.update(); break;
        case COLONYGAMEUI: colonyGameUICustomDraw(deltaTime); ui.update(); break;
        case LEAFCUTTINGUI: leafcuttingUICustomDraw(deltaTime); ui.update(); break;
        case DEFENSEGAMEUI: defenseGame.draw(); break;
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
}