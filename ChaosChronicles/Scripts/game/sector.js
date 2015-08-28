Board.Sectors = {};

Board.Sectors.CELLWIDTH = 80;
Board.Sectors.CELLHEIGHT = 80;
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
                    //from database
                    sector.imgPath = result.Data.ImgPath;
                    var texture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + sector.imgPath);
                    sector = new PIXI.Sprite(texture);

                    sector.sectorNumber = result.Data.SectorNumber;
                    sector.name = result.Data.SectorName;
                    sector.description = result.Data.SectorDescription;

                    sector.interactive = true;
                    //sector.buttonMode = true;
                    sector
                        .on('click',           Board.Sectors.SelectSector)
                        .on('mousedown',       Board.Sectors.OnDragStart)
                        .on('touchstart',      Board.Sectors.OnDragStart)
                        .on('mouseup',         Board.Sectors.OnDragEnd)
                        .on('mouseupoutside',  Board.Sectors.OnDragEnd)
                        .on('touchend',        Board.Sectors.OnDragEnd)
                        .on('touchendoutside', Board.Sectors.OnDragEnd)
                        .on('mousemove',       Board.Sectors.OnDragMove)
                        .on('touchmove',       Board.Sectors.OnDragMove);

                    sector.cellsX = result.Data.Width;
                    sector.cellsY = result.Data.Height;
                    sector.anchor.set(0.5); //centered
                    sector.width = Board.Sectors.CELLWIDTH * sector.cellsX;
                    sector.height = Board.Sectors.CELLHEIGHT * sector.cellsY;
                    sector.position.x = (sector.width * sector.anchor.x) + Board.FRAMEOFFSET;
                    sector.position.y = (sector.height * sector.anchor.y) + Board.FRAMEOFFSET;

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

    var texture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + sector.ImgPath);
    var boardSector = new PIXI.Sprite(texture);

    boardSector.sectorNumber = sector.SectorNumber;
    boardSector.name = sector.SectorName;
    boardSector.description = sector.SectorDescription;

    boardSector.interactive = true;
    //boardSector.buttonMode = true;
    boardSector.on('click', Board.Sectors.SelectSector);

    boardSector.cellsX = sector.Width;
    boardSector.cellsY = sector.Height;
    boardSector.width = Board.Sectors.CELLWIDTH * boardSector.cellsX;
    boardSector.height = Board.Sectors.CELLHEIGHT * boardSector.cellsY;
    boardSector.anchor.set(0.5); //centered

    var boardLocationX = sectorMap.LocationX;   //this is the offset of the sector map. if sector is at top left, next to it, etc
    var boardLocationY = sectorMap.LocationY;
    var anchorOffsetX = boardSector.width * boardSector.anchor.x;   //this is the offset to fix positioning for the anchor. (difficult to understand)
    var anchorOffsetY = boardSector.height * boardSector.anchor.y;
    boardSector.position.x = (boardSector.width * boardLocationX) + Board.FRAMEOFFSET + anchorOffsetX;
    boardSector.position.y = (boardSector.height * boardLocationY) + Board.FRAMEOFFSET + anchorOffsetY;
    boardSector.cells = sector.Cells;

    //GameGlobals.stage.addChild(boardSector);

    return boardSector;
}

Board.Sectors.SelectSector = function (event) {
    Interaction.SelectSector(event.data, this);
}

Board.Sectors.AreCellsWithinOne = function (fromCell, toCell, fromSector, toSector) {
    //TODO: account for sector to sector movement
    if (Math.abs(fromCell.x - toCell.x) <= 1) {
        if (Math.abs(fromCell.y - toCell.y) <= 1) {
            return true;
        }
    }
    return false;
}

Board.Sectors.ISWallInWay = function (fromCell, toCell, fromSector, toSector) {
    //TODO: account for sector to sector movement
    //it has already been determined that the from and to cells are 1 away, the following logic takes this into account to make things easier

    //moving horizontally
    if (fromCell.x != toCell.x && fromCell.y == toCell.y) {
    }

    //moving vertically
    if (fromCell.x == toCell.x && fromCell.y != toCell.y) {

    }

    //moving diagonally
    if (fromCell.y != toCell.y && fromCell.y != toCell.y) {

    } else {
        return "Invalid Movement";
    }
}