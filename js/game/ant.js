
class Ant
{
    constructor()
    {
        this.jawPoint = vec2(150, 150);
        this.bodyPoint = vec2(150, 150);
        this.cuttingJawSprite = new Sprite(tr(vec2(),vec2(pixelSize,pixelSize)),
            new ImageObject("images/jaw.png", vec2(32,32)));
        this.cuttingJawSprite.transform.rotation = -90.0;
        this.leadingJawSprite = new Sprite(tr(vec2(),vec2(pixelSize,pixelSize)),
            new ImageObject("images/jaw.png", vec2(32,32)));
        this.leadingJawSprite.transform.rotation = -90.0;
        this.rotatePoint = vec2(200, 200);
        this.cutPointLines = [];
        this.cutPointDelay = 500.0;
        this.cutPointTimer = this.cutPointDelay;
    }

    update()
    {
        
        
    }

    draw(deltaTime)
    {
        drawLine(renderer, this.bodyPoint, this.rotatePoint, "white");
        drawLine(renderer, this.bodyPoint, this.jawPoint, "white");
        drawCircle(renderer, this.rotatePoint, 3, false, "red", 2);
        drawCircle(renderer, this.bodyPoint, 3, false, "red", 2);
        drawCircle(renderer, this.jawPoint, 3, false, "red", 2);

        for(let i = 0; i < this.cutPointLines.length; i++)
        {
            if(i < this.cutPointLines.length-1)
                drawLine(renderer, this.cutPointLines[i], this.cutPointLines[i+1], "black")
        }

        this.bodyPoint = rotateAroundPoint(this.bodyPoint, this.rotatePoint, 0.005);

        var ang = this.bodyPoint.angle(this.rotatePoint) + Math.PI/2;
        this.jawPoint = this.bodyPoint.add(vec2(Math.cos(ang) * 100.0, Math.sin(ang) * 100.0));
        ang -= Math.PI/2;

        this.cuttingJawSprite.transform.position = this.jawPoint.add(vec2(Math.cos(ang) * 15.0, Math.sin(ang) * 15.0));
        this.cuttingJawSprite.transform.rotation = ang + Math.PI/4;
        this.cuttingJawSprite.drawScRot();
        this.leadingJawSprite.transform.position = this.jawPoint.subtract(vec2(Math.cos(ang) * 15.0, Math.sin(ang) * 15.0));
        this.leadingJawSprite.transform.rotation = ang + Math.PI/4;
        this.leadingJawSprite.drawScRot();

        if(this.cutPointTimer <= 0)
        {
            this.cutPointLines.push(this.jawPoint.add(vec2(Math.random()*pixelSize*15, Math.random()*pixelSize*15)));
            this.cutPointTimer = this.cutPointDelay;
        }
        else
        {
            this.cutPointTimer -= deltaTime;
        }
    }
}