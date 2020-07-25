function InputManager()
{
	this.mouseCoordinates = {x:undefined,y:undefined};
	this.touchCoordinates = {x:undefined,y:undefined};
	this.debugOn = false;

    this.calculateMousePosition = function(builtInDocumentEventObject)
    {
	    var rect = leafcutterGame.canvas.getBoundingClientRect();
	    var root = document.documentElement;
	    var x = builtInDocumentEventObject.clientX - rect.left - root.scrollLeft;
	    var y = builtInDocumentEventObject.clientY - rect.top - root.scrollTop;
	    leafcutterGame.inputManager.mouseCoordinates.x = x;
	    leafcutterGame.inputManager.mouseCoordinates.y = y;
  	}

  	this.calculateTouchPosition = function(builtInDocumentEventObject)
  	{
  		var rect = leafcutterGame.canvas.getBoundingClientRect();
	    var root = document.documentElement;
	    var touch = builtInDocumentEventObject.touches[0];
	    var x = touch.clientX - rect.left - root.scrollLeft;
	    var y = touch.clientY - rect.top - root.scrollTop;
	    leafcutterGame.inputManager.touchCoordinates.x = x;
	    leafcutterGame.inputManager.touchCoordinates.y = y;
  	}

  	this.touchstart = function(builtInDocumentEventObject)
  	{
  		builtInDocumentEventObject.preventDefault();
  		leafcutterGame.inputManager.calculateTouchPosition(builtInDocumentEventObject);
  		console.log('touchX: ' + leafcutterGame.inputManager.touchCoordinates.x);
		console.log('touchY: ' + leafcutterGame.inputManager.touchCoordinates.y);

  		leafcutterGame.parentAntObject.handleTouchstart();
  	}

  	this.mousemove = function(builtInDocumentEventObject)
  	{
  		// builtInDocumentEventObject.preventDefault();
  		// leafcutterGame.inputManager.calculateMousePosition(builtInDocumentEventObject);
  	}

  	this.moveLeftIsBeingHeld = false;
  	this.moveRightIsBeingHeld = false;
  	this.swatIsBeingHeld = false;
	this.mousedown = function(builtInDocumentEventObject)
	{
		builtInDocumentEventObject.preventDefault();

		leafcutterGame.inputManager.calculateMousePosition(builtInDocumentEventObject);
		console.log('mouseX: ' + leafcutterGame.inputManager.mouseCoordinates.x);
		console.log('mouseY: ' + leafcutterGame.inputManager.mouseCoordinates.y);

		if (this.moveLeftIsBeingHeld)
		{
			if (this.mouseCoordinates.x > leafcutterGame.canvas.width/3)
			{
				return;
			}
		}
		else if (this.swatIsBeingHeld)
		{
			if (this.mouseCoordinates.x < leafcutterGame.canvas.width/3 || this.mouseCoordinates.x > leafcutterGame.canvas.width*0.66)
			{
				return;
			}
		}
		else if (this.moveRightIsBeingHeld)
		{
			if (this.mouseCoordinates.x < leafcutterGame.canvas.width*0.66)
			{
				return;
			}
		}

		if (leafcutterGame.inputManager.mouseCoordinates.x < leafcutterGame.canvas.width/3)
		{
			leafcutterGame.inputManager.moveLeftIsBeingHeld = true;
		}
	    else if (leafcutterGame.inputManager.mouseCoordinates.x > leafcutterGame.canvas.width/3 && leafcutterGame.inputManager.mouseCoordinates.x < leafcutterGame.canvas.width*0.66)
		{
			leafcutterGame.inputManager.swatIsBeingHeld = true;
		}
		else if (leafcutterGame.inputManager.mouseCoordinates.x > leafcutterGame.canvas.width*0.66)
		{
			leafcutterGame.inputManager.moveRightIsBeingHeld = true;
		}
	}

	this.mouseup = function(builtInDocumentEventObject)
	{
		builtInDocumentEventObject.preventDefault();

		leafcutterGame.inputManager.moveLeftIsBeingHeld = false;
		leafcutterGame.inputManager.moveUpIsBeingHeld = false;
		leafcutterGame.inputManager.moveRightIsBeingHeld = false;
		leafcutterGame.inputManager.moveDownIsBeingHeld = false;
		leafcutterGame.inputManager.swatIsBeingHeld = false;

		leafcutterGame.parentAntObject.smallAntY = leafcutterGame.parentAntObject.y*0.9;
		leafcutterGame.parentAntObject.currentSmallAntImage = bigAntNeutralImage;
	}

	this.keydown = function(builtInDocumentEventObject)
	{
      builtInDocumentEventObject.preventDefault();
      switch(builtInDocumentEventObject.keyCode)
      {
        case 37://left arrow
        leafcutterGame.inputManager.moveLeftIsBeingHeld = true;
        break;

        case 38://up arrow
        leafcutterGame.inputManager.moveUpIsBeingHeld = true;
        break;

        case 39://right arrow
        leafcutterGame.inputManager.moveRightIsBeingHeld = true;
        break;

        case 40://down arrow
        leafcutterGame.inputManager.moveDownIsBeingHeld = true;
        break;

        case 32://spacebar
		// leafcutterGame.inputManager.swatIsBeingHeld = true;
		// leafcutterGame.parentAntObject.smallAntY = leafcutterGame.parentAntObject.standingAntY;
		break;

		case 68://d
		if (leafcutterGame.inputManager.debugOn === false)
		{
			leafcutterGame.inputManager.debugOn = true;
			console.log('debug on');
		}
		else
		{
			leafcutterGame.inputManager.debugOn = false;
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
	        leafcutterGame.inputManager.moveLeftIsBeingHeld = false;
	        break;

	        case 38://up arrow
	        leafcutterGame.inputManager.moveUpIsBeingHeld = false;
	        break;

	        case 39://right arrow
        	leafcutterGame.inputManager.moveRightIsBeingHeld = false;
        	break;

        	case 40://down arrow
	        leafcutterGame.inputManager.moveDownIsBeingHeld = false;
	        break;

        	case 32://spacebar
   //      	leafcutterGame.inputManager.swatIsBeingHeld = false;

	  //       leafcutterGame.parentAntObject.smallAntY = leafcutterGame.parentAntObject.y*0.9;
			// leafcutterGame.parentAntObject.currentSmallAntImage = bigAntNeutralImage;

			// leafcutterGame.parentAntObject.swatInterval.stop();
			break;
	    }
	}
}