const MODES = {
    CARRYING_LEAF: 'carrying_leaf',
    NO_LEAF: 'no_leaf'
}

class ColonyWorkerAnt {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.col = colAtXCoord(this.x);
        this.row = rowAtYCoord(this.y);

        this.horizontalSpeed = -1;
        this.verticalSpeed = 2;
        this.sprite = new Sprite(tr(vec2(this.x * pixelSize, this.y * pixelSize), vec2(pixelSize * 0.4, pixelSize * 0.4)), new ImageObject("images/Animations/Worker_Walking_Spritesheet.png", vec2(0, 0)));
        this.collisionRadius = 15;

        this.pathToDestination = [];

        this.animationFrameLength = 4;
        this.animationFrameCount = 11;
        this.animationFrameCurrent = 0;
        this.animationTimer = 0

        this.mode = MODES.NO_LEAF;
        this.gameMode = DEFENSEGAMEUI;

        colonyGameUI.push(this);
    }

    event() {

        if (isTouched) {

            var lastTouchPos = {
                x: touchPos[0].x - canvas.getBoundingClientRect().left,
                y: touchPos[0].y - canvas.getBoundingClientRect().top
            }

            if (getDistBtwVec2(this.sprite.transform.position, vec2(lastTouchPos.x, lastTouchPos.y)) < 20) {
                ui.stateIndex = this.gameMode;
            }

        }

    }

    update() {
        if (this.sprite.transform.position.x > gameWidth || this.sprite.transform.position.x < 10) {
            this.sprite.transform.position.x = gameWidth - 10;
        }

        this.sprite.transform.position.x += this.horizontalSpeed;

        this.x = this.sprite.transform.position.x;
        this.y = this.sprite.transform.position.y;

        this.col = colAtXCoord(this.x / pixelSize);
        this.row = rowAtYCoord((this.y - gridStartHeightFromTop) / pixelSize);

        if (this.x > gameWidth * 0.66) {
            this.mode = MODES.CARRYING_LEAF;
        } else {
            this.mode = MODES.NO_LEAF;
        }

        //this.pathToDestination = findPath(this.col, this.row, fungus_col, fungus_row);

    }

    draw() {

        var inSize = {
            x: 120,
            y: 108
        }

        var inPos = {
            x: (this.animationFrameCurrent * inSize.x),
            y: 0
        }

        switch (this.mode) {
            case MODES.NO_LEAF:
                this.gameMode = LEAFCUTTINGUI
                inPos.y = inSize.y * 2;
                break;
            case MODES.CARRYING_LEAF:
                this.gameMode = DEFENSEGAMEUI
                break;
        }

        if (this.x > gameWidth * 0.66){
            inPos.y = inSize.y;
            this.mode = MODES.CARRYING_LEAF; //for testing only
        } else {
            this.mode = MODES.NO_LEAF; //For testing only
        }

        this.sprite.drawScIn(inPos, inSize);

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