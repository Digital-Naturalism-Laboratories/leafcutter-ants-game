class Queen {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = new Sprite(tr(vec2(this.x * pixelSize, this.y * pixelSize), vec2(pixelSize / 3, pixelSize / 3)), new ImageObject("Visual Assets/8bit-Queen-no-wings-left.png", vec2(0, 0)));
        this.collisionRadius = 15;

        colonyGameUI.push(this);
    }

    event() {

        if (isTouched) {

            if (getDistBtwVec2(this.sprite.transform.position, vec2(touchPos[0].x - canvas.getBoundingClientRect().left, touchPos[0].y - canvas.getBoundingClientRect().top)) < 20){
                ui.stateIndex = FLIGHTGAMEUI;
            } 

            console.log(getDistBtwVec2(this.sprite.transform.position, touchPos[0]));
        }

    }

    update() {

    }

    draw() {
        this.sprite.drawSc();
    }

}