var Utilities = {};

$(function () {
    //alert('load utilities script');
});

Utilities.LoadHexColor = function (hexStrValue) {
    return parseInt(hexStrValue, 16);
}

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

Utilities.IsClickDragging = function () {
    if (typeof (Board.currentBoard.dragging) == "undefined" || Board.currentBoard.dragging == false) {
        return false;
    } else {
        return true;
    }
}