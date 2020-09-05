var lastTouchPos;

class Queen {
    constructor(col, row) {

        this.gridCoord = {
            col: col,
            row: row
        }

        this.pixelCoord = pixelCoordAtCenterOfTileCoord(col, row);
        this.speedX = 2;
        this.speedY = 2;
        this.sprite = new Sprite(tr(vec2(this.pixelCoord.x, this.pixelCoord.y - 15), vec2(pixelSize * 0.3, pixelSize * 0.3)), new ImageObject("images/Animations/queen_idle_spritesheet.png", vec2(0, 0)));
        this.collisionRadius = 15;

        this.animationFrameLength = 2;
        this.animationFrameCount = 60;
        this.animationFrameCurrent = 0;
        this.animationTimer = 0;

        colonyGameUI.push(this);
    }

    event() {

        if (isTouched) {

            lastTouchPos = {
                x: touchPos[0].x - canvas.getBoundingClientRect().left,
                y: touchPos[0].y - canvas.getBoundingClientRect().top
            }

            if (getDistBtwVec2(this.sprite.transform.position, vec2(lastTouchPos.x, lastTouchPos.y)) < 20) {
                ui.stateIndex = FLIGHTGAMEINTROUI;
                if (!colonyGameSFX[SFX_TRIGGER].isPlaying) {
                    colonyGameSFX[SFX_TRIGGER].play();
                }
            }

        }

    }

    update() {

    }

    draw() {

        var inSize = {
            x: 250,
            y: 225
        }

        var inPos = {
            x: (this.animationFrameCurrent * inSize.x),
            y: 0
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