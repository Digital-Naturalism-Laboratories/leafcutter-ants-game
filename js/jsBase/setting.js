
sizeFactor = 0;

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

    canvas.width = gameWidth;
    canvas.height = gameHeight;
    canvas.style.position = "absolute";
    canvas.style.top = ((window.innerHeight/2) - (gameHeight/2)).toString() + "px";
    canvas.style.left = ((window.innerWidth/2) - (gameWidth/2)).toString() + "px";

    //Custom Initialization START
    uiInit();
    //Custom Initialization END
    
    inputSetup();
}