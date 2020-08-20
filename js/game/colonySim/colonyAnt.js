var colonlyAntStates = {
    BROOD: "brood",
    WORKER: "workerCount",
    MALE_REPRODUCTIVE: "male_reproductive",
    FEMALE_REPRODUCTIVE: "female_reproductive",
    QUEEN_ANT: "queen_ant"
}

class ColonyAnt {
    constructor(col, row) {

        this.gridCoord = {
            col: col,
            row: row
        }

        this.state; // BROOD or WORKER or MALE REPRODUCTIVE or FEMALE REPRODUCTIVE or QUEEN
        this.isAlive = true;
        this.age = 0; // How many cycles this ant has been going since it was born 
        this.deathAge = 100; // Past this age, this ant will automatically dies, Queens aren't affected by this
        this.energy = 100 // Goes down if there are no leaves until the ant dies
        this.infectionTimer = 100 // Null for healthy ants, but for infected Starts a timer for this ant, once the time happens, this ant rolls against its infection death chance to see if it will die. This infection will also trigger the colony class to decide if a number of other ants get infected too.
        this.infectionDeathChance = 0.9; // Generally a pretty high number between 0-1.0 //1.0 means it will always die, 0.0 is never die// Most ants have a .9 let's say

        this.pixelCoord = pixelCoordAtCenterOfTileCoord(col, row);

        this.sprite = new Sprite(tr(vec2(this.pixelCoord.x, this.pixelCoord.y), vec2(pixelSize * 0.25, pixelSize * 0.25)), new ImageObject("images/Animations/Soldier_Topdown_Walk_UpDown_Spritesheet.png", vec2(0, 0)));

        this.speedX = (Math.random() - 0.5) * 3;
        this.speedY = (Math.random() - 0.5) * 3;

        colonyGameUI.push(this);
    }

    event() {

    }

    update() {
        this.pixelCoord.x += this.speedX;
        this.pixelCoord.y += this.speedY;

        this.sprite.transform.position.x = this.pixelCoord.x;
        this.sprite.transform.position.y = this.pixelCoord.y;

        this.XNextFrame = this.pixelCoord.x + this.speedX;
        this.YNextFrame = this.pixelCoord.y + this.speedY;

        this.colNextFrame = colAtXCoord(this.XNextFrame / pixelSize);
        this.rowNextFrame = rowAtYCoord(this.YNextFrame / pixelSize);

        this.gridCoord.col = colAtXCoord(this.pixelCoord.x / pixelSize);
        this.gridCoord.row = rowAtYCoord(this.pixelCoord.y / pixelSize);

        if (colonyGridNodes[this.rowNextFrame][this.colNextFrame] === undefined) {
            this.speedX *= -1;
            this.speedY *= -1;
        } else if (!colonyGridNodes[this.rowNextFrame][this.colNextFrame].isWalkable) {

            this.speedX = (Math.random() - 0.5) * 3;
            this.speedY = (Math.random() - 0.5) * 3;

            //var prevSpeedX = this.speedX;
            //var prevSpeedY = this.speedY;

            //this.speedX = prevSpeedY;
            //this.speedY = prevSpeedX;
        }

    }

    draw() {

        var inSize = {
            x: 150,
            y: 150
        }

        var inPos = {
            //x: (this.animationFrameCurrent * inSize.x),
            x: 0,
            y: 0
        }

        this.sprite.drawScIn(inPos, inSize);
    }
}