const DEFENSEGAMEUI = 4;
var defenseGame = {};

defenseGame.initialize = function()
{
	this.arrayOfUIObjects = [];

	loadDefenseGameImages();

	defenseGame.background = new Background();
	defenseGame.background.initialize();

	// console.log('defense game init called');
	this.events = function()
	{
		// console.log('inside custom events');
	}

	this.update = function()
	{
		// console.log('inside custom update');
	}

	this.draw = function()
	{
		//console.log('inside draw function of defense game');
		defenseGame.background.draw();
	}
}
