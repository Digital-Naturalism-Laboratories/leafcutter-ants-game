class ColonyGridNode {
    constructor(row, col, tileType) {

        this.gridCoord = {
            x: col,
            y: row
        }

        this.pixelCoord = {
            x: this.gridCoord.x * GRID_NODE_SIZE * pixelSize,
            y: this.gridCoord.y * GRID_NODE_SIZE * pixelSize + (gameHeight * 0.2)
        }

        //this.tileType = tileType;
        this.isWalkable = (tileType === COLONY_WALL) ? false : true;

        this.neighborNodes = [];
        this.parentNode;
        this.path = [];

        this.gCost = 0; //distance from origin node
        this.hCost = 0; //distance to target node

    }

    fCost = function () {
        var cost = this.gCost + this.hCost
        return cost;
    }

    getIsWalkable = function () {
        return this.isWalkable;
    }

    draw = function () {
        //if (this.isWalkable) {
            //renderer.fillStyle = 'green';
            //renderer.fillRect(this.pixelCoord.x, this.pixelCoord.y, GRID_NODE_SIZE * pixelSize, GRID_NODE_SIZE * pixelSize);
        //}

        if (this.isWalkable) {
            renderer.drawImage(colonyTiles[COLONY_TUNNEL_4WAY], this.pixelCoord.x, this.pixelCoord.y, GRID_NODE_SIZE * pixelSize, GRID_NODE_SIZE * pixelSize);
        }

        //if (worker.pathToDestination != undefined) {
        //    for (var k = 0; k < worker.pathToDestination.length; k++) {
        //        if (worker.pathToDestination[k] === this) {
        //            renderer.fillStyle = 'yellow';
        //            renderer.fillRect(this.pixelCoord.x, this.pixelCoord.y, GRID_NODE_SIZE * pixelSize, GRID_NODE_SIZE * pixelSize);
        //        }
        //    }
        //}

        //if (this.gCost < (totalMilliseconds / 1000) && this.isWalkable) {
        //    renderer.drawImage(colonyTiles[COLONY_TUNNEL_4WAY], this.pixelCoord.x, this.pixelCoord.y, GRID_NODE_SIZE * pixelSize, GRID_NODE_SIZE * pixelSize);
        //}
    }
}