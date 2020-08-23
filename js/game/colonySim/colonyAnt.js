var colonyAntStates = {
    BROOD: "brood",
    WORKER: "worker",
    MALE_REPRODUCTIVE: "male_reproductive",
    FEMALE_REPRODUCTIVE: "female_reproductive",
    DEAD: "dead"
}

class ColonyAnt {
    constructor(col, row, cycleBorn) {

        this.gridCoord = {
            col: col,
            row: row
        }

        this.state = colonyAntStates.BROOD; // BROOD or WORKER or MALE REPRODUCTIVE or FEMALE REPRODUCTIVE or QUEEN
        this.isAlive = true;
        this.cycleBorn = cycleBorn;
        this.age = 0; // How many cycles this ant has been going since it was born
        this.pubertyAge = 20;
        this.deathAge = 40; // Past this age, this ant will automatically dies, Queens aren't affected by this
        this.energy = 100 // Goes down if there are no leaves until the ant dies
        this.isInfected = false;
        this.infectionTimer = 100 // Null for healthy ants, but for infected Starts a timer for this ant, once the time happens, this ant rolls against its infection death chance to see if it will die. This infection will also trigger the colony class to decide if a number of other ants get infected too.
        this.infectionDeathChance = 0.9; // Generally a pretty high number between 0-1.0 //1.0 means it will always die, 0.0 is never die// Most ants have a .9 let's say

        this.pixelCoord = pixelCoordAtCenterOfTileCoord(col, row);

        this.sprite = new Sprite(tr(vec2(this.pixelCoord.x, this.pixelCoord.y), vec2(pixelSize * 0.15, pixelSize * 0.15)), new ImageObject("images/Animations/Soldier_Topdown_Walk_UpDown_Spritesheet.png", vec2(0, 0)));

        this.speedX = (Math.random() - 0.5) * 3;
        this.speedY = (Math.random() - 0.5) * 3;

        colonyGameUI.push(this);
        colonyAnts.push(this);
    }

    event() {

    }

    update() {

        this.bounceOffWallTileAtPixelCoord(this.pixelCoord.x, this.pixelCoord.y);

        this.pixelCoord.x += this.speedX;
        this.pixelCoord.y += this.speedY;

        this.sprite.transform.position.x = this.pixelCoord.x;
        this.sprite.transform.position.y = this.pixelCoord.y;

        this.gridCoord.col = colAtXCoord(this.pixelCoord.x / pixelSize);
        this.gridCoord.row = rowAtYCoord(this.pixelCoord.y / pixelSize);

        this.age = totalCycles - this.cycleBorn;

        if (this.state != colonyAntStates.DEAD && this.state === colonyAntStates.BROOD){

            if (this.age >= this.pubertyAge && colony.colonyPubertyThresholdReached) {
                this.state = colonyAntStates.MALE_REPRODUCTIVE;
            } else if (this.age >= this.pubertyAge){
                this.state = colonyAntStates.WORKER;
            } 
            
        }

        if (this.age >= this.deathAge){
            this.killAnt();
        }

        this.updateEnergyLevel();
    }

    killAnt(){
        this.isAlive = false;
        this.state = colonyAntStates.DEAD;
    }

    infectOtherAnts(){

    }

    updateEnergyLevel(){
        if (colony.leaves <= 0){
            this.energy -= (1 / 30);
        }

        if (this.engery <= 0){
            this.killAnt();
        }
    }

    updateInfectionLevel(){
        if (this.isInfected){
            this.infectionTimer -= (1 / 30);
        }

        if (this.infectionTimer <= 0){
            this.killAnt();
            this.infectOtherAnts();
        }
    }

    draw() {

        if (isAtInfoScreen) return;

        var inSize = {
            x: 150,
            y: 150
        }

        var inPos = {
            //x: (this.animationFrameCurrent * inSize.x),
            x: 0,
            y: 0
        }

        if (this.state != colonyAntStates.DEAD){
            this.sprite.drawScIn(inPos, inSize);
        }
        
    }

    bounceOffWallTileAtPixelCoord(pixelX, pixelY) {

        if (this.gridCoord.col < 0 || this.gridCoord.col >= COLONY_COLS ||
            this.gridCoord.row < 0 || this.gridCoord.row >= COLONY_ROWS) {
            return false;
        }

        if (colonyGridTileMap[this.gridCoord.row][this.gridCoord.col] == COLONY_WALL ||
            colonyGridNodes[this.gridCoord.row][this.gridCoord.col].isTunneled === false) {

            var prevX = this.pixelCoord.x - this.speedX;
            var prevY = this.pixelCoord.y - this.speedY
            var prevTileCol = colAtXCoord(prevX / pixelSize);
            var prevTileRow = rowAtYCoord(prevY / pixelSize);

            var bothTestsFailed = true;

            if (prevTileCol != this.gridCoord.col) {
  
                if (colonyGridTileMap[this.gridCoord.row][prevTileCol] != COLONY_WALL) {
                    this.speedX *= -1;
                    bothTestsFailed = false;
                }
            }

            if (prevTileRow != this.gridCoord.col) {
 
                if (colonyGridTileMap[prevTileRow][this.gridCoord.col] != COLONY_WALL) {
                    this.speedY *= -1;
                    bothTestsFailed = false;
                }
            }

            if (bothTestsFailed) {
                this.speedX *= -1;
                this.speedY *= -1;
            }

        }
    }

}