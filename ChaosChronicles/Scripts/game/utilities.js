var Utilities = {};

$(function () {
    //alert('load utilities script');
});

Utilities.ConvertCoordToCell = function (x, y) {
    var cellCoords = new Object();
    cellCoords.x = Math.floor(x / (Board.Sectors.CELLWIDTH  * Board.currentBoard.scale.x));
    cellCoords.y = Math.floor(y / (Board.Sectors.CELLHEIGHT * Board.currentBoard.scale.y));
    return cellCoords;
}
Utilities.ConvertCoordToCellWithScale = function (x, y, scale) {
    var cellCoords = new Object();
    cellCoords.x = Math.floor((x * scale.x) / (Board.Sectors.CELLWIDTH  * Board.currentBoard.scale.x));
    cellCoords.y = Math.floor((y * scale.y) / (Board.Sectors.CELLHEIGHT * Board.currentBoard.scale.y));
    return cellCoords;
}