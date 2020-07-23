window.onload = function()
{
    init();
    setInterval(frame, 1000 / 60);

    var bgm1 = document.createElement('audio');
    bgm1.setAttribute('src', 'audio/Main Nest Scene B.wav');
    bgm1.setAttribute('autoplay', 'autoplay');
    bgm1.loop = true;
    bgm1.Play(); 
};

function events(deltaTime)
{
    switch(ui.stateIndex)
    {
        case GAMEPLAYUI: gameplayUICustomEvents(deltaTime); break;
        case FLIGHTGAMEUI: flightGameUICustomEvents(deltaTime); break;
        case COLONYGAMEUI: colonyGameUICustomEvents(deltaTime); break;
    }
    ui.event();
}

function update(deltaTime)
{
    switch(ui.stateIndex)
    {
        case GAMEPLAYUI: gameplayUICustomUpdate(deltaTime); break;
        //case FLIGHTGAMEUI: flightGameUICustomUpdate(deltaTime); break;
        //case COLONYGAMEUI: colonyGameUICustomUpdate(deltaTime); break;
    }
    ui.update();
}

function draw(deltaTime)
{
    renderer.clearRect(0, 0, canvas.width, canvas.height);
    renderer.fillStyle = "#000000";
    drawRect(renderer, vec2(0, 0), vec2(gameWidth, gameHeight), true, "#000000");
    switch(ui.stateIndex)
    {
        case GAMEPLAYUI: gameplayUICustomDraw(deltaTime); break;
        case FLIGHTGAMEUI: flightGameUICustomDraw(deltaTime); break;
        case COLONYGAMEUI: colonyGameUICustomDraw(deltaTime); break;
    }
    ui.draw();
    displayMouseCoords(renderer);
}

function frame()
{
    if (ImageObject.areAllLoaded())
    {
        var deltaTime = getDeltaTime();
        events(deltaTime);
        update(deltaTime);
        draw(deltaTime);
    }
}