class FlyingQueen {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.sprite = new Sprite(tr(vec2(this.x * pixelSize, this.y * pixelSize), vec2(pixelSize / 3, pixelSize / 3)), new ImageObject("images/placeholder_antQueen.png", vec2(96, 96)));

        flightGameUI.push(this);
    }

    event() {
        if (isTouched) {
            this.sprite.transform.position.x = touchPos[0].x - canvas.getBoundingClientRect().left;
            this.sprite.transform.position.y = touchPos[0].y - canvas.getBoundingClientRect().top;
        }
    }

    update() {
        this.sprite.transform.position.x += this.speed;
    }

    draw() {
        this.sprite.drawSc();
    }
}