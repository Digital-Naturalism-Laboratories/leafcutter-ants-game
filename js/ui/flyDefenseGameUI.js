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

	this.NPCBigAnt1 = new NPCBigAnt(-renderer.canvas.width*0.33)
	this.NPCBigAnt2 = new NPCBigAnt(renderer.canvas.width - renderer.canvas.width*0.33);

	this.flyManager = new FlyManager();

	this.testFly1 = new Fly('testFly1','planting');
    this.testFly1.assignRandomXYCoordinatesInARange();
    this.testFly2 = new Fly('testFly2',undefined);
    this.testFly2.assignRandomXYCoordinatesInARange();
    this.testFly3 = new Fly('testFly3',undefined);
    this.testFly3.assignRandomXYCoordinatesInARange();
    this.testFly4 = new Fly('testFly4',undefined);
    this.testFly4.assignRandomXYCoordinatesInARange();

    this.flyManager.arrayOfFlies.push(this.testFly1,this.testFly2,this.testFly3,this.testFly4);

    this.eggHasBeenPlanted = false;


	// console.log('defense game init called');
	this.events = function()
	{
		// console.log('inside custom events');
	}

	this.update = function()
	{
		defenseGame.background.update();
		this.flyManager.updateFlies();
	}

	this.draw = function()
	{
		//console.log('inside draw function of defense game');
		defenseGame.background.draw();
		defenseGame.parentAntObject.draw();

		this.NPCBigAnt1.draw();
		this.NPCBigAnt2.draw();

		this.flyManager.drawFlies();
	}
}
