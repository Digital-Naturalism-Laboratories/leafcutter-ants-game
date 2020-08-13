class FlyingQueen {
    constructor(x, y, isPlayerControlled) {
        this.horizontalSpeed = 2;
        this.verticalSpeed = 3;
        this.sprite = new Sprite(tr(vec2(this.x * pixelSize, this.y * pixelSize), vec2(pixelSize / 3, pixelSize / 3)), new ImageObject("images/Animations/Queen_Fly_250px_Spritesheet.png", vec2(96, 96)));
        this.flyingMomentum = 0;
        this.fallingMomentum = 0;
        this.collisionRadius = 15;
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

        this.movementStates = {
            FLYING: "flying",
            FALLING: "falling"
        }
        this.movementState = this.movementStates.FALLING;

        flightGameUI.push(this);

        this.animationFrameLength = 4;
        this.animationFrameCount = 60;
        this.animationFrameCurrent = 0;
        this.animationTimer = 0
    }

    event() {
        if (!this.isPlayerControlled) return;

        if (isTouched) {

            lastTouchPos = {
                x: touchPos[0].x - canvas.getBoundingClientRect().left,
                y: touchPos[0].y - canvas.getBoundingClientRect().top
            }

            this.animationFrameLength = 2;

            this.movementState = this.movementStates.FLYING;
        } else {
            this.movementState = this.movementStates.FALLING;
            this.animationFrameLength = 5;
        }

    }

    update() {

        if (this.isPlayerControlled) {

            if (isTouched) {
                if (this.x < lastTouchPos.x) {
                    this.x += this.horizontalSpeed;
                }

                if (this.x > lastTouchPos.x) {
                    this.x -= this.horizontalSpeed;
                }

                if (this.y < lastTouchPos.y) {
                    this.y += this.verticalSpeed = 3;;
                }

                if (this.y > lastTouchPos.y) {
                    this.y -= this.verticalSpeed;
                }

            } else {

                if (this.x < this.defaultPos.x) {
                    this.x += this.horizontalSpeed;
                }

                if (this.x > this.defaultPos.x) {
                    this.x -= this.horizontalSpeed;
                }

                if (this.y < this.defaultPos.y) {
                    this.y += this.verticalSpeed;
                }

                if (this.y > this.defaultPos.y) {
                    this.y -= this.verticalSpeed;
                }

            }

            this.sprite.transform.position.x = this.x;
            this.sprite.transform.position.y = this.y;

        } else {

            switch (this.movementState) {
                case 'flying':

                    if (this.sprite.transform.position.y < (gameHeight * 0.25)) {
                        this.movementState = this.movementStates.FALLING;
                    }

                    if (this.sprite.transform.position.y > 0) {
                        this.sprite.transform.position.y -= this.verticalSpeed;
                    }
                    break;
                case 'falling':

                    if (this.sprite.transform.position.y > (gameHeight * 0.75)) {
                        this.movementState = this.movementStates.FLYING;
                    }

                    if (this.sprite.transform.position.y < gameHeight) {
                        this.sprite.transform.position.y += this.verticalSpeed;
                    }
                    break;
            }

            if (this.sprite.transform.position.x > gameWidth || this.sprite.transform.position.x < 0) {
                this.horizontalSpeed = -this.horizontalSpeed;
            }

            this.sprite.transform.position.x += this.horizontalSpeed;
        }

    }

    draw() {
        renderer.save();
        renderer.translate(-camPanX, 0);

        var inSize = {
            x: 250,
            y: 242
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


        renderer.restore();
    }

}