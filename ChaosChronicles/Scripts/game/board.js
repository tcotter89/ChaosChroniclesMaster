var Board = {};
Board.currentBoard = new Object();

Board.FRAMEOFFSET = 10;

$(function () {
    //alert('load doomtrooper script');
});

Board.AddNewBoard = function (data) {
    Board.currentBoard = new PIXI.Container();
    Board.currentBoard.sectorMap = data.SectorMaps;
    for (var i = 0; i < Board.currentBoard.sectorMap.length; i++) {
        Board.currentBoard.sectorMap[i].Sector = Board.Sectors.LoadSector(Board.currentBoard.sectorMap[i]);  //convert from c# to javascript version
        Board.currentBoard.addChild(Board.currentBoard.sectorMap[i].Sector);
    }
    Board.currentBoard.interactive = true;
    Board.currentBoard
        //.on('click', Board.Sectors.SelectSector)
        .on('mousedown', Board.OnDragStart)
        .on('touchstart', Board.OnDragStart)
        .on('mouseup', Board.OnDragEnd)
        .on('mouseupoutside', Board.OnDragEnd)
        .on('touchend', Board.OnDragEnd)
        .on('touchendoutside', Board.OnDragEnd)
        .on('mousemove', Board.OnDragMove)
        .on('touchmove', Board.OnDragMove);

    Board.currentBoard.anchor = new Object();
    Board.currentBoard.anchor.x = 0.5; //centered
    Board.currentBoard.anchor.y = 0.5; //centered

    GameGlobals.stage.addChild(Board.currentBoard);
}

Board.OnDragStart = function (event) {
    this.data = event.data;
    //this.alpha = 0.5;
    var oldPositionX = this.position.x - ((this.width * this.anchor.x));
    var oldPositionY = this.position.y - ((this.height * this.anchor.y));
    var xOffset = event.data.getLocalPosition(this.parent).x;
    var yOffset = event.data.getLocalPosition(this.parent).y;
    this.anchor.x = (xOffset - oldPositionX) / this.width;
    this.anchor.y = (yOffset - oldPositionY) / this.height;
    var newPositionX = xOffset;
    var newPositionY = yOffset;
    this.position.x = newPositionX;
    this.position.y = newPositionY;
    this.dragging = true;
}

Board.OnDragEnd = function () {
    //this.alpha = 1;
    this.dragging = false;
    this.data = null;
}
Board.OnDragMove = function () {
    if (this.dragging) {
        //var oldPositionX = this.position.x - ((this.width * this.anchor.x) + 10);
        //var oldPositionY = this.position.y - ((this.height * this.anchor.y) + 10);
        var xOffset = this.data.getLocalPosition(this.parent).x;
        var yOffset = this.data.getLocalPosition(this.parent).y;
        this.position.x = xOffset;
        this.position.y = yOffset;
    }
}