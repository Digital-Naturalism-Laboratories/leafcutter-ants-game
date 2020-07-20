
function init()
{
    canvas = document.getElementById("gameCanvas");

    renderer = canvas.getContext("2d");
    renderer.canvas.width = window.innerWidth;
    renderer.canvas.height = window.innerHeight;

    platform = getPlatform();
    
    spritesRenderer = renderer;

    gameWidth = window.innerWidth;
    gameHeight = window.innerHeight;
    canvasStartX = 0;
    canvasStartY = 0;

    sizeFactor = 0;
    if(gameWidth + (gameHeight/4) > gameHeight)
    {
        sizeFactor = gameHeight;
        gameWidth = gameHeight + (gameHeight/4);
    }
    else if(gameWidth + (gameHeight/4) < gameHeight)
    {
        sizeFactor = gameWidth;
        gameHeight = gameWidth - (gameWidth/4);
    }

    pixelSize = sizeFactor / 500.0;

    canvas.width = gameWidth;
    canvas.height = gameHeight;
    canvas.style.position = "absolute";
    canvasStartY = (window.innerHeight/2) - (gameHeight/2);
    canvas.style.top = canvasStartY.toString() + "px";
    canvasStartX = (window.innerWidth/2) - (gameWidth/2);
    canvas.style.left = canvasStartX.toString() + "px";

    //Custom Initialization START
    uiInit();
    //Custom Initialization END
    
    inputSetup();
}