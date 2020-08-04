function InputManager()
{
	this.debugOn = false;
  	this.moveLeftIsBeingHeld = false;
  	this.moveRightIsBeingHeld = false;
  	this.swatIsBeingHeld = false;
	this.mousedown = function(builtInDocumentEventObject)
	{
		builtInDocumentEventObject.preventDefault();

		if (this.moveLeftIsBeingHeld)
		{
			if (touchPos[0].x - canvasStartX > defenseGame.canvas.width/3)
			{
				return;
			}
		}
		else if (this.swatIsBeingHeld)
		{
			if (touchPos[0].x - canvasStartX < defenseGame.canvas.width/3 || touchPos[0].x - canvasStartX > defenseGame.canvas.width*0.66)
			{
				return;
			}
		}
		else if (this.moveRightIsBeingHeld)
		{
			if (touchPos[0].x - canvasStartX < defenseGame.canvas.width*0.66)
			{
				return;
			}
		}

		if (touchPos[0].x - canvasStartX < defenseGame.canvas.width/3)
		{
			defenseGame.inputManager.moveLeftIsBeingHeld = true;
		}
	    else if (touchPos[0].x - canvasStartX > defenseGame.canvas.width/3 && touchPos[0].x - canvasStartX < defenseGame.canvas.width*0.66)
		{
			defenseGame.inputManager.swatIsBeingHeld = true;
		}
		else if (touchPos[0].x - canvasStartX > defenseGame.canvas.width*0.66)
		{
			defenseGame.inputManager.moveRightIsBeingHeld = true;
		}
	}

	this.mouseup = function(builtInDocumentEventObject)
	{
		builtInDocumentEventObject.preventDefault();

		defenseGame.inputManager.moveLeftIsBeingHeld = false;
		defenseGame.inputManager.moveUpIsBeingHeld = false;
		defenseGame.inputManager.moveRightIsBeingHeld = false;
		defenseGame.inputManager.moveDownIsBeingHeld = false;
		defenseGame.inputManager.swatIsBeingHeld = false;

		defenseGame.parentAntObject.smallAntY = defenseGame.parentAntObject.y*0.9;
		defenseGame.parentAntObject.currentSmallAntImage = bigAntNeutralImage;
	}

	this.keydown = function(builtInDocumentEventObject)
	{
      builtInDocumentEventObject.preventDefault();
      switch(builtInDocumentEventObject.keyCode)
      {
        case 37://left arrow
        defenseGame.inputManager.moveLeftIsBeingHeld = true;
        break;

        case 38://up arrow
        defenseGame.inputManager.moveUpIsBeingHeld = true;
        break;

        case 39://right arrow
        defenseGame.inputManager.moveRightIsBeingHeld = true;
        break;

        case 40://down arrow
        defenseGame.inputManager.moveDownIsBeingHeld = true;
        break;

        case 32://spacebar
		// defenseGame.inputManager.swatIsBeingHeld = true;
		// defenseGame.parentAntObject.smallAntY = defenseGame.parentAntObject.standingAntY;
		break;

		case 68://d
		if (defenseGame.inputManager.debugOn === false)
		{
			defenseGame.inputManager.debugOn = true;
			console.log('debug on');
		}
		else
		{
			defenseGame.inputManager.debugOn = false;
			console.log('debug off');
		}
		break;
		
		case 80://p
		if (gameIsPaused)
		{
			gameIsPaused = false
		}
		else
		{
			gameIsPaused = true;
		}
		
		break;
	  }
	}

	this.keyup = function(builtInDocumentEventObject)
	{
		builtInDocumentEventObject.preventDefault();
      	
      	switch(builtInDocumentEventObject.keyCode)
        {
	      	case 37://left arrow
	        defenseGame.inputManager.moveLeftIsBeingHeld = false;
	        break;

	        case 38://up arrow
	        defenseGame.inputManager.moveUpIsBeingHeld = false;
	        break;

	        case 39://right arrow
        	defenseGame.inputManager.moveRightIsBeingHeld = false;
        	break;

        	case 40://down arrow
	        defenseGame.inputManager.moveDownIsBeingHeld = false;
	        break;

        	case 32://spacebar
   //      	defenseGame.inputManager.swatIsBeingHeld = false;

	  //       defenseGame.parentAntObject.smallAntY = defenseGame.parentAntObject.y*0.9;
			// defenseGame.parentAntObject.currentSmallAntImage = bigAntNeutralImage;

			// defenseGame.parentAntObject.swatInterval.stop();
			break;
	    }
	}
}