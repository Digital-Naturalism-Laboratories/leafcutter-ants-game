var visibleEggClusterCount = 0;

class EggCluster {
    constructor(col, row, offset) {

        this.gridCoord = {
            col: col,
            row: row
        }
        this.pixelCoord = pixelCoordAtCenterOfTileCoord(col, row);
        this.sprite = Math.random() > 0.5 ? egg_larva : egg_pupae_normal;
        this.offset = offset;
        this.isVisible = false;

        this.eggs = [];
        for (i = 0; i < 15; i++){
            this.eggs.push(this.pixelCoord.x - (this.sprite.width * pixelSize / 2) + (this.offset * 3) + ((Math.random() - 0.5) * (50 * pixelSize)));
        }

        eggClusters.push(this);

    }

    resize() {

        this.pixelCoord = resizeVec2(this.pixelCoord);

    }

    event() {

    }

    update() {
        
        if (colonyGridNodes[this.gridCoord.row][this.gridCoord.col].isTunneled == true) {
            this.isVisible = true;
            visibleEggClusterCount++;
        }
    }

    draw() {
        if (this.isVisible) {

            for (i = 0; i < this.eggs.length; i++){
                renderer.drawImage(egg_single, this.eggs[i] , this.pixelCoord.y - (this.sprite.height * pixelSize / 4), this.sprite.width * pixelSize, this.sprite.height * pixelSize);
            }

            if (this.sprite == egg_pupae_normal){
                renderer.drawImage(this.sprite, this.pixelCoord.x - (this.sprite.width * 0.5 * pixelSize / 2) + this.offset, this.pixelCoord.y - (this.sprite.height * 0.5 * pixelSize / 4), this.sprite.width * 0.5 * pixelSize, this.sprite.height * 0.5 * pixelSize);
            } else {
                renderer.drawImage(this.sprite, this.pixelCoord.x - (this.sprite.width * pixelSize / 2) + this.offset, this.pixelCoord.y, this.sprite.width * 0.5 * pixelSize, this.sprite.height * 0.5 * pixelSize);
            }
        }
    }
}