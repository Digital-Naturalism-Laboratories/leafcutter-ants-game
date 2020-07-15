window.onload = function()
{
    init();
    setInterval(frame, 1000 / 60);
};

function events(deltaTime)
{
    switch(ui.stateIndex)
    {
        case GAMEPLAYUI: gameplayUICustomEvents(deltaTime); break;
    }
    ui.event();
}

function update()
{
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
    }
    ui.draw();
}

function frame()
{
    if (ImageObject.areAllLoaded())
    {
        var deltaTime = getDeltaTime();
        events(deltaTime);
        update();
        draw(deltaTime);
    }
}