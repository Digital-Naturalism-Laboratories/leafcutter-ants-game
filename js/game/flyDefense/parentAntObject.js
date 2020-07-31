function ParentAntObject()
{
	this.bigAntHeight = renderer.canvas.height*0.4;
	this.bigAntWidth = renderer.canvas.width*0.7;
	this.bigAntX = renderer.canvas.width/2 - this.bigAntWidth*0.7;
	this.bigAntY = renderer.canvas.height*0.55;
	
	this.x = renderer.canvas.width/2 - this.bigAntWidth/2;
	this.y = renderer.canvas.height*0.6;

	this.leafImage = leafImage;
	this.fungusImage = fungusImage;
	this.currentBigAntImage = bigAntNeutralImage;
	this.arrayOfBigAntImages = [bigAntFrontRightForwardImage,bigAntNeutralImage,bigAntFrontLeftForwardImage];

	this.leafPolygonWalkingBorderPoints = 
		[

			{name:'1',x:renderer.canvas.width*0.565,y:renderer.canvas.height*0.05},
			{name:'2',x:renderer.canvas.width*0.68,y:renderer.canvas.height*0.18},
			{name:'3',x:renderer.canvas.width*0.77,y:renderer.canvas.height*0.22},
			{name:'4',x:renderer.canvas.width*0.785,y:renderer.canvas.height*0.33},
			{name:'5',x:renderer.canvas.width*0.8,y:renderer.canvas.height*0.36},
			{name:'6',x:renderer.canvas.width*0.75,y:renderer.canvas.height*0.53},
			{name:'7',x:renderer.canvas.width*0.725,y:renderer.canvas.height*0.69},
			{name:'8',x:renderer.canvas.width*0.64,y:renderer.canvas.height*0.76},
			{name:'9',x:renderer.canvas.width*0.66,y:renderer.canvas.height*0.685},
			{name:'10',x:renderer.canvas.width*0.615,y:renderer.canvas.height*0.73},
			{name:'11',x:renderer.canvas.width*0.575,y:renderer.canvas.height*0.75},
			{name:'12',x:renderer.canvas.width*0.555,y:renderer.canvas.height*0.73},
			{name:'13',x:renderer.canvas.width*0.48,y:renderer.canvas.height*0.65},
			{name:'14',x:renderer.canvas.width*0.45,y:renderer.canvas.height*0.45},
			{name:'15',x:renderer.canvas.width*0.445,y:renderer.canvas.height*0.355},
			{name:'16',x:renderer.canvas.width*0.46,y:renderer.canvas.height*0.345},
			{name:'17',x:renderer.canvas.width*0.465,y:renderer.canvas.height*0.335},
			{name:'18',x:renderer.canvas.width*0.515,y:renderer.canvas.height*0.225},
			{name:'19',x:renderer.canvas.width*0.565,y:renderer.canvas.height*0.05}

		];

	this.leafPolygonFungusBorderPoints = 
	[

		{name:'1',x:renderer.canvas.width*0.565,y:renderer.canvas.height*0.06},
		{name:'2',x:renderer.canvas.width*0.68,y:renderer.canvas.height*0.2},
		{name:'3',x:renderer.canvas.width*0.77,y:renderer.canvas.height*0.24},
		{name:'4',x:renderer.canvas.width*0.775,y:renderer.canvas.height*0.33},
		{name:'5',x:renderer.canvas.width*0.79,y:renderer.canvas.height*0.36},
		{name:'6',x:renderer.canvas.width*0.74,y:renderer.canvas.height*0.53},
		{name:'7',x:renderer.canvas.width*0.715,y:renderer.canvas.height*0.675},
		{name:'8',x:renderer.canvas.width*0.66,y:renderer.canvas.height*0.72},
		{name:'9',x:renderer.canvas.width*0.66,y:renderer.canvas.height*0.66},
		{name:'10',x:renderer.canvas.width*0.615,y:renderer.canvas.height*0.7},
		{name:'11',x:renderer.canvas.width*0.575,y:renderer.canvas.height*0.69},
		{name:'12',x:renderer.canvas.width*0.56,y:renderer.canvas.height*0.68},
		{name:'13',x:renderer.canvas.width*0.505,y:renderer.canvas.height*0.62},
		{name:'14',x:renderer.canvas.width*0.46,y:renderer.canvas.height*0.45},
		{name:'15',x:renderer.canvas.width*0.455,y:renderer.canvas.height*0.355},
		{name:'16',x:renderer.canvas.width*0.47,y:renderer.canvas.height*0.355},
		{name:'17',x:renderer.canvas.width*0.475,y:renderer.canvas.height*0.335},
		{name:'18',x:renderer.canvas.width*0.525,y:renderer.canvas.height*0.225},
		{name:'19',x:renderer.canvas.width*0.565,y:renderer.canvas.height*0.06}

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
		// console.log('potentialFungusPoint.x,y: ' + potentialFungusPoint.x,potentialFungusPoint.y);
		// console.log('this.leafPolygonLineSegments.length: ' + this.leafPolygonLineSegments.length);
		for (let i = 0; i < arrayOfLines.length; i++)
		{
			// console.log('inside for loop of intersection tally function');

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
		this.drawBigAnt();
		this.drawLeaf();
		this.drawFungusSpores();
		this.drawSmallAnt();

		if (defenseGame.debugOn)
		{
			renderer.strokeStyle = 'red';
			renderer.lineWidth = 5;
			renderer.strokeRect(this.mouthColliderBoxX,this.mouthColliderBoxY, this.mouthColliderBoxWidth,this.mouthColliderBoxHeight);
		}
	}

	let bigAntImageIndex = 1;
	let bigAntImageDirection = 1;
	this.cycleBigAntImages = function()
	{
		if (bigAntImageIndex === 0 || bigAntImageIndex === 2)
		{
			bigAntImageDirection *= -1;
		}

		bigAntImageIndex += 1*bigAntImageDirection;

		defenseGame.parentAntObject.currentBigAntImage = defenseGame.parentAntObject.arrayOfBigAntImages[bigAntImageIndex];
	}

	// this.bigAntWalkingInterval = new frameInterval(this.cycleBigAntImages, 100);

	
	this.drawBigAnt = function()
	{
		renderer.drawImage(this.currentBigAntImage, this.bigAntX,this.bigAntY, this.bigAntWidth,this.bigAntHeight);
	}

	
	this.leafWidth = this.bigAntWidth*0.5;
	this.leafHeight = this.bigAntHeight*1.75;
	this.leafX = this.bigAntX + this.bigAntWidth - this.leafWidth*0.75;
	this.leafY = this.bigAntY + this.bigAntHeight/2 - this.leafHeight;
	
	this.drawLeaf = function()
	{
		renderer.drawImage(this.leafImage, this.leafX,this.leafY, this.leafWidth,this.leafHeight);
		if (defenseGame.debugOn === true)
		{
			renderer.strokeStyle = 'red';
			renderer.lineWidth = 5;
			renderer.strokeRect(this.leafX,this.leafY, this.leafWidth,this.leafHeight);

			renderer.moveTo(this.leafPolygonFungusBorderPoints[0].x,this.leafPolygonFungusBorderPoints[0].y);
			for (let i = 1; i < this.leafPolygonFungusBorderPoints.length; i++)
			{
				
				
				renderer.fillStyle = 'black';
				renderer.fillRect(this.leafPolygonFungusBorderPoints[i].x,this.leafPolygonFungusBorderPoints[i].y, 5,5);
				renderer.font = '20px Helvetica';
				renderer.fillText(this.leafPolygonFungusBorderPoints[i].name, this.leafPolygonFungusBorderPoints[i].x,this.leafPolygonFungusBorderPoints[i].y);

				renderer.lineTo(this.leafPolygonFungusBorderPoints[i].x,this.leafPolygonFungusBorderPoints[i].y);
			}
			renderer.strokeStyle = 'red';
			renderer.stroke();

			renderer.moveTo(this.leafPolygonWalkingBorderPoints[0].x,this.leafPolygonWalkingBorderPoints[0].y);
			for (let i = 1; i < this.leafPolygonWalkingBorderPoints.length; i++)
			{
				
				renderer.fillStyle = 'green';
				renderer.fillRect(this.leafPolygonWalkingBorderPoints[i].x,this.leafPolygonWalkingBorderPoints[i].y, 5,5);
				renderer.font = '20px Helvetica';
				renderer.fillText(this.leafPolygonWalkingBorderPoints[i].name, this.leafPolygonWalkingBorderPoints[i].x,this.leafPolygonWalkingBorderPoints[i].y);

				renderer.lineTo(this.leafPolygonWalkingBorderPoints[i].x,this.leafPolygonWalkingBorderPoints[i].y);
			}
			renderer.strokeStyle = 'green';
			renderer.stroke();
		}
	}

	this.fungusTangleX = renderer.canvas.width*0.525;
	this.fungusTangleY = renderer.canvas.height*0.2;
	this.fungusTangleWidth = renderer.canvas.width*0.7 - this.fungusTangleX;
	this.fungusTangleHeight = renderer.canvas.height*0.63 - this.fungusTangleY;

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

		console.log('this.leafX: ' + this.leafX);
		console.log('this.leafWidth: ' + this.leafWidth);
		console.log('this.leafY: ' + this.leafY);
		console.log('this.leafHeight: ' + this.leafHeight);
		console.log('this.leafPolygonFungusBorderLineSegments: ' + this.leafPolygonFungusBorderLineSegments);
		for (let i = 0; i < 200; i++)
		{
			let potentialFungusPoint = {x:Math.floor(getRandomIntInclusive(this.leafX,this.leafX + this.leafWidth)),
											  y:Math.floor(getRandomIntInclusive(this.leafY,this.leafY + this.leafHeight))};

			//console.log('this.tallyRaycastIntersectionsWithLeafPolygon(potentialFungusPoint): ' + this.tallyRaycastIntersectionsWithLeafPolygon(potentialFungusPoint));
			while(this.tallyRaycastIntersectionsWithLeafPolygon(potentialFungusPoint, this.leafPolygonFungusBorderLineSegments) === 0 || 
				this.tallyRaycastIntersectionsWithLeafPolygon(potentialFungusPoint, this.leafPolygonFungusBorderLineSegments) % 2 === 0)
			{
				potentialFungusPoint = {x:Math.floor(getRandomIntInclusive(this.leafX,this.leafX + this.leafWidth)),
											  y:Math.floor(getRandomIntInclusive(this.leafY,this.leafY + this.leafHeight))};
			}
			// for (let i = 0; i < this.leafPolygonFungusBorderLineSegments.length; i++)
			// {

			// 	console.log(this.leafPolygonFungusBorderLineSegments[i].x);
			// 	console.log(this.leafPolygonFungusBorderLineSegments[i].y);
			// }
			
			// let tally = this.tallyRaycastIntersectionsWithLeafPolygon(potentialFungusPoint, this.leafPolygonFungusBorderLineSegments);
			// console.log('tally: ' + tally);
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




	this.smallAntWidth = this.leafWidth*0.15;
	this.smallAntHeight = this.leafHeight*0.15;
	this.currentSmallAntImage = smallAntImage;
	// this.arrayOfSmallAntWalkingRightImages = [bigAntFrontRightForwardImage,bigAntNeutralImage,bigAntFrontLeftForwardImage];
	// this.arrayOfSmallAntWalkingLeftImages = [bigAntFrontRightForwardFlippedImage,bigAntNeutralFlippedImage,bigAntFrontLeftForwardFlippedImage];
	this.smallAntX = this.leafX + this.leafWidth/2 - this.smallAntWidth/2;
	this.smallAntY = this.leafY + this.leafHeight/2 - this.smallAntHeight/2;

	// this.standingAntY = (this.smallAntY + this.smallAntHeight) - this.smallAntWidth;

	// this.smallAntSwattingColliderBoxX = this.smallAntX;
	// this.smallAntSwattingColliderBoxY = this.standingAntY;
	// this.smallAntSwattingColliderBoxWidth = this.smallAntHeight;
	// this.smallAntSwattingColliderBoxHeight = this.smallAntWidth*0.2;

	// this.currentSwatImage = bigAntSwatting1Image;
	// this.arrayOfSwatImages = [bigAntSwatting1Image,bigAntSwatting2Image,bigAntSwatting3Image,bigAntSwatting4Image];
	// this.swatImageIndex = 0;
	// this.swatArrayDirection = -1;
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

	
	this.drawSmallAnt = function()
	{
		// if (!defenseGame.inputManager.swatIsBeingHeld)
		// {
		// 			defenseGame.canvasContext.drawImage(this.currentSmallAntImage, this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
		// }
		// else
		// {
					// defenseGame.parentAntObject.swatInterval.start();
					renderer.drawImage(this.currentSmallAntImage, this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
					if (defenseGame.debugOn)
					{
						renderer.lineWidth = 5;
						renderer.strokeStyle = 'red';
						renderer.strokeRect(this.smallAntX,this.smallAntY, this.smallAntWidth,this.smallAntHeight);
					}
		//}
	}



	this.antVelocity = renderer.canvas.width*0.0075;
	
	this.moveSmallAnt = function()
	{
		//keyboard input
		if (defenseGame.inputManager.moveLeftIsBeingHeld)
		{
			this.smallAntX -= this.antVelocity;
			this.smallAntSwattingColliderBoxX -= this.antVelocity;
			this.mouthColliderBoxX -= this.antVelocity;
			if (this.smallAntX < this.leafX)
			{
				this.smallAntX = this.leafX;
				this.smallAntSwattingColliderBoxX = this.leafX;
				this.mouthColliderBoxX = this.smallAntX + this.smallAntWidth/2;
	
			}
		}
		else if (defenseGame.inputManager.moveUpIsBeingHeld)
		{
			this.smallAntY -= this.antVelocity;
			this.mouthColliderBoxY -= this.antVelocity;
			if (this.smallAntY < this.leafY)
			{
				this.smallAntY = this.leafY;
				this.mouthColliderBoxY = this.smallAntY*1.025;
			}
		}
		else if (defenseGame.inputManager.moveRightIsBeingHeld)
		{
			this.smallAntX += this.antVelocity;
			this.smallAntSwattingColliderBoxX += this.antVelocity;
			this.mouthColliderBoxX += this.antVelocity;
			if (this.smallAntX + this.smallAntWidth > this.leafX + this.leafWidth * 0.9)
			{
				this.smallAntX = this.leafX + (this.leafWidth * 0.9) - this.smallAntWidth;
				this.smallAntSwattingColliderBoxX = this.leafX + (this.leafWidth * 0.9) - this.smallAntWidth;
				this.mouthColliderBoxX = this.smallAntX + this.smallAntWidth/2;
			}
		}
		else if (defenseGame.inputManager.moveDownIsBeingHeld)
		{
			this.smallAntY += this.antVelocity;
			this.mouthColliderBoxY += this.antVelocity;
			if (this.smallAntY + this.smallAntHeight > this.leafY + this.leafHeight)
			{
				this.smallAntY = this.leafY + this.leafHeight - this.smallAntHeight;
				this.mouthColliderBoxY = this.smallAntY*1.025;
			}
		}
		else if (defenseGame.inputManager.swatIsBeingHeld)
		{
			//this.currentSmallAntImage = bigAntHindLegsFacingRightImage;
			this.smallAntY = this.standingAntY;
			
			this.smallAntSwattingColliderBoxX = this.smallAntX;
			this.smallAntSwattingColliderBoxY = this.standingAntY;

			if (this.smallAntY < this.standingAntY)
			{
				this.smallAntY = this.standingAntY;
			}
		}
		
		//touch input
		if (this.currentMovementTargetFromTouchInput.x !== undefined)//left or right movement
		{
			if (this.smallAntX + this.smallAntWidth/2 < this.currentMovementTargetFromTouchInput.x)//ant should move to the right
			{
				this.smallAntX += this.antVelocity;
				this.smallAntSwattingColliderBoxX += this.antVelocity;
				this.mouthColliderBoxX += this.antVelocity;
				if (Math.abs(this.smallAntX  + this.smallAntWidth/2 - this.currentMovementTargetFromTouchInput.x) < defenseGame.canvas.width*0.005)
				{//prevent jitter
					this.currentMovementTargetFromTouchInput.x = undefined;
				}

				if (this.smallAntX + this.smallAntWidth > this.leafX + this.leafWidth * 0.9)//prevent from going off leaf
					{
						this.smallAntX = this.leafX + (this.leafWidth * 0.9) - this.smallAntWidth;
						this.smallAntSwattingColliderBoxX = this.leafX + (this.leafWidth * 0.9) - this.smallAntWidth;
						this.mouthColliderBoxX = this.smallAntX + this.smallAntWidth/2;
						this.currentMovementTargetFromTouchInput.x = undefined;
					}
			}
			else if (this.smallAntX + this.smallAntWidth/2 > this.currentMovementTargetFromTouchInput.x) //ant should move to the left
			{
				this.smallAntX -= this.antVelocity;
				this.smallAntSwattingColliderBoxX -= this.antVelocity;
				this.mouthColliderBoxX -= this.antVelocity;

				if (Math.abs(this.smallAntX  + this.smallAntWidth/2 - this.currentMovementTargetFromTouchInput.x) < defenseGame.canvas.width*0.005)
				{
					this.currentMovementTargetFromTouchInput.x = undefined;
				}

				if (this.smallAntX < this.leafX)//prevent from going off leaf
				{
					this.smallAntX = this.leafX;
					this.smallAntSwattingColliderBoxX = this.leafX;
					this.mouthColliderBoxX = this.smallAntX + this.smallAntWidth/2;
					this.currentMovementTargetFromTouchInput.x = undefined;
					this.currentMovementTargetFromTouchInput.y = undefined;
				}
			}
		}

		if (this.currentMovementTargetFromTouchInput.y !== undefined)// up or down movement
		{
			if (this.smallAntY < this.currentMovementTargetFromTouchInput.y)//ant should move down
			{
				this.smallAntY += this.antVelocity;
				this.mouthColliderBoxY += this.antVelocity;

				if (Math.abs(this.smallAntY - this.currentMovementTargetFromTouchInput.y) < defenseGame.canvas.width*0.005)
				{
					this.currentMovementTargetFromTouchInput.y = undefined;
				}

				if (this.smallAntY + this.smallAntHeight > this.leafY + this.leafHeight)//prevent from going off leaf
				{
					this.smallAntY = this.leafY + this.leafHeight - this.smallAntHeight;
					this.mouthColliderBoxY = this.smallAntY*1.025;
					this.currentMovementTargetFromTouchInput.x = undefined;
					this.currentMovementTargetFromTouchInput.y = undefined;
				}
			}
			else if (this.smallAntY > this.currentMovementTargetFromTouchInput.y)//ant should move up
			{
				this.smallAntY -= this.antVelocity;
				this.mouthColliderBoxY -= this.antVelocity;

				if (Math.abs(this.smallAntY - this.currentMovementTargetFromTouchInput.y) < defenseGame.canvas.width*0.005)
				{
					this.currentMovementTargetFromTouchInput.y = undefined;
				}

				if (this.smallAntY < this.leafY)//prevent from going off leaf
				{
					this.smallAntY = this.leafY;
					this.mouthColliderBoxY = this.smallAntY*1.025;
					this.currentMovementTargetFromTouchInput.x = undefined;
					this.currentMovementTargetFromTouchInput.y = undefined;
				}
			}
		}		
	}
	
		
	

	this.mouthColliderBoxX = this.smallAntX + this.smallAntWidth*0.45;
	this.mouthColliderBoxY = this.smallAntY*1.025;
	this.mouthColliderBoxWidth = this.smallAntWidth*0.4;
	this.mouthColliderBoxHeight = this.smallAntHeight*0.2;

	this.detectFungusSporeCollisions = function()
	{
		if (defenseGame.inputManager.moveLeftIsBeingHeld || defenseGame.inputManager.moveRightIsBeingHeld || 
			defenseGame.inputManager.moveDownIsBeingHeld || defenseGame.inputManager.moveUpIsBeingHeld ||
			this.currentMovementTargetFromTouchInput.x !== undefined || this.currentMovementTargetFromTouchInput.y !== undefined)
		{
			for (let i = 0; i < this.arrayOfFungusSpores.length; i++)
			{
				if (this.arrayOfFungusSpores[i].x < this.mouthColliderBoxX + this.mouthColliderBoxWidth && //check for spores overlapping small ants mouth
				    this.arrayOfFungusSpores[i].x + this.arrayOfFungusSpores[i].width > this.mouthColliderBoxX  &&
				    this.arrayOfFungusSpores[i].y < this.mouthColliderBoxY + this.mouthColliderBoxHeight &&
				    this.arrayOfFungusSpores[i].y + this.arrayOfFungusSpores[i].height > this.mouthColliderBoxY)
				{
					this.arrayOfFungusSpores.splice(i,1);
				}
			}
		}
	}

	this.currentMovementTargetFromTouchInput = {x:undefined,y:undefined};
	this.handleTouchstart = function()
	{
		this.currentMovementTargetFromTouchInput = defenseGame.inputManager.touchCoordinates;
	}

	this.update = function()
	{
		this.moveSmallAnt();
		this.detectFungusSporeCollisions();
	}

	this.initialize = function()
	{
		// this.bigAntWalkingInterval.start();
		this.initializeLineSegments();
		this.initializeArrayOfFungusSpores();
	}

	this.headTarget = new Target('head target', renderer.canvas.width * 0.615,renderer.canvas.height * 0.665);
	
}

function Target(name, x,y)
{
	this.name = name;
	this.x = x;
	this.y = y;
	this.canBeTargeted = true;
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