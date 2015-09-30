var Players = {};
Players.playerList = [];

GameConstants.Rank = new Object();
GameConstants.Rank.RANKBREAKPOINTS = [];
GameConstants.Rank.RANKBREAKPOINTS[0] = 0;
GameConstants.Rank.RANKBREAKPOINTS[1] = 0;
GameConstants.Rank.RANKBREAKPOINTS[2] = 10;
GameConstants.Rank.RANKBREAKPOINTS[3] = 25;
GameConstants.Rank.RANKBREAKPOINTS[4] = 45;
GameConstants.Rank.RANKBREAKPOINTS[5] = 70;
GameConstants.Rank.RANKBREAKPOINTS[6] = 100;
GameConstants.Rank.RANKCOUNT = 6;


Players.AddNewPlayer = function (username, name, promotionPoints, credits, firstTimeLoad) {
    var player = new Object();

    player.username = username;
    player.name = name;
    player.promotionPoints = promotionPoints;
    //player.rank = Players.DetermineRank(player.promotionPoints);
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
    for (var i = GameConstants.Rank.RANKCOUNT; i > 0; i--) {
        if (promotionPoints >= GameConstants.Rank.RANKBREAKPOINTS[i]) {
            rank = i
            break;
        }
    }
    return rank;
}

Players.DetermineDiceColor = function (rank) {
    var diceColor = 'White';    //default is white

    if (rank >= 1 && rank < 3) {
        diceColor = 'White';
    } else if (rank >= 3 && rank < 5) {
        diceColor = 'Red';
    } else if (rank >= 5) {
        diceColor = 'Black';
    }

    return diceColor;
}

Players.DetermineDiceTexture = function (rank) {
    var texture = new Object();

    var diceColor = Players.DetermineDiceColor(rank);
    if (diceColor.toUpperCase() == 'WHITE') {
        texture.hit = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.DICE_WHITE_HIT);
        texture.blank = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.DICE_WHITE_BLANK);
    } else if (diceColor.toUpperCase() == 'RED') {
        texture.hit = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.DICE_RED_HIT);
        texture.blank = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.DICE_RED_BLANK);
    } else if (diceColor.toUpperCase() == 'BLACK') {
        texture.hit = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.DICE_BLACK_HIT);
        texture.blank = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.DICE_BLACK_BLANK);
    }
    return texture;
}