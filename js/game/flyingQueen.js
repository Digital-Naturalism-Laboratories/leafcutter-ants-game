class FlyingQueen {
    constructor(x, y, isPlayerControlled) {

        this.isPlayerControlled = isPlayerControlled;

        this.defaultPos = {
            x: gameWidth / 2,
            y: gameHeight / 2
        }

        if (this.isPlayerControlled) {
            this.x = this.defaultPos.x;
            this.y = this.defaultPos.y;
        } else {
            this.x = x;
            this.y = y;
        }

        this.horizontalSpeed = 2;
        this.verticalSpeed = 3;
        this.sprite = new Sprite(tr(vec2(this.x * pixelSize, this.y * pixelSize), vec2(pixelSize / 3, pixelSize / 3)), new ImageObject("images/Animations/Queen_Fly_250px_Spritesheet.png", vec2(128, 128)));
        this.matingSprite = new Sprite(tr(vec2(this.x * pixelSize, this.y * pixelSize), vec2(pixelSize / 3, pixelSize / 3)), new ImageObject("images/Animations/Queen_Mating_Spritesheet.png", vec2(625, 242)));
        this.flyingMomentum = 0;
        this.fallingMomentum = 0;
        this.collisionRadius = 15;
        this.isMating = false;
        this.lastMate;
        this.isKnockedBack = false;
        this.knockbackTimer = 15;
        this.knockbackTimerCurrent = 0;

        this.movementStates = {
            FLYING: "flying",
            FALLING: "falling",
        }
        this.movementState = this.movementStates.FALLING;

        flightGameUI.push(this);

        this.matingAnimationFrameLength = 12;
        this.flyingAnimationFrameLength = 4;
        this.animationFrameLength = this.flyingAnimationFrameLength;
        this.flyingAnimationFrameCount = 60;
        this.matingAnimationFrameCount = 8;
        this.animationFrameCount = this.flyingAnimationFrameCount;
        this.animationFrameCurrent = 0;
        this.animationTimer = 0
    }

    event() {
        if (!this.isPlayerControlled) return;
        if (this.isMating) return;

        if (isTouched) {

            lastTouchPos = {
                x: touchPos[0].x - canvas.getBoundingClientRect().left,
                y: touchPos[0].y - canvas.getBoundingClientRect().top
            }

            this.animationFrameLength = 2;

            this.movementState = this.movementStates.FLYING;

        } else {

            this.movementState = this.movementStates.FALLING;
            this.animationFrameLength = this.flyingAnimationFrameLength;
        }

    }

    update() {

        if (this.isPlayerControlled) {

            //if (this.isMating) return;

            if (this.isKnockedBack) {

                this.knockbackTimerCurrent++;
                this.x += this.horizontalSpeed * pixelSize * -6;
                this.y += this.verticalSpeed * pixelSize * -4;
                if (this.knockbackTimerCurrent >= this.knockbackTimer) {
                    this.isKnockedBack = false;
                    this.knockbackTimerCurrent = 0;
                }

            } else if (isTouched) {
                if (this.x < lastTouchPos.x) {
                    this.x += this.horizontalSpeed * pixelSize;
                }

                if (this.x > lastTouchPos.x) {
                    this.x -= this.horizontalSpeed * pixelSize;
                }

                if (this.y < lastTouchPos.y) {
                    this.y += this.verticalSpeed * pixelSize;
                }

                if (this.y > lastTouchPos.y) {
                    this.y -= this.verticalSpeed * pixelSize;
                }

                if (!flyingGameSFX[SFX_WINGS].isPlaying) {
                    flyingGameSFX[SFX_WINGS].play();
                }

            } else {

                if (this.x < this.defaultPos.x) {
                    this.x += this.horizontalSpeed * pixelSize;
                }

                if (this.x > this.defaultPos.x) {
                    this.x -= this.horizontalSpeed * pixelSize;
                }

                if (this.y < this.defaultPos.y) {
                    this.y += this.verticalSpeed * pixelSize;
                }

                if (this.y > this.defaultPos.y) {
                    this.y -= this.verticalSpeed * pixelSize;
                }

                flyingGameSFX[SFX_WINGS].pause();
            }

            this.sprite.transform.position.x = this.x;
            this.sprite.transform.position.y = this.y;
            this.matingSprite.transform.position.x = this.x;
            this.matingSprite.transform.position.y = this.y;

            this.collideWithRivalQueen();

        } else {

            switch (this.movementState) {
                case 'flying':

                    if (this.sprite.transform.position.y < (gameHeight * 0.25)) {
                        this.movementState = this.movementStates.FALLING;
                    }

                    if (this.sprite.transform.position.y > 0) {
                        this.sprite.transform.position.y -= this.verticalSpeed * pixelSize;
                    }
                    break;
                case 'falling':

                    if (this.sprite.transform.position.y > (gameHeight * 0.75)) {
                        this.movementState = this.movementStates.FLYING;
                    }

                    if (this.sprite.transform.position.y < gameHeight) {
                        this.sprite.transform.position.y += this.verticalSpeed * pixelSize;
                    }
                    break;
            }

            if (this.sprite.transform.position.x > gameWidth || this.sprite.transform.position.x < 0) {
                this.horizontalSpeed = -this.horizontalSpeed;
            }

            this.sprite.transform.position.x += this.horizontalSpeed * pixelSize;
            this.matingSprite.transform.position.x += this.horizontalSpeed * pixelSize;
        }

    }

    startMating(mate) {

        if (this.isMating) return;
        if (!this.isPlayerControlled) return;

        this.lastMate = mate;
        this.isMating = true;
        this.animationFrameCount = this.matingAnimationFrameCount;
        diversityBarLength += 5;
        mateCount++;

        this.animationFrameLength = this.matingAnimationFrameLength;
        this.animationTimer = 0;
        this.animationFrameCurrent = 0;

        if (!flyingGameSFX[SFX_MATING].isPlaying) {
            flyingGameSFX[SFX_MATING].play();
        }
    }

    stopMating() {
        this.isMating = false;
        this.lastMate.stopMating();

        this.animationFrameCount = this.flyingAnimationFrameCount;

        this.animationFrameLength = this.flyingAnimationFrameLength;
        this.animationTimer = 0;
        this.animationFrameCurrent = 0;
    }

    collideWithRivalQueen() {
        if (!this.isPlayerControlled) return;

        for (var i = 0; i < rivalQueens.length; i++) {
            if (getDistBtwVec2(rivalQueens[i].sprite.transform.position, this.sprite.transform.position) < rivalQueens[i].collisionRadius + this.collisionRadius) {
                this.isKnockedBack = true;

                if (!flyingGameSFX[SFX_COLLISION].isPlaying) {
                    flyingGameSFX[SFX_COLLISION].play();
                }
            }
        }

    }

    resize() {

        this.sprite.transform.position = resizeVec2(this.sprite.transform.position);
        this.sprite.transform.scale = vec2(pixelSize / 3, pixelSize / 3);

        this.matingSprite.transform.position = resizeVec2(this.sprite.transform.position);
        this.matingSprite.transform.scale = vec2(pixelSize / 3, pixelSize / 3);

        this.x /= prevGameWidth;
        this.y /= prevGameHeight;

        this.x *= gameWidth;
        this.y *= gameHeight;

        this.defaultPos = {
            x: gameWidth / 2,
            y: gameHeight / 2
        }

    }

    draw() {
        renderer.save();
        renderer.translate(-camPanX, 0);

        if (this.isMating) {

            var inSize = {
                x: 625,
                y: 242
            }

            var inPos = {
                x: (this.animationFrameCurrent * inSize.x),
                y: 0
            }

            this.matingSprite.drawScIn(inPos, inSize);

        } else {

            var inSize = {
                x: 250,
                y: 242
            }

            var inPos = {
                x: (this.animationFrameCurrent * inSize.x),
                y: 0
            }

            this.sprite.drawScIn(inPos, inSize);
        }


        if (this.animationTimer > this.animationFrameLength - 1) {
            this.animationFrameCurrent++
            this.animationTimer = 0;
        }

        if (this.animationFrameCurrent >= this.animationFrameCount) {
            this.animationFrameCurrent = 0;

            if (this.isMating) {
                this.stopMating();
            }

        }

        this.animationTimer++;


        renderer.restore();
    }

}