const MODES = {
    CARRYING_LEAF: 'carrying_leaf',
    NO_LEAF: 'no_leaf'
}

class ColonyWorkerAnt {
    constructor(col, row) {

        this.gridCoord = {
            col: col,
            row: row
        }

        this.movementStates = {
            WALKINGRIGHT: "walking right",
            WALKINGLEFT: "walking left",
            WALKINGDOWN: "walking down",
            WALKINGRIGHTTOFUNGUS: "walking right to fungus",
        }

        this.pixelCoord = pixelCoordAtCenterOfTileCoord(col, row);

        this.movementState = this.pixelCoord.x > gameWidth * 0.65 ? this.movementStates.WALKINGLEFT : this.movementStates.WALKINGRIGHT;
        this.horizontalSpeed = this.movementState == this.movementStates.WALKINGLEFT ? -0.5 : 0.5;
        this.verticalSpeed = 0.5;
        this.sprite = new Sprite(tr(vec2(this.pixelCoord.x, this.pixelCoord.y - 10), vec2(pixelSize * 0.4, pixelSize * 0.4)), new ImageObject("images/Animations/Worker_Walking_Spritesheet.png", vec2(0, 0)));
        this.collisionRadius = 15;

        this.animationFrameLength = 4;
        this.animationFrameCount = 11;
        this.animationFrameCurrent = 0;
        this.animationTimer = 0

        this.mode = MODES.CARRYING_LEAF;
        this.gameMode = LEAFCUTTINGINTROUI;
        this.currentFacing = FACING_RIGHT;

        colonyGameUI.push(this);
    }

    event() {
        if (queen.movementState != queen.movementStates.IDLE) return;

        if (isTouched) {
            var lastTouchPos = {
                x: touchPos[0].x - canvas.getBoundingClientRect().left,
                y: touchPos[0].y - canvas.getBoundingClientRect().top
            }

            if (getDistBtwVec2(this.sprite.transform.position, vec2(lastTouchPos.x, lastTouchPos.y)) < 20) {
                if (this.gameMode != COLONYGAMEUI) {
                    bgmColony.pause();
                    bgmColony.currentTime = 0;
                }
                ui.stateIndex = this.gameMode;

                if (!colonyGameSFX[SFX_TRIGGER].isPlaying) {
                    colonyGameSFX[SFX_TRIGGER].play();
                }
            }
        }
    }

    update() {

        if (queen.movementState != queen.movementStates.IDLE) return;

        if (this.sprite.transform.position.x > gameWidth || this.sprite.transform.position.x < 10) {
            this.sprite.transform.position.x = gameWidth - 10;
        }

        this.pixelCoord.x = this.sprite.transform.position.x;
        this.pixelCoord.y = this.sprite.transform.position.y;

        switch (this.movementState) {
            case this.movementStates.WALKINGRIGHT:
                if (this.pixelCoord.x > gameWidth * 0.65) {
                    this.movementState = this.movementStates.WALKINGDOWN;
                    console.log("going down");
                } else {
                    this.sprite.transform.position.x += this.horizontalSpeed * pixelSize;
                }
                break;
            case this.movementStates.WALKINGLEFT:
                if (this.pixelCoord.x < gameWidth * 0.65) {
                    this.movementState = this.movementStates.WALKINGDOWN;
                    console.log("going down");
                } else {
                    this.sprite.transform.position.x += this.horizontalSpeed * pixelSize;
                }
                break;
            case this.movementStates.WALKINGDOWN:
                this.currentFacing = FACING_RIGHT;
                if (rowAtYCoord(this.pixelCoord.y / pixelSize) >= fungus_row) {
                    this.movementState = this.movementStates.WALKINGRIGHTTOFUNGUS;
                    this.horizontalSpeed = 0.5;
                } else {
                    this.sprite.transform.position.y += this.verticalSpeed * pixelSize;
                }
                break;
            case this.movementStates.WALKINGRIGHTTOFUNGUS:
                this.currentFacing = FACING_RIGHT;
                if (colAtXCoord(this.pixelCoord.x / pixelSize) >= fungus_col) {
                    var respawnCol = Math.random() < 0.5 ? 0 : COLONY_COLS;
                    this.sprite.transform.position = this.pixelCoord = pixelCoordAtCenterOfTileCoord(respawnCol, this.gridCoord.row);
                    this.movementState = this.pixelCoord.x > gameWidth * 0.65 ? this.movementStates.WALKINGLEFT : this.movementStates.WALKINGRIGHT;
                    this.horizontalSpeed = this.movementState == this.movementStates.WALKINGLEFT ? -0.5 : 0.5;
                } else {
                    this.sprite.transform.position.x += this.horizontalSpeed * pixelSize;
                }

                break;
            default:
        }

        this.currentFacing = this.speed >= 0 ? FACING_RIGHT : FACING_LEFT;

    }

    resize() {

        this.pixelCoord = resizeVec2(this.pixelCoord);
        this.sprite.transform.position = resizeVec2(this.sprite.transform.position);
        this.sprite.transform.scale = vec2(pixelSize * 0.4, pixelSize * 0.4);

    }

    draw() {

        if (queen.movementState != queen.movementStates.IDLE) return;

        var inSize = {
            x: 120,
            y: 108
        }

        var inPos = {
            x: (this.animationFrameCurrent * inSize.x),
            //y: (this.inSize.y * this.currentFacing)
            y: 0
        }

        switch (this.mode) {
            case MODES.NO_LEAF:
                this.gameMode = LEAFCUTTINGINTROUI;
                inPos.y = inSize.y * 2;
                break;
            case MODES.CARRYING_LEAF:
                this.gameMode = LEAFCUTTINGINTROUI;
                inPos.y = inSize.y * 0;
                break;
        }

        this.sprite.drawScIn(inPos, inSize);
        drawCustomCircle(this.pixelCoord.x + (10 * pixelSize), this.pixelCoord.y + (10 * pixelSize), (circleIndicatorTimer / 60) * 20 * pixelSize, 4 * pixelSize, '#00FF00');

        if (this.animationTimer > this.animationFrameLength - 1) {
            this.animationFrameCurrent++
            this.animationTimer = 0;
        }

        if (this.animationFrameCurrent >= this.animationFrameCount) {
            this.animationFrameCurrent = 0;
        }

        this.animationTimer++;

    }

}