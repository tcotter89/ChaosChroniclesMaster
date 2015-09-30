var Engine = {};

$(function () {
    //alert('load engine script');
});

//START - NEW GAME LOOP===========================================================
var timeAtLastFrame = new Date().getTime();
var idealTimePerFrame = 1000 / 30;
var leftover = 0.0;
var frames = 0;

Engine.RunApplication = function () {
    setInterval(Engine.Tick, 1000 / 30);
    setInterval(Engine.TickSecond, 1000);
}

Engine.TickSecond = function () {
    if (Corporations.selectScreen.active == true) {
        Corporations.UpdateSelectScreen();
    }
}

Engine.Tick = function () {
    var timeAtThisFrame = new Date().getTime();
    var timeSinceLastDoLogic = (timeAtThisFrame - timeAtLastFrame) + leftover;
    var catchUpFrameCount = Math.floor(timeSinceLastDoLogic / idealTimePerFrame);

    for (i = 0 ; i < catchUpFrameCount; i++) {
        //controller.doLogic();
        frames++;
    }

    Engine.Animate();

    leftover = timeSinceLastDoLogic - (catchUpFrameCount * idealTimePerFrame);
    timeAtLastFrame = timeAtThisFrame;
}
//END - NEW GAME LOOP==============================================================

// this function is executed on each animation frame
Engine.Animate = function () {
    // update
    //var time = (new Date()).getTime();
    //var timeDiff = time - lastTime;
    //var angleChange = angularSpeed * timeDiff * 2 * Math.PI / 1000;
    ////plane.rotation.y += angleChange;
    //lastTime = time;

    // render
    GameGlobals.renderer.render(GameGlobals.stage);

    // request new frame
    //requestAnimationFrame(function () {
    //    Engine.Animate();
    //});
}