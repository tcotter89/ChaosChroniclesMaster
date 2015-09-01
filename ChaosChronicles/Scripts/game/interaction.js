var Interaction = {};

Interaction.currentSelected = new Object();
Interaction.currentTargeted = new Object();
Interaction.currentSector = new Object();

//Interaction.SelectDoomtrooper = function (data, doomtrooper) {
//    Interaction.currentSelected = doomtrooper;
//    console.log("Doomtrooper " + doomtrooper.index + " Selected");
//}
Interaction.SelectUnit = function (data, unit) {
    Interaction.currentSelected = unit;
    console.log("Unit of type " + unit.type + " with index " + unit.index + " Selected");
}
Interaction.TargetUnit = function (data, unit) {
    Interaction.currentTargeted = unit;
    console.log("Unit of type " + unit.type + " with index " + unit.index + " Targeted");

    Interaction.AttackUnit(data, unit);
}
Interaction.AttackUnit = function () {
    console.log(Interaction.currentSelected.name + " is attacking " + Interaction.currentTargeted.name);

    //first determine attack type: ranged or melee
    var attackerBoardLocation = Interaction.currentSelected.boardLocation;
    var victimBoardLocation = Interaction.currentSelected.boardLocation;
    var inMeleeRange = Board.Sectors.AreCellsWithinOne(attackerBoardLocation, victimBoardLocation, Board.Sectors.sectorList[attackerBoardLocation.sectorIndex], Board.Sectors.sectorList[victimBoardLocation.sectorIndex]);
    if (inMeleeRange == true) {
        Units.AttackUnit(Interaction.currentSelected, Interaction.currentTargeted, 'Melee');
    } else {
        Units.AttackUnit(Interaction.currentSelected, Interaction.currentTargeted, 'Firearms');
    }
}
Interaction.SelectSector = function (data, sector) {
    Interaction.currentSector = sector;
    //console.log("Sector " + sector.index + " Selected");
    Interaction.AttemptMove(data);
    //if (Interaction.AttemptMove(data) == true) {
        //var cellCoords = Utilities.ConvertCoordToCell(data.global.x, data.global.y)
        //Networking.SendDoomtrooperMove(Interaction.currentSelected.index, sector.index, cellCoords.x, cellCoords.y);
    //}
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

Interaction.AttemptMove = function (data) {
    var sectorCoordinates = data.getLocalPosition(Interaction.currentSector);

    if (Interaction.currentSelected.type != undefined) {
        cellCoords = Utilities.ConvertCoordToCellWithScale(sectorCoordinates.x, sectorCoordinates.y, Interaction.currentSector.scale);
        console.log("Click: (" + cellCoords.x + "," + cellCoords.y + ") Sector " + Interaction.currentSector.sectorNumber +
            " with global coords (" + data.global.x + "," + data.global.y + ")");

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
    } else {
        console.log("Error: Nothing is selected");
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
    var cellCoords = new Object();
    cellCoords.x = gridCellX;
    cellCoords.y = gridCellY;
    var fromSectorIndex = Units.unitList[unitIndex].boardLocation.sectorIndex;
    Units.MoveUnit(Units.unitList[unitIndex], Board.currentBoard.sectorMap[fromSectorIndex].Sector, Board.currentBoard.sectorMap[toSectorIndex].Sector, cellCoords);
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