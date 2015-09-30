var Interaction = {};

Interaction.currentSelected = new Object();
Interaction.currentTargeted = new Object();
Interaction.currentSector = new Object();

//Interaction.SelectDoomtrooper = function (data, doomtrooper) {
//    Interaction.currentSelected = doomtrooper;
//    console.log("Doomtrooper " + doomtrooper.index + " Selected");
//}
Interaction.SelectUnit = function (unit) {
    Interaction.currentSelected = unit;
    console.log("Unit of type " + unit.type + " with index " + unit.index + " Selected");
}
Interaction.TargetUnit = function (unit) {
    Interaction.currentTargeted = unit;
    console.log("Unit of type " + unit.type + " with index " + unit.index + " Targeted");

    Interaction.AttackUnit();
}
Interaction.AttackUnit = function () {
    var results;

    //first determine attack type: ranged or melee
    var attackerBoardLocation = Interaction.currentSelected.boardLocation;
    var victimBoardLocation = Interaction.currentTargeted.boardLocation;
    var fromSector = $.grep(Board.currentBoard.sectorMap, function (e) { return e.Sector.sectorNumber == attackerBoardLocation.sectorNumber })[0].Sector;
    var toSector = $.grep(Board.currentBoard.sectorMap, function (e) { return e.Sector.sectorNumber == victimBoardLocation.sectorNumber })[0].Sector;
    var miniGrid = Board.Sectors.ConstructMiniGrid(attackerBoardLocation, victimBoardLocation, fromSector, toSector, GameConstants.MOVEMENTGRIDSIZEX, GameConstants.MOVEMENTGRIDSIZEY);
    var inMeleeRange = Board.Sectors.AreCellsWithinOne(miniGrid);
    if (inMeleeRange == true) {
        console.log(Interaction.currentSelected.name + " is attacking " + Interaction.currentTargeted.name + " with a melee attack");
        results = Units.AttackUnit(Interaction.currentSelected, Interaction.currentTargeted, 'Melee');
    } else {
        console.log(Interaction.currentSelected.name + " is attacking " + Interaction.currentTargeted.name + " with a firearms attack");
        results = Units.AttackUnit(Interaction.currentSelected, Interaction.currentTargeted, 'Firearms');
    }

    if (results.success === false) {
        console.log("Attack failed, you are unable to damage the target from this range with this weapon");
    }
}
Interaction.SelectSector = function (data, sector) {
    Interaction.currentSector = sector;
    //console.log("Sector " + sector.index + " Selected");

    //make sure the unit is already on the board
    if (typeof(Interaction.currentSelected.type) != "undefined") {
        if (typeof (Interaction.currentSelected.boardLocation) != "undefined" &&
            typeof (Interaction.currentSelected.boardLocation.sectorIndex) != "undefined" &&
            Interaction.currentSelected.boardLocation.sectorIndex != "-1" &&
            Interaction.currentSelected.dead == false) {
            Interaction.AttemptMove(data);
        }
        ////otherwise, attempt to enter a unit to the board
        //else {
        //    Interaction.AttemptEnter(data);
        //}
    } else {
        console.log("Error: Nothing is selected");
        return false;
    }
}

//Interaction.AttemptMove = function (data) {
//    GameGlobals.mouse.x = data.global.x;
//    GameGlobals.mouse.y = data.global.y;

//    if (Interaction.currentSelected.type == "doomtrooper") {
//        cellCoords = Utilities.ConvertCoordToCell(GameGlobals.mouse.x, GameGlobals.mouse.y);
//        var movementCheck = Doomtroopers.VerifyDoomtrooperMoveValid(Interaction.currentSelected, Board.Sectors.sectorList[Interaction.currentSelected.boardLocation.sectorIndex], Interaction.currentSector, cellCoords);
//        if (movementCheck == "Success") {
//            //Interaction.PerformMove(Interaction.currentSelected.index, Interaction.currentSector.index, cellCoords.x, cellCoords.y);
//            //Doomtroopers.MoveDoomtrooper(Interaction.currentSelected, Board.Sectors.sectorList[Interaction.currentSelected.boardLocation.sectorIndex], Interaction.currentSector, cellCoords);
//            Networking.SendDoomtrooperMove(Interaction.currentSelected.index, Interaction.currentSector.index, cellCoords.x, cellCoords.y);
//            return true;
//        } else {
//            console.log("Error: " + movementCheck);
//            return false;
//        }
//    } else {
//        console.log("Error: Nothing is selected");
//        return false;
//    }
//}

Interaction.AttemptEnter = function (entrance, entranceGroup, sector) {
    //var sectorCoordinates = data.getLocalPosition(Interaction.currentSector);
    //var cellCoords = Utilities.ConvertCoordToCellWithScale(sectorCoordinates.x, sectorCoordinates.y, Interaction.currentSector.scale);
    var unit = Interaction.currentSelected;
    //var enteringCell = Board.currentBoard.sectorMap[Interaction.currentSector.index].Sector.cells[cellCoords.x][cellCoords.y];
    //var enteringEntrance = $.grep(Board.currentBoard.sectorMap, function (e) {
    //    return $.grep(e.Sector.entrances, function (f) {
    //        $.grep(f.children, function (g) { return g.CellX == entrance.cellX && g.CellY == entrance.cellY })[0];
    //    })[0];
    //})[0];

    //check if the player has already entered a sector
    if (typeof (Players.playerList[Interaction.currentSelected.playerIndex].corporation.units.entranceGroup) != "undefined") {
        if (Players.playerList[Interaction.currentSelected.playerIndex].corporation.units.entranceGroup == entranceGroup) {
            Interaction.PerformEnter(unit.index, entrance.index, entranceGroup.index, sector.index);
        } else {
            console.log("Error: You must enter all of your units through the same entrance");
        }
    }
    //otherwise register that they are using this entrance
    else {
        Interaction.PerformEnter(unit.index, entrance.index, entranceGroup.index, sector.index);
        //Players.playerList[Interaction.currentSelected.playerIndex].corporation.units.entranceGroup = entranceGroup;
    }
}

Interaction.PerformEnter = function (unitIndex, entranceIndex, entranceGroupIndex, sectorIndex) {
    //find appropriate objects using passed indices
    var unit = Units.instanceList[unitIndex];
    var sector = Board.currentBoard.sectorMap[sectorIndex].Sector;
    var entranceGroup = sector.entrances[entranceGroupIndex];
    var entrance = entranceGroup.children[entranceIndex];

    //register that this player is using this entrance
    Players.playerList[unit.playerIndex].corporation.units.entranceGroup = entranceGroup;

    //find the cell of the entrance and move the unit there
    var destinationCell = sector.cells[entrance.cellX][entrance.cellY];
    Units.MoveUnit(unit, sector, sector, destinationCell);
}

Interaction.AttemptMove = function (data) {
    var sectorCoordinates = data.getLocalPosition(Interaction.currentSector);
    var cellCoords = Utilities.ConvertCoordToCellWithScale(sectorCoordinates.x, sectorCoordinates.y, Interaction.currentSector.scale);
    //console.log("Click: (" + cellCoords.x + "," + cellCoords.y + ") Sector " + Interaction.currentSector.sectorNumber +
    //    " with global coords (" + data.global.x + "," + data.global.y + ")");

    //parameter setup
    var unit = Interaction.currentSelected;
    var fromSector = $.grep(Board.currentBoard.sectorMap, function (e) { return e.Sector.sectorNumber == Interaction.currentSelected.boardLocation.sectorNumber })[0].Sector;
    var toSector = Interaction.currentSector;
    var destinationCell = Board.currentBoard.sectorMap[Interaction.currentSector.index].Sector.cells[cellCoords.x][cellCoords.y];

    var movementCheck = Units.VerifyUnitMoveValid(unit, fromSector, toSector, destinationCell);
    if (movementCheck == "Success") {
        //Interaction.PerformMove(Interaction.currentSelected.index, Interaction.currentSector.index, cellCoords.x, cellCoords.y);
        //Doomtroopers.MoveDoomtrooper(Interaction.currentSelected, Board.Sectors.sectorList[Interaction.currentSelected.boardLocation.sectorIndex], Interaction.currentSector, cellCoords);
        Networking.SendUnitMove(Interaction.currentSelected.index, Interaction.currentSector.index, cellCoords.x, cellCoords.y);
        return true;
    } else {
        console.log("Error: " + movementCheck);
        return false;
    }
}

//Interaction.PerformMove = function (doomtrooperIndex, toSectorIndex, gridCellX, gridCellY) {
//    var cellCoords = new Object();
//    cellCoords.x = gridCellX;
//    cellCoords.y = gridCellY;
//    var fromSectorIndex = Doomtroopers.doomtrooperList[doomtrooperIndex].boardLocation.sectorIndex;
//    Doomtroopers.MoveDoomtrooper(Doomtroopers.doomtrooperList[doomtrooperIndex], Board.Sectors.sectorList[fromSectorIndex], Board.Sectors.sectorList[toSectorIndex], cellCoords);
//}
Interaction.PerformMove = function (unitIndex, toSectorIndex, gridCellX, gridCellY) {

    var unit = Units.instanceList[unitIndex]
    var fromSector = Board.currentBoard.sectorMap[Units.instanceList[unitIndex].boardLocation.sectorIndex].Sector;
    var toSector = Board.currentBoard.sectorMap[toSectorIndex].Sector;
    var toCell = toSector.cells[gridCellX][gridCellY];

    Units.MoveUnit(unit, fromSector, toSector, toCell);
}

//Interaction.HandleLeftClick = function (event) {
//    //alert('test left click');
//    //var x = (event.pageX - event.offset().left);
//    //var y = (GameConstants.HEIGHT - (event.pageY - event.offset().top));
//    GameGlobals.mouse.x = event.offsetX;
//    GameGlobals.mouse.y = event.offsetY;
//    //GameGlobals.mouse.x = (event.clientX / GameConstants.CANVAS_WIDTH) * 2 - 1;
//    //GameGlobals.mouse.y = -(event.clientY / GameConstants.CANVAS_HEIGHT) * 2 + 1;

//    Interaction.currentSelected = Doomtroopers.doomtrooperList[0];
//    currentSector = Board.Sectors.sectorList[0];

//    if (Interaction.currentSelected.type == "doomtrooper") {
//        cellCoords = Utilities.ConvertCoordToCell(GameGlobals.mouse.x, GameGlobals.mouse.y);
//        var movementCheck = Doomtroopers.VerifyDoomtrooperMoveValid(Interaction.currentSelected, currentSector, currentSector, cellCoords);
//        if (movementCheck == "Success") {
//            Doomtroopers.MoveDoomtrooper(Interaction.currentSelected, currentSector, currentSector, cellCoords);
//        } else {
//            console.log("Error: " + movementCheck);
//        }
//    } else {
//        console.log("Error: Nothing is selected");
//    }
//}

//Interaction.HandleRightClick = function (event) {
//    alert('test right click');
//}