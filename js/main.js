var bgmIntro = document.createElement('audio');
var fullScreenActive = false;
window.onload = function()
{
    setInterval(defenseGameAnim,25);

    init();
    bgmIntro.setAttribute('src', 'audio/Intro Music.mp3');
    bgmIntro.loop = true;

    frame();
};

var defenseGameFrame = 0;
function defenseGameAnim()
{
    defenseGameFrame++;
}

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
        case COLONYGAMEUI: colonyGameUICustomUpdate(deltaTime); ui.update(); break;
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
    var deltaTime = getDeltaTime();

    if (ImageObject.areAllLoaded())
    {
        if (!gamePaused)
        {
            //These lines seems to be causing the leaf cutting game to crash.
            //canvas.width = gameWidth;
            //canvas.height = gameHeight;
            canvas.style.position = "absolute";
            canvasStartY = (window.innerHeight/2) - (gameHeight/2);
            canvas.style.top = canvasStartY.toString() + "px";
            canvasStartX = (window.innerWidth/2) - (gameWidth/2);
            canvas.style.left = canvasStartX.toString() + "px";

            events(deltaTime);
            update(deltaTime);
            draw(deltaTime);
        }
    }
    else
    {
        renderer.clearRect(0, 0, window.innerWidth, window.innerHeight);
        drawRect(renderer, vec2(0, 0), vec2(gameWidth, gameHeight), true, bgHEX);
        drawRect(renderer, vec2(gameWidth/4, (gameHeight/2) - (15*pixelSize)), vec2(gameWidth/2, 30*pixelSize), false, "white");
        drawRect(renderer, vec2(gameWidth/4, (gameHeight/2) - (15*pixelSize)), vec2((gameWidth/2)*((totalImagesToLoad - imagesLoadingLeft)/totalImagesToLoad), 30*pixelSize), true, "white");
        loadingAntSprite.transform.position = vec2((gameWidth/2),(gameHeight/2)-(36*pixelSize));
        loadingAntSprite.drawScIn(vec2(32*loadingAntFrame, 0), vec2(32, 40));
        loadingAntSprite.transform.position.x -= (50*pixelSize);
        loadingAntSprite.drawScIn(vec2(32*loadingAntFrame, 0), vec2(32, 40));
        loadingAntSprite.transform.position.x += (100*pixelSize);
        loadingAntSprite.drawScIn(vec2(32*loadingAntFrame, 0), vec2(32, 40));
        if(loadingAntDelay <= 0)
        {
            loadingAntFrame++
            if(loadingAntFrame > 5) loadingAntFrame = 0;

            loadingAntDelay = 200;
        }
        else
        {
            loadingAntDelay -= deltaTime;
        }
    }
    setTimeout(frame, 15);
}