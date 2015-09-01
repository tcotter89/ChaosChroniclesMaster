var Board = {};
Board.currentBoard = new Object();

Board.FRAMEOFFSETX = 10;
Board.FRAMEOFFSETY = 10;

$(function () {
    //alert('load doomtrooper script');
});

Board.AddNewBoard = function (data) {
    Board.currentBoard = new PIXI.Container();
    Board.currentBoard.sectorMap = data.SectorMaps;
    for (var i = 0; i < Board.currentBoard.sectorMap.length; i++) {
        Board.currentBoard.sectorMap[i].Sector = Board.Sectors.LoadSector(Board.currentBoard.sectorMap[i]);  //convert from c# to javascript version
        Board.currentBoard.sectorMap[i].Sector.index = i;
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
    Board.currentBoard.width = GameConstants.CANVAS_WIDTH;
    Board.currentBoard.height = GameConstants.CANVAS_HEIGHT;
    Board.currentBoard.scale.x = 1;
    Board.currentBoard.scale.y = 1;

    GameGlobals.stage.addChild(Board.currentBoard);
}

Board.OnDragStart = function (event) {
    this.data = event.data;
    //this.alpha = 0.5;
    this.start = new Object();
    this.start.x = this.position.x;
    this.start.y = this.position.y;
    //var oldPositionX = this.position.x - ((this.width * this.anchor.x));
    //var oldPositionY = this.position.y - ((this.height * this.anchor.y));
    var xOffset = event.data.getLocalPosition(this.parent).x;
    var yOffset = event.data.getLocalPosition(this.parent).y;

    //this.anchor.x = (xOffset - oldPositionX) / this.width;
    //this.anchor.y = (yOffset - oldPositionY) / this.height;
    this.anchor.x = xOffset;
    this.anchor.y = yOffset;

    //var texture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + "bunny.png");
    //var bunny = new PIXI.Sprite(texture);
    //bunny.anchor.set(0.5);
    //bunny.position.x = xOffset;
    //bunny.position.y = yOffset;
    //GameGlobals.stage.addChild(bunny);

    //var newPositionX = xOffset;// - (this.width * this.anchor.x);
    //var newPositionY = yOffset;// - (this.height * this.anchor.y);
    //this.position.x = newPositionX;
    //this.position.y = newPositionY;
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
        this.position.x = this.start.x + xOffset + Board.FRAMEOFFSETX - this.anchor.x;
        this.position.y = this.start.y + yOffset + Board.FRAMEOFFSETY - this.anchor.y;
    }
}