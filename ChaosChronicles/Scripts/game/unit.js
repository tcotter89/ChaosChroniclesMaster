var Units = {};
Units.detailList = [];
Units.instanceList = [];

Units.LoadUnitData = function (firstTimeLoad) {
    //load from database
    $.ajax({
        url: "/Home/GetUnitData",
        type: "POST",
        dataType: "json",
        success: function (result) {
            switch (result.Result) {
                case true:
                    Units.detailList = result.Data;

                    if (firstTimeLoad == true) {
                        Setup.loadingStep++;
                        Setup.ProcessLoadingQueue();
                        break;
                    }
                default:
                    GameGlobals.error.html("No units were found in the database");
                    break;
            }
        },
        error: function () {
            GameGlobals.error.html("There was an unknown error while trying to load units");
        }
    });
}

Units.CreateUnitInstance = function (unitInfo, playerIndex) {
    var unit = new PIXI.Container();

    //figure img
    var figureTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + unitInfo.ImgFigurePath);
    var figure = new PIXI.Sprite(figureTexture);

    unit.type = unitInfo.Type;
    unit.name = unitInfo.Name;
    unit.corporation = unitInfo.Corporation;
    unit.playerIndex = playerIndex;
    unit.combatType = unitInfo.CombatType;
    unit.armorSet = unitInfo.ArmorSet;
    unit.defenseSet = unitInfo.DefenseSet;
    unit.maxHealth = unitInfo.DefaultHealth;
    unit.remainingHealth = unitInfo.DefaultHealth;
    unit.dead = false;
    unit.actionsUsed = 0;
    unit.actionsPerTurn = unitInfo.DefaultActions;
    unit.remainingActions = unitInfo.DefaultActions;
    unit.stepsPerAction = unitInfo.DefaultStepsPerAction;
    unit.remainingSteps = 0;
    unit.itemSet = unitInfo.ItemSet;
    unit.itemCount = 0;
    unit.icon = unitInfo.ImgIconPath;
    unit.entered = false;
    unit.exited = false;

    //underlay img
    //var underlayTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.DECAL_DOOMTROOPER);
    var underlayTexture = Units.DetermineUnderlayTexture(unit);
    var underlay = new PIXI.Sprite(underlayTexture);

    //other
    figure.interactive = true;
    figure.buttonMode = true;
    figure.on('click', Units.SelectUnit);
    figure.on('rightclick', Units.TargetUnit);

    unit.width      = Board.Sectors.CELLWIDTH;
    figure.width    = Board.Sectors.CELLWIDTH;
    underlay.width  = Board.Sectors.CELLWIDTH;
    unit.height     = Board.Sectors.CELLHEIGHT;
    figure.height   = Board.Sectors.CELLHEIGHT;
    underlay.height = Board.Sectors.CELLHEIGHT;
    //unit.position.x = (cell.x * Board.Sectors.CELLWIDTH );
    //unit.position.y = (cell.y * Board.Sectors.CELLHEIGHT);
    //unit.boardLocation = cell;
    ////unit.boardLocation = new Object();
    ////unit.boardLocation.x = cell.x;
    ////unit.boardLocation.y = cell.y;
    //unit.boardLocation.sectorIndex = sector.index;
    //unit.boardLocation.sectorNumber = sector.sectorNumber;

    unit.underlay = underlay;   //add reference to underlay glow
    unit.addChild(underlay);
    unit.figure = figure;       //add reference to figure img
    unit.addChild(figure);

    //save to array and find index
    unit.index = Units.instanceList.length;   //the length will find the index that the new unit will be pushed to
    Units.instanceList.push(unit);

    //register the unit on the sector
    //sector.cells[cell.x][cell.y].type = unit.type;
    //sector.cells[cell.x][cell.y].index = Units.instanceList.length - 1;

    //sector.addChild(unit);
    return unit;
}

Units.AddNewUnit = function (name, playerIndex, sector, cell, firstTimeLoad) {
    if (name != "Unknown") {
        var unit = new PIXI.Container();

        $.ajax({
            url: "/Home/GetUnitData",
            type: "POST",
            data: { 'ObjectIdentifier': name },
            dataType: "json",
            success: function (result) {
                switch (result.Result) {
                    case true:
                        //from database
                        //figure img
                        var figureTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + result.Data.ImgFigurePath);
                        var figure = new PIXI.Sprite(figureTexture);

                        //underlay img
                        //var underlayTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.DECAL_DOOMTROOPER);
                        var underlayTexture = Units.DetermineUnderlayTexture(unit);
                        var underlay = new PIXI.Sprite(underlayTexture);

                        unit.type = result.Data.Type;
                        unit.name = result.Data.Name;
                        unit.corporation = result.Data.Corporation;
                        unit.playerIndex = playerIndex;
                        unit.combatType = result.Data.CombatType;
                        unit.armorSet = result.Data.ArmorSet;
                        unit.defenseSet = result.Data.DefenseSet;
                        unit.maxHealth = result.Data.DefaultHealth;
                        unit.remainingHealth = result.Data.DefaultHealth;
                        unit.dead = false;
                        unit.actionsUsed = 0;
                        unit.actionsPerTurn = result.Data.DefaultActions;
                        unit.remainingActions = result.Data.DefaultActions;
                        unit.stepsPerAction = result.Data.DefaultStepsPerAction;
                        unit.remainingSteps = 0;
                        unit.itemSet = result.Data.ItemSet;
                        unit.itemCount = 0;
                        unit.icon = result.Data.ImgIconPath;

                        //other
                        figure.interactive = true;
                        figure.on('click', Units.SelectUnit);
                        figure.on('rightclick', Units.TargetUnit);

                        unit.width      = Board.Sectors.CELLWIDTH;
                        figure.width    = Board.Sectors.CELLWIDTH;
                        underlay.width  = Board.Sectors.CELLWIDTH;
                        unit.height     = Board.Sectors.CELLHEIGHT;
                        figure.height   = Board.Sectors.CELLHEIGHT;
                        underlay.height = Board.Sectors.CELLHEIGHT;
                        unit.position.x = (cell.x * Board.Sectors.CELLWIDTH );
                        unit.position.y = (cell.y * Board.Sectors.CELLHEIGHT);
                        unit.boardLocation = cell;
                        //unit.boardLocation = new Object();
                        //unit.boardLocation.x = cell.x;
                        //unit.boardLocation.y = cell.y;
                        unit.boardLocation.sectorIndex = sector.index;
                        unit.boardLocation.sectorNumber = sector.sectorNumber;

                        unit.underlay = underlay;   //add reference to underlay glow
                        unit.addChild(underlay);
                        unit.figure = figure;       //add reference to figure img
                        unit.addChild(figure);

                        //save to array and find index
                        unit.index = Units.detailList.length;   //the length will find the index that the new unit will be pushed to
                        Units.detailList.push(unit);

                        //register the unit on the sector
                        sector.cells[cell.x][cell.y].type = unit.type;
                        sector.cells[cell.x][cell.y].index = Units.detailList.length - 1;

                        sector.addChild(unit);

                        if (firstTimeLoad == true) {
                            Setup.loadingStep++;
                            Setup.ProcessLoadingQueue();
                        } else {
                            return unit.index;
                        }
                        break;
                    default:
                        GameGlobals.error.html("Unit " + name + " was not found in the database");
                        break;
                }
            },
            error: function () {
                GameGlobals.error.html("There was an unknown error while trying to load unit " + name + " data");
            }
        });
    }
}

Units.GiveItemToUnit = function (item, unit) {
    unit.itemSet.Items.push(item);
}

Units.DetermineUnderlayTexture = function (unit) {
    if (typeof (Interaction.currentSelected.underlay) != "undefined") {
        var underlayTexture;
        //if the unit is currently selected and targeted by you
        if (Interaction.currentSelected.name == unit.name &&
            Interaction.currentTargeted.name == unit.name) {
            underlayTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.DECAL_BOTH);
        }
        //if the unit is currently selected by you
        else if (Interaction.currentSelected.name == unit.name) {
            underlayTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.DECAL_SELECTED);
        }
        //if the unit is currently targeted by you
        else if (Interaction.currentTargeted.name == unit.name) {
            underlayTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.DECAL_TARGETED);
        }
        return underlayTexture;
    }
}

Units.SelectUnit = function (event) {
    if (Utilities.IsClickDragging() == false) {
        var underlayTexture;

        //unselect previous
        if (typeof (Interaction.currentSelected.underlay) != "undefined") {
            underlayTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.DECAL_DOOMTROOPER);
            //check if the unit is still targeted
            if (Interaction.currentSelected == Interaction.currentTargeted) {
                underlayTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.DECAL_TARGETED);
            }
            Interaction.currentSelected.underlay.texture = underlayTexture;
        }

        Interaction.SelectUnit(this.parent);

        //select and check if the unit is targeted as well
        this.parent.underlay.texture = Units.DetermineUnderlayTexture(this.parent);
        //underlayTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.DECAL_SELECTED);
        //if (Interaction.currentSelected == Interaction.currentTargeted) {
        //    underlayTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.DECAL_BOTH);
        //}
        //this.parent.underlay.texture = underlayTexture;

        Overlay.DisplaySelectedTargetedUpdateSelected();
    }
}

Units.TargetUnit = function (event) {
    if (Utilities.IsClickDragging() == false) {
        var underlayTexture;

        //untarget previous
        if (typeof (Interaction.currentTargeted.underlay) != "undefined") {
            underlayTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.DECAL_DOOMTROOPER);
            //check if the unit is still selected
            if (Interaction.currentSelected == Interaction.currentTargeted) {
                underlayTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.DECAL_SELECTED);
            }
            Interaction.currentTargeted.underlay.texture = underlayTexture;
        }

        Interaction.TargetUnit(this.parent);

        //select and check if the unit is targeted as well
        underlayTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.DECAL_TARGETED);
        if (Interaction.currentSelected == Interaction.currentTargeted) {
            underlayTexture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + GameConstants.Images.DECAL_BOTH);
        }
        this.parent.underlay.texture = underlayTexture;

        Overlay.DisplaySelectedTargetedUpdateTargeted();
    }
}

Units.AttackUnit = function (attackingUnit, victimUnit, combatType) {
    var results = new Object();

    //filter through items to find the weapon (max 1 weapon per unit)
    var weapon = $.grep(attackingUnit.itemSet.Items, function (e) { return e.Type.toUpperCase() == "WEAPON" })[0];
    //filter based on what type of combat and what rank the attacking player is
    var attackingPlayerRank = Players.DetermineRank(Players.playerList[attackingUnit.playerIndex].promotionPoints);
    var weaponStats = $.grep(weapon.ItemStats, function (e) { return e.StatType.toUpperCase() == combatType.toUpperCase() })[attackingPlayerRank];

    //filter through items to find attachments/enhancements
    var buffers = $.grep(attackingUnit.itemSet.Items, function (e) { return (e.Type.toUpperCase() == "ATTACHMENT" || e.Type.toUpperCase() == "ENHANCEMENT") });
    //filter based on what type of combat and what rank the attacking player is
    var bufferStats = [];
    for (i = 0; i < buffers.length; i++) {
        var bufferStat = $.grep(buffers[i].ItemStats, function (e) { return e.StatType.toUpperCase() == combatType.toUpperCase() })[attackingPlayerRank];
        if (typeof (bufferStat) != "undefined") {
            bufferStats.push(bufferStat);
        }
    }

    //if no weapon stats are found for this combat type, the attack was unsuccessful
    if (typeof (weaponStats) == "undefined") {
        results.success = false;
        return results;
    }

    results.diceColor = weaponStats.DiceColor;
    results.hits = Combat.RollDice(weaponStats, bufferStats, victimUnit.armorSet.Armor[attackingPlayerRank].DamageReduction);
    if (results.hits == -1) {
        results.success = false;
        return results;
    }

    results.damage = Combat.CalculateDamage(results.hits, victimUnit.armorSet.Armor[attackingPlayerRank].DamageReduction, victimUnit.defenseSet.Defenses[attackingPlayerRank]);
    console.log(attackingUnit.name + " rolled " + results.hits + " hits and has dealt " + results.damage + " damage to " + victimUnit.name + " using " + results.diceColor + " dice");
    victimUnit.remainingHealth -= results.damage;

    if (victimUnit.remainingHealth <= 0) {
        console.log(attackingUnit.name + " has killed " + victimUnit.name);
        var victimSector = $.grep(Board.currentBoard.sectorMap, function (e) { return e.Sector.sectorNumber.toUpperCase() == victimUnit.boardLocation.sectorNumber })[0].Sector;
        victimSector.cells[victimUnit.boardLocation.x][victimUnit.boardLocation.y].occupied = false;
        victimUnit.dead = true;
        victimSector.removeChild(victimUnit);
        results.dead = true;
    } else {
        results.dead = false;
    }

    results.success = true;
    return results;
}

Units.MoveUnit = function (unit, fromSector, toSector, destinationCell) {
    if (unit.remainingSteps >= 1) {
        unit.remainingSteps--;
        console.log("Remaining Steps: " + unit.remainingSteps + "/" + unit.stepsPerAction + ", Remaining Actions: " + unit.remainingActions);
    } else if (unit.remainingSteps <= 0 && unit.remainingActions > 0) {
        unit.remainingSteps = unit.stepsPerAction;
        unit.remainingSteps--;
        unit.remainingActions--;
        unit.actionsUsed++;
        console.log("Remaining Steps: " + unit.remainingSteps + "/" + unit.stepsPerAction + ", Remaining Actions: " + unit.remainingActions);
    } else {
        console.log("Error: Move failed");
        return false;
    }

    //un-register the unit on the sector of the old spot
    if (typeof (unit.boardLocation) != "undefined") {   //if the unit is already on the board
        fromSector.cells[unit.boardLocation.x][unit.boardLocation.y].occupied = false;      //reset to defaults
        fromSector.cells[unit.boardLocation.x][unit.boardLocation.y].isFromCell = false;    //reset to defaults
        fromSector.cells[unit.boardLocation.x][unit.boardLocation.y].type = "none";         //reset to defaults
        fromSector.cells[unit.boardLocation.x][unit.boardLocation.y].index = -1;            //reset to defaults
        fromSector.removeChild(unit);
    }   //otherwise just put the unit at the starting point

    //move to new position
    unit.position.x = (destinationCell.x * Board.Sectors.CELLWIDTH );
    unit.position.y = (destinationCell.y * Board.Sectors.CELLHEIGHT);
    unit.boardLocation = destinationCell;
    //unit.boardLocation.x = destinationCell.x;
    //unit.boardLocation.y = destinationCell.y;
    unit.boardLocation.sectorIndex = toSector.index;
    unit.boardLocation.sectorNumber = toSector.sectorNumber;

    //register the unit on the sector of the new spot
    toSector.cells[destinationCell.x][destinationCell.y].occupied = true;
    toSector.cells[destinationCell.x][destinationCell.y].isToCell = false;
    toSector.cells[destinationCell.x][destinationCell.y].type = unit.type;
    toSector.cells[destinationCell.x][destinationCell.y].index = Units.instanceList.length - 1;
    toSector.addChild(unit);
}

Units.VerifyUnitMoveValid = function (unit, fromSector, toSector, destinationCell) {
    var result = "";

    //VERIFY THE UNIT HAS ACTIONS AVAILABLE
    if (unit.remainingSteps <= 0 && unit.remainingActions == 0) {
        return "No actions available";
    }

    //VERIFY THE UNIT IS MOVING TO AN EMPTY CELL
    if (toSector.cells[destinationCell.x][destinationCell.y].occupied === 'undefined') {
        return "Selected position is occupied or not valid";
    }
    if (toSector.cells[destinationCell.x][destinationCell.y].occupied == true) {
        return "Selected position is occupied or not valid";
    }

    //construct mini-grid
    var fromCell = fromSector.cells[unit.boardLocation.x][unit.boardLocation.y];
    var miniGrid = Board.Sectors.ConstructMiniGrid(fromCell, destinationCell, fromSector, toSector, GameConstants.MOVEMENTGRIDSIZEX, GameConstants.MOVEMENTGRIDSIZEY);

    //VERIFY THE DESTINATION IS ONE CELL AWAY FROM CURRENT CELL
    if (Board.Sectors.AreCellsWithinOne(miniGrid) == false) {
        return "You must move one square at a time";
    }

    //VERIFY A WALL IS NOT IN THE WAY
    if (typeof (unit.phasing) === "undefined" || unit.phasing == false) {
        if (Board.Sectors.IsWallInWay(miniGrid) == true) {
            return "There is a wall in the way";
        }
    }

    return "Success";
}