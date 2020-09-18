
function init()
{
    canvas = document.getElementById("gameCanvas");
    
    renderer = canvas.getContext("2d");

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
        sizeFactor = gameWidth - (gameWidth/5);
        gameHeight = gameWidth - (gameWidth/5);
    }

    pixelSize = sizeFactor / 500.0;
    prevPixelSize = pixelSize;

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

    loadingAntSprite = new Sprite(tr(vec2(), vec2(pixelSize, pixelSize)), new ImageObject("images/loadingAntAnimation.png", vec2(192, 40)));
    loadingAntFrame = 0;
    loadingAntDelay = 200;
    
    //Custom Initialization START
    uiInit();
    //Custom Initialization END
    
    inputSetup();
}