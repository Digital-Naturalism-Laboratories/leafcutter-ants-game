var leafcutterGame;
var splashScreenShouldBeShowing = true;
var skippingIntroForDevelopment = false;
var gameIsPaused = false;

window.onload = function()
{

  leafcutterGame = {};

  leafcutterGame.initialize = function()
  {
  	leafcutterGame.canvas = document.getElementById("leafcutterCanvas");
    leafcutterGame.canvasContext = leafcutterGame.canvas.getContext('2d');

    leafcutterGame.canvas.width = window.innerWidth;
    leafcutterGame.canvas.height = window.innerHeight;

    leafcutterGame.inputManager = new InputManager();
    // document.addEventListener('mousemove', leafcutterGame.inputManager.mousemove, false);
    // document.addEventListener('mousedown', leafcutterGame.inputManager.mousedown, false);
    // document.addEventListener('mouseup', leafcutterGame.inputManager.mouseup, false);
    leafcutterGame.canvas.addEventListener('touchstart', leafcutterGame.inputManager.touchstart, false);
    document.addEventListener('keydown', leafcutterGame.inputManager.keydown, false);
    document.addEventListener('keyup', leafcutterGame.inputManager.keyup, false);

    leafcutterGame.background = new Background();
    leafcutterGame.background.initialize();

    leafcutterGame.parentAntObject = new ParentAntObject();
    leafcutterGame.parentAntObject.initialize();
    // leafcutterGame.parentAntObject.swatInterval = new frameInterval(leafcutterGame.parentAntObject.changeSwatImage, 65);

    leafcutterGame.NPCBigAnt1 = new NPCBigAnt(-leafcutterGame.canvas.width*0.33);
    leafcutterGame.NPCBigAnt2 = new NPCBigAnt(leafcutterGame.canvas.width - leafcutterGame.canvas.width*0.33);

    leafcutterGame.flyManager = new FlyManager();

    leafcutterGame.testFly1 = new Fly('testFly1','planting');
    leafcutterGame.testFly1.assignRandomXYCoordinatesInARange();
    leafcutterGame.testFly2 = new Fly('testFly2',undefined);
    leafcutterGame.testFly2.assignRandomXYCoordinatesInARange();
    leafcutterGame.testFly3 = new Fly('testFly3',undefined);
    leafcutterGame.testFly3.assignRandomXYCoordinatesInARange();
    leafcutterGame.testFly4 = new Fly('testFly4',undefined);
    leafcutterGame.testFly4.assignRandomXYCoordinatesInARange();
    


    leafcutterGame.flyManager.arrayOfFlies.push(leafcutterGame.testFly1,leafcutterGame.testFly2,leafcutterGame.testFly3,leafcutterGame.testFly4);

    let frameRate = 1000/30;
    leafcutterGame.gameInterval = new frameInterval(leafcutterGame.gameLoop, frameRate);
    leafcutterGame.gameInterval.start();

    leafcutterGame.timeLeft = 37;
    leafcutterGame.decreaseCounter = function() {if (leafcutterGame.timeLeft > 0) {leafcutterGame.timeLeft--;}};
    leafcutterGame.countdownInterval = new frameInterval(leafcutterGame.decreaseCounter,1000);
    
    leafcutterGame.eggHasBeenPlanted = false;
  }

  leafcutterGame.gameLoop = function()
  {
    if (!gameIsPaused)
    {
      if (!loadingImages)
      {
       if (splashScreenShouldBeShowing && !skippingIntroForDevelopment)
       {
        leafcutterGame.drawSplashScreen();
       }
       else 
       {
        leafcutterGame.updateEverything();
        leafcutterGame.drawEverything();
       }
     }
    }
  	
  	
  }

  leafcutterGame.updateEverything = function()
  {
  	leafcutterGame.background.update();
  	
    if (leafcutterGame.timeLeft > 0)
    {
      leafcutterGame.parentAntObject.update();

      if (leafcutterGame.testFly1.status !== undefined)
      {
        leafcutterGame.testFly1.move();
      }
      if (leafcutterGame.testFly2.status !== undefined)
      {
        leafcutterGame.testFly2.move();
      }
      if (leafcutterGame.testFly3.status !== undefined)
      {
        leafcutterGame.testFly3.move();
      }
      if (leafcutterGame.testFly4.status !== undefined)
      {
        leafcutterGame.testFly4.move();
      }
    }
    

    if (leafcutterGame.timeLeft === 0)
    {
      //alert('You Win!');
    }
  }

  leafcutterGame.drawEverything = function()
  {
    if (leafcutterGame.timeLeft === 0 && leafcutterGame.parentAntObject.arrayOfFungusSpores.length > 0)
    {
      leafcutterGame.canvasContext.drawImage(fungusLossImage, 0,0, leafcutterGame.canvas.width,leafcutterGame.canvas.height);
    }
    else if (leafcutterGame.eggHasBeenPlanted) 
    {
      leafcutterGame.canvasContext.drawImage(eggPlantedLossImage, 0,0, leafcutterGame.canvas.width,leafcutterGame.canvas.height);
    }
    else if (leafcutterGame.timeLeft === 0 && leafcutterGame.parentAntObject.arrayOfFungusSpores.length === 0)
    {
      leafcutterGame.canvasContext.drawImage(winTextImage, 0,0, leafcutterGame.canvas.width,leafcutterGame.canvas.height);
    }
    else
    {
      leafcutterGame.background.draw();

      leafcutterGame.canvasContext.font = '60px Helvetica';
      let timerNumberConvertedToString = leafcutterGame.timeLeft.toString();
      leafcutterGame.canvasContext.fillText(timerNumberConvertedToString, leafcutterGame.canvas.width * 0.85,leafcutterGame.canvas.height * 0.2);
      
      leafcutterGame.parentAntObject.draw();

      leafcutterGame.NPCBigAnt1.draw();
      leafcutterGame.NPCBigAnt2.draw();

      leafcutterGame.testFly1.draw();
      leafcutterGame.testFly2.draw();
      leafcutterGame.testFly3.draw();
      leafcutterGame.testFly4.draw();
    }
  	


    // if (leafcutterGame.inputManager.debugOn)
    // {
    //   leafcutterGame.inputManager.calculateMousePosition();
    //   leafcutterGame.canvasContext.fillStyle = 'red';
    //   leafcutterGame.canvasContext.fillText(leafcutterGame.inputManager.mouseCoordinates.x + ':,' + leafcutterGame.inputManager.mouseCoordinates.y, 
    //                           leafcutterGame.inputManager.mouseCoordinates.x,leafcutterGame.inputManager.mouseCoordinates.y);
    // }
  }

  leafcutterGame.drawSplashScreen = function()
  {
    leafcutterGame.canvasContext.drawImage(splashScreenImage, 0,0, leafcutterGame.canvas.width,leafcutterGame.canvas.height);
  }

  loadImages();
}
