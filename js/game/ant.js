
var maxDistancePixelCheck = 120;
var cutLeafRoughness = 5;

class Ant
{
    constructor()
    {
        this.jawPoint = vec2(140, 140);
        this.bodyPoint = vec2(140, 140);
        this.bodySprite = new Sprite(tr(vec2(),vec2(pixelSize,pixelSize)),
            new ImageObject("images/body.png", vec2(64, 64)));
        this.cuttingJawSprite = new Sprite(tr(vec2(),vec2(pixelSize,pixelSize)),
            new ImageObject("images/jaw2.png", vec2(32,32)));
        this.leadingJawSprite = new Sprite(tr(vec2(),vec2(pixelSize,pixelSize)),
            new ImageObject("images/jaw1.png", vec2(32,32)));

        this.rotatePoint = vec2(200, 200);
        this.cutPointLines = [];
        this.cutPointDelay = 100.0;
        this.cutPointTimer = this.cutPointDelay;

        this.voidAreas = [];
    }

    event()
    {

    }

    update()
    {
        
        
    }

    draw(deltaTime)
    {
        for(let i = 0; i < this.voidAreas.length; i++)
        {
            renderer.fillStyle = "black";
            renderer.beginPath();
            if(this.voidAreas[i].length > 1)
            {
                renderer.moveTo(this.voidAreas[i][0].x, this.voidAreas[i][0].y);
                for(let n = 0; n < this.voidAreas[i].length; n++)
                    renderer.lineTo(this.voidAreas[i][n].x, this.voidAreas[i][n].y)
            }
            renderer.fill();
        }
        

        var underJawPointPixel = renderer.getImageData(this.jawPoint.x, this.jawPoint.y, 1, 1).data;

        if(underJawPointPixel[1] < 50) //i.e not green means no more on leaf
        {
            this.bodyPoint = rotateAroundPoint(this.bodyPoint, this.rotatePoint, 0.05);

            var farPixel1 = renderer.getImageData(this.jawPoint.x+maxDistancePixelCheck, this.jawPoint.y, 1, 1).data;
            var farPixel2 = renderer.getImageData(this.jawPoint.x-maxDistancePixelCheck, this.jawPoint.y, 1, 1).data;
            var farPixel3 = renderer.getImageData(this.jawPoint.x, this.jawPoint.y+maxDistancePixelCheck, 1, 1).data;
            var farPixel4 = renderer.getImageData(this.jawPoint.x, this.jawPoint.y-maxDistancePixelCheck, 1, 1).data;

            if(farPixel1[1] > 50 || farPixel2[1] > 50 || farPixel3[1] > 50 || farPixel4[1] > 50)
            {
                this.bodyPoint = rotateAroundPoint(this.bodyPoint, this.rotatePoint, -0.04);

                if(this.cutPointLines.length > 1)
                {
                    this.cutPointLines.push(vec2(this.rotatePoint.x, this.rotatePoint.y));
                    this.voidAreas.push([]);
                    for(let i = 0; i < this.cutPointLines.length; i++)
                        this.voidAreas[this.voidAreas.length-1].push(vec2(this.cutPointLines[i].x, this.cutPointLines[i].y));
                    this.cutPointLines = [];
                }

                if(this.cutPointTimer <= 0)
                {
                    this.cutPointLines.push(this.jawPoint);
                    this.cutPointTimer = this.cutPointDelay * 4;
                }
                else
                {
                    this.cutPointTimer -= deltaTime;
                }
            }
        }
        else
        {
            this.bodyPoint = rotateAroundPoint(this.bodyPoint, this.rotatePoint, 0.005);
            
            for(let i = 0; i < this.cutPointLines.length; i++)
            {
                if(i < this.cutPointLines.length-1)
                    drawLine(renderer, this.cutPointLines[i], this.cutPointLines[i+1], "black");
            }

            if(this.cutPointTimer <= 0)
            {
                this.cutPointLines.push(this.jawPoint.add(vec2(Math.random()*pixelSize*cutLeafRoughness, Math.random()*pixelSize*cutLeafRoughness)));
                this.cutPointTimer = this.cutPointDelay;
            }
            else
            {
                this.cutPointTimer -= deltaTime;
            }
        }

        var ang = this.bodyPoint.angle(this.rotatePoint) + Math.PI*2.2;
        this.jawPoint = this.bodyPoint.add(vec2(Math.cos(ang) * 60.0, Math.sin(ang) * 60.0));
        ang -= Math.PI/2;

        this.bodySprite.transform.position = this.bodyPoint;
        this.bodySprite.transform.rotation = ang + Math.PI/2;
        this.bodySprite.drawScRot();
        this.cuttingJawSprite.transform.position = this.jawPoint.add(vec2(Math.cos(ang) * 15.0, Math.sin(ang) * 15.0));
        this.cuttingJawSprite.transform.rotation = ang + Math.PI/2;
        this.cuttingJawSprite.drawScRot();
        this.leadingJawSprite.transform.position = this.jawPoint.subtract(vec2(Math.cos(ang) * 15.0, Math.sin(ang) * 15.0));
        this.leadingJawSprite.transform.rotation = ang + Math.PI/2;
        this.leadingJawSprite.drawScRot();

        //drawLine(renderer, this.bodyPoint, this.rotatePoint, "white");
        //drawLine(renderer, this.bodyPoint, this.jawPoint, "white");
        drawCircle(renderer, this.rotatePoint, 3, false, "red", 2);
        drawCircle(renderer, this.bodyPoint, 3, false, "red", 2);
        //drawCircle(renderer, this.jawPoint, 3, false, "red", 2);
    }
}