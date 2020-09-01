function ParentAntObject()
{
	this.name = 'big ant';
	this.bigAntHeight = renderer.canvas.height*0.33;
	this.bigAntWidth = renderer.canvas.width*0.5;
	this.bigAntX = renderer.canvas.width/2 - this.bigAntWidth/2;
	this.bigAntY = renderer.canvas.height - this.bigAntHeight*1.2;
	this.bigAntWalkingSourceWidth = 553;
	this.bigAntWalkingSourceHeight = 320;

	this.x = renderer.canvas.width/2 - this.bigAntWidth/2;
	this.y = renderer.canvas.height*0.6;

	this.leafImage = leafImage;
	this.fungusImage = fungusImage;

	this.currentBigAntWalkingImageIndex = getRandomIntInclusive(0,10);

	this.controlStatus = 'active';

	this.currentSpriteSheet = bigAntWalkingSpriteSheet;
	this.hasBeenInfected = false;
	this.toggleSpriteSheet = function()
	{
		if (!defenseGame.background.stuckOnPheremoneGap && !defenseGame.colonyReached)
		{
			if (this.currentSpriteSheet === bigAntWalkingSpriteSheet)
			{
				
				this.currentSpriteSheet = bigAntWalkingInfectedSpriteSheet;
			}
			else
			{
				this.currentSpriteSheet = bigAntWalkingSpriteSheet;
			}
		}
		else 
		{
			
			if (this.currentSpriteSheet === bigAntWalkingSpriteSheet || this.currentSpriteSheet === bigAntWalkingInfectedSpriteSheet)
			{
				
				this.currentSpriteSheet = bigAntIdleInfectedSpriteSheet;
				return;
			}

			if (this.currentSpriteSheet === bigAntIdleInfectedSpriteSheet)
			{
				this.currentSpriteSheet = bigAntIdleSpriteSheet;
			}
			else
			{
				this.currentSpriteSheet = bigAntIdleInfectedSpriteSheet;
			}
		}
		
		
	}

	this.cycleBigAntImages = function()
	{
		this.currentBigAntWalkingImageIndex++;
		if (!defenseGame.background.stuckOnPheremoneGap && !defenseGame.goalReached)
		{
			if (this.currentBigAntWalkingImageIndex > 10)
			{
				this.currentBigAntWalkingImageIndex = 0;
			}
		}
		else
		{
			if (this.currentBigAntWalkingImageIndex > 20)
			{
				this.currentBigAntWalkingImageIndex = 0;
			}
		}
			
	}

	// this.cycleBigAntImagesInterval = new frameInterval(this.cycleBigAntImages, 100);
	// this.cycleBigAntImagesInterval.start();
	
	this.drawBigAnt = function()
	{
		renderer.drawImage(this.currentSpriteSheet, 
			this.bigAntWalkingSourceWidth*this.currentBigAntWalkingImageIndex,0, this.bigAntWalkingSourceWidth,this.bigAntWalkingSourceHeight,
			this.bigAntX,this.bigAntY, this.bigAntWidth,this.bigAntHeight);
	}

	this.leafWidth = this.bigAntWidth*0.7;
	this.leafHeight = this.bigAntHeight*2;
	this.leafX = this.bigAntX + this.bigAntWidth*0.55;
	this.leafY = this.bigAntY + this.bigAntHeight/2 - this.leafHeight*1.05;

	this.leafPolygonWalkingBorderPoints = 
		[

			{name:'1',x:this.leafX-this.leafWidth*0.025,y:this.leafY + this.leafHeight*0.575},
			{name:'2',x:this.leafX+this.leafWidth*0.275,y:this.leafY + this.leafHeight*0.3},
			{name:'3',x:this.leafX+this.leafWidth*0.425,y:this.leafY + this.leafHeight*0.025},
			{name:'4',x:this.leafX+this.leafWidth*0.625,y:this.leafY + this.leafHeight*0.01},
			{name:'5',x:this.leafX+this.leafWidth*0.825,y:this.leafY + this.leafHeight*0.22},
			{name:'6',x:this.leafX+this.leafWidth,y:this.leafY + this.leafHeight*0.32},
			{name:'7',x:this.leafX+this.leafWidth,y:this.leafY + this.leafHeight*0.5},
			{name:'8',x:this.leafX+this.leafWidth*0.9,y:this.leafY + this.leafHeight*0.5},
			{name:'9',x:this.leafX+this.leafWidth*0.9125,y:this.leafY + this.leafHeight*0.66},
			{name:'10',x:this.leafX+this.leafWidth*0.775,y:this.leafY + this.leafHeight*0.88},
			{name:'11',x:this.leafX+this.leafWidth*0.45,y:this.leafY + this.leafHeight*1.0125},
			{name:'12',x:this.leafX+this.leafWidth*0.275,y:this.leafY + this.leafHeight*0.95},
			{name:'13',x:this.leafX+this.leafWidth*0.15,y:this.leafY + this.leafHeight*0.75},
			{name:'14',x:this.leafX-this.leafWidth*0.025,y:this.leafY + this.leafHeight*0.575}

		];

	this.leafPolygonFungusBorderPoints = 
	[

		{name:'1',x:this.leafX+this.leafWidth*0.04,y:this.leafY + this.leafHeight*0.575},
		{name:'2',x:this.leafX+this.leafWidth*0.375,y:this.leafY + this.leafHeight*0.2},
		{name:'3',x:this.leafX+this.leafWidth*0.425,y:this.leafY + this.leafHeight*0.05},
		{name:'4',x:this.leafX+this.leafWidth*0.625,y:this.leafY + this.leafHeight*0.05},
		{name:'5',x:this.leafX+this.leafWidth*0.75,y:this.leafY + this.leafHeight*0.22},
		{name:'6',x:this.leafX+this.leafWidth*0.975,y:this.leafY + this.leafHeight*0.32},
		{name:'7',x:this.leafX+this.leafWidth*0.975,y:this.leafY + this.leafHeight*0.48},
		{name:'8',x:this.leafX+this.leafWidth*0.87,y:this.leafY + this.leafHeight*0.46},
		{name:'9',x:this.leafX+this.leafWidth*0.86,y:this.leafY + this.leafHeight*0.66},
		{name:'10',x:this.leafX+this.leafWidth*0.725,y:this.leafY + this.leafHeight*0.88},
		{name:'11',x:this.leafX+this.leafWidth*0.45,y:this.leafY + this.leafHeight*0.975},
		{name:'12',x:this.leafX+this.leafWidth*0.35,y:this.leafY + this.leafHeight*0.95},
		{name:'13',x:this.leafX+this.leafWidth*0.15,y:this.leafY + this.leafHeight*0.7},
		{name:'14',x:this.leafX+this.leafWidth*0.04,y:this.leafY + this.leafHeight*0.575}

	];

	this.leafPolygonFungusBorderLineSegments = [];
	this.leafPolygonWalkingBorderLineSegments = [];

	this.initializeLineSegments = function()
	{
		for (let i = 0; i < this.leafPolygonFungusBorderPoints.length - 1; i++)
		{
			let lineSegment = {name:this.leafPolygonFungusBorderPoints[i].name, 
							   x1:this.leafPolygonFungusBorderPoints[i].x,y1:this.leafPolygonFungusBorderPoints[i].y, 
							   x2:this.leafPolygonFungusBorderPoints[i + 1].x,y2:this.leafPolygonFungusBorderPoints[i + 1].y};

			this.leafPolygonFungusBorderLineSegments.push(lineSegment);

		}

		for (let i = 0; i < this.leafPolygonWalkingBorderPoints.length - 1; i++)
		{
			let lineSegment = {name:this.leafPolygonWalkingBorderPoints[i].name, 
							   x1:this.leafPolygonWalkingBorderPoints[i].x,y1:this.leafPolygonWalkingBorderPoints[i].y, 
							   x2:this.leafPolygonWalkingBorderPoints[i + 1].x,y2:this.leafPolygonWalkingBorderPoints[i + 1].y};
			this.leafPolygonWalkingBorderLineSegments.push(lineSegment);
		}

	}

	this.tallyRaycastIntersectionsWithLeafPolygon = function(pointToRaycast, arrayOfLines)
	{
		let numberOfIntersections = 0;
		
		for (let i = 0; i < arrayOfLines.length; i++)
		{
			

			//raycast line from potential fungus point
			let x1 = pointToRaycast.x;
			let x2 = 1;
			let y1 = pointToRaycast.y;
			let y2 = pointToRaycast.y;

			//polygon line segment
			let x3 = arrayOfLines[i].x1;
			let x4 = arrayOfLines[i].x2;
			let y3 = arrayOfLines[i].y1;
			let y4 = arrayOfLines[i].y2;

			let denominator = (x1 - x2)*(y3 - y4) - (y1 - y2)*(x3 - x4);
			if (denominator === 0)
			{
				continue;
			}

			let numeratorForT = (x1 - x3)*(y3 - y4) - (y1 - y3)*(x3 - x4);
			let numeratorForU = (x1 - x2)*(y1 - y3) - (y1 - y2)*(x1 - x3);
			let t = numeratorForT/denominator;
			let u = -(numeratorForU/denominator);

			if (t > 0 && t < 1 && u > 0 && u < 1)
			{
				numberOfIntersections++;
			}
			
		}
		return numberOfIntersections;
	}

	this.draw = function()
	{
		this.drawLeaf();
		this.drawBigAnt();
		
		this.drawFungusSpores();
		this.drawSmallAnt();
		//this.infectionAlertMessage.draw();

		if (defenseGame.debugOn)
		{
			renderer.strokeStyle = 'red';
			renderer.lineWidth = 5;
			renderer.strokeRect(this.mouthColliderBoxX,this.mouthColliderBoxY, this.mouthColliderBoxWidth,this.mouthColliderBoxHeight);
		}
	}

	
	
	
	this.drawLeaf = function()
	{
		renderer.drawImage(this.leafImage, this.leafX,this.leafY, this.leafWidth,this.leafHeight);
		if (defenseGame.debugOn === true)
		{
			renderer.strokeStyle = 'white';
			renderer.lineWidth = 5;
			renderer.strokeRect(this.fungusTangleX,this.fungusTangleY, this.fungusTangleWidth,this.fungusTangleHeight);

			// renderer.moveTo(this.leafPolygonFungusBorderPoints[0].x,this.leafPolygonFungusBorderPoints[0].y);
			// for (let i = 1; i < this.leafPolygonFungusBorderPoints.length; i++)
			// {
				
				
			// 	renderer.fillStyle = 'black';
			// 	renderer.fillRect(this.leafPolygonFungusBorderPoints[i].x,this.leafPolygonFungusBorderPoints[i].y, 5,5);
			// 	renderer.font = '20px Helvetica';
			// 	renderer.fillText(this.leafPolygonFungusBorderPoints[i].name, this.leafPolygonFungusBorderPoints[i].x,this.leafPolygonFungusBorderPoints[i].y);

			// 	renderer.lineTo(this.leafPolygonFungusBorderPoints[i].x,this.leafPolygonFungusBorderPoints[i].y);
			// }
			// renderer.strokeStyle = 'white';
			// renderer.stroke();

			
			for (let i = 0; i < this.leafPolygonWalkingBorderLineSegments.length; i++)
			{
				renderer.strokeStyle = 'brown';
				renderer.moveTo(this.leafPolygonWalkingBorderLineSegments[i].x1,this.leafPolygonWalkingBorderLineSegments[i].y1);
				renderer.lineTo(this.leafPolygonWalkingBorderLineSegments[i].x2,this.leafPolygonWalkingBorderLineSegments[i].y2);
				renderer.stroke();
			}
			renderer.fillText('WALKING POLYGON FOR PARENT ANT', this.bigAntX,this.bigAntY + this.bigAntHeight/2);
		}
	}

	this.fungusTangleX = this.leafX - this.leafWidth*0.05;
	this.fungusTangleY = this.leafY - this.leafHeight*0.05;
	this.fungusTangleWidth = this.leafWidth + this.leafWidth*0.1;
	this.fungusTangleHeight = this.leafHeight + this.leafHeight*0.1;

	this.arrayOfFungusSpores = [];
	this.randomPotentialFungusPoint = undefined;
	this.initializeArrayOfFungusSpores = function()
	{
		// for (let i = 0; i < 200; i++)
		// {
		// 	let randomXWithinFungusTangle = getRandomIntInclusive(Math.floor(this.fungusTangleX),Math.floor(this.fungusTangleX + this.fungusTangleWidth));
		// 	let randomYWithinFungusTangle = getRandomIntInclusive(Math.floor(this.fungusTangleY),Math.floor(this.fungusTangleY + this.fungusTangleHeight));
		// 	let fungusSpore = new FungusSpore(randomXWithinFungusTangle,randomYWithinFungusTangle);
		// 	this.arrayOfFungusSpores.push(fungusSpore);
		// }
		// if (leafcutterGame.inputManager.debugOn)
		// {
		// 	leafcutterGame.canvasContext.strokeStyle = 'red';
		// 	leafcutterGame.canvasContext.lineWidth = 5;
		// 	leafcutterGame.strokeRect(this.fungusTangleX,this.fungusTangleY, this.fungusTangleWidth,this.fungusTangleHeight);
		// }
		this.arrayOfFungusSpores = [];
		
		for (let i = 0; i < 200; i++)
		{
			let potentialFungusPoint = {x:Math.floor(getRandomIntInclusive(this.leafX,this.leafX + this.leafWidth)),
											  y:Math.floor(getRandomIntInclusive(this.leafY,this.leafY + this.leafHeight))};

			while(this.tallyRaycastIntersectionsWithLeafPolygon(potentialFungusPoint, this.leafPolygonFungusBorderLineSegments) === 0 || 
				this.tallyRaycastIntersectionsWithLeafPolygon(potentialFungusPoint, this.leafPolygonFungusBorderLineSegments) % 2 === 0)
			{
				potentialFungusPoint = {x:Math.floor(getRandomIntInclusive(this.leafX,this.leafX + this.leafWidth)),
											  y:Math.floor(getRandomIntInclusive(this.leafY,this.leafY + this.leafHeight))};
			}
			
			let fungusSpore = new FungusSpore(potentialFungusPoint.x,potentialFungusPoint.y);
			this.arrayOfFungusSpores.push(fungusSpore);
		}
	}

	this.drawFungusSpores = function()
	{
		for (let i = 0; i < this.arrayOfFungusSpores.length; i++)
		{
			this.arrayOfFungusSpores[i].draw();
		}
	}




	this.smallAntWidth = this.leafWidth*0.3;
	this.smallAntHeight = this.leafHeight*0.3;
	this.smallAntX = this.leafX + this.leafWidth/2 - this.smallAntWidth/2;
	this.smallAntY = this.leafY + this.leafHeight/2 - this.smallAntHeight/2;
	this.smallAntMidPoint = {x:this.smallAntX + this.smallAntWidth/2,y:this.smallAntY + this.smallAntHeight/2};
	// this.standingAntY = (this.smallAntY + this.smallAntHeight) - this.smallAntWidth;

	// this.changeSwatImage = function()
	// {
	// 	if (defenseGame.parentAntObject.swatImageIndex === 0 || 
	// 		defenseGame.parentAntObject.swatImageIndex === defenseGame.parentAntObject.arrayOfSwatImages.length - 1)
	// 	{
	// 		defenseGame.parentAntObject.swatArrayDirection *= -1;
	// 	}
	// 	defenseGame.parentAntObject.swatImageIndex += 1*defenseGame.parentAntObject.swatArrayDirection;
	// 	defenseGame.parentAntObject.currentSwatImage = defenseGame.parentAntObject.arrayOfSwatImages[defenseGame.parentAntObject.swatImageIndex];
	// }

	this.smallAntSourceWidth = 120;
	this.smallAntSourceHeight = 108;
	this.drawSmallAnt = function()
	{
		

		if (this.currentSmallAntDirection === 'up')
		{
		//(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
		
			renderer.drawImage(leafMinimWalkingSpriteSheet, 
				this.currentSmallAntImageArrayIndex*this.smallAntSourceWidth,0, this.smallAntSourceWidth,this.smallAntSourceHeight,
				this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
		}
		else if (this.currentSmallAntDirection === 'upRight')
		{
			renderer.save();
			renderer.translate(this.smallAntMidPoint.x,this.smallAntMidPoint.y);
			renderer.rotate(45 * Math.PI / 180);
			renderer.translate(-this.smallAntMidPoint.x,-this.smallAntMidPoint.y);
			renderer.drawImage(leafMinimWalkingSpriteSheet, 
				this.currentSmallAntImageArrayIndex*this.smallAntSourceWidth,0, this.smallAntSourceWidth,this.smallAntSourceHeight,
				this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
			renderer.restore();

			
		}
		else if (this.currentSmallAntDirection === 'right')
		{
			renderer.save();
			
			renderer.translate(this.smallAntMidPoint.x,this.smallAntMidPoint.y);
			renderer.rotate(90 * Math.PI / 180);
			renderer.translate(-this.smallAntMidPoint.x,-this.smallAntMidPoint.y);
			renderer.drawImage(leafMinimWalkingSpriteSheet, 
				this.currentSmallAntImageArrayIndex*this.smallAntSourceWidth,0, this.smallAntSourceWidth,this.smallAntSourceHeight,
				this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
			renderer.restore();

			
		}
		else if (this.currentSmallAntDirection === 'downRight')
		{
			renderer.save();
			
			renderer.translate(this.smallAntMidPoint.x,this.smallAntMidPoint.y);
			renderer.rotate(135 * Math.PI / 180);
			renderer.translate(-this.smallAntMidPoint.x,-this.smallAntMidPoint.y);
			renderer.drawImage(leafMinimWalkingSpriteSheet, 
				this.currentSmallAntImageArrayIndex*this.smallAntSourceWidth,0, this.smallAntSourceWidth,this.smallAntSourceHeight,
				this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
			renderer.restore();

			
		}
		else if (this.currentSmallAntDirection === 'down')
		{
			renderer.save();
			
			renderer.translate(this.smallAntMidPoint.x,this.smallAntMidPoint.y);
			renderer.rotate(180 * Math.PI / 180);
			renderer.translate(-this.smallAntMidPoint.x,-this.smallAntMidPoint.y);
			renderer.drawImage(leafMinimWalkingSpriteSheet, 
				this.currentSmallAntImageArrayIndex*this.smallAntSourceWidth,0, this.smallAntSourceWidth,this.smallAntSourceHeight,
				this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
			renderer.restore();

			
		}
		else if (this.currentSmallAntDirection === 'downLeft')
		{
			renderer.save();
			
			renderer.translate(this.smallAntMidPoint.x,this.smallAntMidPoint.y);
			renderer.rotate(225 * Math.PI / 180);
			renderer.translate(-this.smallAntMidPoint.x,-this.smallAntMidPoint.y);
			renderer.drawImage(leafMinimWalkingSpriteSheet, 
				this.currentSmallAntImageArrayIndex*this.smallAntSourceWidth,0, this.smallAntSourceWidth,this.smallAntSourceHeight,
				this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
			renderer.restore();

			
		}
		else if (this.currentSmallAntDirection === 'left')
		{
			renderer.save();
			
			renderer.translate(this.smallAntMidPoint.x,this.smallAntMidPoint.y);
			renderer.rotate(270 * Math.PI / 180);
			renderer.translate(-this.smallAntMidPoint.x,-this.smallAntMidPoint.y);
			renderer.drawImage(leafMinimWalkingSpriteSheet, 
				this.currentSmallAntImageArrayIndex*this.smallAntSourceWidth,0, this.smallAntSourceWidth,this.smallAntSourceHeight,
				this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
			renderer.restore();

			
		}
		else if (this.currentSmallAntDirection === 'upLeft')
		{
			renderer.save();
			
			renderer.translate(this.smallAntMidPoint.x,this.smallAntMidPoint.y);
			renderer.rotate(315 * Math.PI / 180);
			renderer.translate(-this.smallAntMidPoint.x,-this.smallAntMidPoint.y);
			renderer.drawImage(leafMinimWalkingSpriteSheet, 
				this.currentSmallAntImageArrayIndex*this.smallAntSourceWidth,0, this.smallAntSourceWidth,this.smallAntSourceHeight,
				this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
			renderer.restore();

			
		}

		if (defenseGame.debugOn)
		{
			renderer.lineWidth = 5;
			renderer.strokeStyle = 'red';
			renderer.strokeRect(this.smallAntX,this.smallAntY*1.1, this.smallAntWidth,this.smallAntHeight*0.6);

			renderer.strokeRect(this.smallAntMidPoint.x - 5,this.smallAntMidPoint.y - 5, 5,5);
		}
		
	}



	this.antVelocity = renderer.canvas.width*0.0075;

	this.smallAntPreviousX = this.smallAntX;
	this.smallAntPreviousY = this.smallAntY;
	
	this.smallAntPreviousMouthColliderX = this.mouthColliderBoxX;
	this.smallAntPreviousMouthColliderY = this.mouthColliderBoxY;
	
	this.currentSmallAntDirection = 'up';
	this.previousSmallAntDirection = 'up';
	this.smallAntMovingUp = false;
	this.smallAntMovingRight = false;
	this.smallAntMovingDown = false;
	this.smallAntMovingLeft = false;
	this.smallAntMoving = false;

	this.currentSmallAntImageArrayIndex = 0;
								  
	this.cycleSmallAntImages = function()
	{
		if (this.shouldBeMovingLeftOrRight || this.shouldBeMovingUpOrDown)
		{
			this.currentSmallAntImageArrayIndex++;
		}

		if (this.currentSmallAntImageArrayIndex > 11)
		{
			this.currentSmallAntImageArrayIndex = 0;
		}
	}

	this.moveSmallAnt = function()
	{

		this.smallAntPreviousX = this.smallAntX;
		this.smallAntPreviousY = this.smallAntY;
		
		this.smallAntPreviousMouthColliderX = this.mouthColliderBoxX;
		this.smallAntPreviousMouthColliderY = this.mouthColliderBoxY;
		
		
		if (this.controlStatus === 'active')
		{
			//touch and mouse input
			if (this.currentMovementTargetFromInput.x > this.fungusTangleX && 
				this.currentMovementTargetFromInput.x < this.fungusTangleX + this.fungusTangleWidth &&
				this.currentMovementTargetFromInput.y > this.fungusTangleY &&
				this.currentMovementTargetFromInput.y < this.fungusTangleY + this.fungusTangleHeight)//if inside the fungustangle
			{			
				
				this.previousSmallAntDirection = this.currentSmallAntDirection;

				if (this.smallAntMidPoint.x < this.currentMovementTargetFromInput.x)//ant should move to the right
				{
					
						if (this.shouldBeMovingLeftOrRight)
						{
							this.smallAntX += this.antVelocity;
							this.smallAntSwattingColliderBoxX += this.antVelocity;
							this.mouthColliderBoxX += this.antVelocity;
							this.smallAntMidPoint.x = this.smallAntX + this.smallAntWidth/2;
							this.smallAntMidPoint.y = this.smallAntY + this.smallAntHeight/2;	
							if (Math.abs(this.smallAntMidPoint.x - this.currentMovementTargetFromInput.x) <= renderer.canvas.width*0.0075)
							{//prevent jitter
								this.shouldBeMovingLeftOrRight = false;
								this.smallAntMovingRight = false;
							}

							if (this.tallyRaycastIntersectionsWithLeafPolygon(this.smallAntMidPoint, this.leafPolygonWalkingBorderLineSegments) === 0 || 
								this.tallyRaycastIntersectionsWithLeafPolygon(this.smallAntMidPoint, this.leafPolygonWalkingBorderLineSegments) % 2 === 0)
							{
								this.smallAntX = this.smallAntPreviousX;
								this.smallAntY = this.smallAntPreviousY;
								this.mouthColliderBoxX = this.smallAntPreviousMouthColliderX;
								this.mouthColliderBoxY = this.smallAntPreviousMouthColliderY;	
								this.smallAntMidPoint.x = this.smallAntPreviousX + this.smallAntWidth/2;
								this.smallAntMidPoint.y = this.smallAntPreviousY + this.smallAntHeight/2;		
								this.shouldBeMovingLeftOrRight = false;
								this.shouldBeMovingUpOrDown = false;
							}//end of midpoint of small ant outside of leaf boundaries
						}
						
				}//end of moving to the right
				
				if (this.smallAntMidPoint.x > this.currentMovementTargetFromInput.x) //ant should move to the left
				{
					if (this.shouldBeMovingLeftOrRight)
					{
						this.smallAntX -= this.antVelocity;
						this.smallAntSwattingColliderBoxX -= this.antVelocity;
						this.mouthColliderBoxX -= this.antVelocity;
						this.smallAntMidPoint.x = this.smallAntX + this.smallAntWidth/2;
						this.smallAntMidPoint.y = this.smallAntY + this.smallAntHeight/2;	
						
						if (Math.abs(this.smallAntMidPoint.x - this.currentMovementTargetFromInput.x) <= renderer.canvas.width*0.0075)
						{
							this.shouldBeMovingLeftOrRight = false;
							this.smallAntMovingLeft = false;
						}

						if (this.tallyRaycastIntersectionsWithLeafPolygon(this.smallAntMidPoint, this.leafPolygonWalkingBorderLineSegments) === 0 || 
							this.tallyRaycastIntersectionsWithLeafPolygon(this.smallAntMidPoint, this.leafPolygonWalkingBorderLineSegments) % 2 === 0)
						{
							this.smallAntX = this.smallAntPreviousX;
							this.smallAntY = this.smallAntPreviousY;
							this.mouthColliderBoxX = this.smallAntPreviousMouthColliderX;
							this.mouthColliderBoxY = this.smallAntPreviousMouthColliderY;	
							this.smallAntMidPoint.x = this.smallAntPreviousX + this.smallAntWidth/2;
							this.smallAntMidPoint.y = this.smallAntPreviousY + this.smallAntHeight/2;		
							this.currentMovementTargetFromInput.x = undefined;
							this.currentMovementTargetFromInput.y = undefined;
							this.shouldBeMovingLeftOrRight = false;
							this.shouldBeMovingUpOrDown = false;
						}//end of checking if midpoint is outside the bounds of the leaf
					}//end of moving to the left
				}
					
			
					if (this.smallAntMidPoint.y < this.currentMovementTargetFromInput.y)//ant should move down
					{
						if (this.shouldBeMovingUpOrDown)
						{
							this.smallAntY += this.antVelocity;
							this.mouthColliderBoxY += this.antVelocity;
							this.smallAntMidPoint.x = this.smallAntX + this.smallAntWidth/2;
							this.smallAntMidPoint.y = this.smallAntY + this.smallAntHeight/2;

							if (Math.abs(this.smallAntMidPoint.y - this.currentMovementTargetFromInput.y) <= renderer.canvas.width*0.0075)
							{
								this.shouldBeMovingUpOrDown = false;
								this.smallAntMovingDown = false;
							}

							if (this.tallyRaycastIntersectionsWithLeafPolygon(this.smallAntMidPoint, this.leafPolygonWalkingBorderLineSegments) === 0 || 
								this.tallyRaycastIntersectionsWithLeafPolygon(this.smallAntMidPoint, this.leafPolygonWalkingBorderLineSegments) % 2 === 0)
							{
								this.smallAntX = this.smallAntPreviousX;
								this.smallAntY = this.smallAntPreviousY;
								this.mouthColliderBoxX = this.smallAntPreviousMouthColliderX;
								this.mouthColliderBoxY = this.smallAntPreviousMouthColliderY;
								this.smallAntMidPoint.x = this.smallAntPreviousX + this.smallAntWidth/2;
								this.smallAntMidPoint.y = this.smallAntPreviousY + this.smallAntHeight/2;		
								this.currentMovementTargetFromInput.x = undefined;
								this.currentMovementTargetFromInput.y = undefined;
								this.shouldBeMovingUpOrDown = false;
								this.shouldBeMovingLeftOrRight = false;
							}
						}
						
					}
					if (this.smallAntMidPoint.y > this.currentMovementTargetFromInput.y)//ant should move up
					{
						if (this.shouldBeMovingUpOrDown)
						{
							this.smallAntY -= this.antVelocity;
							this.mouthColliderBoxY -= this.antVelocity;
							this.smallAntMidPoint.x = this.smallAntX + this.smallAntWidth/2;
							this.smallAntMidPoint.y = this.smallAntY + this.smallAntHeight/2;

							if (Math.abs(this.smallAntMidPoint.y - this.currentMovementTargetFromInput.y) <= renderer.canvas.width*0.0075)
							{
								this.shouldBeMovingUpOrDown = false;
								this.smallAntMovingUp = false;
							}

							if (this.tallyRaycastIntersectionsWithLeafPolygon(this.smallAntMidPoint, this.leafPolygonWalkingBorderLineSegments) === 0 || 
								this.tallyRaycastIntersectionsWithLeafPolygon(this.smallAntMidPoint, this.leafPolygonWalkingBorderLineSegments) % 2 === 0)
							{
								this.smallAntX = this.smallAntPreviousX;
								this.smallAntY = this.smallAntPreviousY;
								this.mouthColliderBoxX = this.smallAntPreviousMouthColliderX;
								this.mouthColliderBoxY = this.smallAntPreviousMouthColliderY;
								this.smallAntMidPoint.x = this.smallAntPreviousX + this.smallAntWidth/2;
								this.smallAntMidPoint.y = this.smallAntPreviousY + this.smallAntHeight/2;		
								this.currentMovementTargetFromInput.x = undefined;
								this.currentMovementTargetFromInput.y = undefined;
								this.shouldBeMovingUpOrDown = false;
								this.shouldBeMovingLeftOrRight = false;
							}//end of checking small and midpoint is outside leaf boundaries
						}//end of ant moving up		
					}
						
					if (this.smallAntMovingUp && !this.smallAntMovingRight && !this.smallAntMovingLeft && !this.smallAntMovingDown)
					{
						this.currentSmallAntDirection = 'up';
						this.redefineMouthColliderPropertiesForFacingUp();
					}
					else if (this.smallAntMovingUp && this.smallAntMovingLeft && !this.smallAntMovingRight && !this.smallAntMovingRight)
					{
						this.currentSmallAntDirection = 'upLeft';
						this.redefineMouthColliderPropertiesForFacingUpLeft();
					}
					else if (this.smallAntMovingUp && this.smallAntMovingRight && !this.smallAntMovingDown && !this.smallAntMovingLeft)
					{
						this.currentSmallAntDirection = 'upRight';
						this.redefineMouthColliderPropertiesForFacingUpRight();
					}
					else if (this.smallAntMovingRight && !this.smallAntMovingUp && !this.smallAntMovingDown && !this.smallAntMovingLeft)
					{
						this.currentSmallAntDirection = 'right';
						this.redefineMouthColliderPropertiesForFacingRight();
					}
					else if (this.smallAntMovingDown && !this.smallAntMovingRight && !this.smallAntMovingLeft && !this.smallAntMovingUp)
					{
						this.currentSmallAntDirection = 'down';
						this.redefineMouthColliderPropertiesForFacingDown();
					}
					else if (this.smallAntMovingDown && this.smallAntMovingLeft && !this.smallAntMovingUp && !this.smallAntMovingRight)
					{
						this.currentSmallAntDirection = 'downLeft';
						this.redefineMouthColliderPropertiesForFacingDownLeft();
					}
					else if (this.smallAntMovingDown && this.smallAntMovingRight && !this.smallAntMovingUp && !this.smallAntMovingLeft)
					{
						this.currentSmallAntDirection = 'downRight';
						this.redefineMouthColliderPropertiesForFacingDownRight();
					}
					else if (this.smallAntMovingLeft && !this.smallAntMovingDown && !this.smallAntMovingUp && !this.smallAntMovingRight)
					{
						this.currentSmallAntDirection = 'left';
						this.redefineMouthColliderPropertiesForFacingLeft();
					}
					// else 
					// {
					// 	this.currentSmallAntDirection = this.previousSmallAntDirection;
					// }

					if (this.smallAntMidPoint === this.currentMovementTargetFromInput)
					{
						this.currentMovementTargetFromInput.x = undefined;
						this.currentMovementTargetFromInput.y = undefined;
					}

					if (!this.shouldBeMovingUpOrDown && !this.shouldBeMovingLeftOrRight)
					{
						if (!defenseGame.audioManager.sfxManager.leafMinimFootsteps.paused)
						{
							defenseGame.audioManager.sfxManager.leafMinimFootsteps.pause();
							//defenseGame.audioManager.sfxManager.leafMinimFootsteps.currentTime = 0;
						}
						
					}
			}
		}
	}

	
	this.redefineMouthColliderPropertiesForFacingUp = function()
	{
		this.mouthColliderBoxX = this.smallAntX + this.smallAntWidth*0.45;
		this.mouthColliderBoxY =  this.smallAntY*1.025;
		this.mouthColliderBoxWidth = this.smallAntWidth*0.4;
		this.mouthColliderBoxHeight = this.smallAntHeight*0.4;
	}
	
	this.redefineMouthColliderPropertiesForFacingDown = function()
	{
		this.mouthColliderBoxX = this.smallAntX + this.smallAntWidth*0.2;
		this.mouthColliderBoxY = this.smallAntY + (this.smallAntHeight * 0.8);
		this.mouthColliderBoxWidth = this.smallAntWidth*0.4;
		this.mouthColliderBoxHeight = this.smallAntHeight*0.4;
	}
	
	this.redefineMouthColliderPropertiesForFacingRight = function()
	{
		this.mouthColliderBoxX = this.smallAntX + this.smallAntWidth*0.85;
		this.mouthColliderBoxY = this.smallAntY + this.smallAntHeight*0.45;
		this.mouthColliderBoxWidth = this.smallAntWidth*0.4;
		this.mouthColliderBoxHeight = this.smallAntHeight*0.4;
	}
	
	this.redefineMouthColliderPropertiesForFacingLeft = function()
	{
		this.mouthColliderBoxX = this.smallAntX - this.smallAntWidth*0.15;
		this.mouthColliderBoxY = this.smallAntY + this.smallAntHeight*0.25;
		this.mouthColliderBoxWidth = this.smallAntWidth*0.4;
		this.mouthColliderBoxHeight = this.smallAntHeight*0.4;
	}
	
	this.redefineMouthColliderPropertiesForFacingUpRight = function()
	{
		this.mouthColliderBoxX = this.smallAntX + this.smallAntWidth*0.8;
		this.mouthColliderBoxY = this.smallAntY + this.smallAntHeight*0.2;
		this.mouthColliderBoxWidth = this.smallAntWidth*0.4;
		this.mouthColliderBoxHeight = this.smallAntHeight*0.4;
	}
	
	this.redefineMouthColliderPropertiesForFacingUpLeft = function()
	{
		this.mouthColliderBoxX = this.smallAntX;
		this.mouthColliderBoxY = this.smallAntY + this.smallAntHeight*0.1;
		this.mouthColliderBoxWidth = this.smallAntWidth*0.4;
		this.mouthColliderBoxHeight = this.smallAntHeight*0.4;
	}
	
	this.redefineMouthColliderPropertiesForFacingDownRight = function()
	{
		this.mouthColliderBoxX = this.smallAntX + this.smallAntWidth*0.6;
		this.mouthColliderBoxY = this.smallAntY + (this.smallAntHeight * 0.65);
		this.mouthColliderBoxWidth = this.smallAntWidth*0.4;
		this.mouthColliderBoxHeight = this.smallAntHeight*0.4;
	}
	
	this.redefineMouthColliderPropertiesForFacingDownLeft = function()
	{
		this.mouthColliderBoxX = this.smallAntX - this.smallAntWidth*0.15;
		this.mouthColliderBoxY = this.smallAntY + (this.smallAntHeight * 0.5);
		this.mouthColliderBoxWidth = this.smallAntWidth*0.4;
		this.mouthColliderBoxHeight = this.smallAntHeight*0.4;
	}
	
	

	this.mouthColliderBoxX = this.smallAntX + this.smallAntWidth*0.45;
	this.mouthColliderBoxY = this.smallAntY*1.025;
	this.mouthColliderBoxWidth = this.smallAntWidth*0.4;
	this.mouthColliderBoxHeight = this.smallAntHeight*0.2;

	this.detectFungusSporeCollisions = function()
	{
		if (leftArrowIsBeingHeld || rightArrowIsBeingHeld || downArrowIsBeingHeld || upArrowIsBeingHeld ||
			this.currentMovementTargetFromInput.x !== undefined || this.currentMovementTargetFromInput.y !== undefined)
		{
			for (let i = 0; i < this.arrayOfFungusSpores.length; i++)
			{
				if (this.arrayOfFungusSpores[i].x < this.mouthColliderBoxX + this.mouthColliderBoxWidth && //check for spores overlapping small ants mouth
				    this.arrayOfFungusSpores[i].x + this.arrayOfFungusSpores[i].width > this.mouthColliderBoxX  &&
				    this.arrayOfFungusSpores[i].y < this.mouthColliderBoxY + this.mouthColliderBoxHeight &&
				    this.arrayOfFungusSpores[i].y + this.arrayOfFungusSpores[i].height > this.mouthColliderBoxY)
				{
					let fungusSporeFeedbackAnimation = new FungusSporeFeedbackAnimation(this.arrayOfFungusSpores[i].x,this.arrayOfFungusSpores[i].y);
					defenseGame.background.fungusSporeFeedbackAnimationManager.arrayOfFungusSporeVisualFeedbackAnimations.push(fungusSporeFeedbackAnimation);

					this.arrayOfFungusSpores.splice(i,1);
					defenseGame.audioManager.sfxManager.playEatingFungusSound();
					defenseGame.background.fungusTallyDiv.tallyOfEatenFungusSpores++;

				}
			}
		}
	}

	this.currentMovementTargetFromInput = {x:undefined,y:undefined};
	this.touchInsideFungusTangle = false;
	this.handleTouchstart = function()
	{
		if (this.controlStatus !== 'active')
		{
			return;
		}

		this.currentMovementTargetFromInput = vec2(touchPos[0].x - canvasStartX, touchPos[0].y - canvasStartY);
		if (this.currentMovementTargetFromInput.x > this.fungusTangleX && 
			this.currentMovementTargetFromInput.x < this.fungusTangleX + this.fungusTangleWidth &&
			this.currentMovementTargetFromInput.y > this.fungusTangleY &&
			this.currentMovementTargetFromInput.y < this.fungusTangleY + this.fungusTangleHeight)
			
		{
			this.touchInsideFungusTangle = true;

			if (defenseGame.audioManager.sfxManager.leafMinimFootsteps.paused)
			{
				defenseGame.audioManager.sfxManager.leafMinimFootsteps.play();
			}

			this.shouldBeMovingLeftOrRight = true;
			this.shouldBeMovingUpOrDown = true;
			if (this.smallAntMidPoint.x < this.currentMovementTargetFromInput.x)//ant should move to the right
			{
				this.smallAntMovingRight = true;
				this.smallAntMovingLeft = false;
			} 
			else if (this.smallAntMidPoint.x > this.currentMovementTargetFromInput.x) //ant should move to the left
			{
				this.smallAntMovingLeft = true;
				this.smallAntMovingRight = false;
			}
			
			if (this.smallAntMidPoint.y < this.currentMovementTargetFromInput.y)//ant should move down
			{
				this.smallAntMovingDown = true;
				this.smallAntMovingUp = false;
			}
			else if (this.smallAntMidPoint.y > this.currentMovementTargetFromInput.y)//ant should move up
			{
				this.smallAntMovingUp = true;
				this.smallAntMovingDown = false;
			}
		}

				if (this.smallAntMovingUp && !this.smallAntMovingRight && !this.smallAntMovingLeft && !this.smallAntMovingDown)
				{
					this.currentSmallAntDirection = 'up';
					this.redefineMouthColliderPropertiesForFacingUp();
				}
				else if (this.smallAntMovingUp && this.smallAntMovingLeft && !this.smallAntMovingRight && !this.smallAntMovingRight)
				{
					this.currentSmallAntDirection = 'upLeft';
					this.redefineMouthColliderPropertiesForFacingUpLeft();
				}
				else if (this.smallAntMovingUp && this.smallAntMovingRight && !this.smallAntMovingDown && !this.smallAntMovingLeft)
				{
					this.currentSmallAntDirection = 'upRight';
					this.redefineMouthColliderPropertiesForFacingUpRight();
				}
				else if (this.smallAntMovingRight && !this.smallAntMovingUp && !this.smallAntMovingDown && !this.smallAntMovingLeft)
				{
					this.currentSmallAntDirection = 'right';
					this.redefineMouthColliderPropertiesForFacingRight();
				}
				else if (this.smallAntMovingDown && !this.smallAntMovingRight && !this.smallAntMovingLeft && !this.smallAntMovingUp)
				{
					this.currentSmallAntDirection = 'down';
					this.redefineMouthColliderPropertiesForFacingDown();
				}
				else if (this.smallAntMovingDown && this.smallAntMovingLeft && !this.smallAntMovingUp && !this.smallAntMovingRight)
				{
					this.currentSmallAntDirection = 'downLeft';
					this.redefineMouthColliderPropertiesForFacingDownLeft();
				}
				else if (this.smallAntMovingDown && this.smallAntMovingRight && !this.smallAntMovingUp && !this.smallAntMovingLeft)
				{
					this.currentSmallAntDirection = 'downRight';
					this.redefineMouthColliderPropertiesForFacingDownRight();
				}
				else if (this.smallAntMovingLeft && !this.smallAntMovingDown && !this.smallAntMovingUp && !this.smallAntMovingRight)
				{
					this.currentSmallAntDirection = 'left';
					this.redefineMouthColliderPropertiesForFacingLeft();
				}
				else 
				{
					this.currentSmallAntDirection = this.previousSmallAntDirection;
				}
	}

	this.clickInsideFungusTangle = false;
	this.handleMouseDown = function()
	{
		if (this.controlStatus !== 'active')
		{
			return;
		}

		this.currentMovementTargetFromInput = vec2(touchPos[0].x - canvasStartX, touchPos[0].y - canvasStartY);
		if (this.currentMovementTargetFromInput.x > this.fungusTangleX && 
			this.currentMovementTargetFromInput.x < this.fungusTangleX + this.fungusTangleWidth &&
			this.currentMovementTargetFromInput.y > this.fungusTangleY &&
			this.currentMovementTargetFromInput.y < this.fungusTangleY + this.fungusTangleHeight)
		{
			this.clickInsideFungusTangle = true;
			
			if (defenseGame.audioManager.sfxManager.leafMinimFootsteps.paused)
			{
				defenseGame.audioManager.sfxManager.leafMinimFootsteps.play();
			}
			this.shouldBeMovingLeftOrRight = true;
			this.shouldBeMovingUpOrDown = true;
		}


		if (this.smallAntMidPoint.x < this.currentMovementTargetFromInput.x)//ant should move to the right
		{
			this.smallAntMovingRight = true;
			this.smallAntMovingLeft = false;
		} 
		else if (this.smallAntMidPoint.x > this.currentMovementTargetFromInput.x) //ant should move to the left
		{
			this.smallAntMovingLeft = true;
			this.smallAntMovingRight = false;
		}
		

		if (this.smallAntMidPoint.y < this.currentMovementTargetFromInput.y)//ant should move down
		{
			this.smallAntMovingDown = true;
			this.smallAntMovingUp = false;
		}
		else if (this.smallAntMidPoint.y > this.currentMovementTargetFromInput.y)//ant should move up
		{
			this.smallAntMovingUp = true;
			this.smallAntMovingDown = false;
		}

				if (this.smallAntMovingUp && !this.smallAntMovingRight && !this.smallAntMovingLeft && !this.smallAntMovingDown)
				{
					this.currentSmallAntDirection = 'up';
					this.redefineMouthColliderPropertiesForFacingUp();
				}
				else if (this.smallAntMovingUp && this.smallAntMovingLeft && !this.smallAntMovingRight && !this.smallAntMovingRight)
				{
					this.currentSmallAntDirection = 'upLeft';
					this.redefineMouthColliderPropertiesForFacingUpLeft();
				}
				else if (this.smallAntMovingUp && this.smallAntMovingRight && !this.smallAntMovingDown && !this.smallAntMovingLeft)
				{
					this.currentSmallAntDirection = 'upRight';
					this.redefineMouthColliderPropertiesForFacingUpRight();
				}
				else if (this.smallAntMovingRight && !this.smallAntMovingUp && !this.smallAntMovingDown && !this.smallAntMovingLeft)
				{
					this.currentSmallAntDirection = 'right';
					this.redefineMouthColliderPropertiesForFacingRight();
				}
				else if (this.smallAntMovingDown && !this.smallAntMovingRight && !this.smallAntMovingLeft && !this.smallAntMovingUp)
				{
					this.currentSmallAntDirection = 'down';
					this.redefineMouthColliderPropertiesForFacingDown();
				}
				else if (this.smallAntMovingDown && this.smallAntMovingLeft && !this.smallAntMovingUp && !this.smallAntMovingRight)
				{
					this.currentSmallAntDirection = 'downLeft';
					this.redefineMouthColliderPropertiesForFacingDownLeft();
				}
				else if (this.smallAntMovingDown && this.smallAntMovingRight && !this.smallAntMovingUp && !this.smallAntMovingLeft)
				{
					this.currentSmallAntDirection = 'downRight';
					this.redefineMouthColliderPropertiesForFacingDownRight();
				}
				else if (this.smallAntMovingLeft && !this.smallAntMovingDown && !this.smallAntMovingUp && !this.smallAntMovingRight)
				{
					this.currentSmallAntDirection = 'left';
					this.redefineMouthColliderPropertiesForFacingLeft();
				}
				else 
				{
					this.currentSmallAntDirection = this.previousSmallAntDirection;
				}
	}

	
	this.update = function()
	{
		
			this.moveSmallAnt();
			this.detectFungusSporeCollisions();
		
		if (defenseGame.transitioningToUninfectedAnt)
		{
			this.bigAntX += renderer.canvas.width*0.002;
			this.leafX += renderer.canvas.width*0.002;
			this.headTarget.x += renderer.canvas.width*0.002;
			this.fungusTangleX += renderer.canvas.width*0.002;
			
			for (let i = 0; i < this.arrayOfFungusSpores.length; i++)
			{
				this.arrayOfFungusSpores[i].x += renderer.canvas.width*0.002;
			}

			if (this.currentSmallAntDirection === 'down')
			{
				this.smallAntX -= renderer.canvas.width*0.002;
			}
			else if (this.currentSmallAntDirection === 'up')
			{
				this.smallAntX += renderer.canvas.width*0.002;
			}
			else if (this.currentSmallAntDirection === 'right')
			{
				this.smallAntY -= renderer.canvas.width*0.002;
			}
			else if (this.currentSmallAntDirection === 'left')
			{
				this.smallAntY += renderer.canvas.width*0.002;
			}
			else if (this.currentSmallAntDirection === 'upRight')
			{
				this.smallAntX += renderer.canvas.width*0.002;
				this.smallAntY -= renderer.canvas.width*0.002;
			}
			else if (this.currentSmallAntDirection === 'upLeft')
			{
				this.smallAntX += renderer.canvas.width*0.002;
				this.smallAntY += renderer.canvas.width*0.002;
			}
			else if (this.currentSmallAntDirection === 'downRight')
			{
				this.smallAntX -= renderer.canvas.width*0.002;
				this.smallAntY -= renderer.canvas.width*0.002;
			}
			else if (this.currentSmallAntDirection === 'downLeft')
			{
				this.smallAntX -= renderer.canvas.width*0.002;
				this.smallAntY += renderer.canvas.width*0.002;
			}
			
			for (let i = 0; i < this.leafPolygonWalkingBorderLineSegments.length; i++)
			{
				this.leafPolygonWalkingBorderLineSegments[i].x1 += renderer.canvas.width*0.002;
				this.leafPolygonWalkingBorderLineSegments[i].x2 += renderer.canvas.width*0.002;
			}

		}
	}

	this.initialize = function()
	{
		this.initializeLineSegments();
		this.initializeArrayOfFungusSpores();
		this.infectionAlertMessage.initialize();
		
		var _this = this;
		window.parentAntAnimationInterval = 
		setInterval(function() {_this.cycleBigAntImages()},100);
		defenseGame.arrayOfIntervals.push(window.parentAntAnimationInterval);

		window.smallAntAnimationInterval = 
		setInterval(function() {_this.cycleSmallAntImages()},25);
		defenseGame.arrayOfIntervals.push(window.smallAntAnimationInterval);
	}

	this.headTarget = new Target('head target', this.bigAntX + this.bigAntWidth*0.65 + this.bigAntWidth*0.1,this.bigAntY + this.bigAntHeight*0.3 + this.bigAntHeight*0.1);

	this.infectionAlertMessage = 
	{
		name: 'infection alert message',
		x: renderer.canvas.width * 0.615,
		y: renderer.canvas.height * 0.665,
		width: undefined,
		infectionMessageShouldBeVisible: false,
		fontSize: 45, 

		initialize: function()
		{
			this.width = renderer.measureText(infectionAlertString).width;
		},

		draw: function() 
		{
			if (this.infectionMessageShouldBeVisible)
			{
				renderer.fillStyle = 'DarkGoldenRod';
				renderer.fillRect(0,this.y, renderer.canvas.width,this.fontSize);

				renderer.fillStyle = 'red';
				renderer.font = '36px SmallBoldPixel';
				renderer.fillText(infectionAlertString, renderer.canvas.width/2 - this.width/2,this.y + this.fontSize*0.75);
			}
		},

		toggleVisibility: function()
		{
			
			if (defenseGame.parentAntObject.infectionAlertMessage.infectionMessageShouldBeVisible === false)
			{
				defenseGame.parentAntObject.infectionAlertMessage.infectionMessageShouldBeVisible = true;
			}
			else 
			{
				defenseGame.parentAntObject.infectionAlertMessage.infectionMessageShouldBeVisible = false;
			}
			
		}
	}
	
}
let infectionAlertString = string_ALERT_PHORID_FLY_INFECTION[currentLanguage];

function Target(name, x,y)
{
	this.name = name;
	this.x = x;
	this.y = y;
	
}

function FungusSpore(x,y)
{
	this.image = fungusImage;
	this.x = x;
	this.y = y;
	this.width = renderer.canvas.width * 0.005;
	this.height = renderer.canvas.width * 0.005;

	this.draw = function()
	{
		renderer.drawImage(this.image, this.x,this.y, this.width,this.height);
	}
}

function BigAntManager()
{
	this.arrayOfBigAnts = [];
	this.currentIndex = 0;
	this.currentActiveAnt = defenseGame.parentAntObject;

	this.updateCurrentActiveAnt = function()
	{
		this.currentActiveAnt.controlStatus = 'inactive';
		this.currentIndex++;
		this.currentActiveAnt = this.arrayOfBigAnts[this.currentIndex];
		this.currentActiveAnt.controlStatus = 'active';
		console.log('this.currentActiveAnt.name: ' + this.currentActiveAnt.name);
	}

	this.changeToIdleSpriteSheets = function()
	{
		for (let i = 0; i < this.arrayOfBigAnts.length; i++)
		{
			this.arrayOfBigAnts[i].currentSpriteSheet = bigAntIdleSpriteSheet;
		}
	}

	this.updateBigAnts = function()
	{
		for (let i = 0; i < this.arrayOfBigAnts.length; i++)
		{
			this.arrayOfBigAnts[i].update();
		}
	}

	this.drawBigAnts = function()
	{
		for (let i = 0; i < this.arrayOfBigAnts.length; i++)
		{
			this.arrayOfBigAnts[i].draw();
		}
	}

}