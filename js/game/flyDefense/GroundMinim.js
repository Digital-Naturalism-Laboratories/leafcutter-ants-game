function GroundMinim(x, velocity)
{
	this.width = renderer.canvas.width*0.15;
	this.height = renderer.canvas.height*0.1;

	this.startingX = x;

	this.x = x;
	this.y = renderer.canvas.height*0.88;

	this.currentImage = bigAntNeutralImage;

	this.currentStatus = 'walking';

	this.velocity = velocity;

	this.draw = function()
	{
		renderer.drawImage(this.currentImage, this.x,this.y, this.width,this.height);
	}

	this.update = function()
	{
		if (this.currentStatus === 'walking' || this.currentStatus === 'repairing')
		{
			return;
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
		}

	}

}

function GroundMinimManager()
{
	this.arrayOfGroundMinims = [];

	this.drawGroundMinims = function()
	{
		for (let i = 0; i < this.arrayOfGroundMinims.length; i++)
		{
			this.arrayOfGroundMinims[i].draw();
		}
	}

	this.updateGroundMinims = function()
	{
		for (let i = 0; i < this.arrayOfGroundMinims.length; i++)
		{
			this.arrayOfGroundMinims[i].update();
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