Board.Sectors = {};

Board.Sectors.CELLWIDTH = 60;
Board.Sectors.CELLHEIGHT = 60;
Board.Sectors.CELLSPERSECTOR = 64
Board.Sectors.CELLSPERSECTORSIDE = Math.sqrt(Board.Sectors.CELLSPERSECTOR);

Board.Sectors.sectorList = [];

$(function () {
    //alert('load sector script');
});

Board.Sectors.AddNewSector = function (sectorNumber, firstTimeLoad) {
    var sector = new Object();

    //sector.grid = new Array(Board.Sectors.CELLSPERSECTORSIDE); //2d array 
    //for (i = 0; i < Board.Sectors.CELLSPERSECTORSIDE; i++) {
    //    sector.grid[i] = new Array(Board.Sectors.CELLSPERSECTORSIDE);
    //}

    //load from database
    $.ajax({
        url: "/Home/GetSectorData",
        type: "POST",
        data: { 'ObjectIdentifier': sectorNumber },
        dataType: "json",
        success: function (result) {
            switch (result.Result) {
                case true:
                    sector = new PIXI.Container();

                    //from database
                    sector.imgPath = result.Data.ImgPath;
                    var texture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + sector.imgPath);
                    var background = new PIXI.Sprite(texture);
                    sector.addChild(background);

                    sector.sectorNumber = result.Data.SectorNumber;
                    sector.name = result.Data.SectorName;
                    sector.description = result.Data.SectorDescription;

                    background.interactive = true;
                    //sector.buttonMode = true;
                    background.on('click', Board.Sectors.SelectSector);

                    sector.cellsX = result.Data.Width;
                    sector.cellsY = result.Data.Height;
                    sector.anchor.set(0.5); //centered
                    sector.width = Board.Sectors.CELLWIDTH * sector.cellsX;
                    sector.height = Board.Sectors.CELLHEIGHT * sector.cellsY;
                    sector.position.x = (sector.width * sector.anchor.x) + Board.FRAMEOFFSETX;
                    sector.position.y = (sector.height * sector.anchor.y) + Board.FRAMEOFFSETY;

                    sector.cells = result.Data.Cells;

                    //array logic
                    sector.index = Board.Sectors.sectorList.length;   //the length will find the index that the new sector will be pushed to
                    Board.Sectors.sectorList.push(sector);

                    //GameGlobals.stage.addChild(sector);

                    if (firstTimeLoad == true) {
                        Setup.loadingStep++;
                        Setup.ProcessLoadingQueue();
                        break;
                    } else {
                        return sector.index;
                    }
                default:
                    GameGlobals.error.html("Sector " + sectorNumber + " was not found in the database");
                    break;
            }
        },
        error: function () {
            GameGlobals.error.html("There was an unknown error while trying to load sector " + sectorNumber + " data");
        }
    });
}

Board.Sectors.LoadSector = function (sectorMap) {
    var sector = sectorMap.Sector;  //the c# version
    var boardSector = new PIXI.Container;

    var texture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + sector.ImgPath);
    var background = new PIXI.Sprite(texture);

    boardSector.sectorNumber = sector.SectorNumber;
    boardSector.name = sector.SectorName;
    boardSector.description = sector.SectorDescription;

    background.interactive = true;
    //boardSector.buttonMode = true;
    background.on('click', Board.Sectors.SelectSector);

    boardSector.cellsX = sector.Width;
    boardSector.cellsY = sector.Height;
    boardSector.width = Board.Sectors.CELLWIDTH * boardSector.cellsX;
    boardSector.height = Board.Sectors.CELLHEIGHT * boardSector.cellsY;
    background.width = Board.Sectors.CELLWIDTH * boardSector.cellsX;
    background.height = Board.Sectors.CELLHEIGHT * boardSector.cellsY;

    boardSector.scale.x = 1;
    boardSector.scale.y = 1;
    //boardSector.anchor.set(0.5); //centered

    var boardLocationX = sectorMap.LocationX;   //this is the offset of the sector map. if sector is at top left, next to it, etc
    var boardLocationY = sectorMap.LocationY;
    var anchorOffsetX = 0;//boardSector.width * boardSector.anchor.x;   //this is the offset to fix positioning for the anchor. (difficult to understand)
    var anchorOffsetY = 0//boardSector.height * boardSector.anchor.y;
    boardSector.position.x = ((Board.Sectors.CELLWIDTH * boardSector.cellsX) * boardLocationX) + Board.FRAMEOFFSETX + anchorOffsetX;
    boardSector.position.y = ((Board.Sectors.CELLHEIGHT * boardSector.cellsY) * boardLocationY) + Board.FRAMEOFFSETY + anchorOffsetY;

    boardSector.cells = sector.Cells;

    //boardSector.entrances = Board.Sectors.LoadEntrances(sectorMap, sector.Entrances);

    boardSector.addChild(background);
    boardSector.background = background; //there is only 1 background per sector, therefore give an easy reference to it.
    //GameGlobals.stage.addChild(boardSector);

    return boardSector;
}

Board.Sectors.LoadEntrances = function (sectorMap, sharedEntrances) {
    var entrances = [];
    Board.Sectors.CreateEntrance(entrances, sharedEntrances, sectorMap.Sector, 'T',    sectorMap.IsEntranceTBlocked, sectorMap.IsEntranceTForDoomtroopers, sectorMap.IsEntranceTForLegion);
    Board.Sectors.CreateEntrance(entrances, sharedEntrances, sectorMap.Sector, 'R', sectorMap.IsEntranceRBlocked, sectorMap.IsEntranceRForDoomtroopers, sectorMap.IsEntranceRForLegion);
    Board.Sectors.CreateEntrance(entrances, sharedEntrances, sectorMap.Sector, 'B', sectorMap.IsEntranceBBlocked, sectorMap.IsEntranceBForDoomtroopers, sectorMap.IsEntranceBForLegion);
    Board.Sectors.CreateEntrance(entrances, sharedEntrances, sectorMap.Sector, 'L', sectorMap.IsEntranceLBlocked, sectorMap.IsEntranceLForDoomtroopers, sectorMap.IsEntranceLForLegion);
}

Board.Sectors.CreateEntrance = function (entrances, sharedEntrances, sector, orientation, isEntranceBlocked, isEntranceForDoomtroopers, isEntranceForLegion) {
    var entrance = new Object();
    var sharedEntrance = $.grep(sharedEntrances, function (e) { return e.Name.toUpperCase() == orientation.toUpperCase() })[0];
    if (isEntranceBlocked == true) {
        var imgPath;
        if (isEntranceForDoomtroopers == true && isEntranceForLegion == true) {
            imgPath = 'decals/bothEntrance.png';
        } else if (isEntranceForDoomtroopers == true && isEntranceForLegion == false) {
            imgPath = 'decals/doomEntrance.png';
        } else if (isEntranceForDoomtroopers == false && isEntranceForLegion == true) {
            imgPath = 'decals/legionEntrance.png';
        }
        var texture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + imgPath);
        entrance = new PIXI.Sprite(texture);
        entrance.imgPath = imgPath;

        entrance.width =  Board.Sectors.CELLWIDTH;
        entrance.height = Board.Sectors.CELLHEIGHT;
        entrance.position.x = sharedEntrance.CellX * Board.Sectors.CELLWIDTH;
        entrance.position.y = sharedEntrance.CellY * Board.Sectors.CELLHEIGHT;

        //sector.addChild(entrance);
        entrances.push(entrance);
    }
    return entrance;
}

Board.Sectors.SelectSector = function (event) {
    var sector = this.parent;
    Interaction.SelectSector(event.data, sector);
}

Board.Sectors.AreCellsWithinOne = function (fromCell, toCell, fromSector, toSector) {
    if (fromSector.sectorNumber == toSector.sectorNumber) { //in-sector movement

        //check for adjacent cells
        if (Math.abs(fromCell.x - toCell.x) <= 1) {
            if (Math.abs(fromCell.y - toCell.y) <= 1) {
                return true;
            }
        }
    } else {    //otherwise check for adjacent sectors
        var fromSectorMap = Board.currentBoard.sectorMap[fromSector.index];
        var toSectorMap   = Board.currentBoard.sectorMap[  toSector.index];
        if (Math.abs(fromSectorMap.LocationX - toSectorMap.LocationX) <= 1 && Math.abs(fromSectorMap.LocationY - toSectorMap.LocationY) <= 1) {
            //A: fromSector below toSector
            if (fromSectorMap.LocationX == toSectorMap.LocationX && fromSectorMap.LocationY < toSectorMap.LocationY) {
                //check for adjacent cells
                if (Math.abs(fromCell.x - toCell.x) <= 1) {
                    if (((toCell.y + toSector.cellsY) - fromCell.y) == 1) {
                        return true;
                    }
                }
            }
            //B: fromSector below and right of toSector
            else if (fromSectorMap.LocationX > toSectorMap.LocationX && fromSectorMap.LocationY > toSectorMap.LocationY) {
                //check for adjacent cells
                if (((toCell.x + toSector.cellsX) - fromCell.x) == 1) {
                    if (((toCell.y + toSector.cellsY) - fromCell.y) == 1) {
                        return true;
                    }
                }
            }
            //C: fromSector right of toSector
            else if (fromSectorMap.LocationX > toSectorMap.LocationX && fromSectorMap.LocationY == toSectorMap.LocationY) {
                //check for adjacent cells
                if (((fromCell.x + fromSector.cellsX) - toCell.x) == 1) {
                    if (Math.abs(fromCell.y - toCell.y) <= 1) {
                        return true;
                    }
                }
            }
            //D: fromSector above and right of toSector
            else if (fromSectorMap.LocationX > toSectorMap.LocationX && fromSectorMap.LocationY < toSectorMap.LocationY) {
                //check for adjacent cells
                if (((fromCell.x + fromSector.cellsX) - toCell.x) == 1) {
                    if (((toCell.y + toSector.cellsY) - fromCell.y) == 1) {
                        return true;
                    }
                }
            }
            //E: fromSector above toSector
            else if (fromSectorMap.LocationX == toSectorMap.LocationX && fromSectorMap.LocationY > toSectorMap.LocationY) {
                //check for adjacent cells
                if (Math.abs(fromCell.x - toCell.x) <= 1) {
                    if (((toCell.y + toSector.cellsY) - fromCell.y) == 1) {
                        return true;
                    }
                }
            }
            //F: fromSector above and left of toSector
            else if (fromSectorMap.LocationX < toSectorMap.LocationX && fromSectorMap.LocationY < toSectorMap.LocationY) {
                //check for adjacent cells
                if (((toCell.x + toSector.cellsX) - fromCell.x) == 1) {
                    if (((toCell.y + toSector.cellsY) - fromCell.y) == 1) {
                        return true;
                    }
                }
            }
            //G: fromSector left of toSector
            else if (fromSectorMap.LocationX < toSectorMap.LocationX && fromSectorMap.LocationY == toSectorMap.LocationY) {
                //check for adjacent cells
                if (((toCell.x + toSector.cellsX) - fromCell.x) == 1) {
                    if (Math.abs(fromCell.y - toCell.y) <= 1) {
                        return true;
                    }
                }
            }
            //H: fromSector below and left of toSector
            else if (fromSectorMap.LocationX < toSectorMap.LocationX && fromSectorMap.LocationY > toSectorMap.LocationY) {
                //check for adjacent cells
                if (((toCell.x + toSector.cellsX) - fromCell.x) == 1) {
                    if (((fromCell.y + fromSector.cellsY) - fromCell.y) == 1) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

Board.Sectors.IsWallInWay = function (fromCell, toCell, fromSector, toSector) {
    //it has already been determined that the from and to cells are 1 away, the following logic takes this into account to make things easier

    //moving horizontally
    if (fromCell.x != toCell.x && fromCell.y == toCell.y) {
        if (fromSector == toSector) {
            //fromCell right of toCell
            if (fromCell.x > toCell.x && (fromCell.HasWestWall == false && toCell.HasEastWall == false)) {
                return false;
                //fromCell left of toCell
            } else if (fromCell.x < toCell.x && (fromCell.HasEastWall == false && toCell.HasWestWall == false)) {
                return false;
            } else {
                return true;
            }
        } else {    //sector-to-sector movement
            //TODO: account for sector to sector movement
        }
    }

    //moving vertically
    else if (fromCell.x == toCell.x && fromCell.y != toCell.y) {
        if (fromSector == toSector) {
            //fromCell below toCell
            if (fromCell.y > toCell.y && (fromCell.HasNorthWall == false && toCell.HasSouthWall == false)) {
                return false;
                //fromCell above toCell
            } else if (fromCell.y < toCell.y && (fromCell.HasSouthWall == false && toCell.HasNorthWall == false)) {
                return false;
            } else {
                return true;
            }
        } else {    //sector-to-sector movement
            //TODO: account for sector to sector movement
        }
    }

    //moving diagonally
    else if (fromCell.y != toCell.y && fromCell.y != toCell.y) {
        if (fromSector == toSector) {
            //fromCell below toCell
            if (fromCell.y > toCell.y && fromCell.x < toCell.x) {
                if (fromCell.HasEastWall && fromCell.HasNorthWall) {
                    return true;
                }
                else if (toCell.HasWestWall && toCell.HasSouthWall) {
                    return true;
                }
                else if (fromCell.HasEastWall && toCell.HasWestWall) {
                    return true;
                }
                else if (fromCell.HasNorthWall && toCell.HasSouthWall) {
                    return true;
                } else {
                    return false;
                }
            }
                //fromCell below and right of toCell
            else if (fromCell.y > toCell.y && fromCell.x < toCell.x) {
                if (fromCell.HasEastWall && fromCell.HasNorthWall) {
                    return true;
                }
                else if (toCell.HasWestWall && toCell.HasSouthWall) {
                    return true;
                }
                else if (fromCell.HasEastWall && toCell.HasWestWall) {
                    return true;
                }
                else if (fromCell.HasNorthWall && toCell.HasSouthWall) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {    //sector-to-sector movement
            //TODO: account for sector to sector movement
        }
    }

    //unknown movement
    return true;
}