var colonyAntStates = {
    BROOD: "brood",
    WORKER: "worker",
    MALE_REPRODUCTIVE: "male_reproductive",
    FEMALE_REPRODUCTIVE: "female_reproductive",
    DEAD: "dead"
}

const FACING_RIGHT = 0;
const FACING_LEFT = 1;
const FACING_UP = 2;
const FACING_DOWN = 3;

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

        this.prevPixelCoord = {
            x: (this.pixelCoord.x / pixelSize) * prevPixelSize,
            y: (this.pixelCoord.y / pixelSize) * prevPixelSize
        }

        this.lastValidPosition = this.pixelCoord;

        this.sprite = new Sprite(tr(vec2(this.pixelCoord.x, this.pixelCoord.y), vec2(pixelSize * 0.15, pixelSize * 0.15)), new ImageObject("images/Animations/Soldier_Topdown_Walk_Spritesheet.png", vec2(0, 0)));

        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.directionInRadians;
        this.currentFacing;

        this.animationFrameLength = 2;
        this.animationFrameCount = 11;
        this.animationFrameCurrent = 0;
        this.animationTimer = 0

        colonyGameUI.push(this);
        colonyAnts.push(this);
    }

    event() {

    }

    update() {

        if (queen.movementState != queen.movementStates.IDLE) return;

        this.prevPixelCoord = {
            x: (this.pixelCoord.x / pixelSize) * prevPixelSize,
            y: (this.pixelCoord.y / pixelSize) * prevPixelSize
        }

        this.bounceOffWallTileAtPixelCoord(this.pixelCoord.x, this.pixelCoord.y);

        this.pixelCoord.x += this.speedX * pixelSize;
        this.pixelCoord.y += this.speedY * pixelSize;

        this.sprite.transform.position.x = this.pixelCoord.x;
        this.sprite.transform.position.y = this.pixelCoord.y;

        this.gridCoord.col = colAtXCoord(this.pixelCoord.x / pixelSize);
        this.gridCoord.row = rowAtYCoord(this.pixelCoord.y / pixelSize);

        this.age = totalCycles - this.cycleBorn;

        if (this.state != colonyAntStates.DEAD && this.state === colonyAntStates.BROOD) {

            if (this.age >= this.pubertyAge && colony.colonyPubertyThresholdReached) {
                this.state = colonyAntStates.FEMALE_REPRODUCTIVE;
            } else if (this.age >= this.pubertyAge) {
                this.state = colonyAntStates.WORKER;
            }

        }

        if (this.age >= this.deathAge) {
            this.killAnt();
        }

        this.updateEnergyLevel();

        if (Math.abs(this.speedX) > Math.abs(this.speedY)) { //moving right or left
            if (this.speedX >= 0) {
                this.currentFacing = FACING_RIGHT;
            } else {
                this.currentFacing = FACING_LEFT;
            }
        } else { //moving up or down
            if (this.speedY >= 0) {
                this.currentFacing = FACING_DOWN;
            } else {
                this.currentFacing = FACING_UP;
            }
        }

    }

    killAnt() {
        this.isAlive = false;
        this.state = colonyAntStates.DEAD;
    }

    infectOtherAnts() {

    }

    updateEnergyLevel() {
        if (colony.leaves <= 0) {
            this.energy -= (1 / 30);
        }

        if (this.engery <= 0) {
            this.killAnt();
        }
    }

    updateInfectionLevel() {
        if (this.isInfected) {
            this.infectionTimer -= (1 / 30);
        }

        if (this.infectionTimer <= 0) {
            this.killAnt();
            this.infectOtherAnts();
        }
    }

    resize() {

        this.pixelCoord = resizeVec2(this.pixelCoord);
        this.sprite.transform.position = resizeVec2(this.sprite.transform.position);
        this.sprite.transform.scale = vec2(pixelSize * 0.15, pixelSize * 0.15);

    }

    draw() {

        if (queen.movementState != queen.movementStates.IDLE) return;

        //if (ui.getActiveState() != COLONYGAMEUI) return;

        var inSize = {
            x: 150,
            y: 150
        }

        var inPos = {
            x: (this.animationFrameCurrent * inSize.x),
            y: (inSize.y * this.currentFacing)
        }

        if (this.state != colonyAntStates.DEAD) {
            this.sprite.drawScIn(inPos, inSize);
        }

        if (this.animationTimer > this.animationFrameLength - 1) {
            this.animationFrameCurrent++
            this.animationTimer = 0;
        }

        if (this.animationFrameCurrent >= this.animationFrameCount) {
            this.animationFrameCurrent = 0;
        }

        this.animationTimer++;

    }

    bounceOffWallTileAtPixelCoord(pixelX, pixelY) {

        if (this.gridCoord.col < 0 || this.gridCoord.col >= COLONY_COLS ||
            this.gridCoord.row < 0 || this.gridCoord.row >= COLONY_ROWS) {
            return false;
        }

        if (colonyGridTileMap[this.gridCoord.row][this.gridCoord.col] == COLONY_WALL ||
            colonyGridNodes[this.gridCoord.row][this.gridCoord.col].isTunneled === false) {

            var prevX = this.prevPixelCoord.x - this.speedX;
            var prevY = this.prevPixelCoord.y - this.speedY;
            var prevTileCol = colAtXCoord(prevX / prevPixelSize);
            var prevTileRow = rowAtYCoord(prevY / prevPixelSize);

            var bothTestsFailed = true;

            if (prevTileCol != this.gridCoord.col) {

                if (colonyGridTileMap[this.gridCoord.row][prevTileCol] != COLONY_WALL) {
                    this.speedX *= -1;
                    bothTestsFailed = false;
                }
            }

            if (prevTileRow != this.gridCoord.row) {

                if (colonyGridTileMap[prevTileRow][this.gridCoord.col] != COLONY_WALL) {
                    this.speedY *= -1;
                    bothTestsFailed = false;
                }
            }

            if (bothTestsFailed) {
                this.speedX *= -1;
                this.speedY *= -1;
            }

            if (colonyGridTileMap[prevTileRow][prevTileCol] == COLONY_WALL ||
                colonyGridNodes[prevTileRow][prevTileCol].isTunneled === false) {

                //this.pixelCoord = this.lastValidPosition;
                this.pixelCoord = pixelCoordAtCenterOfTileCoord(fungus_col, fungus_row);
                //console.log("stuck");

            }

        } else {
            this.lastValidPosition = this.pixelCoord;
        }
    }

}