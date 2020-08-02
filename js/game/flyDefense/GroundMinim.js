function GroundMinim(x)
{
	this.width = renderer.canvas.width*0.15;
	this.height = renderer.canvas.height*0.1;

	this.x = x;
	this.y = renderer.canvas.height*0.88;

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