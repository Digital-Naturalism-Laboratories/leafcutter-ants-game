function GroundMinim()
{
	this.width = renderer.canvas.width*0.15;
	this.height = renderer.canvas.height*0.1;

	this.startingX = getRandomIntInclusive(0 - this.width*1.8, renderer.canvas.width + this.width*1.8);

	this.x = this.startingX;
	this.y = renderer.canvas.height*0.88;

	this.meanderBoundaryLeft = undefined;
	this.meanderBoundaryRight = undefined;

	this.currentStatus = undefined;

	this.defineMeanderBoundaries = function()
	{
		if (this.x <= renderer.canvas.width/2)
		{
			this.meanderBoundaryLeft = 0 - this.width*2;
			this.meanderBoundaryRight = renderer.canvas.width/2;
		}
		else if (this.x > renderer.canvas.width/2)
		{
			this.meanderBoundaryLeft = renderer.canvas.width/2;
			this.meanderBoundaryRight = renderer.canvas.width + this.width*2;
		}
	}

	this.coinFlipAMeanderDirection = function()
	{
		let randomNumber = Math.random();
		if (randomNumber <= 0.5)
		{
			this.currentStatus = 'meanderingLeft';
		}
		else
		{
			this.currentStatus = 'meanderingRight';
		}
	}

	this.initialize = function()
	{
		this.defineMeanderBoundaries();
		this.coinFlipAMeanderDirection();
	}

	this.currentImage = bigAntNeutralImage;

	this.velocity = getRandomIntInclusive(1,3);

	this.draw = function()
	{
		renderer.drawImage(this.currentImage, this.x,this.y, this.width,this.height);
	}

	this.update = function(i)
	{
		
		if (this.currentStatus === 'repairing')
		{
			console.log('inside repairing check of ground minim update');
			return;
		}
		else if (this.currentStatus === 'meanderingLeft')
		{
			
			if (this.x > this.meanderBoundaryLeft)
			{
				this.x -= this.velocity;
			}
			if (this.x - this.meanderBoundaryLeft <= renderer.canvas.width*0.005)
			{
				this.currentStatus = 'meanderingRight';
				
				console.log('ground minim at index ' + i + ' switched to meanderingRight');
			}	
		}
		else if (this.currentStatus === 'meanderingRight')
		{
			
			if (this.x + this.width < this.meanderBoundaryRight)
			{
				console.log('ground minim at index ' + i + ' is meandering right and its right side is less than the right boundary');
				this.x += this.velocity;
			}
			if (this.meanderBoundaryRight - (this.x + this.width) <= renderer.canvas.width*0.005)
			{
				this.currentStatus = 'meanderingLeft';
				
				console.log('ground minim at index ' + i + ' switched to meanderingLeft');
			}
		}
		else if (this.currentStatus === 'en route to repair')
		{
			
			if (this.x + this.width < defenseGame.background.currentPheremoneGap.x)
			{
				this.x += this.velocity;
			}
			if (this.x + this.width >= defenseGame.background.currentPheremoneGap.x)
			{
				this.currentStatus = 'repairing';
			}
		}
		else if (this.currentStatus === 'returning')
		{

			if (this.x > this.startingX)
			{
				this.x -= this.velocity;
			}
			else if (this.x < this.startingX)
			{
				this.x += this.velocity;
			}
		}

	}

}

function GroundMinimManager()
{
	this.arrayOfGroundMinims = [];

	this.initializeGroundMinims = function(numberOfGroundMinimsToCreate)
	{
		for (let i = 0; i < numberOfGroundMinimsToCreate; i++)
		{
			let groundMinim = new GroundMinim();
			this.arrayOfGroundMinims.push(groundMinim);
		}

		for (let i = 0; i < this.arrayOfGroundMinims.length; i++)
		{
			this.arrayOfGroundMinims[i].initialize();
		}
	}

	this.drawGroundMinims = function()
	{
		for (let i = 0; i < this.arrayOfGroundMinims.length; i++)
		{
			this.arrayOfGroundMinims[i].draw();

			if (defenseGame.debugOn)
			{
				renderer.font = '30px Helvetica';
				renderer.fillStyle = 'red';
				renderer.fillText(i, this.arrayOfGroundMinims[i].x,this.arrayOfGroundMinims[i].y);
			}
		}
	}

	this.updateGroundMinims = function()
	{
		for (let i = 0; i < this.arrayOfGroundMinims.length; i++)
		{
			this.arrayOfGroundMinims[i].update(i);
		}
	}

	this.toggleEnRouteStatusAfterUserClick = function()
	{
		for (let i = 0; i < this.arrayOfGroundMinims.length; i++)
		{
			this.arrayOfGroundMinims[i].currentStatus = 'en route to repair';
		}
	}

	this.checkIfAllGroundMinimsHaveReachedPheremoneGap = function()
	{
		let minimRepairingTally = 0;

		for (let i = 0; i < this.arrayOfGroundMinims.length; i++)
		{
			if (this.arrayOfGroundMinims[i].currentStatus === 'walking')
			{
				return;
			}
			else if (this.arrayOfGroundMinims[i].currentStatus === 'repairing')
			{
				minimRepairingTally++;
			}
		}

		if (minimRepairingTally === 3)
		{
			defenseGame.background.stuckOnPheremoneGap = false;
			defenseGame.background.currentPheremoneGap.isFilledIn = true;
			defenseGame.background.currentPheremoneGapArrayIndex++;
			defenseGame.background.currentPheremoneGap = defenseGame.background.pheremoneGapManager.arrayOfPheremoneGaps[defenseGame.background.currentPheremoneGapArrayIndex];
			for (let i = 0; i < this.arrayOfGroundMinims.length; i++)
			{
				this.arrayOfGroundMinims[i].currentStatus = 'returning';
			}
			defenseGame.flyManager.currentStatus = 'normal';
			defenseGame.flyManager.arrayOfFlies[0].status = 'planting';
			defenseGame.flyManager.arrayOfFlies[1].status = 'swatted';
			defenseGame.flyManager.arrayOfFlies[2].status = 'swatted';
			defenseGame.flyManager.arrayOfFlies[3].status = 'swatted';
		}
	}
}