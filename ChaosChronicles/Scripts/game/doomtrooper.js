var Doomtroopers = {};
Doomtroopers.doomtrooperList = [];

Doomtroopers.AddNewDoomtrooper = function (sector, cell, imgPath) {
    var doomtrooper = new Object();

    //drawing/graphics data
    var texture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + imgPath);
    doomtrooper = new PIXI.Sprite(texture);

    doomtrooper.width = Board.Sectors.CELLWIDTH;
    doomtrooper.height = Board.Sectors.CELLHEIGHT;
    doomtrooper.position.x = cell.x * Board.Sectors.CELLWIDTH;
    doomtrooper.position.y = cell.y * Board.Sectors.CELLHEIGHT;

    doomtrooper.boardLocation = new Object();
    doomtrooper.boardLocation.x = cell.x;
    doomtrooper.boardLocation.y = cell.y;
    doomtrooper.boardLocation.sectorIndex = sector.index;

    doomtrooper.interactive = true;
    doomtrooper.on('mousedown', Doomtroopers.SelectDoomtrooper);

    doomtrooper.index = Doomtroopers.doomtrooperList.length;   //the length will find the index that the new doomtrooper will be pushed to
    Doomtroopers.doomtrooperList.push(doomtrooper);

    //register the doomtrooper on the sector
    //sector.cells[cell.x][cell.y] = new Object();
    sector.cells[cell.x][cell.y].type = doomtrooper.type;
    sector.cells[cell.x][cell.y].index = Doomtroopers.doomtrooperList.length - 1;

    //game logic/data
    doomtrooper.type = "doomtrooper";
    doomtrooper.actionsUsed = 0;
    doomtrooper.remainingActions = 2;
    doomtrooper.actionsPerTurn = 2;
    doomtrooper.stepsPerAction = 3;
    doomtrooper.remainingSteps = 0;

    GameGlobals.stage.addChild(doomtrooper);

    return doomtrooper.index;
}

Doomtroopers.SelectDoomtrooper = function (event) {
    Interaction.SelectDoomtrooper(event.data, this);
}

Doomtroopers.MoveDoomtrooper = function (doomtrooper, fromSector, toSector, destinationCell) {
    if (doomtrooper.remainingSteps >= 1) {
        doomtrooper.remainingSteps--;
        console.log("Remaining Steps: " + doomtrooper.remainingSteps + "/" + doomtrooper.stepsPerAction + ", Remaining Actions: " + doomtrooper.remainingActions);
    } else if (doomtrooper.remainingSteps <= 0 && doomtrooper.remainingActions > 0) {
        doomtrooper.remainingSteps = doomtrooper.stepsPerAction;
        doomtrooper.remainingSteps--;
        doomtrooper.remainingActions--;
        doomtrooper.actionsUsed++;
        console.log("Remaining Steps: " + doomtrooper.remainingSteps + "/" + doomtrooper.stepsPerAction + ", Remaining Actions: " + doomtrooper.remainingActions);
    } else {
        console.log("Error: Move failed");
        return false;
    }

    //un-register the doomtrooper on the sector of the old spot
    //var oldPosition = Utilities.ConvertCoordToCell(doomtrooper.position.x, doomtrooper.position.y);
    fromSector.cells[doomtrooper.boardLocation.x].splice(doomtrooper.boardLocation.y, 1);
    fromSector.cells[doomtrooper.boardLocation.y].length = 8;

    //move to new position
    doomtrooper.position.x = destinationCell.x * Board.Sectors.CELLWIDTH;
    doomtrooper.position.y = destinationCell.y * Board.Sectors.CELLHEIGHT;

    //register the doomtrooper on the sector of the new spot
    //toSector.cells[destinationCell.x][destinationCell.y] = new Object();
    toSector.cells[destinationCell.x][destinationCell.y].type = doomtrooper.type;
    toSector.cells[destinationCell.x][destinationCell.y].index = Doomtroopers.doomtrooperList.length - 1;
}

Doomtroopers.VerifyDoomtrooperMoveValid = function (doomtrooper, fromSector, toSector, destinationCell) {
    var result = "";

    //VERIFY THE DOOMTROOPER HAS ACTIONS AVAILABLE
    if (doomtrooper.remainingSteps <= 0 && doomtrooper.remainingActions == 0) {
        return "No actions available";
    } else {
        result = "Success";
    }

    //VERIFY THE DOOMTROOPER IS MOVING TO AN EMPTY CELL
    if (typeof toSector.cells[destinationCell.x] != "undefined") {   //first verify x coord is valid
        if (typeof toSector.cells[destinationCell.x][destinationCell.y] != "undefined") {    //then verify y coord is valid
            return "Selected position is occupied or not valid";
        }
    }

    //VERIFY A WALL IS NOT IN THE WAY


    return result;
}