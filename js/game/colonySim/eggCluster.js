class EggCluster {
    constructor(col, row, offset) {

        this.gridCoord = {
            col: col,
            row: row
        }
        this.pixelCoord = pixelCoordAtCenterOfTileCoord(col, row);
        //this.sprite = egg_many;
        this.sprite = Math.random() > 0.5 ? egg_many : egg_pupae_normal;
        this.offset = offset;
        this.isVisible = false;

        eggClusters.push(this);

    }

    resize() {

        this.pixelCoord = resizeVec2(this.pixelCoord);

    }

    event(){
        
    }

    update(){
        if (colonyGridNodes[this.gridCoord.row][this.gridCoord.col].isTunneled == true) {
            this.isVisible = true;
        }
    }

    draw() {

        if (this.isVisible) {
            renderer.drawImage(this.sprite, this.pixelCoord.x - (this.sprite.width * pixelSize / 2) + this.offset, this.pixelCoord.y - (this.sprite.height * pixelSize / 4), this.sprite.width * pixelSize, this.sprite.height * pixelSize);
            //colorCircle(this.pixelCoord.x, this.pixelCoord.y, 5, 'green');
        }

    }

}