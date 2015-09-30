Board.Sectors = {};

Board.Sectors.CELLWIDTH = 60;
Board.Sectors.CELLHEIGHT = 60;
Board.Sectors.CELLSPERSECTOR = 64
Board.Sectors.CELLSPERSECTORSIDE = Math.sqrt(Board.Sectors.CELLSPERSECTOR);

Board.Sectors.sectorList = [];

$(function () {
    //alert('load sector script');
});

//Board.Sectors.AddNewSector = function (sectorNumber, firstTimeLoad) {
//    var sector = new Object();

//    //sector.grid = new Array(Board.Sectors.CELLSPERSECTORSIDE); //2d array 
//    //for (i = 0; i < Board.Sectors.CELLSPERSECTORSIDE; i++) {
//    //    sector.grid[i] = new Array(Board.Sectors.CELLSPERSECTORSIDE);
//    //}

//    //load from database
//    $.ajax({
//        url: "/Home/GetSectorData",
//        type: "POST",
//        data: { 'ObjectIdentifier': sectorNumber },
//        dataType: "json",
//        success: function (result) {
//            switch (result.Result) {
//                case true:
//                    sector = new PIXI.Container();

//                    //from database
//                    sector.imgPath = result.Data.ImgPath;
//                    var texture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + sector.imgPath);
//                    var background = new PIXI.Sprite(texture);
//                    sector.addChild(background);

//                    sector.sectorNumber = result.Data.SectorNumber;
//                    sector.name = result.Data.SectorName;
//                    sector.description = result.Data.SectorDescription;

//                    background.interactive = true;
//                    //sector.buttonMode = true;
//                    background.on('click', Board.Sectors.SelectSector);

//                    sector.cellsX = result.Data.Width;
//                    sector.cellsY = result.Data.Height;
//                    sector.anchor.set(0.5); //centered
//                    sector.width = Board.Sectors.CELLWIDTH * sector.cellsX;
//                    sector.height = Board.Sectors.CELLHEIGHT * sector.cellsY;
//                    sector.position.x = (sector.width * sector.anchor.x) + Board.FRAMEOFFSETX;
//                    sector.position.y = (sector.height * sector.anchor.y) + Board.FRAMEOFFSETY;

//                    sector.cells = result.Data.Cells;

//                    //array logic
//                    sector.index = Board.Sectors.sectorList.length;   //the length will find the index that the new sector will be pushed to
//                    Board.Sectors.sectorList.push(sector);

//                    //GameGlobals.stage.addChild(sector);

//                    if (firstTimeLoad == true) {
//                        Setup.loadingStep++;
//                        Setup.ProcessLoadingQueue();
//                        break;
//                    } else {
//                        return sector.index;
//                    }
//                default:
//                    GameGlobals.error.html("Sector " + sectorNumber + " was not found in the database");
//                    break;
//            }
//        },
//        error: function () {
//            GameGlobals.error.html("There was an unknown error while trying to load sector " + sectorNumber + " data");
//        }
//    });
//}

Board.Sectors.LoadSector = function (sectorMap) {
    var sector = sectorMap.Sector;  //the c# version
    var boardSector = new PIXI.Container;

    var texture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + sector.ImgPath);
    var background = new PIXI.Sprite(texture);

    boardSector.sectorNumber = sector.SectorNumber;
    boardSector.name = sector.SectorName;
    boardSector.description = sector.SectorDescription;

    background.interactive = true;
    background.on('click', Board.Sectors.SelectSector);

    boardSector.cellsX = sector.Width;
    boardSector.cellsY = sector.Height;
    boardSector.width  = Board.Sectors.CELLWIDTH * boardSector.cellsX;
    boardSector.height = Board.Sectors.CELLHEIGHT * boardSector.cellsY;
    background.width  = Board.Sectors.CELLWIDTH * boardSector.cellsX;
    background.height = Board.Sectors.CELLHEIGHT * boardSector.cellsY;

    boardSector.scale.x = 1;
    boardSector.scale.y = 1;

    boardSector.LocationX = sectorMap.LocationX;
    boardSector.LocationY = sectorMap.LocationY;
    var boardLocationX = sectorMap.LocationX;   //this is the offset of the sector map. if sector is at top left, next to it, etc
    var boardLocationY = sectorMap.LocationY;
    var anchorOffsetX = 0;
    var anchorOffsetY = 0;
    boardSector.position.x = ((Board.Sectors.CELLWIDTH * boardSector.cellsX) * boardLocationX) + Board.FRAMEOFFSETX + anchorOffsetX;
    boardSector.position.y = ((Board.Sectors.CELLHEIGHT * boardSector.cellsY) * boardLocationY) + Board.FRAMEOFFSETY + anchorOffsetY;

    boardSector.cells = sector.Cells;

    //first put background down
    boardSector.addChild(background);
    //next add entrances on top of background
    boardSector.entrances = Board.Sectors.LoadEntrances(boardSector, sectorMap, sector.Entrances);

    boardSector.background = background; //there is only 1 background per sector, therefore give an easy reference to it.
    //GameGlobals.stage.addChild(boardSector);

    return boardSector;
}

Board.Sectors.LoadEntrances = function (boardSector, sectorMap, sharedEntrances) {
    var entrances = [];
    if (sharedEntrances.length > 0) {
        Board.Sectors.EntranceCreate(boardSector, entrances, sharedEntrances, sectorMap.Sector, 'T', sectorMap.IsEntranceTBlocked, sectorMap.IsEntranceTForDoomtroopers, sectorMap.IsEntranceTForLegion);
        Board.Sectors.EntranceCreate(boardSector, entrances, sharedEntrances, sectorMap.Sector, 'R', sectorMap.IsEntranceRBlocked, sectorMap.IsEntranceRForDoomtroopers, sectorMap.IsEntranceRForLegion);
        Board.Sectors.EntranceCreate(boardSector, entrances, sharedEntrances, sectorMap.Sector, 'B', sectorMap.IsEntranceBBlocked, sectorMap.IsEntranceBForDoomtroopers, sectorMap.IsEntranceBForLegion);
        Board.Sectors.EntranceCreate(boardSector, entrances, sharedEntrances, sectorMap.Sector, 'L', sectorMap.IsEntranceLBlocked, sectorMap.IsEntranceLForDoomtroopers, sectorMap.IsEntranceLForLegion);
    }
    return entrances;
}

Board.Sectors.EntranceCreate = function (boardSector, entrances, sharedEntrances, sector, orientation, isEntranceBlocked, isEntranceForDoomtroopers, isEntranceForLegion) {
    var entrance = new PIXI.Container();
    entrance.name = orientation;
    var sharedEntrance = $.grep(sharedEntrances, function (e) { return e.Name.toUpperCase() == orientation.toUpperCase() })[0];
    if (typeof (sharedEntrance) != "undefined" && isEntranceBlocked != true) {

        //determine image
        var imgPath = GameConstants.Images.MISSING;
        if (isEntranceForDoomtroopers == true && isEntranceForLegion == true) {
            imgPath = GameConstants.Images.DECAL_ENTRANCE_BOTH;
        } else if (isEntranceForDoomtroopers == true && isEntranceForLegion == false) {
            imgPath = GameConstants.Images.DECAL_ENTRANCE_DOOMTROOPERS;
        } else if (isEntranceForDoomtroopers == false && isEntranceForLegion == true) {
            imgPath = GameConstants.Images.DECAL_ENTRANCE_LEGION;
        }
        var texture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + imgPath);

        //entrance1
        var entrance1 = new PIXI.Sprite(texture);
        entrance1.imgPath = imgPath;
        entrance1.width = Board.Sectors.CELLWIDTH;
        entrance1.height = Board.Sectors.CELLHEIGHT;
        entrance1.cellX = sharedEntrance.Cell1X;
        entrance1.cellY = sharedEntrance.Cell1Y;
        entrance1.anchor.x = 0.5;
        entrance1.anchor.y = 0.5;
        entrance1.interactive = true;
        entrance1.on("click", Board.Sectors.EntranceSelect);

        //entrance2
        var entrance2 = new PIXI.Sprite(texture);
        entrance2.imgPath = imgPath;
        entrance2.width = Board.Sectors.CELLWIDTH;
        entrance2.height = Board.Sectors.CELLHEIGHT;
        entrance2.cellX = sharedEntrance.Cell2X;
        entrance2.cellY = sharedEntrance.Cell2Y;
        entrance2.anchor.x = 0.5;
        entrance2.anchor.y = 0.5;
        entrance2.interactive = true;
        entrance2.on("click", Board.Sectors.EntranceSelect);

        //determine orientation
        entrance.position.x = sharedEntrance.Cell1X * Board.Sectors.CELLWIDTH;
        entrance.position.y = sharedEntrance.Cell1Y * Board.Sectors.CELLHEIGHT;
        if (orientation == "T") {
            entrance.width  = (Board.Sectors.CELLWIDTH  * 2);
            entrance.height = (Board.Sectors.CELLHEIGHT * 1);

            entrance1.rotation = 0.5 * Math.PI; //90 degrees
            entrance1.position.x = (Board.Sectors.CELLWIDTH  / 2);
            entrance1.position.y = (Board.Sectors.CELLHEIGHT / 2);

            entrance2.rotation = 0.5 * Math.PI; //90 degrees
            entrance2.position.x = Board.Sectors.CELLWIDTH + (Board.Sectors.CELLWIDTH / 2);
            entrance2.position.y = (Board.Sectors.CELLHEIGHT / 2);
        }
        else if (orientation == "B") {
            entrance.width = (Board.Sectors.CELLWIDTH * 2);
            entrance.height = (Board.Sectors.CELLHEIGHT * 1);

            entrance1.rotation = 1.5 * Math.PI; //270 degrees
            entrance1.position.x = (Board.Sectors.CELLWIDTH / 2);
            entrance1.position.y = (Board.Sectors.CELLHEIGHT / 2);

            entrance2.rotation = 1.5 * Math.PI; //270 degrees
            entrance2.position.x = Board.Sectors.CELLWIDTH + (Board.Sectors.CELLWIDTH / 2);
            entrance2.position.y = (Board.Sectors.CELLHEIGHT / 2);
        }
        else if (orientation == "L") {
            entrance.width = (Board.Sectors.CELLWIDTH * 1);
            entrance.height = (Board.Sectors.CELLHEIGHT * 2);

            entrance1.rotation = 0.0 * Math.PI; //0 degrees
            entrance1.position.x = (Board.Sectors.CELLWIDTH / 2);
            entrance1.position.y = (Board.Sectors.CELLHEIGHT / 2);

            entrance2.rotation = 0.0 * Math.PI; //0 degrees
            entrance2.position.x = (Board.Sectors.CELLWIDTH / 2);
            entrance2.position.y = Board.Sectors.CELLHEIGHT + (Board.Sectors.CELLHEIGHT / 2);
        }
        else if (orientation == "R") {
            entrance.width = (Board.Sectors.CELLWIDTH * 1);
            entrance.height = (Board.Sectors.CELLHEIGHT * 2);

            entrance1.rotation = 1.0 * Math.PI; //180 degrees
            entrance1.position.x = (Board.Sectors.CELLWIDTH / 2);
            entrance1.position.y = (Board.Sectors.CELLHEIGHT / 2);

            entrance2.rotation = 1.0 * Math.PI; //180 degrees
            entrance2.position.x = (Board.Sectors.CELLWIDTH / 2);
            entrance2.position.y = Board.Sectors.CELLHEIGHT + (Board.Sectors.CELLHEIGHT / 2);
        }
        //save to array and find index
        entrance.addChild(entrance1);
        entrance1.index = entrance.getChildIndex(entrance1);
        entrance.addChild(entrance2);
        entrance2.index = entrance.getChildIndex(entrance2);

        //save to array and find index
        entrance.index = entrances.length;   //the length will find the index that the new unit will be pushed to
        entrances.push(entrance);
        boardSector.addChild(entrance);
    }
    return entrance;
}


Board.Sectors.EntranceSelect = function (event) {
    if (Utilities.IsClickDragging() == false) {
        if (typeof (Interaction.currentSelected.type) != "undefined") {
            var entrance = this;
            var entranceGroup = this.parent;
            var entranceSector = this.parent.parent;
            Interaction.AttemptEnter(entrance, entranceGroup, entranceSector);
        }
    }
}

Board.Sectors.SelectSector = function (event) {
    if (Utilities.IsClickDragging() == false) {
        var sector = this.parent;
        Interaction.SelectSector(event.data, sector);
    }
}

Board.Sectors.AreCellsWithinOne = function (miniGrid) {
    var fromCell;
    for (i = 0; i < miniGrid.length && typeof(fromCell) === "undefined"; i++) {
        fromCell = $.grep(miniGrid[i], function (e) { return e.isFromCell === true })[0];
    }
    var toCell;
    for (i = 0; i < miniGrid.length && typeof (toCell) === "undefined"; i++) {
        toCell = $.grep(miniGrid[i], function (e) { return e.isToCell === true })[0];
    }

    if (typeof (toCell) == "undefined") {
        return false;
    } else if (Math.abs(fromCell.miniX - toCell.miniX) <= 1 &&
             Math.abs(fromCell.miniY - toCell.miniY) <= 1) {
        return true;
    }

    //else
    return false;

    //if (fromSector.sectorNumber == toSector.sectorNumber) { //in-sector movement

    //    //check for adjacent cells
    //    if (Math.abs(fromCell.x - toCell.x) <= 1) {
    //        if (Math.abs(fromCell.y - toCell.y) <= 1) {
    //            return true;
    //        }
    //    }
    //} else {    //otherwise check for adjacent sectors
    //    var fromSectorMap = Board.currentBoard.sectorMap[fromSector.index];
    //    var toSectorMap   = Board.currentBoard.sectorMap[  toSector.index];
    //    if (Math.abs(fromSectorMap.LocationX - toSectorMap.LocationX) <= 1 && Math.abs(fromSectorMap.LocationY - toSectorMap.LocationY) <= 1) {
    //        //A: fromSector below toSector
    //        if (fromSectorMap.LocationX == toSectorMap.LocationX && fromSectorMap.LocationY < toSectorMap.LocationY) {
    //            //check for adjacent cells
    //            if (Math.abs(fromCell.x - toCell.x) <= 1) {
    //                if (((toCell.y + toSector.cellsY) - fromCell.y) == 1) {
    //                    return true;
    //                }
    //            }
    //        }
    //        //B: fromSector below and right of toSector
    //        else if (fromSectorMap.LocationX > toSectorMap.LocationX && fromSectorMap.LocationY > toSectorMap.LocationY) {
    //            //check for adjacent cells
    //            if (((toCell.x + toSector.cellsX) - fromCell.x) == 1) {
    //                if (((toCell.y + toSector.cellsY) - fromCell.y) == 1) {
    //                    return true;
    //                }
    //            }
    //        }
    //        //C: fromSector right of toSector
    //        else if (fromSectorMap.LocationX > toSectorMap.LocationX && fromSectorMap.LocationY == toSectorMap.LocationY) {
    //            //check for adjacent cells
    //            if (((fromCell.x + fromSector.cellsX) - toCell.x) == 1) {
    //                if (Math.abs(fromCell.y - toCell.y) <= 1) {
    //                    return true;
    //                }
    //            }
    //        }
    //        //D: fromSector above and right of toSector
    //        else if (fromSectorMap.LocationX > toSectorMap.LocationX && fromSectorMap.LocationY < toSectorMap.LocationY) {
    //            //check for adjacent cells
    //            if (((fromCell.x + fromSector.cellsX) - toCell.x) == 1) {
    //                if (((toCell.y + toSector.cellsY) - fromCell.y) == 1) {
    //                    return true;
    //                }
    //            }
    //        }
    //        //E: fromSector above toSector
    //        else if (fromSectorMap.LocationX == toSectorMap.LocationX && fromSectorMap.LocationY > toSectorMap.LocationY) {
    //            //check for adjacent cells
    //            if (Math.abs(fromCell.x - toCell.x) <= 1) {
    //                if (((toCell.y + toSector.cellsY) - fromCell.y) == 1) {
    //                    return true;
    //                }
    //            }
    //        }
    //        //F: fromSector above and left of toSector
    //        else if (fromSectorMap.LocationX < toSectorMap.LocationX && fromSectorMap.LocationY < toSectorMap.LocationY) {
    //            //check for adjacent cells
    //            if (((toCell.x + toSector.cellsX) - fromCell.x) == 1) {
    //                if (((toCell.y + toSector.cellsY) - fromCell.y) == 1) {
    //                    return true;
    //                }
    //            }
    //        }
    //        //G: fromSector left of toSector
    //        else if (fromSectorMap.LocationX < toSectorMap.LocationX && fromSectorMap.LocationY == toSectorMap.LocationY) {
    //            //check for adjacent cells
    //            if (((toCell.x + toSector.cellsX) - fromCell.x) == 1) {
    //                if (Math.abs(fromCell.y - toCell.y) <= 1) {
    //                    return true;
    //                }
    //            }
    //        }
    //        //H: fromSector below and left of toSector
    //        else if (fromSectorMap.LocationX < toSectorMap.LocationX && fromSectorMap.LocationY > toSectorMap.LocationY) {
    //            //check for adjacent cells
    //            if (((toCell.x + toSector.cellsX) - fromCell.x) == 1) {
    //                if (((fromCell.y + fromSector.cellsY) - fromCell.y) == 1) {
    //                    return true;
    //                }
    //            }
    //        }
    //    }
    //}
    //return false;
}

Board.Sectors.IsWallInWay = function (miniGrid) {
    //it has already been determined that the from and to cells are 1 away, the following logic takes this into account to make things easier

    var fromCell;
    for (i = 0; i < miniGrid.length && typeof(fromCell) === "undefined"; i++) {
        fromCell = $.grep(miniGrid[i], function (e) { return e.isFromCell === true })[0];
    }
    var toCell;
    for (i = 0; i < miniGrid.length && typeof (toCell) === "undefined"; i++) {
        toCell = $.grep(miniGrid[i], function (e) { return e.isToCell === true })[0];
    }

    //moving horizontally
    if (fromCell.miniX != toCell.miniX && fromCell.miniY == toCell.miniY) {
        //fromCell right of toCell
        if (fromCell.miniX > toCell.miniX && (!fromCell.HasWestWall && !toCell.HasEastWall)) {
            return false;
            //fromCell left of toCell
        } else if (fromCell.miniX < toCell.miniX && (!fromCell.HasEastWall && !toCell.HasWestWall)) {
            return false;
        } else {
            return true;
        }
    }

    //moving vertically
    else if (fromCell.miniX == toCell.miniX && fromCell.miniY != toCell.miniY) {
        //fromCell below toCell
        if (fromCell.miniY > toCell.miniY && (!fromCell.HasNorthWall && !toCell.HasSouthWall)) {
            return false;
            //fromCell above toCell
        } else if (fromCell.miniY < toCell.miniY && (!fromCell.HasSouthWall && !toCell.HasNorthWall)) {
            return false;
        } else {
            return true;
        }
    }

    //moving diagonally
    else if (fromCell.miniY != toCell.miniY && fromCell.miniY != toCell.miniY) {
        //A: fromCell below and left of toCell
        if (fromCell.miniY > toCell.miniY && fromCell.miniX < toCell.miniX) {
            if (fromCell.HasEastWall || fromCell.HasNorthWall) { //detect fromCell L
                return true;
            }
            else if (toCell.HasWestWall || toCell.HasSouthWall) { //detect toCell L
                return true;
            }
            else if (miniGrid[fromCell.miniX][fromCell.miniY - 1].HasSouthWall && miniGrid[fromCell.miniX + 1][fromCell.miniY].HasNorthWall) { //detect __
                return true;
            }
            else if (miniGrid[fromCell.miniX][fromCell.miniY - 1].HasEastWall && miniGrid[fromCell.miniX + 1][fromCell.miniY].HasWestWall) { //detect |
                return true;
            } else {
                return false;
            }
        }
        //B: fromCell below and right of toCell
        if (fromCell.miniY > toCell.miniY && fromCell.miniX > toCell.miniX) {
            if (fromCell.HasWestWall || fromCell.HasNorthWall) { //detect fromCell L
                return true;
            }
            else if (toCell.HasEastWall || toCell.HasSouthWall) { //detect toCell L
                return true;
            }
            else if (miniGrid[fromCell.miniX][fromCell.miniY - 1].HasSouthWall  && miniGrid[fromCell.miniX - 1][fromCell.miniY].HasNorthWall) { //detect __
                return true;
            }
            else if (miniGrid[fromCell.miniX - 1][fromCell.miniY].HasEastWall && miniGrid[fromCell.miniX][fromCell.miniY - 1].HasWestWall) { //detect |
                return true;
            } else {
                return false;
            }
        }
        //C: fromCell above and left of toCell
        if (fromCell.miniY < toCell.miniY && fromCell.miniX < toCell.miniX) {
            if (fromCell.HasEastWall || fromCell.HasSouthWall) { //detect fromCell L
                return true;
            }
            else if (toCell.HasWestWall || toCell.HasNorthWall) { //detect toCell L
                return true;
            }
            else if (miniGrid[fromCell.miniX + 1][fromCell.miniY].HasSouthWall && miniGrid[fromCell.miniX][fromCell.miniY + 1].HasNorthWall) { //detect __
                return true;
            }
            else if (miniGrid[fromCell.miniX][fromCell.miniY + 1].HasEastWall && miniGrid[fromCell.miniX + 1][fromCell.miniY].HasWestWall) { //detect |
                return true;
            } else {
                return false;
            }
        }
        //D: fromCell above and right of toCell
        if (fromCell.miniY < toCell.miniY && fromCell.miniX > toCell.miniX) {
            if (fromCell.HasWestWall || fromCell.HasSouthWall) { //detect fromCell L
                return true;
            }
            else if (toCell.HasEastWall || toCell.HasNorthWall) { //detect toCell L
                return true;
            }
            else if (miniGrid[fromCell.miniX - 1][fromCell.miniY].HasSouthWall && miniGrid[fromCell.miniX][fromCell.miniY + 1].HasNorthWall) { //detect __
                return true;
            }
            else if (miniGrid[fromCell.miniX][fromCell.miniY + 1].HasWestWall && miniGrid[fromCell.miniX - 1][fromCell.miniY].HasEastWall) { //detect |
                return true;
            } else {
                return false;
            }
        }
    }
    //unknown movement
    return true;

    ////moving horizontally
    //if (fromCell.x != toCell.x && fromCell.y == toCell.y) {
    //    if (fromSector == toSector) {
    //        //fromCell right of toCell
    //        if (fromCell.x > toCell.x && (fromCell.HasWestWall == false && toCell.HasEastWall == false)) {
    //            return false;
    //            //fromCell left of toCell
    //        } else if (fromCell.x < toCell.x && (fromCell.HasEastWall == false && toCell.HasWestWall == false)) {
    //            return false;
    //        } else {
    //            return true;
    //        }
    //    } else {    //sector-to-sector movement
    //        //TODO: account for sector to sector movement
    //    }
    //}

    ////moving vertically
    //else if (fromCell.x == toCell.x && fromCell.y != toCell.y) {
    //    if (fromSector == toSector) {
    //        //fromCell below toCell
    //        if (fromCell.y > toCell.y && (fromCell.HasNorthWall == false && toCell.HasSouthWall == false)) {
    //            return false;
    //            //fromCell above toCell
    //        } else if (fromCell.y < toCell.y && (fromCell.HasSouthWall == false && toCell.HasNorthWall == false)) {
    //            return false;
    //        } else {
    //            return true;
    //        }
    //    } else {    //sector-to-sector movement
    //        //TODO: account for sector to sector movement
    //    }
    //}

    ////moving diagonally
    //else if (fromCell.y != toCell.y && fromCell.y != toCell.y) {
    //    //A: fromCell below and left of toCell
    //    if ((fromSector == toSector && fromCell.y > toCell.y && fromCell.x < toCell.x) || 
    //        (fromSector != toSector && fromCell.x == (fromSector.cellsX - 1) && toCell.x == 0 && fromCell.y > toCell.y)) {
    //        if (fromCell.HasEastWall && fromCell.HasNorthWall) { //detect fromCell L
    //            return true;
    //        }
    //        else if (toCell.HasWestWall && toCell.HasSouthWall) { //detect toCell L
    //            return true;
    //        }
    //        else if (fromCell.HasEastWall && toCell.HasWestWall) { //detect |
    //            return true;
    //        }
    //        else if (fromCell.HasNorthWall && toCell.HasSouthWall) { //detect __
    //            return true;
    //        } else {
    //            return false;
    //        }
    //    }
    //    //B: fromCell below and right of toCell
    //    if ((fromSector == toSector && fromCell.y > toCell.y && fromCell.x > toCell.x) ||
    //        (fromSector != toSector && toCell.x == (toSector.cellsX - 1) && fromCell.x == 0 && fromCell.y > toCell.y)) {
    //        if (fromCell.HasWestWall && fromCell.HasNorthWall) { //detect fromCell L
    //            return true;
    //        }
    //        else if (toCell.HasEastWall && toCell.HasSouthWall) { //detect toCell L
    //            return true;
    //        }
    //        else if (fromCell.HasWestWall && toCell.HasEastWall) { //detect |
    //            return true;
    //        }
    //        else if (fromCell.HasNorthWall && toCell.HasSouthWall) { //detect __
    //            return true;
    //        } else {
    //            return false;
    //        }
    //    }
    //    //C: fromCell above and left of toCell
    //    if ((fromSector == toSector && fromCell.y < toCell.y && fromCell.x < toCell.x) ||
    //        (fromSector != toSector && fromCell.x == (fromSector.cellsX - 1) && toCell.x == 0 && fromCell.y < toCell.y)) {
    //        if (fromCell.HasEastWall && fromCell.HasSouthWall) { //detect fromCell L
    //            return true;
    //        }
    //        else if (toCell.HasWestWall && toCell.HasNorthWall) { //detect toCell L
    //            return true;
    //        }
    //        else if (fromCell.HasEastWall && toCell.HasWestWall) { //detect |
    //            return true;
    //        }
    //        else if (fromCell.HasSouthWall && toCell.HasNorthWall) { //detect __
    //            return true;
    //        } else {
    //            return false;
    //        }
    //    }
    //    //D: fromCell above and right of toCell
    //    if ((fromSector == toSector && fromCell.y < toCell.y && fromCell.x > toCell.x) ||
    //        (fromSector != toSector && toCell.x == (toSector.cellsX - 1) && fromCell.x == 0 && fromCell.y < toCell.y)) {
    //        if (fromCell.HasWestWall && fromCell.HasSouthWall) { //detect fromCell L
    //            return true;
    //        }
    //        else if (toCell.HasEastWall && toCell.HasNorthWall) { //detect toCell L
    //            return true;
    //        }
    //        else if (fromCell.HasWestWall && toCell.HasEastWall) { //detect |
    //            return true;
    //        }
    //        else if (fromCell.HasSouthWall && toCell.HasNorthWall) { //detect __
    //            return true;
    //        } else {
    //            return false;
    //        }
    //    }
    //}

    ////unknown movement
    //return true;
}

Board.Sectors.ConstructMiniGrid = function (fromCell, toCell, fromSector, toSector, gridSizeX, gridSizeY) {
    var miniGrid = new Array(gridSizeX); //2d array of gridSizeX by gridSizeY cells
    for (x = 0; x < gridSizeX; x++) {
        miniGrid[x] = new Array(gridSizeY);
    }

    var middleX = Math.ceil((gridSizeX - 1) / 2);
    var middleY = Math.ceil((gridSizeY - 1) / 2);
    //miniGrid[middleX][middleY] = fromCell;  //the middle is always the fromCell

    for (x = -middleX; x <= middleX; x++) {
        for (y = -middleY; y <= middleY; y++) {
            //verify the spot we are about to access is a valid cell on the sector
            if (fromCell.x + x < fromSector.cellsX && fromCell.x + x >= 0 &&
                fromCell.y + y < fromSector.cellsY && fromCell.y + y >= 0) {
                var nearbyCell = fromSector.cells[fromCell.x + x][fromCell.y + y];
                Board.Sectors.CreateMiniGridCell(fromCell, toCell, nearbyCell, miniGrid, middleX, x, middleY, y);
            } else {
                //load sector above and right
                if (fromCell.y + y < 0 && fromCell.x + x > (fromSector.cellsX - 1)) {
                    var newSector = $.grep(Board.currentBoard.sectorMap, function (e) { return e.LocationX == fromSector.LocationX + 1 && e.LocationY == fromSector.LocationY - 1 })[0];
                    if (typeof (newSector) != "undefined") {
                        newSector = newSector.Sector;
                        var nearbyCell = newSector.cells[0 - 1 + x][(newSector.cellsY - 1) + 1 + y];    //the - 1 & + 1 is because it takes a step to get here
                        Board.Sectors.CreateMiniGridCell(fromCell, toCell, nearbyCell, miniGrid, middleX, x, middleY, y);
                    } else { Board.Sectors.CreateEmptyCell(fromCell, toCell, miniGrid, middleX, x, middleY, y); }   //empty cell
                }
                //load sector above and left
                else if (fromCell.y + y < 0 && fromCell.x + x < 0) {
                    var newSector = $.grep(Board.currentBoard.sectorMap, function (e) { return e.LocationX == fromSector.LocationX - 1 && e.LocationY == fromSector.LocationY - 1 })[0];
                    if (typeof (newSector) != "undefined") {
                        newSector = newSector.Sector;
                        var nearbyCell = newSector.cells[0 - 1 + x][0 - 1 + y];    //the - 1 is because it takes a step to get here
                        Board.Sectors.CreateMiniGridCell(fromCell, toCell, nearbyCell, miniGrid, middleX, x, middleY, y);
                    } else { Board.Sectors.CreateEmptyCell(fromCell, toCell, miniGrid, middleX, x, middleY, y); }   //empty cell
                }
                //load sector below and right
                else if (fromCell.y + y > (fromSector.cellsY - 1) && fromCell.x + x > (fromSector.cellsX - 1)) {
                    var newSector = $.grep(Board.currentBoard.sectorMap, function (e) { return e.LocationX == fromSector.LocationX + 1 && e.LocationY == fromSector.LocationY + 1 })[0];
                    if (typeof (newSector) != "undefined") {
                        newSector = newSector.Sector;
                        var nearbyCell = newSector.cells[(newSector.cellsX - 1) + 1 + x][(newSector.cellsY - 1) + 1 + y];    //the + 1 is because it takes a step to get here
                        Board.Sectors.CreateMiniGridCell(fromCell, toCell, nearbyCell, miniGrid, middleX, x, middleY, y);
                    } else { Board.Sectors.CreateEmptyCell(fromCell, toCell, miniGrid, middleX, x, middleY, y); }   //empty cell
                }
                //load sector below and left
                else if (fromCell.y + y > (fromSector.cellsY - 1) && fromCell.x + x < 0) {
                    var newSector = $.grep(Board.currentBoard.sectorMap, function (e) { return e.LocationX == fromSector.LocationX - 1 && e.LocationY == fromSector.LocationY + 1 })[0];
                    if (typeof (newSector) != "undefined") {
                        newSector = newSector.Sector;
                        var nearbyCell = newSector.cells[(newSector.cellsX - 1) + 1 + x][0 - 1 + y];    //the - 1 & + 1 is because it takes a step to get here
                        Board.Sectors.CreateMiniGridCell(fromCell, toCell, nearbyCell, miniGrid, middleX, x, middleY, y);
                    } else { Board.Sectors.CreateEmptyCell(fromCell, toCell, miniGrid, middleX, x, middleY, y); }   //empty cell
                }
                //load sector to the left
                else if (fromCell.x + x < 0 && (fromCell.y + y >= 0 && fromCell.y + y < fromSector.cellsY)) {
                    var newSector = $.grep(Board.currentBoard.sectorMap, function (e) { return e.LocationX == fromSector.LocationX - 1 && e.LocationY == fromSector.LocationY })[0];
                    if (typeof (newSector) != "undefined") {
                        newSector = newSector.Sector;
                        var nearbyCell = newSector.cells[(newSector.cellsX - 1) + 1 + x][fromCell.y + y];   //the  + 1 is because it takes a step to get here
                        Board.Sectors.CreateMiniGridCell(fromCell, toCell, nearbyCell, miniGrid, middleX, x, middleY, y);
                    } else { Board.Sectors.CreateEmptyCell(fromCell, toCell, miniGrid, middleX, x, middleY, y); }   //empty cell
                }
                //load sector to the right
                else if (fromCell.x + x > (fromSector.cellsX - 1) && (fromCell.y + y >= 0 && fromCell.y + y < fromSector.cellsY)) {
                    var newSector = $.grep(Board.currentBoard.sectorMap, function (e) { return e.LocationX == fromSector.LocationX + 1 && e.LocationY == fromSector.LocationY })[0];
                    if (typeof (newSector) != "undefined") {
                        newSector = newSector.Sector;
                        var nearbyCell = newSector.cells[0 - 1 + x][fromCell.y + y];    //the - 1 is because it takes a step to get here
                        Board.Sectors.CreateMiniGridCell(fromCell, toCell, nearbyCell, miniGrid, middleX, x, middleY, y);
                    } else { Board.Sectors.CreateEmptyCell(fromCell, toCell, miniGrid, middleX, x, middleY, y); }   //empty cell
                }
                //load sector below
                else if (fromCell.y + y > (fromSector.cellsY - 1) && (fromCell.x + x >= 0 && fromCell.x + x < fromSector.cellsX)) {
                    var newSector = $.grep(Board.currentBoard.sectorMap, function (e) { return e.LocationX == fromSector.LocationX && e.LocationY == fromSector.LocationY + 1 })[0];
                    if (typeof (newSector) != "undefined") {
                        newSector = newSector.Sector;
                        var nearbyCell = newSector.cells[fromCell.x + x][0 - 1 + y];    //the - 1 is because it takes a step to get here
                        Board.Sectors.CreateMiniGridCell(fromCell, toCell, nearbyCell, miniGrid, middleX, x, middleY, y);
                    } else { Board.Sectors.CreateEmptyCell(fromCell, toCell, miniGrid, middleX, x, middleY, y); }   //empty cell
                }
                //load sector above
                else if (fromCell.y + y < 0 && (fromCell.x + x >= 0 && fromCell.x + x < fromSector.cellsX)) {
                    var newSector = $.grep(Board.currentBoard.sectorMap, function (e) { return e.LocationX == fromSector.LocationX && e.LocationY == fromSector.LocationY - 1 })[0];
                    if (typeof (newSector) != "undefined") {
                        newSector = newSector.Sector;
                        var nearbyCell = newSector.cells[fromCell.x + x][(newSector.cellsY - 1) + 1 + y];    //the + 1 is because it takes a step to get here
                        Board.Sectors.CreateMiniGridCell(fromCell, toCell, nearbyCell, miniGrid, middleX, x, middleY, y);
                    } else { Board.Sectors.CreateEmptyCell(fromCell, toCell, miniGrid, middleX, x, middleY, y); }   //empty cell
                } else {
                    Board.Sectors.CreateEmptyCell(fromCell, toCell, miniGrid, middleX, x, middleY, y); //empty cell
                }
            }
        }
    }


    return miniGrid;
}

Board.Sectors.CreateEmptyCell = function (fromCell, toCell, miniGrid, middleX, x, middleY, y) {
    Board.Sectors.CreateMiniGridCell(fromCell, toCell, new Object(), miniGrid, middleX, x, middleY, y);
}

Board.Sectors.CreateMiniGridCell = function (fromCell, toCell, nearbyCell, miniGrid, middleX, x, middleY, y) {
    //set miniGrid x and y
    nearbyCell.miniX = middleX + x;
    nearbyCell.miniY = middleY + y;

    //reset before assigning new values
    nearbyCell.isFromCell = false;
    nearbyCell.isToCell = false;
    //set from and to cells
    if (nearbyCell.CellID == fromCell.CellID) {
        nearbyCell.isFromCell = true;
    } else if (nearbyCell.CellID == toCell.CellID) {
        nearbyCell.isToCell = true;
    }
    miniGrid[nearbyCell.miniX][nearbyCell.miniY] = nearbyCell;
}