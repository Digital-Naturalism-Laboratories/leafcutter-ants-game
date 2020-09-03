
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
    
    sizeFactor = 0;
    if(gameWidth/gameHeight > 1.25)
    {
        sizeFactor = gameHeight;
        gameWidth = gameHeight + (gameHeight/4);
    }
    else
    {
        sizeFactor = gameWidth - (gameWidth/4);
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

    bgRGB = [217, 148, 0];
    bgHEX = "#d99400";

    isFirefox = (navigator.userAgent.indexOf("Firefox") != -1 || typeof InstallTrigger !== 'undefined');

    loadingAntSprite = new Sprite(tr(vec2((gameWidth/2),(gameHeight/2)), vec2(pixelSize*2, pixelSize*2)), new ImageObject("images/loadingAntAnimation.png", vec2(192, 19)));
    
    //Custom Initialization START
    uiInit();
    //Custom Initialization END
    
    inputSetup();
}