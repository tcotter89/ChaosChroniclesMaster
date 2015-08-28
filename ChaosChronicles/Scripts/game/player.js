var Players = {};
Players.playerList = [];

GameConstants.RANKBREAKPOINTS = [];
GameConstants.RANKBREAKPOINTS[0] = 0;
GameConstants.RANKBREAKPOINTS[1] = 0;
GameConstants.RANKBREAKPOINTS[2] = 10;
GameConstants.RANKBREAKPOINTS[3] = 25;
GameConstants.RANKBREAKPOINTS[4] = 45;
GameConstants.RANKBREAKPOINTS[5] = 70;
GameConstants.RANKBREAKPOINTS[6] = 100;
GameConstants.RANKCOUNT = 6;

Players.AddNewPlayer = function (name, corporation, promotionPoints, credits, firstTimeLoad) {
    var player = new Object();

    player.name = name;
    player.corporation = corporation;
    player.promotionPoints = promotionPoints;
    player.rank = Players.DetermineRank(player.promotionPoints);
    player.credits = credits;

    //save to array and find index
    player.index = Players.playerList.length;   //the length will find the index that the new unit will be pushed to
    Players.playerList.push(player);

    if (firstTimeLoad == true) {
        Setup.loadingStep++;
        Setup.ProcessLoadingQueue();
    } else {
        return player.index;
    }
}

Players.DetermineRank = function (promotionPoints) {
    var rank = 1;    //default
    for (var i = GameConstants.RANKCOUNT; i > 0; i--) {
        if (promotionPoints >= GameConstants.RANKBREAKPOINTS[i]) {
            rank = i
            break;
        }
    }
    return rank;
}