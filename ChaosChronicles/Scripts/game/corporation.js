var Corporations = {};
Corporations.corporationList = [];
Corporations.filteredCorporations = [];
Corporations.selectScreen;
Corporations.selectionTime = 10;

Corporations.detailsWidth = 1200;
Corporations.detailsHeight = 800;
Corporations.buttonWidth = 225;
Corporations.buttonHeight = 80;

Corporations.roundIconOffsetX = 10;
Corporations.roundIconOffsetY = 10;
Corporations.roundIconWidth = 60;
Corporations.roundIconHeight = 60;

Corporations.choosingPlayer;

Corporations.LoadAllCorporations = function (firstTimeLoad) {
    //load from database
    $.ajax({
        url: "/Home/GetCorporationData",
        type: "POST",
        dataType: "json",
        success: function (result) {
            switch (result.Result) {
                case true:
                    Corporations.corporationList = result.Data;
                    for (i = 0; i < Corporations.corporationList.length; i++) {
                        Corporations.corporationList[i].index = i;
                    }

                    Corporations.filteredCorporations = $.grep(Corporations.corporationList, function (e) { return e.Name.toUpperCase() != "LEGION" });

                    //DEBUG ONLY========================
                    var ryan = $.grep(Players.playerList, function (e) { return e.username == "rymatt22" })[0];
                    ryan.corporation = Corporations.filteredCorporations[4];
                    Corporations.filteredCorporations[4].player = ryan;
                    var ryanDoomtroopers = $.grep(Units.detailList, function (e) { return e.Corporation.Name.toUpperCase() == Corporations.filteredCorporations[4].Name.toUpperCase() });
                    var ryanDoomtrooperInstances = [];
                    ryanDoomtrooperInstances.push(Units.CreateUnitInstance(ryanDoomtroopers[0], ryan.index));
                    ryanDoomtrooperInstances.push(Units.CreateUnitInstance(ryanDoomtroopers[1], ryan.index));
                    Corporations.filteredCorporations[4].units = ryanDoomtrooperInstances;

                    var randy = $.grep(Players.playerList, function (e) { return e.username == "rman" })[0];
                    randy.corporation = Corporations.filteredCorporations[1];
                    Corporations.filteredCorporations[1].player = randy;
                    var randyDoomtroopers = $.grep(Units.detailList, function (e) { return e.Corporation.Name.toUpperCase() == Corporations.filteredCorporations[1].Name.toUpperCase() });
                    var randyDoomtrooperInstances = [];
                    randyDoomtrooperInstances.push(Units.CreateUnitInstance(randyDoomtroopers[0], randy.index));
                    randyDoomtrooperInstances.push(Units.CreateUnitInstance(randyDoomtroopers[1], randy.index));
                    Corporations.filteredCorporations[1].units = randyDoomtrooperInstances;

                    var joe = $.grep(Players.playerList, function (e) { return e.username == "joedog" })[0];
                    joe.corporation = Corporations.filteredCorporations[2];
                    Corporations.filteredCorporations[2].player = joe;
                    var joeDoomtroopers = $.grep(Units.detailList, function (e) { return e.Corporation.Name.toUpperCase() == Corporations.filteredCorporations[2].Name.toUpperCase() });
                    var joeDoomtrooperInstances = [];
                    joeDoomtrooperInstances.push(Units.CreateUnitInstance(joeDoomtroopers[0], joe.index));
                    joeDoomtrooperInstances.push(Units.CreateUnitInstance(joeDoomtroopers[1], joe.index));
                    Corporations.filteredCorporations[2].units = joeDoomtrooperInstances;

                    var clay = $.grep(Players.playerList, function (e) { return e.username == "theclay" })[0];
                    clay.corporation = Corporations.filteredCorporations[3];
                    Corporations.filteredCorporations[3].player = clay;
                    var clayDoomtroopers = $.grep(Units.detailList, function (e) { return e.Corporation.Name.toUpperCase() == Corporations.filteredCorporations[3].Name.toUpperCase() });
                    var clayDoomtrooperInstances = [];
                    clayDoomtrooperInstances.push(Units.CreateUnitInstance(clayDoomtroopers[0], joe.index));
                    clayDoomtrooperInstances.push(Units.CreateUnitInstance(clayDoomtroopers[1], joe.index));
                    Corporations.filteredCorporations[3].units = clayDoomtrooperInstances;
                    //==================================

                    Corporations.ShowSelectScreen();

                    if (firstTimeLoad == true) {
                        Setup.loadingStep++;
                        Setup.ProcessLoadingQueue();
                        break;
                    }
                default:
                    GameGlobals.error.html("No corporations were found in the database");
                    break;
            }
        },
        error: function () {
            GameGlobals.error.html("There was an unknown error while trying to load corporations");
        }
    });
}

Corporations.ShowSelectScreen = function () {
    Corporations.selectScreen = new PIXI.Container();
    Corporations.selectScreen.active = true;

    //timer label
    var timerLabelOffsetX = 10;
    var timerLabelOffsetY = 10;
    var fontSize = 24;
    var style = {
        font: fontSize + 'px Arial',
        fill: '#FFFFFF',
        stroke: '#000000',
        strokeThickness: 1,
        dropShadow: false,
        dropShadowColor: '#000000',
        dropShadowAngle: Math.PI / 2,
        dropShadowDistance: 2,
        wordWrap: false,
        wordWrapWidth: 200
    };
    var timerLabelText = new PIXI.Text("Player is Selecting: ", style);
    timerLabelText.x = timerLabelOffsetX;
    timerLabelText.y = timerLabelOffsetY;
    Corporations.selectScreen.timerLabel = timerLabelText;
    Corporations.selectScreen.addChild(timerLabelText);

    //timer text
    var fontSize = 24;
    var style = {
        font: fontSize + 'px Arial',
        fill: '#FFFFFF',
        stroke: '#000000',
        strokeThickness: 1,
        dropShadow: false,
        dropShadowColor: '#000000',
        dropShadowAngle: Math.PI / 2,
        dropShadowDistance: 2,
        wordWrap: false,
        wordWrapWidth: 200
    };
    var timerText = new PIXI.Text(Corporations.selectionTime, style);
    timerText.time = Corporations.selectionTime;
    timerText.x = timerLabelText.x + timerLabelText.width;
    timerText.y = timerLabelText.y;
    Corporations.selectScreen.timer = timerText;
    Corporations.selectScreen.addChild(timerText);

    //choose your corporation
    var titleOffsetY = 10;
    var fontSize = 32;
    var style = {
        font: fontSize + 'px Arial',
        fill: '#FFFFFF',
        stroke: '#000000',
        strokeThickness: 1,
        dropShadow: false,
        dropShadowColor: '#000000',
        dropShadowAngle: Math.PI / 2,
        dropShadowDistance: 2,
        wordWrap: true,
        wordWrapWidth: Corporations.detailsWidth
    };
    var titleText = new PIXI.Text("Choose your Corporation", style);
    titleText.x = (GameConstants.CANVAS_WIDTH / 2) - (titleText.width / 2);
    titleText.y = titleOffsetY;
    Corporations.selectScreen.title = titleText;
    Corporations.selectScreen.addChild(titleText);

    //buttons
    var buttonsContainerOffsetX = 50;
    var buttonsContainerOffsetY = 40;
    var buttonsContainer = new PIXI.Container();
    buttonsContainer.name = "Selection Buttons";
    buttonsContainer.position.x = buttonsContainerOffsetX;
    buttonsContainer.position.y = titleText.y + titleText.height + buttonsContainerOffsetY;
    var buttonPaddingX = 0;
    var buttonPaddingY = 10;
    for (i = 0; i < Corporations.filteredCorporations.length; i++) {
        var x = 0;
        var y = (i * (Corporations.buttonHeight + buttonPaddingY));
        var selected = false;
        if (i == 0) {
            selected = true;    //autoselect first corporation
        }
        var button = Corporations.CreateSelectScreenButton(x, y, Corporations.filteredCorporations[i], selected);
        buttonsContainer.addChild(button);
    }
    Corporations.selectScreen.buttons = buttonsContainer;
    Corporations.selectScreen.addChild(buttonsContainer);

    //details
    var detailOffsetY = 20;
    var selectedCorporation = Corporations.filteredCorporations[0];
    var detail = Corporations.CreateCorporationDetails(Corporations.detailsWidth, Corporations.detailsHeight, selectedCorporation);
    detail.name = "Corporation Details";
    detail.position.x = buttonsContainer.position.x + buttonsContainer.width;
    detail.position.y = titleText.y + titleText.height + detailOffsetY;
    Corporations.selectScreen.detail = detail;
    Corporations.selectScreen.addChild(detail);

    ////players
    //var playersOffsetY = 20;
    //var players = Corporations.CreateAllPlayersDisplay();
    //players.position.x = GameConstants.CANVAS_WIDTH - players.width;    //attach to right side of screen
    //players.position.y = titleText.y + titleText.height + detailOffsetY;  //vertically centered
    //Corporations.selectScreen.players = players;
    //Corporations.selectScreen.addChild(players);

    Corporations.choosingPlayer = Players.playerList[Corporations.RandomizeChoosingPlayerIndex()];

    GameGlobals.stage.addChild(Corporations.selectScreen);
}

Corporations.HideSelectScreen = function () {
    Corporations.selectScreen.active = false;
    GameGlobals.stage.removeChild(Corporations.selectScreen);
}

Corporations.CreateSelectScreenButton = function (x, y, corporation, selected) {
    var buttonContainer = new PIXI.Container();
    buttonContainer.position.x = x;
    buttonContainer.position.y = y;
    buttonContainer.corporation = corporation;
    buttonContainer.selected = selected;
    buttonContainer.interactive = true;
    buttonContainer.on('click', Corporations.SelectScreenSwitchCorporation);

    //background
    var background = new PIXI.Graphics();
    Corporations.CreateButtonGraphics(background, selected);
    buttonContainer.background = background;
    buttonContainer.addChild(background);

    //round icon
    var buttonRoundIconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + corporation.ImgAlternatePath);
    var buttonRoundIcon = new PIXI.Sprite(buttonRoundIconTexture);
    buttonRoundIcon.width  = 60;
    buttonRoundIcon.height = 60;
    buttonRoundIcon.position.x = Corporations.roundIconOffsetX;
    buttonRoundIcon.position.y = Corporations.roundIconOffsetY;
    buttonContainer.icon = buttonRoundIcon;
    buttonContainer.addChild(buttonRoundIcon);

    //text
    var buttonTextOffsetY = 15;
    var textFontSize = 32;
    var style = {
        font: textFontSize + 'px Arial',
        fill: '#FFFFFF',
        stroke: '#000000',
        strokeThickness: 1,
        dropShadow: false,
        dropShadowColor: '#000000',
        dropShadowAngle: Math.PI / 2,
        dropShadowDistance: 2,
        wordWrap: false,
        wordWrapWidth: 440
    };
    var buttonText = new PIXI.Text(corporation.Name, style);
    buttonText.x = Corporations.roundIconWidth + (Corporations.roundIconOffsetX * 2);
    buttonText.y = buttonTextOffsetY;
    buttonContainer.text = buttonText;
    buttonContainer.addChild(buttonText);

    //check if this corporation is already selected
    var text = "";
    if (typeof (corporation.player) != "undefined") {
        buttonContainer.chosen = true;
        text = "Selected By: " + corporation.player.name;
    }

    //player
    var playerTextOffsetY = 8;
    var playerFontSize = 18;
    var style = {
        font: playerFontSize + 'px Arial',
        fill: '#55FF55',
        stroke: '#000000',
        strokeThickness: 0,
        dropShadow: false,
        dropShadowColor: '#000000',
        dropShadowAngle: Math.PI / 2,
        dropShadowDistance: 2,
        wordWrap: false,
        wordWrapWidth: 440
    };
    var playerText = new PIXI.Text(text, style);
    playerText.x = Corporations.roundIconWidth + (Corporations.roundIconOffsetX * 2);
    playerText.y = buttonText.height + playerTextOffsetY;
    buttonContainer.playerText = playerText;
    buttonContainer.addChild(playerText);

    return buttonContainer;
}

Corporations.CreateButtonGraphics = function (graphics, selected) {
    if (selected == true) {
        graphics.beginFill(Utilities.LoadHexColor(GameConstants.Colors.SELECTEDGRAY));
    } else {
        graphics.beginFill(Utilities.LoadHexColor(GameConstants.Colors.DISABLEDGRAY));
    }
    graphics.drawRect(Corporations.roundIconOffsetX + (Corporations.roundIconWidth / 2), 0, Corporations.buttonWidth, Corporations.buttonHeight);
    graphics.drawCircle(Corporations.roundIconOffsetX + (Corporations.roundIconWidth / 2), (Corporations.buttonHeight / 2), (Corporations.buttonHeight / 2));
}

Corporations.CreateCorporationDetails = function (width, height, corporation) {
    //details area
    var backgroundContainer = new PIXI.Container();

    //menu background
    var background = new PIXI.Graphics();
    background.beginFill(Utilities.LoadHexColor(GameConstants.Colors.SELECTEDGRAY));
    background.drawRect(0, 0, width, height);
    backgroundContainer.addChild(background);

    //corporation back
    var corporationBackTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + corporation.ImgSplashPath);
    var corporationBack = new PIXI.Sprite(corporationBackTexture);
    corporationBack.width = 570;
    corporationBack.height = 760;
    corporationBack.position.x = 20;
    corporationBack.position.y = 20;
    backgroundContainer.corporationBack = corporationBack;
    backgroundContainer.addChild(corporationBack);

    //corporation description
    var corporationDescriptionOffsetX = 20;
    var fontSize = 16;
    var style = {
        font: fontSize + 'px Arial',
        fill: '#FFFFFF',
        stroke: '#000000',
        strokeThickness: 1,
        dropShadow: false,
        dropShadowColor: '#000000',
        dropShadowAngle: Math.PI / 2,
        dropShadowDistance: 2,
        wordWrap: true,
        wordWrapWidth: width - corporationBack.position.x - corporationBack.width - (corporationDescriptionOffsetX * 2)
    };
    var corporationDescription = new PIXI.Text(corporation.Description, style);
    corporationDescription.x = corporationBack.position.x + corporationBack.width + corporationDescriptionOffsetX;
    corporationDescription.y = corporationBack.position.y;
    backgroundContainer.corporationDescription = corporationDescription;
    backgroundContainer.addChild(corporationDescription);

    //choose button
    var submitButtonOffsetX = 10;
    var submitButtonOffsetY = 20;
    var submitButtonTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.BUTTON_CHOOSE);
    var submitButton = new PIXI.Sprite(submitButtonTexture);

    submitButton.width = 175;
    submitButton.height = 52;
    var leftOverSpace = width - corporationBack.position.x - corporationBack.width - submitButtonOffsetX
    submitButton.position.x = corporationBack.position.x + corporationBack.width + (leftOverSpace / 2) - (submitButton.width / 2);   //centered
    submitButton.position.y = height - (submitButton.height + submitButtonOffsetY);

    submitButton.interactive = true;
    submitButton.buttonMode = true;
    submitButton.on('click', Corporations.ClickChooseCorporation);

    backgroundContainer.submitButton = submitButton;
    backgroundContainer.addChild(submitButton);

    //figure bases
    var figuresContainer = new PIXI.Container();
    var figurePaddingX = 30;
    var figurePaddingY = 20;
    var figures = $.grep(Units.detailList, function (e) { return e.Corporation.Name.toUpperCase() == corporation.Name.toUpperCase() });

    var figureA = Corporations.CreateFigureDisplay(figures[0]);
    figureA.position.x = 0;
    figureA.position.y = 0;
    figuresContainer.figureA = figureA;
    figuresContainer.addChild(figureA);
    var figureB = Corporations.CreateFigureDisplay(figures[1]);
    figureB.position.x = figureA.width + figurePaddingX;
    figureB.position.y = 0;
    figuresContainer.figureB = figureB;
    figuresContainer.addChild(figureB);

    var remainingSpace = width - (corporationBack.position.x + corporationBack.width);
    figuresContainer.position.x = corporationBack.position.x + corporationBack.width + ((remainingSpace / 2) - (figuresContainer.width / 2)); //centered in the remaining space
    figuresContainer.position.y = submitButton.position.y - (figuresContainer.height + figurePaddingY);
    backgroundContainer.figures = figuresContainer;
    backgroundContainer.addChild(figuresContainer);

    //perk icon
    var perkOffsetY = 10;
    var perkIconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + corporation.ImgPerkPath);
    var perkIcon = new PIXI.Sprite(perkIconTexture);
    perkIcon.width = 60;
    perkIcon.height = 60;
    perkIcon.position.x = corporationBack.position.x + corporationBack.width + corporationDescriptionOffsetX;
    perkIcon.position.y = figuresContainer.position.y - (perkIcon.height + perkOffsetY);
    backgroundContainer.perkIcon = perkIcon;
    backgroundContainer.addChild(perkIcon);

    //perk name
    var perkNameOffsetX = 10;
    var perkNameOffsetY = 0;
    var perkNameFontSize = 22;
    var style = {
        font: perkNameFontSize + 'px Arial',
        fill: '#FFFFFF',
        stroke: '#000000',
        strokeThickness: 1,
        dropShadow: false,
        dropShadowColor: '#000000',
        dropShadowAngle: Math.PI / 2,
        dropShadowDistance: 2,
        wordWrap: true,
        wordWrapWidth: width - perkIcon.position.x - perkIcon.width - (perkNameOffsetX * 2)
    };
    var perkName = new PIXI.Text(corporation.BonusName + ":", style);
    perkName.x = perkIcon.position.x + perkIcon.width + perkNameOffsetX;
    perkName.y = perkIcon.position.y + perkNameOffsetY;
    backgroundContainer.perkName = perkName;
    backgroundContainer.addChild(perkName);

    //perk description
    var perkDescriptionOffsetX = 10;
    var perkDescriptionFontSize = 18;
    var style = {
        font: perkDescriptionFontSize + 'px Arial',
        fill: '#FFFFFF',
        stroke: '#000000',
        strokeThickness: 1,
        dropShadow: false,
        dropShadowColor: '#000000',
        dropShadowAngle: Math.PI / 2,
        dropShadowDistance: 2,
        wordWrap: true,
        wordWrapWidth: width - perkIcon.position.x - perkIcon.width - (perkNameOffsetX * 2)
    };
    var perkDescription = new PIXI.Text(corporation.BonusDescription, style);
    perkDescription.x = perkIcon.position.x + perkIcon.width + perkDescriptionOffsetX;
    perkDescription.y = perkName.position.y + perkNameFontSize;
    backgroundContainer.perkDescription = perkDescription;
    backgroundContainer.addChild(perkDescription);

    return backgroundContainer;
}

Corporations.CreateFigureDisplay = function (figureDetail) {
    var figureContainer = new PIXI.Container();

    var figureBaseTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.DECAL_BASE);
    var figureBase = new PIXI.Sprite(figureBaseTexture);
    figureBase.width = 195;
    figureBase.height = 75;
    figureBase.position.x = 0;
    figureBase.position.y = 140;
    figureContainer.addChild(figureBase);

    var figureTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + figureDetail.ImgFigurePath);
    var figure = new PIXI.Sprite(figureTexture);
    figure.name = figureDetail.Name;
    figure.combatType = figureDetail.CombatType
    figure.width = 175;
    figure.height = 175;
    figure.position.x = 10;
    figure.position.y = 0;

    figureContainer.figure = figure;
    figureContainer.addChild(figure);

    var fontSize = 24;
    var style = {
        font: fontSize + 'px Arial',
        fill: '#FFFFFF',
        stroke: '#000000',
        strokeThickness: 1,
        dropShadow: false,
        dropShadowColor: '#000000',
        dropShadowAngle: Math.PI / 2,
        dropShadowDistance: 2,
        wordWrap: false,
        wordWrapWidth: 440
    };
    var figureText = new PIXI.Text(figure.name, style);
    figureText.x = figureBase.position.x + ((figureBase.width / 2) - (figureText.width / 2));
    figureText.y = figureBase.position.y + figureBase.height + (-10);
    figureContainer.figureText = figureText;
    figureContainer.addChild(figureText);

    return figureContainer;
}

Corporations.CreateAllPlayersDisplay = function () {
    var playerOffsetX = 5;
    var playerOffsetY = 5;
    var paddingY = 10;
    var width = 250;
    var height = paddingY;  //running height (auto-generated)
    var playersContainer = new PIXI.Container();

    //process all players   //start at 1 because there is no player 0
    for (i = 1; i < Players.playerList.length; i++) {
        var player = Corporations.CreatePlayerDisplay(Players.playerList[i], 200);
        player.position.x = playerOffsetX;
        player.position.y = paddingY + ((i - 1) * player.height + playerOffsetY);  //dont do the height offset for the first player
        height += player.height + playerOffsetY;
        playersContainer.addChild(player);
    }

    //background
    var background = new PIXI.Graphics();
    background.beginFill(Utilities.LoadHexColor(GameConstants.Colors.DISABLEDGRAY));
    background.drawRect(0, 0, width, height);
    playersContainer.addChild(background);
    playersContainer.swapChildren(background, playersContainer.children[0]);    //swap so that the background will appear underneath everything

    return playersContainer;
}

Corporations.CreatePlayerDisplay = function (player, nameMaxWidth) {
    var playerContainer = new PIXI.Container();

    //name
    var fontSize = 24;
    var style = {
        font: fontSize + 'px Arial',
        fill: '#FFFFFF',
        stroke: '#000000',
        strokeThickness: 1,
        dropShadow: false,
        dropShadowColor: '#000000',
        dropShadowAngle: Math.PI / 2,
        dropShadowDistance: 2,
        wordWrap: false,
        wordWrapWidth: nameMaxWidth
    };
    var playerNameText = new PIXI.Text(player.name, style);
    playerNameText.x = nameMaxWidth - playerNameText.width; //right-aligned
    playerNameText.y = 0;
    playerContainer.name = playerNameText;
    playerContainer.addChild(playerNameText);

    //corporation
    var corporationIconOffsetX = 5;
    var corporationIconOffsetY = 0;
    var corporationIconTexture;
    if (typeof (player.corporation) == "undefined") {
        corporationIconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.ICON_UNKNOWN);
    } else {
        corporationIconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + player.corporation.ImgLogoPath);
    }
    var corporationIcon = new PIXI.Sprite(corporationIconTexture);
    corporationIcon.width = playerNameText.height;  //the icon is a square, constrained by height
    corporationIcon.height = playerNameText.height; //the icon is a square, constrained by height
    corporationIcon.position.x = nameMaxWidth + corporationIconOffsetX;
    corporationIcon.position.y = corporationIconOffsetY;
    playerContainer.corporationIcon = corporationIcon;
    playerContainer.addChild(corporationIcon);

    return playerContainer;
}

Corporations.SelectScreenSwitchCorporation = function (event) {
    var selectedButton = this;
    var corporation = this.corporation;

    //reset previously selected button to default
    var previouslySelectedButton = $.grep(Corporations.selectScreen.buttons.children, function (e) { return e.selected == true })[0];
    previouslySelectedButton.selected = false;
    previouslySelectedButton.background.clear();
    Corporations.CreateButtonGraphics(previouslySelectedButton.background, false);

    //set clicked button to selected
    selectedButton.selected = true;
    selectedButton.background.clear();
    Corporations.CreateButtonGraphics(selectedButton.background, true);

    //background
    var corporationBackTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + corporation.ImgSplashPath);
    Corporations.selectScreen.detail.corporationBack.texture = corporationBackTexture;

    //description
    Corporations.selectScreen.detail.corporationDescription.text = corporation.Description;

    //perk details
    var perkIconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + corporation.ImgPerkPath);
    Corporations.selectScreen.detail.perkIcon.texture = perkIconTexture;
    Corporations.selectScreen.detail.perkName.text = corporation.BonusName;
    Corporations.selectScreen.detail.perkDescription.text = corporation.BonusDescription;

    //change figures to the new corporation's
    var figures = $.grep(Units.detailList, function (e) { return e.Corporation.Name.toUpperCase() == corporation.Name.toUpperCase() });
    var figureATexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + figures[0].ImgFigurePath);
    Corporations.selectScreen.detail.figures.figureA.figure.texture = figureATexture;
    Corporations.selectScreen.detail.figures.figureA.figureText.text = figures[0].Name;

    var figureBTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + figures[1].ImgFigurePath);
    Corporations.selectScreen.detail.figures.figureB.figure.texture = figureBTexture;
    Corporations.selectScreen.detail.figures.figureB.figureText.text = figures[1].Name;
}

Corporations.UpdateSelectScreen = function () {
    if (Corporations.selectScreen.timer.time > 0) {
        Corporations.selectScreen.timer.time--;
    } else {
        //force user to choose if they haven't alrdy
        if (InstanceData.currentPlayer == Corporations.choosingPlayer.username) {
            Corporations.ClickChooseCorporation();
        }
    }

    Corporations.selectScreen.timer.text = Corporations.selectScreen.timer.time;
}

Corporations.ClickChooseCorporation = function (event) {
    if (InstanceData.currentPlayer == Corporations.choosingPlayer.username) {
        Corporations.selectScreen.timer.time = 0;   //once they choose change their remaining time to 0
        var corporationButton = $.grep(Corporations.selectScreen.buttons.children, function (e) { return e.selected == true })[0];
        if (typeof (corporationButton.chosen) != "undefined" || corporationButton.chosen == true) {
            var unchosenCorporationButtons = $.grep(Corporations.selectScreen.buttons.children, function (e) { return typeof (e.chosen) == "undefined" || e.chosen == false });
            var randomCorporationButtonIndex = Math.floor(Math.random() * (unchosenCorporationButtons.length - 0)) + 0;
            corporationButton = unchosenCorporationButtons[randomCorporationButtonIndex];

            //Corporations.choosingPlayer.corporation = corporationButton.corporation;
            //Corporations.UpdateCorporationButton(corporationButton);
        }
        //else {
        //    Corporations.choosingPlayer.corporation = corporationButton.corporation;
        //    Corporations.UpdateCorporationButton(corporationButton);
        //}
        Networking.SendPlayerCorporation(Corporations.choosingPlayer.index, corporationButton.corporation.index, Corporations.RandomizeChoosingPlayerIndex());
    }
}

Corporations.UpdateCorporationButton = function (button) {
    button.chosen = true;
    button.playerText.text = "Selected By: " + Corporations.choosingPlayer.name;
}

Corporations.PerformChooseCorporation = function (playerIndex, corporationIndex, nextPlayerIndex) {
    //set corporation
    var corporation = Corporations.corporationList[corporationIndex];
    Players.playerList[playerIndex].corporation = corporation;
    corporation.player = Players.playerList[playerIndex];

    //initialize corporation units
    var doomtroopers = $.grep(Units.detailList, function (e) { return e.Corporation.Name.toUpperCase() == corporation.Name.toUpperCase() });
    var doomtrooperInstances = [];
    doomtrooperInstances.push(Units.CreateUnitInstance(doomtroopers[0], playerIndex));
    doomtrooperInstances.push(Units.CreateUnitInstance(doomtroopers[1], playerIndex));
    corporation.units = doomtrooperInstances;

    //find button of chosen corporation
    var corporationButton = $.grep(Corporations.selectScreen.buttons.children, function (e) { return e.corporation.Name.toUpperCase() == corporation.Name.toUpperCase() })[0];
    Corporations.UpdateCorporationButton(corporationButton);

    //change the next choosing player, OR start the game if all have selected
    if (nextPlayerIndex != -1) {
        var nextPlayer = Players.playerList[nextPlayerIndex];
        Corporations.choosingPlayer = nextPlayer;
    } else {
        Corporations.HideSelectScreen();
        Board.ShowBoard();
    }

    //finally reset the timer
    Corporations.selectScreen.timer.time = Corporations.selectionTime;
}

Corporations.RandomizeChoosingPlayerIndex = function () {
    var choosingPlayerIndex = -1;
    if (typeof (Corporations.choosingPlayer) != "undefined") {
        choosingPlayerIndex = Corporations.choosingPlayer.index;
    }
    var filteredPlayers = $.grep(Players.playerList, function (e) { return typeof (e.corporation) == "undefined" && e.index != choosingPlayerIndex });
    if (filteredPlayers.length != 0) {
        var randomPlayerIndex = Math.floor(Math.random() * (filteredPlayers.length - 0)) + 0;

        Corporations.selectScreen.timerLabel.text = filteredPlayers[randomPlayerIndex].name + " is Selecting: ";
        Corporations.selectScreen.timer.position.x = Corporations.selectScreen.timerLabel.position.x + Corporations.selectScreen.timerLabel.width;

        return filteredPlayers[randomPlayerIndex].index;
    } else {
        return -1;
    }
}