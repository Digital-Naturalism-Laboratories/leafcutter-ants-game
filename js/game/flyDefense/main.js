var defenseGame;
var splashScreenShouldBeShowing = true;
var skippingIntroForDevelopment = false;
var gameIsPaused = false;

window.onload = function()
{
  defenseGame = {};
  
  defenseGame.initialize = function()
  {
  	defenseGame.canvas = document.getElementById("leafcutterCanvas");
    defenseGame.canvasContext = defenseGame.canvas.getContext('2d');

    defenseGame.canvas.width = window.innerWidth;
    defenseGame.canvas.height = window.innerHeight;

    defenseGame.inputManager = new InputManager();
    // document.addEventListener('mousemove', defenseGame.inputManager.mousemove, false);
    // document.addEventListener('mousedown', defenseGame.inputManager.mousedown, false);
    // document.addEventListener('mouseup', defenseGame.inputManager.mouseup, false);
    defenseGame.canvas.addEventListener('touchstart', defenseGame.inputManager.touchstart, false);
    document.addEventListener('keydown', defenseGame.inputManager.keydown, false);
    document.addEventListener('keyup', defenseGame.inputManager.keyup, false);

    defenseGame.background = new Background();
    defenseGame.background.initialize();

    defenseGame.parentAntObject = new ParentAntObject();
    defenseGame.parentAntObject.initialize();
    // defenseGame.parentAntObject.swatInterval = new frameInterval(defenseGame.parentAntObject.changeSwatImage, 65);

    defenseGame.NPCBigAnt1 = new NPCBigAnt(-defenseGame.canvas.width*0.33);
    defenseGame.NPCBigAnt2 = new NPCBigAnt(defenseGame.canvas.width - defenseGame.canvas.width*0.33);

    defenseGame.flyManager = new FlyManager();

    defenseGame.testFly1 = new Fly('testFly1','planting');
    defenseGame.testFly1.assignRandomXYCoordinatesInARange();
    defenseGame.testFly2 = new Fly('testFly2',undefined);
    defenseGame.testFly2.assignRandomXYCoordinatesInARange();
    defenseGame.testFly3 = new Fly('testFly3',undefined);
    defenseGame.testFly3.assignRandomXYCoordinatesInARange();
    defenseGame.testFly4 = new Fly('testFly4',undefined);
    defenseGame.testFly4.assignRandomXYCoordinatesInARange();
    


    defenseGame.flyManager.arrayOfFlies.push(defenseGame.testFly1,defenseGame.testFly2,defenseGame.testFly3,defenseGame.testFly4);

    let frameRate = 1000/30;
    defenseGame.gameInterval = new frameInterval(defenseGame.gameLoop, frameRate);
    defenseGame.gameInterval.start();

    defenseGame.timeLeft = 37;
    defenseGame.decreaseCounter = function() 
    {
      if (defenseGame.timeLeft > 0) 
      {
        defenseGame.timeLeft--;
      }
      console.log('defenseGame.timeLeft: ' + defenseGame.timeLeft);
      console.log('defenseGame.audioManager.sfxManager.timeIsAlmostOutClockTickingLoop.paused: ' + defenseGame.audioManager.sfxManager.timeIsAlmostOutClockTickingLoop.paused);
      if(defenseGame.timeLeft === 5 && defenseGame.audioManager.sfxManager.timeIsAlmostOutClockTickingLoop.paused)
      {
        audioManager.sfxManager.timeIsAlmostOutClockTickingLoop.play();
        console.log('should hear clock ticking');
      }
      else if (defenseGame.timeLeft === 0 && !defenseGame.audioManager.sfxManager.timeIsAlmostOutClockTickingLoop.paused)
      {
        audioManager.sfxManager.timeIsAlmostOutClockTickingLoop.pause();
        console.log('should stop clock ticking');
      }
    };
    defenseGame.countdownInterval = new frameInterval(defenseGame.decreaseCounter,1000);
    defenseGame.arrayOfFrameIntervals.push(defenseGame.countdownInterval);
    console.log('defenseGame.arrayOfFrameIntervals: ' + defenseGame.arrayOfFrameIntervals);
    
    defenseGame.eggHasBeenPlanted = false;
  }

  defenseGame.gameLoop = function()
  {
    if (!gameIsPaused)
    {
      if (!loadingImages)
      {
       if (splashScreenShouldBeShowing && !skippingIntroForDevelopment)
       {
        defenseGame.drawSplashScreen();
       }
       else 
       {
        defenseGame.updateEverything();
        defenseGame.drawEverything();
       }
     }
    }
  	
  	
  }

  defenseGame.updateEverything = function()
  {
  	defenseGame.background.update();
  	
    if (defenseGame.timeLeft > 0)
    {
      defenseGame.parentAntObject.update();

      if (defenseGame.testFly1.status !== undefined)
      {
        defenseGame.testFly1.move();
      }
      if (defenseGame.testFly2.status !== undefined)
      {
        defenseGame.testFly2.move();
      }
      if (defenseGame.testFly3.status !== undefined)
      {
        defenseGame.testFly3.move();
      }
      if (defenseGame.testFly4.status !== undefined)
      {
        defenseGame.testFly4.move();
      }
    }
    

    if (defenseGame.timeLeft === 0)
    {
      //alert('You Win!');
    }
  }

  defenseGame.drawEverything = function()
  {
    if (defenseGame.timeLeft === 0 && defenseGame.parentAntObject.arrayOfFungusSpores.length > 0)
    {
      defenseGame.canvasContext.drawImage(fungusLossImage, 0,0, defenseGame.canvas.width,defenseGame.canvas.height);
    }
    else if (defenseGame.eggHasBeenPlanted) 
    {
      defenseGame.canvasContext.drawImage(eggPlantedLossImage, 0,0, defenseGame.canvas.width,defenseGame.canvas.height);
    }
    else if (defenseGame.timeLeft === 0 && defenseGame.parentAntObject.arrayOfFungusSpores.length === 0)
    {
      defenseGame.canvasContext.drawImage(winTextImage, 0,0, defenseGame.canvas.width,defenseGame.canvas.height);
    }
    else
    {
      defenseGame.background.draw();

      defenseGame.canvasContext.font = '60px Helvetica';
      let timerNumberConvertedToString = defenseGame.timeLeft.toString();
      defenseGame.canvasContext.fillText(timerNumberConvertedToString, defenseGame.canvas.width * 0.85,defenseGame.canvas.height * 0.2);
      
      defenseGame.parentAntObject.draw();

      defenseGame.NPCBigAnt1.draw();
      defenseGame.NPCBigAnt2.draw();
      defenseGame.NPCBigAntNegative1.draw();

      defenseGame.testFly1.draw();
      defenseGame.testFly2.draw();
      defenseGame.testFly3.draw();
      defenseGame.testFly4.draw();
    }
  	


    // if (defenseGame.inputManager.debugOn)
    // {
    //   defenseGame.inputManager.calculateMousePosition();
    //   defenseGame.canvasContext.fillStyle = 'red';
    //   defenseGame.canvasContext.fillText(touchPos[0].x - canvasStartX + ':,' + touchPos[0].y - canvasStartY, 
    //                           touchPos[0].x - canvasStartX,touchPos[0].y - canvasStartY);
    // }
  }

  defenseGame.drawSplashScreen = function()
  {
    defenseGame.canvasContext.drawImage(splashScreenImage, 0,0, defenseGame.canvas.width,defenseGame.canvas.height);
  }

  loadImages();
}
