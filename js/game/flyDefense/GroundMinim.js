function GroundMinim()
{
	this.width = renderer.canvas.width*0.15;
	this.height = renderer.canvas.height*0.1;

	this.x = getRandomIntInclusive(0,renderer.canvas.width - this.width);
	this.y = renderer.canvas.height*0.875;

	this.currentImage = bigAntNeutralImage;

	this.draw = function()
	{
		renderer.drawImage(this.currentImage, this.x,this.y, this.width,this.height);
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
}