class Fungus {
    constructor(col, row) {

        this.gridCoord = {
            col: col,
            row: row
        }

        this.pixelCoord = pixelCoordAtCenterOfTileCoord(col, row);
        this.width = (fungusNest.width / 3) * pixelSize;
        this.height = (fungusNest.height / 3) * pixelSize;
    }

    update = function () {
        //findPath(this.gridCoord.col, this.gridCoord.row, 16, 5);
    }

    draw = function () {
        //if (ui.getActiveState() != COLONYGAMEUI) return;
        renderer.drawImage(fungusNest, this.pixelCoord.x - (this.width / 2), this.pixelCoord.y - 25 * pixelSize, this.width, this.height);
        //colorCircle(this.pixelCoord.x, this.pixelCoord.y, GRID_NODE_SIZE, 'green');
    }

}