var lastTouchPos;

class Queen {
    constructor(col, row) {

        this.gridCoord = {
            col: col,
            row: row
        }

        this.movementStates = {
            LANDING: "landing",
            REMOVINGWINGS: "removing wings",
            DIGGINGDOWN: "digging down",
            DIGGINGRIGHT: "digging right",
            IDLE: "idle"
        }
        this.movementState = this.movementStates.IDLE;
        this.currentFacing = FACING_RIGHT;

        //this.pixelCoord = pixelCoordAtCenterOfTileCoord(col, row);
        this.pixelCoord = vec2(gameWidth * 0.65, 5);
        this.speedX = 0.4;
        this.speedY = 0.4;

        //this.sprite = new Sprite(tr(vec2(this.pixelCoord.x, this.pixelCoord.y), vec2(pixelSize * 0.3, pixelSize * 0.3)), new ImageObject("images/Animations/queen_idle_spritesheet.png", vec2(0, 0)));
        this.sprite = new Sprite(tr(vec2(gameWidth * 0.65, 5), vec2(pixelSize * 0.3, pixelSize * 0.3)), new ImageObject("images/Animations/Queen_Fly_250px_Spritesheet.png", vec2(0, 0)));
        this.leftWingSprite = new Sprite(tr(vec2(gameWidth * 0.65, 5), vec2(pixelSize * 0.5, pixelSize * 0.5)), new ImageObject("images/wing_left.png", vec2(0, 0)));
        this.rightWingSprite = new Sprite(tr(vec2(gameWidth * 0.65, 5), vec2(pixelSize * 0.5, pixelSize * 0.5)), new ImageObject("images/wing_right.png", vec2(0, 0)));

        this.collisionRadius = 15;

        this.animationFrameLength = 2;
        this.animationFrameCount = 60;
        this.animationFrameCurrent = 0;
        this.animationTimer = 0;

        //this.inSize = {
        //    x: 250,
        //    y: 225
        //}

        //this.inPos = {
        //    x: (this.animationFrameCurrent * this.inSize.x),
        //    y: 0
        //}

        colonyGameUI.push(this);
    }

    event() {

        switch (this.movementState) {
            case this.movementStates.LANDING:
                break;
            case this.movementStates.REMOVINGWINGS:

                if (isTouched) {

                    lastTouchPos = {
                        x: touchPos[0].x - canvas.getBoundingClientRect().left,
                        y: touchPos[0].y - canvas.getBoundingClientRect().top
                    }

                    if (getDistBtwVec2(this.pixelCoord, vec2(lastTouchPos.x, lastTouchPos.y)) < 20) {

                        if (!colonyGameSFX[SFX_TRIGGER].isPlaying) {
                            colonyGameSFX[SFX_TRIGGER].play();
                        }

                        if (this.currentFacing == FACING_RIGHT) {
                            this.currentFacing = FACING_LEFT;
                        } else {
                            this.movementState = this.movementStates.DIGGINGDOWN;
                        }

                    }

                }
                break;
            case this.movementStates.DIGGINGDOWN:
                break;
            case this.movementStates.DIGGINGRIGHT:
                break;
            case this.movementStates.DIGGINGRIGHT:
                break;
            case this.movementStates.IDLE:
                if (isTouched) {

                    lastTouchPos = {
                        x: touchPos[0].x - canvas.getBoundingClientRect().left,
                        y: touchPos[0].y - canvas.getBoundingClientRect().top
                    }

                    if (getDistBtwVec2(this.pixelCoord, vec2(lastTouchPos.x, lastTouchPos.y)) < 20) {
                        ui.stateIndex = FLIGHTGAMEINTROUI;
                        if (!colonyGameSFX[SFX_TRIGGER].isPlaying) {
                            colonyGameSFX[SFX_TRIGGER].play();
                        }
                    }

                }
                break;
            default:
        }



    }

    update() {

        this.sprite.transform.position.x = this.pixelCoord.x;
        this.sprite.transform.position.y = this.pixelCoord.y - 15;

        //this.rightWingSprite.transform.position.y = this.pixelCoord.y - 15;

        switch (this.movementState) {
            case this.movementStates.LANDING:

                this.inSize = {
                    x: 250,
                    y: 242
                }

                this.pixelCoord.y += this.speedY;

                if (this.pixelCoord.y >= gameHeight * 0.07) {
                    this.leftWingSprite.transform.position = this.pixelCoord;
                    this.rightWingSprite.transform.position.y = this.pixelCoord.y - 15;
                    this.movementState = this.movementStates.REMOVINGWINGS;
                }

                break;
            case this.movementStates.REMOVINGWINGS:

                this.sprite = new Sprite(tr(vec2(this.pixelCoord.x, this.pixelCoord.y - 15), vec2(pixelSize * 0.3, pixelSize * 0.3)), new ImageObject("images/Animations/queen_idle_spritesheet.png", vec2(0, 0)));

                this.inSize = {
                    x: 250,
                    y: 225
                }
                break;
            case this.movementStates.DIGGINGDOWN:

                this.pixelCoord.y += this.speedY * pixelSize;

                if (rowAtYCoord(this.pixelCoord.y / pixelSize) >= fungus_row) {
                    this.movementState = this.movementStates.DIGGINGRIGHT;
                }
                
                break;
            case this.movementStates.DIGGINGRIGHT:

                this.currentFacing = FACING_RIGHT;

                this.pixelCoord.x += this.speedX * pixelSize;

                if (colAtXCoord(this.pixelCoord.x / pixelSize) >= fungus_col) {
                    this.movementState = this.movementStates.IDLE;
                    fungus = new Fungus(fungus_col, fungus_row);
                }

                break;
            case this.movementStates.IDLE:

                this.pixelCoord = pixelCoordAtCenterOfTileCoord(this.gridCoord.col, this.gridCoord.row);
                this.currentFacing = FACING_LEFT

                this.sprite = new Sprite(tr(vec2(this.pixelCoord.x, this.pixelCoord.y - 15), vec2(pixelSize * 0.3, pixelSize * 0.3)), new ImageObject("images/Animations/queen_idle_spritesheet.png", vec2(0, 0)));

                this.inSize = {
                    x: 250,
                    y: 225
                }

                break;
            default:
        }

    }

    resize() {

        this.pixelCoord = resizeVec2(this.pixelCoord);
        //this.sprite.transform.position = resizeVec2(this.sprite.transform.position);
        this.sprite.transform.scale = vec2(pixelSize * 0.3, pixelSize * 0.3);

    }

    draw() {

        this.animateSprite(this.sprite, this.animationFrameLength, this.animationFrameCount, this.inSize);

        switch (this.movementState) {
            case this.movementStates.LANDING:
                break;
            case this.movementStates.REMOVINGWINGS:
                this.rightWingSprite.drawSc();
                break;
            case this.movementStates.DIGGINGDOWN:
                break;
            case this.movementStates.DIGGINGRIGHT:
                break;
            case this.movementStates.DIGGINGRIGHT:
                break;
            case this.movementStates.IDLE:
                break;
            default:
        }

        //var inSize = {
        //    x: 250,
        //    y: 225
        //}

        //var inPos = {
        //    x: (this.animationFrameCurrent * this.inSize.x),
        //    y: (this.inSize.y * this.currentFacing)
        //}

        //this.sprite.drawScIn(inPos, this.inSize);
        //this.animateSprite(this.sprite, this.animationFrameLength, this.animationFrameCount, this.inSize);

        //if (this.animationTimer > this.animationFrameLength - 1) {
        //    this.animationFrameCurrent++
        //    this.animationTimer = 0;
        //}

        //if (this.animationFrameCurrent >= this.animationFrameCount) {
        //    this.animationFrameCurrent = 0;
        //}

        //this.animationTimer++;
    }

    animateSprite(sprite, frameLength, framerameCount, inSize) {

        var animationSprite = sprite;
        var animationFrameLength = frameLength;
        var animationFrameCount = framerameCount;
        var inSize = inSize;

        //var inSize = {
        //    x: 1000,
        //    y: 750
        //}

        var inPos = {
            x: (this.animationFrameCurrent * this.inSize.x),
            y: (this.inSize.y * this.currentFacing)
        }

        if (this.animationTimer > animationFrameLength - 1) {
            this.animationFrameCurrent++
            this.animationTimer = 0;
        }

        if (this.animationFrameCurrent >= animationFrameCount) {
            this.animationFrameCurrent = 0;
        }

        this.animationTimer++
        animationSprite.drawScIn(inPos, this.inSize);

    }

}