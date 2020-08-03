
class Leaf
{
    constructor()
    {
        this.sprite = new Sprite(tr(vec2(256*pixelSize, 256*pixelSize), vec2(pixelSize, pixelSize)), new ImageObject("images/leaf.png", vec2(512,512)));
        this.points = [];
        this.borderPoints = [];
        this.updatePoints = true;
        this.voidAreas = [];
    }

    update()
    {
    }

    draw()
    {
        this.sprite.drawSc();
        this.drawVoidAreas();
        this.getPoints(pixelSize*16);
        this.drawPoints(false);
    }

    drawPoints(onlyBorders)
    {
        if(!onlyBorders)
        {
            for(let i = 0; i < this.points.length; i++)
            {
                drawCircle(renderer, this.points[i], 1 * pixelSize, true, "white", 1);
            }
        }

        for(let i = 0; i < this.borderPoints.length; i++)
        {
            drawCircle(renderer, this.borderPoints[i], 2 * pixelSize, true, "red", 1);
        }
    }

    getPoints(borderTestResolutionFactor)
    {
        var borderPixelComparionDistance = borderTestResolutionFactor;
        if(this.updatePoints)
        {
            var prevPoints = this.points.length;
            this.points = [];
            this.borderPoints = [];
            for(let y = borderPixelComparionDistance; y < gameHeight-borderPixelComparionDistance; y+=borderTestResolutionFactor)
            {
                for(let x = borderPixelComparionDistance; x < gameWidth-borderPixelComparionDistance; x+=borderTestResolutionFactor)
                {
                    var thisPixel = renderer.getImageData(x, y, 1, 1).data;
                    var leftPixel = renderer.getImageData(x-borderPixelComparionDistance, y, 1, 1).data;
                    var rightPixel = renderer.getImageData(x+borderPixelComparionDistance, y, 1, 1).data;
                    var upPixel = renderer.getImageData(x, y-borderPixelComparionDistance, 1, 1).data;
                    var downPixel = renderer.getImageData(x, y+borderPixelComparionDistance, 1, 1).data;

                    //if the pixel is not sky blue
                    if(thisPixel[0] != bgRGB[0] || thisPixel[1] != bgRGB[1] || thisPixel[2] != bgRGB[2])
                    {
                        //...and any of the surrounding pixels is sky blue
                        if(
                            (leftPixel[0] == bgRGB[0] && leftPixel[1] == bgRGB[1] && leftPixel[2] == bgRGB[2])
                            || (rightPixel[0] == bgRGB[0] && rightPixel[1] == bgRGB[1] && rightPixel[2] == bgRGB[2])
                            || (upPixel[0] == bgRGB[0] && upPixel[1] == bgRGB[1] && upPixel[2] == bgRGB[2])
                            || (downPixel[0] == bgRGB[0] && downPixel[1] == bgRGB[1] && downPixel[2] == bgRGB[2])
                        )
                        {
                            //then, it is a border pixel.
                            this.borderPoints.push(vec2(x,y));
                        }

                        this.points.push(vec2(x,y));
                    }
                }
            }
            var leafPointsRemoved = prevPoints - this.points.length;
            if(leafPointsRemoved > 0) leafcuttingScore += leafPointsRemoved * 10;
            this.updatePoints = false;
        }
    }

    drawVoidAreas()
    {
        for(let i = 0; i < this.voidAreas.length; i++)
        {
            renderer.fillStyle = "#3aade7";
            renderer.beginPath();
            if(this.voidAreas[i].length > 1)
            {
                renderer.moveTo(this.voidAreas[i][0].x, this.voidAreas[i][0].y);
                for(let n = 0; n < this.voidAreas[i].length; n++)
                    renderer.lineTo(this.voidAreas[i][n].x, this.voidAreas[i][n].y)
            }
            renderer.fill();
        }
    }
}