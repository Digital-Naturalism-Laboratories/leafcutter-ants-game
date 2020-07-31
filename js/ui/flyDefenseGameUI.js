const DEFENSEGAMEUI = 4;
var defenseGame = {};

defenseGame.initialize = function()
{
	this.arrayOfUIObjects = [];

	loadDefenseGameImages();

	this.debugOn = false;

	this.timeLeft = 30;
	this.decreaseCounter = function() {if (defenseGame.timeLeft > 0) {defenseGame.timeLeft--;}};
    this.countdownInterval = new frameInterval(defenseGame.decreaseCounter,1000);

	defenseGame.background = new Background();
	defenseGame.background.initialize();

	this.parentAntObject = new ParentAntObject();
	this.parentAntObject.initialize();

	// console.log('defense game init called');
	this.events = function()
	{
		// console.log('inside custom events');
	}

	this.update = function()
	{
		defenseGame.background.update();
	}

	this.draw = function()
	{
		//console.log('inside draw function of defense game');
		defenseGame.background.draw();
		defenseGame.parentAntObject.draw();
	}
}
