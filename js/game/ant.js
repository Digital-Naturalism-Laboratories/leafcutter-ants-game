
var maxDistancePixelCheck = 5;
var cutLeafRoughness = 5;

class Ant
{
    constructor()
    {
        this.jawPoint = vec2(50, 700);
        this.bodyPoint = vec2(50, 700);
        this.bodyAngle = Math.PI*1.75;
        this.destinationPoint = this.bodyPoint;
        this.bodySprite = new Sprite(tr(vec2(),vec2(pixelSize,pixelSize)),
            new ImageObject("images/body.png", vec2(64, 64)));
        this.cuttingJawSprite = new Sprite(tr(vec2(),vec2(pixelSize,pixelSize)),
            new ImageObject("images/jaw2.png", vec2(32,32)));
        this.leadingJawSprite = new Sprite(tr(vec2(),vec2(pixelSize,pixelSize)),
            new ImageObject("images/jaw1.png", vec2(32,32)));

        this.rotatePoints = [vec2(0,0), vec2(0,0), vec2(0,0), vec2(0,0)];
        this.currentRotatePoint = vec2(-1001,-1001);

        this.cutPointLines = [];
        this.cutPointDelay = 100.0;
        this.cutPointTimer = this.cutPointDelay;

        this.cuttingJawControlPos = vec2(750, 600);
        this.leadingJawControlPos = vec2(550, 600);
        this.cutDuration = 200;
        this.cutTimer = 0;
        this.isCuttingJawLed = true;
        this.stopRotationPos = vec2(50, 50);

        this.voidAreas = [];
    }

    event()
    {
        if(isTouched)
        {
            if(this.currentRotatePoint.x <= -1000 || this.currentRotatePoint.y <= -1000)
            {
                this.destinationPoint = vec2(touchPos[0].x - canvasStartX, touchPos[0].y - canvasStartY);
            }

            if(isPointInCircle(vec2(touchPos[0].x - canvasStartX, touchPos[0].y - canvasStartY), this.stopRotationPos, 30))
                this.currentRotatePoint = vec2(-1001, -1001);
            
            for(let i = 0; i < 4; i++)
            {
                if(isPointInCircle(vec2(touchPos[0].x - canvasStartX, touchPos[0].y - canvasStartY), this.rotatePoints[i], 30))
                //&& this.destinationPoint.x == this.bodyPoint.x && this.destinationPoint.y == this.bodyPoint.y)
                {
                    this.currentRotatePoint = vec2(this.rotatePoints[i].x, this.rotatePoints[i].y);
                    this.cutPointLines = [];
                }
            }

            if(isPointInCircle(vec2(touchPos[0].x - canvasStartX, touchPos[0].y - canvasStartY), this.cuttingJawControlPos, 45)
            && this.isCuttingJawLed)
            {
                this.cutTimer = this.cutDuration;
                this.isCuttingJawLed = !this.isCuttingJawLed;
            }
            else if(isPointInCircle(vec2(touchPos[0].x - canvasStartX, touchPos[0].y - canvasStartY), this.leadingJawControlPos, 45)
            && !this.isCuttingJawLed)
            {
                this.isCuttingJawLed = !this.isCuttingJawLed;
            }
        }
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

        var ang = this.bodyPoint.angle(this.currentRotatePoint) + Math.PI*2.2 + this.bodyAngle;

        this.jawPoint = this.bodyPoint.add(vec2(Math.cos(ang-Math.PI/2) * 60.0, Math.sin(ang-Math.PI/2) * 60.0));
        this.rotatePoints[0] = this.bodyPoint.add(vec2(Math.cos(ang+Math.PI/5) * 100.0, Math.sin(ang+Math.PI/5) * 100.0));
        this.rotatePoints[1] = this.bodyPoint.add(vec2(Math.cos(ang+Math.PI-Math.PI/5) * 100.0, Math.sin(ang+Math.PI-Math.PI/5) * 100.0));
        this.rotatePoints[2] = this.bodyPoint.add(vec2(Math.cos(ang+Math.PI-Math.PI/5) * -100.0, Math.sin(ang+Math.PI-Math.PI/5) * -100.0));
        this.rotatePoints[3] = this.bodyPoint.add(vec2(Math.cos(ang+Math.PI/5) * -100.0, Math.sin(ang+Math.PI/5) * -100.0));

        var underJawPointPixel = renderer.getImageData(this.jawPoint.x, this.jawPoint.y, 1, 1).data;

        if(!(this.currentRotatePoint.x <= -1000 || this.currentRotatePoint.y <= -1000) && this.cutTimer > 0)
        {
            //var ang = this.bodyPoint.angle(this.currentRotatePoint) + Math.PI*2.2;
            this.jawPoint = this.bodyPoint.add(vec2(Math.cos(ang-Math.PI/2) * 60.0, Math.sin(ang-Math.PI/2) * 60.0));
            if(underJawPointPixel[1] < 50) //i.e not green means no more on leaf
            {
                this.bodyPoint = rotateAroundPoint(this.bodyPoint, this.currentRotatePoint, -0.05);

                var farPixel1 = renderer.getImageData(this.jawPoint.x+maxDistancePixelCheck, this.jawPoint.y, 1, 1).data;
                var farPixel2 = renderer.getImageData(this.jawPoint.x-maxDistancePixelCheck, this.jawPoint.y, 1, 1).data;
                var farPixel3 = renderer.getImageData(this.jawPoint.x, this.jawPoint.y+maxDistancePixelCheck, 1, 1).data;
                var farPixel4 = renderer.getImageData(this.jawPoint.x, this.jawPoint.y-maxDistancePixelCheck, 1, 1).data;

                if(farPixel1[1] > 50 || farPixel2[1] > 50 || farPixel3[1] > 50 || farPixel4[1] > 50)
                {
                    this.bodyPoint = rotateAroundPoint(this.bodyPoint, this.currentRotatePoint, -0.04);

                    if(this.cutPointLines.length > 1)
                    {
                        this.cutPointLines.push(vec2(this.currentRotatePoint.x, this.currentRotatePoint.y));
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
                this.bodyPoint = rotateAroundPoint(this.bodyPoint, this.currentRotatePoint, -0.005);

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

            this.cutTimer -= deltaTime;
        }

        for(let i = 0; i < this.cutPointLines.length; i++)
        {
            if(i < this.cutPointLines.length-1)
                drawLine(renderer, this.cutPointLines[i], this.cutPointLines[i+1], "black");
        }

        ang += Math.PI;

        this.bodySprite.transform.position = this.bodyPoint;
        this.bodySprite.transform.rotation = ang + Math.PI/2;
        this.bodySprite.drawScRot();
        this.cuttingJawSprite.transform.position = this.jawPoint.add(vec2(Math.cos(ang) * 15.0, Math.sin(ang) * 15.0));
        this.cuttingJawSprite.transform.rotation = ang + Math.PI/2;
        this.cuttingJawSprite.drawScRot();
        this.leadingJawSprite.transform.position = this.jawPoint.subtract(vec2(Math.cos(ang) * 15.0, Math.sin(ang) * 15.0));
        this.leadingJawSprite.transform.rotation = ang + Math.PI/2;
        this.leadingJawSprite.drawScRot();

        
        if(!(this.currentRotatePoint.x <= -1000 || this.currentRotatePoint.y <= -1000))
            drawCircle(renderer, this.currentRotatePoint, 5, true, "green", 2);
        else if(this.destinationPoint.distance(this.bodyPoint) > 4)
        {
            this.bodyAngle = this.bodyPoint.angle(this.destinationPoint)+Math.PI;
            this.bodyPoint.x += Math.cos(this.bodyAngle) * 2;
            this.bodyPoint.y += Math.sin(this.bodyAngle) * 2;
            drawCircle(renderer, this.destinationPoint, 30, false, "white", 2);
        }
        else
        {
            this.destinationPoint = vec2(this.bodyPoint.x, this.bodyPoint.y);
            for(let i = 0; i < 4; i++)
            {
                drawCircle(renderer, this.rotatePoints[i], 30, false, "yellow", 2);
            }
        }
        
        drawLine(renderer, this.bodyPoint, this.jawPoint, "white");
        drawCircle(renderer, this.bodyPoint, 3, false, "red", 2);
        drawCircle(renderer, this.jawPoint, 3, false, "red", 2);

        if(!(this.currentRotatePoint.x <= -1000 || this.currentRotatePoint.y <= -1000))
        {
            drawCircle(renderer, this.cuttingJawControlPos, 45, this.isCuttingJawLed, "white", 2);
            var tempPos = vec2(this.cuttingJawSprite.transform.position.x, this.cuttingJawSprite.transform.position.y);
            this.cuttingJawSprite.transform.position = this.cuttingJawControlPos;
            this.cuttingJawSprite.drawSc();
            this.cuttingJawSprite.transform.position = tempPos;

            drawCircle(renderer, this.leadingJawControlPos, 45, !this.isCuttingJawLed, "white", 2);
            var tempPos = vec2(this.leadingJawSprite.transform.position.x, this.leadingJawSprite.transform.position.y);
            this.leadingJawSprite.transform.position = this.leadingJawControlPos;
            this.leadingJawSprite.drawSc();
            this.leadingJawSprite.transform.position = tempPos;
        
            drawCircle(renderer, this.stopRotationPos, 30, true, "#ff0000bb", 2);
        }
    }
}