var lastTouchPos;

class Queen {
    constructor(col, row) {

        this.gridCoord = {
            col: col,
            row: row
        }

        this.movementStates = {
            LANDING: "landing",
            LANDED: "landed",
            REMOVINGRIGHTWING: "removing right wing",
            REMOVINGLEFTWING: "removing left wing",
            DIGGINGDOWN: "digging down",
            DIGGINGRIGHT: "digging right",
            IDLE: "idle"
        }
        this.movementState = this.movementStates.IDLE;
        this.currentFacing = FACING_RIGHT;
        this.clickCooldownTime = 60;
        this.clickCooldownTimer = this.clickCooldownTime;

        this.pixelCoord = vec2(gameWidth * 0.65, 5);
        this.speedX = 0.4;
        this.speedY = 0.4;

        this.sprite = new Sprite(tr(vec2(gameWidth * 0.65, 5), vec2(pixelSize * 0.3, pixelSize * 0.3)), new ImageObject("images/Animations/Queen_Fly_250px_Spritesheet.png", vec2(0, 0)));
        this.leftWingSprite = new Sprite(tr(vec2(gameWidth * 0.65, 5), vec2(pixelSize * 0.5, pixelSize * 0.5)), new ImageObject("images/wing_left.png", vec2(0, 0)));
        this.rightWingSprite = new Sprite(tr(vec2(gameWidth * 0.65, 5), vec2(pixelSize * 0.5, pixelSize * 0.5)), new ImageObject("images/wing_right.png", vec2(0, 0)));

        this.collisionRadius = 15;

        this.animationFrameLength = 4;
        this.animationFrameCount = 60;
        this.animationFrameCurrent = 0;
        this.animationTimer = 0;

        colonyGameUI.push(this);
    }

    event() {

        if (isTouched && this.clickCooldownTimer <= 0) {

            this.clickCooldownTimer = this.clickCooldownTime;

            lastTouchPos = {
                x: touchPos[0].x - canvas.getBoundingClientRect().left,
                y: touchPos[0].y - canvas.getBoundingClientRect().top
            }

            switch (this.movementState) {
                case this.movementStates.LANDING:
                    break;
                case this.movementStates.LANDED:
                    this.currentFacing = FACING_RIGHT;

                    if (getDistBtwVec2(this.pixelCoord, vec2(lastTouchPos.x, lastTouchPos.y)) < 20) {

                        if (!colonyGameSFX[SFX_TRIGGER].isPlaying) {
                            colonyGameSFX[SFX_TRIGGER].play();
                        }

                        this.movementState = this.movementStates.REMOVINGRIGHTWING;

                    }
                    break;
                case this.movementStates.REMOVINGRIGHTWING:

                    if (getDistBtwVec2(this.pixelCoord, vec2(lastTouchPos.x, lastTouchPos.y)) < 20) {

                        if (!colonyGameSFX[SFX_TRIGGER].isPlaying) {
                            colonyGameSFX[SFX_TRIGGER].play();
                        }

                        this.movementState = this.movementStates.REMOVINGLEFTWING;

                    }
                    break;

                case this.movementStates.REMOVINGLEFTWING:

                    this.currentFacing = FACING_LEFT;

                    if (getDistBtwVec2(this.pixelCoord, vec2(lastTouchPos.x, lastTouchPos.y)) < 20) {

                        if (!colonyGameSFX[SFX_TRIGGER].isPlaying) {
                            colonyGameSFX[SFX_TRIGGER].play();
                        }

                        this.movementState = this.movementStates.DIGGINGDOWN;

                    }

                    break;
                case this.movementStates.DIGGINGDOWN:
                    break;
                case this.movementStates.DIGGINGRIGHT:
                    break;
                case this.movementStates.DIGGINGRIGHT:
                    break;
                case this.movementStates.IDLE:

                    if (getDistBtwVec2(this.pixelCoord, vec2(lastTouchPos.x, lastTouchPos.y)) < 20) {
                        ui.stateIndex = FLIGHTGAMEINTROUI;
                        if (!colonyGameSFX[SFX_TRIGGER].isPlaying) {
                            colonyGameSFX[SFX_TRIGGER].play();
                        }
                    }

                    break;
                default:
            }
        }

    }

    update() {

        this.clickCooldownTimer--;

        this.sprite.transform.position.x = this.pixelCoord.x;
        this.sprite.transform.position.y = this.pixelCoord.y - 15;

        colonyGridNodes[this.gridCoord.row][this.gridCoord.col].isTunneledByQueen = true;

        switch (this.movementState) {
            case this.movementStates.LANDING:

                queen.currentFacing = FACING_RIGHT;

                this.inSize = {
                    x: 250,
                    y: 242
                }

                this.pixelCoord.y += this.speedY;

                if (this.pixelCoord.y >= gameHeight * 0.07) {
                    this.leftWingSprite.transform.position.y = this.pixelCoord.y - 15;
                    this.rightWingSprite.transform.position.y = this.pixelCoord.y - 15;
                    this.movementState = this.movementStates.LANDED;
                }

                break;
            case this.movementStates.LANDED:

                this.sprite = new Sprite(tr(vec2(this.pixelCoord.x, this.pixelCoord.y - 15), vec2(pixelSize * 0.3, pixelSize * 0.3)), new ImageObject("images/Animations/queen_idle_spritesheet.png", vec2(0, 0)));

                this.inSize = {
                    x: 250,
                    y: 225
                }

                break;
            case this.movementStates.REMOVINGRIGHTWING:
                this.currentFacing = FACING_LEFT;

                this.sprite = new Sprite(tr(vec2(this.pixelCoord.x, this.pixelCoord.y - 15), vec2(pixelSize * 0.3, pixelSize * 0.3)), new ImageObject("images/Animations/queen_idle_spritesheet.png", vec2(0, 0)));

                if (this.rightWingSprite.transform.position.y > this.sprite.transform.position.y - 50) {
                    this.rightWingSprite.transform.position.x -= 4;
                    this.rightWingSprite.transform.position.y -= 2;
                }

                this.inSize = {
                    x: 250,
                    y: 225
                }
                break;
            case this.movementStates.REMOVINGLEFTWING:

                if (this.leftWingSprite.transform.position.y > this.sprite.transform.position.y - 50) {
                    this.leftWingSprite.transform.position.x += 4;
                    this.leftWingSprite.transform.position.y -= 2;
                } else {
                    this.movementState = this.movementStates.DIGGINGDOWN;
                }

                break;
            case this.movementStates.DIGGINGDOWN:

                this.gridCoord = {
                    col: colAtXCoord(this.pixelCoord.x / pixelSize),
                    row: rowAtYCoord(this.pixelCoord.y / pixelSize)
                }

                this.sprite = new Sprite(tr(vec2(this.pixelCoord.x + 15, this.pixelCoord.y - 15), vec2(pixelSize * 0.3, pixelSize * 0.3)), new ImageObject("images/Animations/queen_idle_updown_spritesheet.png", vec2(0, 0)));
                this.currentFacing = 1; //1 for down on this spritesheet

                this.inSize = {
                    x: 225,
                    y: 250
                }

                this.pixelCoord.y += this.speedY * pixelSize;

                if (rowAtYCoord(this.pixelCoord.y / pixelSize) >= fungus_row) {
                    this.movementState = this.movementStates.DIGGINGRIGHT;
                }

                break;
            case this.movementStates.DIGGINGRIGHT:

                this.gridCoord = {
                    col: colAtXCoord(this.pixelCoord.x / pixelSize),
                    row: rowAtYCoord(this.pixelCoord.y / pixelSize)
                }

                this.sprite = new Sprite(tr(vec2(this.pixelCoord.x, this.pixelCoord.y), vec2(pixelSize * 0.3, pixelSize * 0.3)), new ImageObject("images/Animations/queen_idle_spritesheet.png", vec2(0, 0)));
                this.currentFacing = FACING_RIGHT;

                this.inSize = {
                    x: 250,
                    y: 225
                }

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
        this.sprite.transform.scale = vec2(pixelSize * 0.3, pixelSize * 0.3);

    }

    draw() {

        this.animateSprite(this.sprite, this.animationFrameLength, this.animationFrameCount, this.inSize);

        renderer.fillStyle = 'white';
        renderer.textAlign = 'center';
        renderer.font = (20 * pixelSize) + "px SmallBoldPixel";

        switch (this.movementState) {
            case this.movementStates.LANDING:
                break;
            case this.movementStates.LANDED:
                this.rightWingSprite.drawSc();
                renderer.fillText(string_REMOVE_WINGS[currentLanguage], this.pixelCoord.x, this.pixelCoord.y + 50)
                drawCircle(this.pixelCoord.x, this.pixelCoord.y, (circleIndicatorTimer/60) * 40, 4, 'green');
                break;
            case this.movementStates.REMOVINGRIGHTWING:
                this.rightWingSprite.drawSc();
                this.leftWingSprite.drawSc();
                renderer.fillText(string_REMOVE_WINGS[currentLanguage], this.pixelCoord.x, this.pixelCoord.y + 50)
                drawCircle(this.pixelCoord.x, this.pixelCoord.y, (circleIndicatorTimer/60) * 40, 4, 'green');
                break;
            case this.movementStates.REMOVINGLEFTWING:
                this.rightWingSprite.drawSc();
                this.leftWingSprite.drawSc();
                break;
            case this.movementStates.DIGGINGDOWN:
                this.rightWingSprite.drawSc();
                this.leftWingSprite.drawSc();
                break;
            case this.movementStates.DIGGINGRIGHT:
                break;
            case this.movementStates.IDLE:
                break;
            default:
        }

    }

    animateSprite(sprite, frameLength, framerameCount, inSize) {

        var animationSprite = sprite;
        var animationFrameLength = frameLength;
        var animationFrameCount = framerameCount;
        var inSize = inSize;

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