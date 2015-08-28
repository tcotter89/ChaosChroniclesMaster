Legion.Legionnaires = {};
Legion.Legionnaires.unitList = [];

Legion.Legionnaires.AddNewLegionnaire = function (sector, cell, imgPath) {
    var unit = new Object();

    //drawing/graphics data
    var texture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + imgPath);
    unit = new PIXI.Sprite(texture);

    unit.width = Board.Sectors.CELLWIDTH;
    unit.height = Board.Sectors.CELLHEIGHT;
    unit.position.x = cell.x * Board.Sectors.CELLWIDTH;
    unit.position.y = cell.y * Board.Sectors.CELLHEIGHT;

    unit.boardLocation = new Object();
    unit.boardLocation.x = cell.x;
    unit.boardLocation.y = cell.y;
    unit.boardLocation.sectorIndex = sector.index;

    unit.interactive = true;
    unit.on('mousedown', Legion.Legionnaires.SelectUnit);

    unit.index = Legion.Legionnaires.unitList.length;   //the length will find the index that the new legionnaire will be pushed to
    Legion.Legionnaires.unitList.push(unit);

    //game logic/data
    unit.type = "legionnaire";
    unit.actionsUsed = 0;
    unit.remainingActions = 2;
    unit.actionsPerTurn = 2;
    unit.stepsPerAction = 3;
    unit.remainingSteps = 0;

    //register the legionnaire on the sector
    //sector.cells[cell.x][cell.y] = new Object();
    sector.cells[cell.x][cell.y].type = unit.type;
    sector.cells[cell.x][cell.y].index = Legion.Legionnaires.unitList.length - 1;

    GameGlobals.stage.addChild(unit);

    return unit.index;
}

Legion.Legionnaires.SelectUnit = function (event) {
    Interaction.SelectUnit(event.data, this);
}

Legion.Legionnaires.MoveLegionnaire = function (unit, fromSector, toSector, destinationCell) {
    if (unit.remainingSteps >= 1) {
        unit.remainingSteps--;
        console.log("Remaining Steps: " + unit.remainingSteps + "/" + unit.stepsPerAction + ", Remaining Actions: " + unit.remainingActions);
    } else if (unit.remainingSteps <= 0 && unit.remainingActions > 0) {
        unit.remainingSteps = unit.stepsPerAction;
        unit.remainingSteps--;
        unit.remainingActions--;
        unit.actionsUsed++;
        console.log("Remaining Steps: " + unit.remainingSteps + "/" + unit.stepsPerAction + ", Remaining Actions: " + unit.remainingActions);
    } else {
        console.log("Error: Move failed");
        return false;
    }

    //un-register the unit on the sector of the old spot
    //var oldPosition = Utilities.ConvertCoordToCell(unit.position.x, unit.position.y);
    fromSector.cells[unit.boardLocation.x].splice(unit.boardLocation.y, 1);
    fromSector.cells[unit.boardLocation.y].length = 8;

    //move to new position
    unit.position.x = destinationCell.x * Board.Sectors.CELLWIDTH;
    unit.position.y = destinationCell.y * Board.Sectors.CELLHEIGHT;

    //register the uit on the sector of the new spot
    //toSector.cells[destinationCell.x][destinationCell.y] = new Object();
    toSector.cells[destinationCell.x][destinationCell.y].type = unit.type;
    toSector.cells[destinationCell.x][destinationCell.y].index = Legion.Legionnaires.unitList.length - 1;
}

Legion.Legionnaires.VerifyUnitMoveValid = function (unit, fromSector, toSector, destinationCell) {
    var result = "";

    //VERIFY THE UNIT HAS ACTIONS AVAILABLE
    if (unit.remainingSteps <= 0 && unit.remainingActions == 0) {
        return "No actions available";
    } else {
        result = "Success";
    }

    //VERIFY THE UNIT IS MOVING TO AN EMPTY CELL
    if (typeof toSector.cells[destinationCell.x] != "undefined") {   //first verify x coord is valid
        if (typeof toSector.cells[destinationCell.x][destinationCell.y] != "undefined") {    //then verify y coord is valid
            return "Selected position is occupied or not valid";
        }
    }

    //VERIFY A WALL IS NOT IN THE WAY


    return result;
}