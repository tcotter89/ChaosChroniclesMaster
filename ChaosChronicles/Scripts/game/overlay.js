var Overlay = {};
Overlay.currentOverlay = new Object();

Overlay.pullOutTabRounding = 20;
Overlay.trianglePaddingX = 0.15;    //15%
Overlay.trianglePaddingY = 0.10;    //10%
Overlay.triangleHeight   = 0.15;    //15%

//== INIT/SETUP FUNCTIONS ======================================================================================================================================
Overlay.CreateOverlay = function (firstTimeLoad) {
    Overlay.currentOverlay = new PIXI.Container();
    Overlay.DisplaySelectedTargetedCreate();
    Overlay.DisplayPlayersCreate(190, 190, 0, 50, true);

    //GameGlobals.stage.addChild(Overlay.currentOverlay);

    if (firstTimeLoad == true) {
        Setup.loadingStep++;
        Setup.ProcessLoadingQueue();
    }
}

//== GENERIC/UTILITY FUNCTIONS ======================================================================================================================================
Overlay.CreatePullOutTab = function (content, tabContainer, tabHeight) {

    //the rectangle portion of the tab is the clickable part
    var clickableTab = new PIXI.Graphics();
    clickableTab.beginFill(Utilities.LoadHexColor(GameConstants.Colors.SELECTEDGRAY));
    clickableTab.drawCircle(Overlay.pullOutTabRounding, Overlay.pullOutTabRounding, Overlay.pullOutTabRounding);
    clickableTab.drawCircle(Overlay.pullOutTabRounding, tabHeight - Overlay.pullOutTabRounding, Overlay.pullOutTabRounding);
    clickableTab.drawRect(Overlay.pullOutTabRounding, Overlay.pullOutTabRounding, Overlay.pullOutTabRounding, tabHeight - (Overlay.pullOutTabRounding * 2));   //Overlay.pullOutTabRounding * 2 = width of tab
    clickableTab.endFill();

    tabContainer.content = content;
    clickableTab.interactive = true;
    clickableTab.buttonMode = true;
    clickableTab.on("click", Overlay.ToggleTab);

    //non-clickable graphics
    tabContainer.tab = clickableTab;
    tabContainer.addChild(clickableTab);
    //top triangle
    var arrow1 = new PIXI.Graphics();
    arrow1.status = "Minimized";
    arrow1.beginFill(Utilities.LoadHexColor(GameConstants.Colors.LIGHTERGRAY));
    arrow1.moveTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * Overlay.trianglePaddingX), tabHeight * Overlay.trianglePaddingY); //top left of triangle
    arrow1.lineTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * (1.0 - Overlay.trianglePaddingX)), (tabHeight * Overlay.trianglePaddingY) + (tabHeight * (Overlay.triangleHeight / 2)));  //mid right of triangle
    arrow1.lineTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * Overlay.trianglePaddingX), (tabHeight * Overlay.trianglePaddingY) + (tabHeight * Overlay.triangleHeight));  //bottom left of triangle
    arrow1.lineTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * Overlay.trianglePaddingX), tabHeight * Overlay.trianglePaddingY);  //back to top left of triangle
    arrow1.endFill();
    tabContainer.arrow1 = arrow1;
    tabContainer.addChild(arrow1);

    //bottom triangle
    var arrow2 = new PIXI.Graphics();
    arrow2.status = "Minimized";
    arrow2.beginFill(Utilities.LoadHexColor(GameConstants.Colors.LIGHTERGRAY));
    arrow2.moveTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * Overlay.trianglePaddingX), tabHeight * (1.0 - Overlay.trianglePaddingY)); //bottom left of triangle
    arrow2.lineTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * (1.0 - Overlay.trianglePaddingX)), (tabHeight * (1.0 - Overlay.trianglePaddingY)) - (tabHeight * (Overlay.triangleHeight / 2)));  //mid right of triangle
    arrow2.lineTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * Overlay.trianglePaddingX), (tabHeight * (1.0 - Overlay.trianglePaddingY)) - (tabHeight * Overlay.triangleHeight));  //top left of triangle
    arrow2.lineTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * Overlay.trianglePaddingX), tabHeight * (1.0 - Overlay.trianglePaddingY));  //back to bottom left of triangle
    arrow2.endFill();
    tabContainer.arrow2 = arrow2;
    tabContainer.addChild(arrow2);

    //divider line
    var lineWidth = 1;
    var linePaddingX = 0;
    var linePaddingY = 0;
    var line = new PIXI.Graphics();
    line.beginFill(Utilities.LoadHexColor(GameConstants.Colors.LIGHTGRAY));
    line.drawRect(Overlay.pullOutTabRounding + linePaddingX, linePaddingY, lineWidth, tabHeight - (linePaddingY * 2));
    tabContainer.addChild(line);

    //text
    var style = {
        font: '16px Arial',
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
    var tabName = new PIXI.Text("Corporations", style);
    tabName.rotation = 0.5 * Math.PI; //90 degrees
    //centered on the tab
    tabName.position.x = Overlay.pullOutTabRounding + ((Overlay.pullOutTabRounding / 2) + (tabName.height / 2)); //use tabName.height here instead of tabName.width because it is rotated
    tabName.position.y = (tabHeight / 2) - (tabName.width / 2); //use tabName.width here instead of tabName.height because it is rotated
    tabContainer.tabName = tabName;
    tabContainer.addChild(tabName);
}

Overlay.ToggleTab = function (event) {
    var tabContainer = this.parent;

    //if the tab is hidden
    if (tabContainer.content.position.x == tabContainer.content.hidePoint) {
        //show it
        Overlay.AnimateShowTab(tabContainer);
    }

        //if the tab is visible
    else {
        //hide it
        Overlay.AnimateHideTab(tabContainer);
    }
}

Overlay.AnimateHideTab = function (tabContainer) {
    var content = tabContainer.content;
    var pixelMoveAmount = 10;
    if (content.position.x > content.hidePoint) {
        if (content.position.x - pixelMoveAmount > content.hidePoint) {    //dont go past the edge of screen
            content.position.x -= pixelMoveAmount;
        } else {    //if it would go past edge of screen, simply jump to edge of screen
            content.position.x = content.hidePoint;
        }
        requestAnimationFrame(function () {
            Overlay.AnimateHideTab(tabContainer);
        });
    } else {
        Overlay.TabFlipArrows(tabContainer);
    }
}

Overlay.AnimateShowTab = function (tabContainer) {
    var content = tabContainer.content;
    var pixelMoveAmount = 10;
    if (content.position.x < content.showPoint) {
        if (content.position.x + pixelMoveAmount < content.showPoint) {    //dont go past the edge of screen
            content.position.x += pixelMoveAmount;
        } else {    //if it would go past edge of screen, simply jump to edge of screen
            content.position.x = content.showPoint;
        }
        requestAnimationFrame(function () {
            Overlay.AnimateShowTab(tabContainer);
        });
    } else {
        Overlay.TabFlipArrows(tabContainer);
    }
}

Overlay.TabFlipArrows = function (tabContainer) {
    var arrow1 = tabContainer.arrow1;
    if (arrow1.status.toUpperCase() == "MINIMIZED") {
        arrow1.clear();
        arrow1.beginFill(Utilities.LoadHexColor(GameConstants.Colors.DISABLEDGRAY));
        arrow1.moveTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * (1.0 - Overlay.trianglePaddingX)), tabContainer.height * Overlay.trianglePaddingY); //top left of triangle
        arrow1.lineTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * Overlay.trianglePaddingX), (tabContainer.height * Overlay.trianglePaddingY) + (tabContainer.height * (Overlay.triangleHeight / 2)));  //mid right of triangle
        arrow1.lineTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * (1.0 - Overlay.trianglePaddingX)), (tabContainer.height * Overlay.trianglePaddingY) + (tabContainer.height * Overlay.triangleHeight));  //bottom left of triangle
        arrow1.lineTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * (1.0 - Overlay.trianglePaddingX)), tabContainer.height * Overlay.trianglePaddingY);  //back to top left of triangle
        arrow1.endFill();
        arrow1.status = "Maximized";
    } else {    //if maximized
        arrow1.clear();
        arrow1.beginFill(Utilities.LoadHexColor(GameConstants.Colors.LIGHTERGRAY));
        arrow1.moveTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * Overlay.trianglePaddingX), tabContainer.height * Overlay.trianglePaddingY); //top left of triangle
        arrow1.lineTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * (1.0 - Overlay.trianglePaddingX)), (tabContainer.height * Overlay.trianglePaddingY) + (tabContainer.height * (Overlay.triangleHeight / 2)));  //mid right of triangle
        arrow1.lineTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * Overlay.trianglePaddingX), (tabContainer.height * Overlay.trianglePaddingY) + (tabContainer.height * Overlay.triangleHeight));  //bottom left of triangle
        arrow1.lineTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * Overlay.trianglePaddingX), tabContainer.height * Overlay.trianglePaddingY);  //back to top left of triangle
        arrow1.endFill();
        arrow1.status = "Minimized";
    }
    var arrow2 = tabContainer.arrow2;
    if (arrow2.status.toUpperCase() == "MINIMIZED") {
        arrow2.clear();
        arrow2.beginFill(Utilities.LoadHexColor(GameConstants.Colors.DISABLEDGRAY));
        arrow2.moveTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * (1.0 - Overlay.trianglePaddingX)), tabContainer.height * (1.0 - Overlay.trianglePaddingY)); //bottom left of triangle
        arrow2.lineTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * Overlay.trianglePaddingX), (tabContainer.height * (1.0 - Overlay.trianglePaddingY)) - (tabContainer.height * (Overlay.triangleHeight / 2)));  //mid right of triangle
        arrow2.lineTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * (1.0 - Overlay.trianglePaddingX)), (tabContainer.height * (1.0 - Overlay.trianglePaddingY)) - (tabContainer.height * Overlay.triangleHeight));  //top left of triangle
        arrow2.lineTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * (1.0 - Overlay.trianglePaddingX)), tabContainer.height * (1.0 - Overlay.trianglePaddingY));  //back to bottom left of triangle
        arrow2.endFill();
        arrow2.status = "Maximized";
    } else {    //if maximized
        arrow2.clear();
        arrow2.beginFill(Utilities.LoadHexColor(GameConstants.Colors.LIGHTERGRAY));
        arrow2.moveTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * Overlay.trianglePaddingX), tabContainer.height * (1.0 - Overlay.trianglePaddingY)); //bottom left of triangle
        arrow2.lineTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * (1.0 - Overlay.trianglePaddingX)), (tabContainer.height * (1.0 - Overlay.trianglePaddingY)) - (tabContainer.height * (Overlay.triangleHeight / 2)));  //mid right of triangle
        arrow2.lineTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * Overlay.trianglePaddingX), (tabContainer.height * (1.0 - Overlay.trianglePaddingY)) - (tabContainer.height * Overlay.triangleHeight));  //top left of triangle
        arrow2.lineTo(Overlay.pullOutTabRounding + (Overlay.pullOutTabRounding * Overlay.trianglePaddingX), tabContainer.height * (1.0 - Overlay.trianglePaddingY));  //back to bottom left of triangle
        arrow2.endFill();
        arrow2.status = "Minimized";
    }
}

//== DISPLAYSELECTEDTARGETED FUNCTIONS ======================================================================================================================================
Overlay.DisplaySelectedTargetedCreate = function () {
    // == SELECTED ================================================================================================================
    var selectedDisplay = new PIXI.Container();
    var selectedLeftOffset = 5;

    //selected
    var style = {
        font: '32px Arial',
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
    var selectedText = new PIXI.Text("Selected:", style);
    //selectedText.width = 200;
    selectedText.x = selectedLeftOffset;
    selectedText.y = 2;
    selectedDisplay.addChild(selectedText);

    //selected corporation icon
    var selectedCorporationIconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.NONE);
    var selectedCorporationIcon = new PIXI.Sprite(selectedCorporationIconTexture);
    selectedCorporationIcon.width = 40;
    selectedCorporationIcon.height = 40;
    selectedCorporationIcon.x = selectedLeftOffset + selectedText.width;
    selectedCorporationIcon.y = 0;
    selectedDisplay.corporationIcon = selectedCorporationIcon;
    selectedDisplay.addChild(selectedCorporationIcon);

    //selected unit icon
    var selectedUnitIconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.ICON_DOOMTROOPER);
    var selectedUnitIcon = new PIXI.Sprite(selectedUnitIconTexture);
    selectedUnitIcon.width = 40;
    selectedUnitIcon.height = 40;
    selectedUnitIcon.x = selectedLeftOffset + selectedText.width + selectedCorporationIcon.width;
    selectedUnitIcon.y = 0;
    selectedDisplay.unitIcon = selectedUnitIcon;
    selectedDisplay.addChild(selectedUnitIcon);

    //selected name
    var style = {
        font: '16px Arial',
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
    var selectedName = new PIXI.Text("Nothing Selected", style);
    selectedName.x = selectedLeftOffset + selectedText.width + selectedCorporationIcon.width + selectedUnitIcon.width + 5;
    selectedName.y = 2;
    selectedDisplay.name = selectedName;
    selectedDisplay.addChild(selectedName);

    //selected hp icon
    var selectedHealthIconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.ICON_HEALTH);
    var selectedHealthIcon = new PIXI.Sprite(selectedHealthIconTexture);
    selectedHealthIcon.width = 122;
    selectedHealthIcon.height = 17;
    selectedHealthIcon.position.x = selectedLeftOffset + selectedText.width + selectedCorporationIcon.width + selectedUnitIcon.width + 5;
    selectedHealthIcon.position.y = 21;
    selectedDisplay.healthIcon = selectedHealthIcon;
    selectedDisplay.addChild(selectedHealthIcon);

    //selected actions icon
    var selectedActionsIconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.ICON_ACTIONS);
    var selectedActionsIcon = new PIXI.Sprite(selectedActionsIconTexture);
    selectedActionsIcon.width = 122;
    selectedActionsIcon.height = 17;
    selectedActionsIcon.position.x = selectedLeftOffset + selectedText.width + selectedCorporationIcon.width + selectedUnitIcon.width + selectedHealthIcon.width + 5;
    selectedActionsIcon.position.y = 21;
    selectedDisplay.actionsIcon = selectedActionsIcon;
    selectedDisplay.addChild(selectedActionsIcon);

    //add extra actions
    var selectedAddActionIconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.ICON_ADDACTION);
    var selectedAddActionIcon = new PIXI.Sprite(selectedAddActionIconTexture);
    selectedAddActionIcon.width = 17;
    selectedAddActionIcon.height = 17;
    selectedAddActionIcon.position.x = selectedLeftOffset + selectedText.width + selectedCorporationIcon.width + selectedUnitIcon.width + selectedHealthIcon.width + selectedActionsIcon.width;
    selectedAddActionIcon.position.y = 21;
    selectedDisplay.addActionIcon = selectedAddActionIcon;
    selectedDisplay.addChild(selectedAddActionIcon);

    Overlay.currentOverlay.selectedDisplay = selectedDisplay;   //easy reference
    Overlay.currentOverlay.addChild(selectedDisplay);

    // == TARGET ================================================================================================================
    var targetedDisplay = new PIXI.Container();
    var targetedLeftOffset = selectedDisplay.width + 20;

    //targeted
    var style = {
        font: '32px Arial',
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
    var targetedText = new PIXI.Text("Targeted:", style);
    //targetedText.width = 200;
    targetedText.x = targetedLeftOffset;
    targetedText.y = 2;
    targetedDisplay.addChild(targetedText);

    //targeted corporation icon
    var targetedCorporationIconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.NONE);
    var targetedCorporationIcon = new PIXI.Sprite(targetedCorporationIconTexture);
    targetedCorporationIcon.width = 40;
    targetedCorporationIcon.height = 40;
    targetedCorporationIcon.x = targetedLeftOffset + targetedText.width;
    targetedCorporationIcon.y = 0;
    targetedDisplay.corporationIcon = targetedCorporationIcon;
    targetedDisplay.addChild(targetedCorporationIcon);

    //targeted unit icon
    var targetedUnitIconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.ICON_DOOMTROOPER);
    var targetedUnitIcon = new PIXI.Sprite(targetedUnitIconTexture);
    targetedUnitIcon.width = 40;
    targetedUnitIcon.height = 40;
    targetedUnitIcon.x = targetedLeftOffset + targetedText.width + targetedCorporationIcon.width;
    targetedUnitIcon.y = 0;
    targetedDisplay.unitIcon = targetedUnitIcon;
    targetedDisplay.addChild(targetedUnitIcon);

    //targeted name
    var style = {
        font: '16px Arial',
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
    var targetedName = new PIXI.Text("Nothing Targeted", style);
    targetedName.x = targetedLeftOffset + targetedText.width + targetedCorporationIcon.width + targetedUnitIcon.width + 5;
    targetedName.y = 2;
    targetedDisplay.name = targetedName;
    targetedDisplay.addChild(targetedName);

    //targeted hp icon
    var targetedHealthIconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.ICON_HEALTH);
    var targetedHealthIcon = new PIXI.Sprite(targetedHealthIconTexture);
    targetedHealthIcon.width = 122;
    targetedHealthIcon.height = 17;
    targetedHealthIcon.position.x = targetedLeftOffset + targetedText.width + targetedCorporationIcon.width + targetedUnitIcon.width + 5;
    targetedHealthIcon.position.y = 21;
    targetedDisplay.healthIcon = targetedHealthIcon;
    targetedDisplay.addChild(targetedHealthIcon);

    //targeted actions icon
    var targetedActionsIconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.ICON_ACTIONS);
    var targetedActionsIcon = new PIXI.Sprite(targetedActionsIconTexture);
    targetedActionsIcon.width = 122;
    targetedActionsIcon.height = 17;
    targetedActionsIcon.position.x = targetedLeftOffset + targetedText.width + targetedCorporationIcon.width + targetedUnitIcon.width + targetedHealthIcon.width + 5;
    targetedActionsIcon.position.y = 21;
    targetedDisplay.actionsIcon = targetedActionsIcon;
    targetedDisplay.addChild(targetedActionsIcon);

    //add extra actions
    var targetedAddActionIconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.ICON_ADDACTION);
    var targetedAddActionIcon = new PIXI.Sprite(targetedAddActionIconTexture);
    targetedAddActionIcon.width = 17;
    targetedAddActionIcon.height = 17;
    targetedAddActionIcon.position.x = targetedLeftOffset + targetedText.width + targetedCorporationIcon.width + targetedUnitIcon.width + targetedHealthIcon.width + targetedActionsIcon.width;
    targetedAddActionIcon.position.y = 21;
    targetedDisplay.addActionIcon = targetedAddActionIcon;
    targetedDisplay.addChild(targetedAddActionIcon);

    Overlay.currentOverlay.targetedDisplay = targetedDisplay;   //easy reference
    Overlay.currentOverlay.addChild(targetedDisplay);
}

Overlay.DisplaySelectedTargetedUpdateSelected = function () {
    Overlay.currentOverlay.selectedDisplay.name.text = Interaction.currentSelected.name;
    Overlay.currentOverlay.selectedDisplay.corporationIcon.texture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + Interaction.currentSelected.corporation.ImgLogoPath);
    Overlay.currentOverlay.selectedDisplay.unitIcon.texture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + Interaction.currentSelected.icon);
}

Overlay.DisplaySelectedTargetedUpdateTargeted = function () {
    Overlay.currentOverlay.targetedDisplay.name.text = Interaction.currentTargeted.name;
    Overlay.currentOverlay.targetedDisplay.corporationIcon.texture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + Interaction.currentTargeted.corporation.ImgLogoPath);
    Overlay.currentOverlay.targetedDisplay.unitIcon.texture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + Interaction.currentTargeted.icon);
}

//== DISPLAYPLAYERS FUNCTIONS ======================================================================================================================================
Overlay.DisplayPlayersCreate = function (width, height, offsetX, offsetY, startClosed) {

    var playerDisplay = new PIXI.Container();
    playerDisplay.position.x = offsetX;   //attach to left side
    playerDisplay.position.y = offsetY;
    playerDisplay.hidePoint = (-1 * width);
    playerDisplay.showPoint = offsetX;

    //auto-select the first corporation, in order of players
    playerDisplay.corporation = Players.playerList[0].corporation;

    //pull out tab
    var tabContainer = new PIXI.Container();
    Overlay.CreatePullOutTab(playerDisplay, tabContainer, width);
    tabContainer.position.x = width - Overlay.pullOutTabRounding;

    playerDisplay.tab = tabContainer.tab;
    playerDisplay.tabContainer = tabContainer;
    playerDisplay.addChild(tabContainer);

    //background
    var background = new PIXI.Graphics();
    background.beginFill(Utilities.LoadHexColor(GameConstants.Colors.SELECTEDGRAY));
    background.drawRect(0, 0, width, width);
    playerDisplay.addChild(background);

    //row of icons to select a corporation from
    var corporationSelectionOffsetX = 10;
    var corporationSelectionOffsetY = 5;
    var corporationSelection = Overlay.DisplayPlayersCorporationSelectionCreate(playerDisplay);
    corporationSelection.position.x = corporationSelectionOffsetX;
    corporationSelection.position.y = corporationSelectionOffsetY;
    playerDisplay.corporationSelection = corporationSelection;
    playerDisplay.addChild(corporationSelection);

    //when you click an icon, it will load that corporation
    var selectedCorporationOffsetX = 0;
    var selectedCorporationOffsetY = 5;
    var selectedCorporation = Overlay.DisplayPlayersSelectedCorporationCreate(playerDisplay, width);
    selectedCorporation.position.x = selectedCorporationOffsetX;
    selectedCorporation.position.y = corporationSelection.position.y + corporationSelection.height + selectedCorporationOffsetY;
    playerDisplay.selectedCorporation = selectedCorporation;
    playerDisplay.addChild(selectedCorporation);

    //check if it should start closed
    if (startClosed == true) {
        playerDisplay.position.x = playerDisplay.hidePoint;
    }

    //add shadow to player display
    var shadow = new PIXI.filters.DropShadowFilter();
    shadow.blur = 8;
    shadow.alpha = 0.5;
    shadow.distance = 8;
    playerDisplay.filters = [shadow];

    //finally, add to overlay container
    Overlay.currentOverlay.playerDisplay = playerDisplay;
    Overlay.currentOverlay.addChild(playerDisplay);
}



Overlay.DisplayPlayersCorporationSelectionCreate = function (playerDisplay) {
    var corporationSelection = new PIXI.Container();

    var corporationIconPaddingX = 5;
    for (i = 0; i < Players.playerList.length; i++) {
        var corporationIconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + Players.playerList[i].corporation.ImgLogoPath);
        var corporationIcon = new PIXI.Sprite(corporationIconTexture);
        corporationIcon.corporation = Players.playerList[i].corporation;
        corporationIcon.width = 30;
        corporationIcon.height = 30;
        corporationIcon.position.x = (i * (corporationIcon.width + corporationIconPaddingX));
        corporationIcon.position.y = 0;

        corporationIcon.interactive = true;
        corporationIcon.buttonMode = true;
        corporationIcon.on("click", Overlay.DisplayPlayersSelectedCorporationUpdate);

        corporationSelection.addChild(corporationIcon);
    }

    return corporationSelection;
}

Overlay.DisplayPlayersSelectedCorporationCreate = function (playerDisplay, width) {
    var selectedCorporation = new PIXI.Container();

    //corporation name
    var corporationNameOffsetY = 5
    var style = {
        font: '22px Arial',
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
    var corporationName = new PIXI.Text(playerDisplay.corporation.Name, style);
    corporationName.position.x = (width / 2) - (corporationName.width / 2);  //horizontally centered
    corporationName.position.y = corporationNameOffsetY;
    selectedCorporation.name = corporationName;
    selectedCorporation.addChild(corporationName);

    //units and icon display
    var iconsContainer = new PIXI.Container();
    var iconsContainerOffsetY = 5;
    var corporationUnits = $.grep(Units.instanceList, function (e) { return e.corporation.Name.toUpperCase() == playerDisplay.corporation.Name.toUpperCase() });

    //doomtrooper 1
    var doomtrooper1IconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + corporationUnits[0].icon);
    var doomtrooper1Icon = new PIXI.Sprite(doomtrooper1IconTexture);
    doomtrooper1Icon.width  = 50;
    doomtrooper1Icon.height = 50;
    doomtrooper1Icon.unit = corporationUnits[0];
    doomtrooper1Icon.interactive = true;
    doomtrooper1Icon.buttonMode = true;
    doomtrooper1Icon.on("click", Overlay.DisplayPlayersSelectedCorporationClickDoomtrooper);
    selectedCorporation.doomtrooper1Icon = doomtrooper1Icon;
    iconsContainer.addChild(doomtrooper1Icon);
    //doomtrooper 1 health
    var doomtrooper1HealthIconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.ICON_HEALTH);
    var doomtrooper1HealthIcon = new PIXI.Sprite(doomtrooper1HealthIconTexture);
    doomtrooper1HealthIcon.width = 50;
    doomtrooper1HealthIcon.height = 10;
    doomtrooper1HealthIcon.position.x = doomtrooper1Icon.position.x;
    doomtrooper1HealthIcon.position.y = doomtrooper1Icon.position.y + doomtrooper1Icon.height;
    selectedCorporation.doomtrooper1Health = doomtrooper1HealthIcon;
    iconsContainer.addChild(doomtrooper1HealthIcon);
    //doomtrooper 1 actions
    var doomtrooper1ActionsIconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.ICON_ACTIONS);
    var doomtrooper1ActionsIcon = new PIXI.Sprite(doomtrooper1ActionsIconTexture);
    doomtrooper1ActionsIcon.width = 50;
    doomtrooper1ActionsIcon.height = 10;
    doomtrooper1ActionsIcon.position.x = doomtrooper1HealthIcon.position.x;
    doomtrooper1ActionsIcon.position.y = doomtrooper1HealthIcon.position.y + doomtrooper1HealthIcon.height;
    selectedCorporation.doomtrooper1Actions = doomtrooper1ActionsIcon;
    iconsContainer.addChild(doomtrooper1ActionsIcon);

    //corporation icon
    var corporationIconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + playerDisplay.corporation.ImgLogoPath);
    var corporationIcon = new PIXI.Sprite(corporationIconTexture);
    corporationIcon.width = 50;
    corporationIcon.height = 50;
    corporationIcon.position.x = doomtrooper1Icon.position.x + doomtrooper1Icon.width;
    corporationIcon.position.y = doomtrooper1Icon.position.y;
    selectedCorporation.corporationIcon = corporationIcon;
    iconsContainer.addChild(corporationIcon);

    //doomtrooper 2
    var doomtrooper2IconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + corporationUnits[1].icon);
    var doomtrooper2Icon = new PIXI.Sprite(doomtrooper2IconTexture);
    doomtrooper2Icon.width = 50;
    doomtrooper2Icon.height = 50;
    doomtrooper2Icon.position.x = corporationIcon.position.x + corporationIcon.width;
    doomtrooper2Icon.position.y = corporationIcon.position.y;
    doomtrooper2Icon.unit = corporationUnits[1];
    doomtrooper2Icon.interactive = true;
    doomtrooper2Icon.buttonMode = true;
    doomtrooper2Icon.on("click", Overlay.DisplayPlayersSelectedCorporationClickDoomtrooper);
    selectedCorporation.doomtrooper2Icon = doomtrooper2Icon;
    iconsContainer.addChild(doomtrooper2Icon);
    //doomtrooper 2 health
    var doomtrooper2HealthIconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.ICON_HEALTH);
    var doomtrooper2HealthIcon = new PIXI.Sprite(doomtrooper2HealthIconTexture);
    doomtrooper2HealthIcon.width = 50;
    doomtrooper2HealthIcon.height = 10;
    doomtrooper2HealthIcon.position.x = doomtrooper2Icon.position.x;
    doomtrooper2HealthIcon.position.y = doomtrooper2Icon.position.y + doomtrooper2Icon.height;
    selectedCorporation.doomtrooper2Health = doomtrooper2HealthIcon;
    iconsContainer.addChild(doomtrooper2HealthIcon);
    //doomtrooper 2 actions
    var doomtrooper2ActionsIconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.ICON_ACTIONS);
    var doomtrooper2ActionsIcon = new PIXI.Sprite(doomtrooper2ActionsIconTexture);
    doomtrooper2ActionsIcon.width = 50;
    doomtrooper2ActionsIcon.height = 10;
    doomtrooper2ActionsIcon.position.x = doomtrooper2HealthIcon.position.x;
    doomtrooper2ActionsIcon.position.y = doomtrooper2HealthIcon.position.y + doomtrooper2HealthIcon.height;
    selectedCorporation.doomtrooper2Actions = doomtrooper2ActionsIcon;
    iconsContainer.addChild(doomtrooper2ActionsIcon);

    iconsContainer.position.x = (width / 2) - (iconsContainer.width / 2);
    iconsContainer.position.y = corporationName.position.y + corporationName.height + iconsContainerOffsetY;
    selectedCorporation.addChild(iconsContainer);

    //rank, promo points, and credits
    var statsContainer = new PIXI.Container();
    var statsContainerOffsetY = 5;
    //promo points
    var style = {
        font: '12px Arial',
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
    var promoPoints = new PIXI.Text("Promotion Points: " + playerDisplay.corporation.player.promotionPoints, style);
    selectedCorporation.promoPoints = promoPoints;
    statsContainer.addChild(promoPoints);

    //rank, dice color container
    var rankDiceColorContainer = new PIXI.Container();
    rankDiceColorContainer.position.x = 0;
    //rankDiceColorContainer.position.x = (statsContainer.width / 2) - (rankDiceColorContainer.width / 2); //horizontally centered
    rankDiceColorContainer.position.y = promoPoints.position.y + promoPoints.height;

    //rank
    var style = {
        font: '12px Arial',
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
    var rank = Players.DetermineRank(playerDisplay.corporation.player.promotionPoints);
    var rankText = new PIXI.Text("Rank: " + rank, style);
    rankText.position.x = 0;
    rankText.position.y = 0;
    selectedCorporation.rank = rankText;
    rankDiceColorContainer.addChild(rankText);

    //dice
    var diceContainer = new PIXI.Container();
    var diceContainerOffsetX = 5;
    var diceContainerOffsetY = 2;
    diceContainer.position.x = rankText.position.x + rankText.width + diceContainerOffsetX;
    diceContainer.position.y = diceContainerOffsetY;

    var diceHitCount = Combat.GetDiceProbability(Players.DetermineDiceColor(rank));
    var diceBlankCount = GameConstants.DEFAULTDICESIDES - diceHitCount;
    var diceTextures = Players.DetermineDiceTexture(rank);
    //create icon per hit
    var dicePaddingX = 2;
    for (i = 0; i < diceHitCount; i++) {
        var diceColorHitIcon = new PIXI.Sprite(diceTextures.hit);
        diceColorHitIcon.width = 15;
        diceColorHitIcon.height = 15;
        diceColorHitIcon.position.x = (i * (diceColorHitIcon.width + dicePaddingX));
        diceColorHitIcon.position.y = 0;
        diceContainer.addChild(diceColorHitIcon);
    }
    //create icon per blank
    for (i = 0; i < diceBlankCount; i++) {
        var diceColorBlankIcon = new PIXI.Sprite(diceTextures.blank);
        diceColorBlankIcon.width = 15;
        diceColorBlankIcon.height = 15;
        diceColorBlankIcon.position.x = (diceHitCount * (diceColorHitIcon.width + dicePaddingX)) + (i * (diceColorBlankIcon.width + dicePaddingX)); //blanks start from right of hit dice
        diceColorBlankIcon.position.y = 0;
        diceContainer.addChild(diceColorBlankIcon);
    }
    selectedCorporation.dice = diceContainer;
    rankDiceColorContainer.addChild(diceContainer);

    statsContainer.addChild(rankDiceColorContainer);
    statsContainer.position.x = (width / 2) - (statsContainer.width / 2);  //horizontally centered
    statsContainer.position.y = iconsContainer.position.y + iconsContainer.height + statsContainerOffsetY;
    promoPoints.position.x = (statsContainer.width / 2) - (promoPoints.width / 2);  //horizontally centered
    promoPoints.position.y = 0;
    selectedCorporation.addChild(statsContainer);

    return selectedCorporation;
}

Overlay.DisplayPlayersSelectedCorporationUpdate = function (event) {
    var corporation = this.corporation;
    var selectedCorporation = Overlay.currentOverlay.playerDisplay.selectedCorporation;

    //name
    selectedCorporation.name.text = corporation.Name;

    //logo
    var corporationIconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + corporation.ImgLogoPath);
    selectedCorporation.corporationIcon.texture = corporationIconTexture;

    //units
    var corporationUnits = $.grep(Units.instanceList, function (e) { return e.Corporation.Name.toUpperCase() == corporation.Name.toUpperCase() });
    //doomtrooper 1
    var doomtrooper1IconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + corporationUnits[0].ImgIconPath);
    selectedCorporation.doomtrooper1Icon.texture = doomtrooper1IconTexture;
    //doomtrooper 2
    var doomtrooper2IconTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + corporationUnits[1].ImgIconPath);
    selectedCorporation.doomtrooper2Icon.texture = doomtrooper2IconTexture;

    //stats
    selectedCorporation.promoPoints.text = "Promotion Points: " + corporation.player.promotionPoints;
    var rank = Players.DetermineRank(corporation.player.promotionPoints)
    selectedCorporation.rank.text = "Rank: " + rank;

    //dice
    var diceHitCount = Combat.GetDiceProbability(Players.DetermineDiceColor(rank));
    var diceBlankCount = GameConstants.DEFAULTDICESIDES - diceHitCount;
    var diceTextures = Players.DetermineDiceTexture(rank);
    //hits
    for (i = 0; i < diceHitCount; i++) {
        selectedCorporation.dice.children[i].texture = diceTextures.hit;
    }
    //blanks
    for (i = diceHitCount; i < diceHitCount + diceBlankCount; i++) {
        selectedCorporation.dice.children[i].texture = diceTextures.blank;
    }
}

Overlay.DisplayPlayersSelectedCorporationClickDoomtrooper = function (event) {
    if (Utilities.IsClickDragging() == false) {
        Interaction.SelectUnit(event.target.unit);
        Overlay.DisplaySelectedTargetedUpdateSelected();
    }
}