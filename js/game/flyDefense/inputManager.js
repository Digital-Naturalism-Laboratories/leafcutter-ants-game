function InputManager()
{
	this.mouseCoordinates = {x:undefined,y:undefined};
	this.touchCoordinates = {x:undefined,y:undefined};
	this.debugOn = false;

    this.calculateMousePosition = function(builtInDocumentEventObject)
    {
	    var rect = defenseGame.canvas.getBoundingClientRect();
	    var root = document.documentElement;
	    var x = builtInDocumentEventObject.clientX - rect.left - root.scrollLeft;
	    var y = builtInDocumentEventObject.clientY - rect.top - root.scrollTop;
	    defenseGame.inputManager.mouseCoordinates.x = x;
	    defenseGame.inputManager.mouseCoordinates.y = y;
  	}

  	this.calculateTouchPosition = function(builtInDocumentEventObject)
  	{
  		var rect = defenseGame.canvas.getBoundingClientRect();
	    var root = document.documentElement;
	    var touch = builtInDocumentEventObject.touches[0];
	    var x = touch.clientX - rect.left - root.scrollLeft;
	    var y = touch.clientY - rect.top - root.scrollTop;
	    defenseGame.inputManager.touchCoordinates.x = x;
	    defenseGame.inputManager.touchCoordinates.y = y;
  	}

  	this.touchstart = function(builtInDocumentEventObject)
  	{
  		builtInDocumentEventObject.preventDefault();
  		defenseGame.inputManager.calculateTouchPosition(builtInDocumentEventObject);
  		console.log('touchX: ' + defenseGame.inputManager.touchCoordinates.x);
		console.log('touchY: ' + defenseGame.inputManager.touchCoordinates.y);

  		defenseGame.parentAntObject.handleTouchstart();
  	}

  	this.mousemove = function(builtInDocumentEventObject)
  	{
  		// builtInDocumentEventObject.preventDefault();
  		// defenseGame.inputManager.calculateMousePosition(builtInDocumentEventObject);
  	}

  	this.moveLeftIsBeingHeld = false;
  	this.moveRightIsBeingHeld = false;
  	this.swatIsBeingHeld = false;
	this.mousedown = function(builtInDocumentEventObject)
	{
		builtInDocumentEventObject.preventDefault();

		defenseGame.inputManager.calculateMousePosition(builtInDocumentEventObject);
		console.log('mouseX: ' + defenseGame.inputManager.mouseCoordinates.x);
		console.log('mouseY: ' + defenseGame.inputManager.mouseCoordinates.y);

		if (this.moveLeftIsBeingHeld)
		{
			if (this.mouseCoordinates.x > defenseGame.canvas.width/3)
			{
				return;
			}
		}
		else if (this.swatIsBeingHeld)
		{
			if (this.mouseCoordinates.x < defenseGame.canvas.width/3 || this.mouseCoordinates.x > defenseGame.canvas.width*0.66)
			{
				return;
			}
		}
		else if (this.moveRightIsBeingHeld)
		{
			if (this.mouseCoordinates.x < defenseGame.canvas.width*0.66)
			{
				return;
			}
		}

		if (defenseGame.inputManager.mouseCoordinates.x < defenseGame.canvas.width/3)
		{
			defenseGame.inputManager.moveLeftIsBeingHeld = true;
		}
	    else if (defenseGame.inputManager.mouseCoordinates.x > defenseGame.canvas.width/3 && defenseGame.inputManager.mouseCoordinates.x < defenseGame.canvas.width*0.66)
		{
			defenseGame.inputManager.swatIsBeingHeld = true;
		}
		else if (defenseGame.inputManager.mouseCoordinates.x > defenseGame.canvas.width*0.66)
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