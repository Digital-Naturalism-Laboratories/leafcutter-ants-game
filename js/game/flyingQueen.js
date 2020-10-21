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
            this.collisionRadius = 20 * pixelSize;
            this.sprite = new Sprite(tr(vec2(this.x, this.y), vec2(pixelSize / 3, pixelSize / 3)), new ImageObject("images/Animations/Queen_Fly_250px_Spritesheet.png", vec2(128, 128)));
        } else {
            do {
                this.x = Math.random() * gameWidth;
                this.y = Math.random() * gameHeight;
            } while (getDistBtwVec2(flyingQueen.defaultPos, vec2(this.x, this.y)) < 200 * pixelSize);
            this.collisionRadius = 50 * pixelSize;
            this.sprite = new Sprite(tr(vec2(this.x, this.y), vec2(pixelSize / 3, pixelSize / 3)), new ImageObject("images/Animations/Queen_Fly_250px_Spritesheet_Tinted.png", vec2(128, 128)));
        }

        this.horizontalSpeed = 3;
        this.verticalSpeed = 3;
        this.angleToDestination;
        this.destinationReached = true;
        this.matingSprite = new Sprite(tr(vec2(this.x, this.y), vec2(pixelSize / 3, pixelSize / 3)), new ImageObject("images/Animations/Queen_Mating_Spritesheet.png", vec2(625, 242)));
        this.flyingMomentum = 0;
        this.fallingMomentum = 0;
        this.collisionRadius = 55 * pixelSize;
        this.isMating = false;
        this.matingCooldown = 180;
        this.matingTimer = 0;
        this.lastMate;
        this.isKnockedBack = false;
        this.knockbackTimer = 5;
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
        if (gameEndTimer < gameEndTimerLength) return;
        if (this.isMating) return;

        if (isTouched) {

            this.destinationReached = false;

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

        if (gameEndTimer < gameEndTimerLength && !this.isMating) {
            this.x += Math.abs(this.horizontalSpeed * pixelSize);
            this.y += Math.abs(this.verticalSpeed * pixelSize);
            this.sprite.transform.position.x = this.x;
            this.sprite.transform.position.y = this.y;
            return;
        }

        if (this.isPlayerControlled) {

            if (this.isKnockedBack) {

                energyBarLength -= 0.1;

                this.knockbackTimerCurrent++;
                this.x += this.horizontalSpeed * pixelSize * -0.33;
                this.y += this.verticalSpeed * pixelSize * -0.33;
                if (this.knockbackTimerCurrent >= this.knockbackTimer) {
                    this.isKnockedBack = false;
                    this.knockbackTimerCurrent = 0;
                }

            } else if (!this.destinationReached) {

                this.angleToDestination = Math.atan2(lastTouchPos.y - this.y, lastTouchPos.x - this.x);
                energyBarLength -= 0.04;

                if (!flyingGameSFX[SFX_WINGS].isPlaying) {
                    flyingGameSFX[SFX_WINGS].play();
                }

            } else {
                this.angleToDestination = Math.atan2(this.defaultPos.y - this.y, this.defaultPos.x - this.x);
                flyingGameSFX[SFX_WINGS].pause();
            }

            if (getDistBtwVec2(vec2(this.x, this.y), lastTouchPos) < 10) {
                this.destinationReached = true;
            }

            this.x = this.x + Math.cos(this.angleToDestination) * this.horizontalSpeed * pixelSize;
            this.y = this.y + Math.sin(this.angleToDestination) * this.verticalSpeed * pixelSize;

            this.sprite.transform.position.x = this.x;
            this.sprite.transform.position.y = this.y;
            this.matingSprite.transform.position.x = this.x;
            this.matingSprite.transform.position.y = this.y;

            this.collideWithRivalQueen();

        } else {

            //reverse direction after reaching the top or bottom of screen
            if (this.sprite.transform.position.y + this.verticalSpeed < 0 || this.sprite.transform.position.y + this.verticalSpeed > gameHeight) {
                this.verticalSpeed *= -1;
            }

            //reverse direction when reaching the right or left side of the screen
            if (this.sprite.transform.position.x + this.horizontalSpeed > gameWidth || this.sprite.transform.position.x + this.horizontalSpeed < 0) {
                this.horizontalSpeed *= -1;
            }

            //reverse direction when nearing the center of the screen
            if (getDistBtwVec2(flyingQueen.defaultPos, this.sprite.transform.position) < 120 * pixelSize) {
                this.horizontalSpeed *= -1;
                this.verticalSpeed *= -1;
            }

            //update position based on speed
            this.sprite.transform.position.x += this.horizontalSpeed * pixelSize;
            this.sprite.transform.position.y += this.verticalSpeed * pixelSize;
        }

    }

    startMating(mate) {

        if (gameEndTimer < gameEndTimerLength) return;
        if (this.isMating) return;
        if (!this.isPlayerControlled) return;

        this.lastMate = mate;
        this.isMating = true;
        this.animationFrameCount = this.matingAnimationFrameCount;
        diversityBarLength += (Math.random() * 5) + 1;
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
            if (getDistBtwVec2(rivalQueens[i].sprite.transform.position, this.sprite.transform.position) * pixelSize < (rivalQueens[i].collisionRadius + this.collisionRadius) * pixelSize) {
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