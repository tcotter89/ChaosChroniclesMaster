var Utilities = {};

$(function () {
    //alert('load utilities script');
});

Utilities.ConvertCoordToCell = function (x, y) {
    var cellCoords = new Object();
    cellCoords.x = Math.floor(x / Board.Sectors.CELLWIDTH);
    cellCoords.y = Math.floor(y / Board.Sectors.CELLHEIGHT);
    return cellCoords;
}