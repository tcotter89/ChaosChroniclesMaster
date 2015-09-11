var Setup = {};

// globals
GameGlobals.stage;
GameGlobals.renderer;
GameGlobals.canvas;
GameGlobals.container = $('#gameContainer');
GameGlobals.mouse = new PIXI.Point();
GameGlobals.error = $("#ErrorMessage");

Setup.loadingStep = 0;
//Setup.sector5Index = -1;
//Setup.dummyPlayer = -1;
//Setup.p1Index = -1;

$(function () {
    //alert('hello world');

    GameGlobals.renderer = PIXI.autoDetectRenderer(GameConstants.CANVAS_WIDTH, GameConstants.CANVAS_HEIGHT, { backgroundColor: 0x000000 });

    GameGlobals.container.append(GameGlobals.renderer.view);
    GameGlobals.canvas = $('canvas');
    GameGlobals.canvas.attr('oncontextmenu', 'return false;');

    GameGlobals.stage = new PIXI.Container();

    Setup.ProcessLoadingQueue();

    //// start animating
    //animate();
    //function animate() {
    //    requestAnimationFrame(animate);

    //    // just for fun, let's rotate mr rabbit a little
    //    //bunny.rotation += 0.1;

    //    // render the container
    //    GameGlobals.renderer.render(GameGlobals.stage);
    //}
});

Setup.ProcessLoadingQueue = function () {
    if (Setup.loadingStep == GameConstants.Setup.LOADINGSTEP_MISSIONS) {
        Mission.AddNewMission('1', true);
    }
    //else if (Setup.loadingStep == GameConstants.LOADINGSTEP_SECTORS) {
    //    Board.Sectors.AddNewSector('5', true);
    //} 
    else if (Setup.loadingStep == GameConstants.Setup.LOADINGSTEP_PLAYERS) {
        Players.AddNewPlayer('Placeholder', 'None', 0, 0, true);
        Players.AddNewPlayer('Thomas', 'Bauhaus', 0, 2, true);
        Players.AddNewPlayer('Ryan', 'Mishima', 0, 2, true);
        Players.AddNewPlayer('Randy', 'Imperial', 0, 2, true);
    } 
    else if (Setup.loadingStep == GameConstants.Setup.LOADINGSTEP_DOOMTROOPERS) {
        var sector1 = $.grep(Board.currentBoard.sectorMap, function (e) { return e.Sector.sectorNumber == "1" })[0].Sector;
        var steinerCell = sector1.cells[1][1];
        Units.AddNewUnit('Steiner', Players.playerList[1].index, sector1, steinerCell, true);
        var valerieCell = sector1.cells[3][4];
        Units.AddNewUnit('Valerie', Players.playerList[1].index, sector1, valerieCell, true);

        var sector4 = $.grep(Board.currentBoard.sectorMap, function (e) { return e.Sector.sectorNumber == "4" })[0].Sector;
        var yojimboCell = sector4.cells[1][1];
        Units.AddNewUnit('Yojimbo', Players.playerList[2].index, sector4, yojimboCell, true);
        var murdochCell = sector4.cells[4][2];
        Units.AddNewUnit('Murdoch', Players.playerList[3].index, sector4, murdochCell, true);

        var sector5 = $.grep(Board.currentBoard.sectorMap, function (e) { return e.Sector.sectorNumber == "5" })[0].Sector;
        var tatsuCell = sector5.cells[0][3];
        Units.AddNewUnit('Tatsu', Players.playerList[2].index, sector5, tatsuCell, true);
        var gallagherCell = sector5.cells[2][2];
        Units.AddNewUnit('Gallagher', Players.playerList[3].index, sector5, gallagherCell, true);
    }
    else if (Setup.loadingStep == GameConstants.Setup.LOADINGSTEP_LEGION) {
        var sector2 = $.grep(Board.currentBoard.sectorMap, function (e) { return e.Sector.sectorNumber == "2" })[0].Sector;
        var legionnaireCell = sector2.cells[3][3];
        Units.AddNewUnit('Legionnaire', Players.playerList[1].index, sector2, legionnaireCell, true);
    }
    else if (Setup.loadingStep == GameConstants.Setup.LOADINGSTEP_ITEMS) {
        Items.AddAllItems(true);
    }
    else if (Setup.loadingStep == GameConstants.Setup.LOADINGSTEP_OVERLAY) {
        Overlay.SetupOverlay(true);
    }
    else if (Setup.loadingStep == GameConstants.Setup.LOADINGSTEP_COMPLETE) {

        var laserSight = $.grep(Items.itemList, function (e) { return e.Name.toUpperCase() == "LASER SIGHT" })[0];
        var reverberatingSharpener = $.grep(Items.itemList, function (e) { return e.Name.toUpperCase() == "REVERBERATING SHARPENER" })[0];
        var steiner = $.grep(Units.unitList, function (e) { return e.name.toUpperCase() == "STEINER" })[0];
        var yojimbo = $.grep(Units.unitList, function (e) { return e.name.toUpperCase() == "YOJIMBO" })[0];
        Units.GiveItemToUnit(laserSight, steiner);
        Units.GiveItemToUnit(reverberatingSharpener, yojimbo);

        Engine.RunApplication();
    }
}