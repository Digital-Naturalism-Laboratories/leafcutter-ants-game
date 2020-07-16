
var maxDistancePixelCheck = 100;

class Ant
{
    constructor()
    {
        this.jawPoint = vec2(100, 100);
        this.bodyPoint = vec2(100, 100);
        this.bodySprite = new Sprite(tr(vec2(),vec2(pixelSize,pixelSize)),
            new ImageObject("images/body.png", vec2(64, 64)));
        this.cuttingJawSprite = new Sprite(tr(vec2(),vec2(pixelSize,pixelSize)),
            new ImageObject("images/jaw2.png", vec2(32,32)));
        this.leadingJawSprite = new Sprite(tr(vec2(),vec2(pixelSize,pixelSize)),
            new ImageObject("images/jaw1.png", vec2(32,32)));

        this.rotatePoint = vec2(200, 200);
        this.cutPointLines = [];
        this.cutPointDelay = 250.0;
        this.cutPointTimer = this.cutPointDelay;

        this.legImage = new ImageObject("images/legPart.png", vec2(3, 32));

        this.foreleg = new Sprite(tr(vec2(700, 100),vec2(pixelSize/2,pixelSize)), this.legImage);
        this.leg = new Sprite(tr(vec2(700, 100 + ((64*pixelSize)/2)),vec2(pixelSize/2,pixelSize)), this.legImage);
        this.legAhead = false;
    }

    event()
    {

    }

    update()
    {
        
        
    }

    draw(deltaTime)
    {
        var underJawPointPixel = renderer.getImageData(this.jawPoint.x, this.jawPoint.y, 1, 1).data;

        if(underJawPointPixel[1] < 50) //i.e not green means no more on leaf
        {
            this.bodyPoint = rotateAroundPoint(this.bodyPoint, this.rotatePoint, 0.005);

            var farPixel1 = renderer.getImageData(this.jawPoint.x+maxDistancePixelCheck, this.jawPoint.y, 1, 1).data;
            var farPixel2 = renderer.getImageData(this.jawPoint.x-maxDistancePixelCheck, this.jawPoint.y, 1, 1).data;
            var farPixel3 = renderer.getImageData(this.jawPoint.x, this.jawPoint.y+maxDistancePixelCheck, 1, 1).data;
            var farPixel4 = renderer.getImageData(this.jawPoint.x, this.jawPoint.y-maxDistancePixelCheck, 1, 1).data;

            if(farPixel1[1] > 50 || farPixel2[1] > 50 || farPixel3[1] > 50 || farPixel4[1] > 50)
            {
                renderer.fillStyle = "black";
                renderer.beginPath();
                if(this.cutPointLines.length > 0)
                {
                    renderer.moveTo(this.cutPointLines[0].x, this.cutPointLines[0].y);
                    for(let i = 0; i < this.cutPointLines.length; i++)
                        renderer.lineTo(this.cutPointLines[i].x, this.cutPointLines[i].y)
                }
                renderer.fill();

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
                this.cutPointLines.push(this.jawPoint.add(vec2(Math.random()*pixelSize*10, Math.random()*pixelSize*10)));
                this.cutPointTimer = this.cutPointDelay;
            }
            else
            {
                this.cutPointTimer -= deltaTime;
            }
        }

        var ang = this.bodyPoint.angle(this.rotatePoint) + Math.PI/1.5;
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

        this.foreleg.transform.position = this.bodyPoint.add(vec2(-16,0));

        this.foreleg.transform.origin = vec2(16, 0);
        if(!this.legAhead)
        {
            if(this.leg.transform.rotation < Math.PI)
                this.leg.transform.rotation += 0.1;
            
            if(this.foreleg.transform.rotation < Math.PI/1.5)
                this.foreleg.transform.rotation += 0.05;
            else
            {
                this.foreleg.transform.rotation = Math.PI/1.5;
                this.leg.transform.rotation = Math.PI;
                this.legAhead = true;
            }
        }
        else
        {
            if(this.leg.transform.rotation > -Math.PI/8)
                this.leg.transform.rotation -= 0.1;

            if(this.foreleg.transform.rotation > Math.PI/4)
                this.foreleg.transform.rotation -= 0.05;
            else
            {
                this.foreleg.transform.rotation = Math.PI/4;
                this.leg.transform.rotation = -Math.PI/8;
                this.legAhead = false;
            }
        }
        //this.foreleg.transform.rotation = Math.PI/4;
        //this.foreleg.transform.rotation = Math.PI/1.5;
        this.foreleg.transform.rotation += Math.PI + ang;
        this.leg.transform.position = this.foreleg.transform.position.add(vec2(16, 0)).add(vec2(Math.cos(this.foreleg.transform.rotation-29.8) * -32, Math.sin(this.foreleg.transform.rotation-29.8) * -32));
        this.leg.transform.position = this.leg.transform.position.subtract(vec2(16,0));
        this.foreleg.drawScRot();
        this.foreleg.transform.rotation -= Math.PI + ang;

        this.leg.transform.origin = vec2(16, 0);
        //this.leg.transform.rotation = -Math.PI/8;
        //this.leg.transform.rotation = Math.PI*2.9;
        this.leg.transform.rotation += Math.PI + ang;
        this.leg.drawScRot();
        this.leg.transform.rotation -= Math.PI + ang;

        drawCircle(renderer, this.foreleg.transform.position.add(vec2(16, 0)), 3, false, "red", 2);
        drawCircle(renderer, this.leg.transform.position.add(vec2(16,0)), 3, false, "red", 2);

        drawLine(renderer, this.bodyPoint, this.rotatePoint, "white");
        drawLine(renderer, this.bodyPoint, this.jawPoint, "white");
        drawCircle(renderer, this.rotatePoint, 3, false, "red", 2);
        drawCircle(renderer, this.bodyPoint, 3, false, "red", 2);
        drawCircle(renderer, this.jawPoint, 3, false, "red", 2);
    }
}