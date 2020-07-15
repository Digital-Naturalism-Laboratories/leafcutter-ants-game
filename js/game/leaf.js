
class Leaf
{
    constructor()
    {
        this.sprite = new Sprite(tr(vec2(), vec2(sizeFactor/200.0, sizeFactor/200.0)), new ImageObject("images/leaf.png", vec2(128,128)));
        this.sprite.transform.position = vec2(this.sprite.transform.scale.x*64, this.sprite.transform.scale.y*64);
    }

    update()
    {
    }

    draw()
    {
        this.sprite.drawSc();
    }
}