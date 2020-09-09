class FlyingMale {

    constructor() {
        this.x = Math.random() * gameWidth;
        this.y = Math.random() * gameHeight;
        this.horizontalSpeed = (Math.random() * 8) + 0.2;
        this.verticalSpeed = (Math.random() * 3) + .25;
        this.direction = 0;
        this.sprite = new Sprite(tr(vec2(this.x * pixelSize, this.y * pixelSize), vec2(pixelSize / 3, pixelSize / 3)), new ImageObject("images/Animations/Male_Ant_Flying_Spritesheet.png", vec2(96, 96)));
        this.movementStates = {
            FLYING: "flying",
            FALLING: "falling"
        }
        this.movementState = this.movementStates.FALLING;
        this.collisionRadius = 10;
        this.isMating = false;
        this.hasMated = false;

        flightGameUI.push(this);

        this.animationFrameLength = 2;
        this.animationFrameCount = 20;
        this.animationFrameCurrent = Math.floor(Math.random() * 20);
        this.animationTimer = 0
    }

    event() {

    }

    update() {

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
                    if (!this.hasMated) {
                        this.movementState = this.movementStates.FLYING;
                    }
                }

                if (this.sprite.transform.position.y < gameHeight || this.hasMated) {
                    this.sprite.transform.position.y += this.verticalSpeed * pixelSize;
                }
                break;
        }

        if (this.sprite.transform.position.x > gameWidth) {
            if (!this.hasMated) {
                this.direction = 1;
                this.horizontalSpeed = (Math.random() * -8) + -2.2;
            }
        }

        if (this.sprite.transform.position.x < 0) {
            if (!this.hasMated) {
                this.direction = 0;
                this.horizontalSpeed = (Math.random() * 8) + 0.2;
            }
        }

        this.sprite.transform.position.x += this.horizontalSpeed * pixelSize;

        if (getDistBtwVec2(flyingQueen.sprite.transform.position, this.sprite.transform.position) < flyingQueen.collisionRadius + this.collisionRadius) {
            if (!flyingQueen.isMating && !this.hasMated) {
                flyingQueen.startMating(this);
                this.sprite.transform.position.y = 10000;
                this.verticalSpeed = 0;
                this.horizontalSpeed = -2;
            }
        }

        for (var i = 0; i < rivalQueens.length; i++) {
            if (getDistBtwVec2(rivalQueens[i].sprite.transform.position, this.sprite.transform.position) * pixelSize < ((rivalQueens[i].collisionRadius - 40 ) + this.collisionRadius) * pixelSize) {
                rivalQueens[i].startMating(this);
                this.sprite.transform.position.y = 10000;
                this.verticalSpeed = 0;
                this.horizontalSpeed = -2;
            }
        }

    }

    stopMating() {
        this.isMating = false;
        this.hasMated = true;
        this.verticalSpeed = -4;
        this.horizontalSpeed -= 1;
        this.direction = 1;
        this.sprite.transform.position.x = flyingQueen.x;
        this.sprite.transform.position.y = flyingQueen.y;
    }

    resize() {

        this.sprite.transform.position = resizeVec2(this.sprite.transform.position);
        this.sprite.transform.scale = vec2(pixelSize / 3, pixelSize / 3);

        this.x /= prevGameWidth;
        this.y /= prevGameHeight;

        this.x *= gameWidth;
        this.y *= gameHeight;

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
            y: (0 + this.direction) * inSize.y
        }

        if (!this.isMating) {
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

        renderer.restore();
    }
}