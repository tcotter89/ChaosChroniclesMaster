var Transitions = {};

Transitions.CorporationSelectScreenToBoard = function () {
    //hide corporation select screen
    Corporations.HideSelectScreen();

    //show new screen
    Board.ShowBoard();

    //load overlay on top of game board
    Overlay.CreateOverlay(false);   //needs to load at this stage to have all the required info
    Overlay.ShowOverlay();
}