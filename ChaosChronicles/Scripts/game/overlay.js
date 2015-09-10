var Overlay = {};
Overlay.currentOverlay = new Object();

Overlay.SetupOverlay = function (firstTimeLoad) {
    Overlay.currentOverlay = new PIXI.Container();
    Overlay.AddSelectedTargetedDisplay();
    GameGlobals.stage.addChild(Overlay.currentOverlay);

    if (firstTimeLoad == true) {
        Setup.loadingStep++;
        Setup.ProcessLoadingQueue();
    }
}

Overlay.AddSelectedTargetedDisplay = function () {
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

Overlay.UpdateSelected = function () {
    Overlay.currentOverlay.selectedDisplay.name.text = Interaction.currentSelected.name;
    Overlay.currentOverlay.selectedDisplay.corporationIcon.texture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + Interaction.currentSelected.corporation.ImgLogoPath);
    Overlay.currentOverlay.selectedDisplay.unitIcon.texture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + Interaction.currentSelected.icon);
}

Overlay.UpdateTargeted = function () {
    Overlay.currentOverlay.targetedDisplay.name.text = Interaction.currentTargeted.name;
    Overlay.currentOverlay.targetedDisplay.corporationIcon.texture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + Interaction.currentTargeted.corporation.ImgLogoPath);
    Overlay.currentOverlay.targetedDisplay.unitIcon.texture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + Interaction.currentTargeted.icon);
}