
class FlyingQueen
{
    constructor()
    {
        this.sprite = new Sprite(tr(vec2(96*pixelSize, 96*pixelSize), vec2(pixelSize, pixelSize)), new ImageObject("images/placeholder_antQueen.png", vec2(512,512)));
    }

    update()
    {
    }

    draw()
    {
        this.sprite.drawSc();
    }
}