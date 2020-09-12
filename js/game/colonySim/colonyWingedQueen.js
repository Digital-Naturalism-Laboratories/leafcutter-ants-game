class ColonyWingedQueen {
    constructor(col, row) {

        this.gridCoord = {
            col: col,
            row: row
        }
        this.pixelCoord = pixelCoordAtCenterOfTileCoord(col, row);

        this.sprite = new Sprite(tr(this.pixelCoord, vec2(pixelSize * 0.2, pixelSize * 0.2)), new ImageObject("images/Animations/queen_idle_spritesheet.png", vec2(0, 0)));
        this.leftWingSprite = new Sprite(tr(this.pixelCoord, vec2(pixelSize * 0.3, pixelSize * 0.3)), new ImageObject("images/wing_left.png", vec2(0, 0)));
        this.rightWingSprite = new Sprite(tr(this.pixelCoord, vec2(pixelSize * 0.3, pixelSize * 0.3)), new ImageObject("images/wing_right.png", vec2(0, 0)));
        this.visibleWing = this.rightWingSprite;
        this.currentFacing = FACING_RIGHT;
        this.speed = (Math.random() - 0.5) * 0.5;

        this.inSize = {
            x: 250,
            y: 225
        }

        this.animationFrameLength = 4;
        this.animationFrameCount = 60;
        this.animationFrameCurrent = 0;
        this.animationTimer = 0;

        colonyWingedQueens.push(this);
    }

    event() {
        if (getDistBtwVec2(this.pixelCoord, vec2(lastTouchPos.x, lastTouchPos.y)) < 20 * pixelSize) {
            ui.stateIndex = FLIGHTGAMEINTROUI;
            if (!colonyGameSFX[SFX_TRIGGER].isPlaying) {
                colonyGameSFX[SFX_TRIGGER].play();
            }
        }
    }

    update() {

        var nextTileCol = colAtXCoord((this.pixelCoord.x + this.speed) / pixelSize);
        var nextTileRow = rowAtYCoord((this.pixelCoord.y + this.speed) / pixelSize);

        if (colonyGridTileMap[nextTileRow][nextTileCol] == COLONY_WALL ||
            colonyGridNodes[nextTileRow][nextTileCol].isTunneled === false) {

            this.speed *= -1;

        }

        this.currentFacing = this.speed >= 0 ? FACING_RIGHT : FACING_LEFT;
        this.visibleWing = this.currentFacing == FACING_RIGHT ? this.rightWingSprite : this.leftWingSprite;

        this.pixelCoord.x += this.speed;
    }

    resize() {

        this.pixelCoord = resizeVec2(this.pixelCoord);

    }

    draw() {

        this.animateSprite(this.sprite, this.animationFrameLength, this.animationFrameCount, this.inSize);
        this.visibleWing.drawSc();
        drawCircle(this.pixelCoord.x, this.pixelCoord.y + (5 * pixelSize), (circleIndicatorTimer / 60) * 20 * pixelSize, 4 * pixelSize, 'green');
        //renderer.fillText(this.gridCoord.col + "," + this.gridCoord.row, this.pixelCoord.x, this.pixelCoord.y)

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
        animationSprite.drawScIn(inPos, inSize);

    }
}