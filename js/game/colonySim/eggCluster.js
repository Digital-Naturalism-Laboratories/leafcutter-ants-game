class EggCluster {
    constructor(col, row) {

        this.gridCoord = {
            col: col,
            row: row
        }
        this.pixelCoord = pixelCoordAtCenterOfTileCoord(col, row);
        this.sprite = egg_many;
        
    }

    draw() {
        renderer.drawImage(this.sprite, this.pixelCoord.x, this.pixelCoord.y, this.sprite.width, this.sprite.height);
    }

}