
class Leaf
{
    constructor()
    {
        this.sprite = new Sprite(tr(vec2(256*pixelSize, 256*pixelSize), vec2(pixelSize, pixelSize)), new ImageObject("images/leaf.png", vec2(512,512)));
    }

    update()
    {
    }

    draw()
    {
        this.sprite.drawSc();
    }
}