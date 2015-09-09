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

    GameGlobals.renderer = PIXI.autoDetectRenderer(GameConstants.CANVAS_WIDTH, GameConstants.CANVAS_HEIGHT, { backgroundColor: 0x1099bb });

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
    if (Setup.loadingStep == GameConstants.LOADINGSTEP_MISSIONS) {
        Mission.AddNewMission('1', true);
    }
    //else if (Setup.loadingStep == GameConstants.LOADINGSTEP_SECTORS) {
    //    Board.Sectors.AddNewSector('5', true);
    //} 
    else if (Setup.loadingStep == GameConstants.LOADINGSTEP_PLAYERS) {
        Players.AddNewPlayer('Placeholder', 'None', 0, 0, true);
        Players.AddNewPlayer('Thomas', 'Bauhaus', 0, 2, true);
        Players.AddNewPlayer('Ryan', 'Imperial', 0, 2, true);
    } 
    else if (Setup.loadingStep == GameConstants.LOADINGSTEP_DOOMTROOPERS) {
        var sector = $.grep(Board.currentBoard.sectorMap, function (e) { return e.Sector.sectorNumber == "1" })[0].Sector;
        Units.AddNewUnit('Steiner', Players.playerList[1].index, sector, new Object({ x: 1, y: 1 }), true);
        Units.AddNewUnit('Valerie', Players.playerList[1].index, sector, new Object({ x: 3, y: 4 }), true);
    }
    //else if (Setup.loadingStep == GameConstants.LOADINGSTEP_LEGION) {
    //    Units.AddNewUnit('Legionnaire', Players.playerList[2].index, Board.Sectors.sectorList[0], new Object({ x: 6, y: 6 }), true);
    //}
    else if (Setup.loadingStep == GameConstants.LOADINGSTEP_ITEMS) {
        Items.AddAllItems(true);
    }
    else if (Setup.loadingStep == GameConstants.LOADINGSTEP_COMPLETE) {

        var laserSight = $.grep(Items.itemList, function (e) { return e.Name.toUpperCase() == "LASER SIGHT" })[0];
        var steiner = $.grep(Units.unitList, function (e) { return e.name.toUpperCase() == "STEINER" })[0];
        Units.GiveItemToUnit(laserSight, steiner);

        Engine.RunApplication();
    }
}