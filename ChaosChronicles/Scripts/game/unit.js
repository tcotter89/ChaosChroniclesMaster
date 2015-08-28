var Units = {};
Units.unitList = [];

//types = doomtrooper, legionnaire, necromutant, centurion, razide, nepharite, ezoghoul, objective
//Units.AddNewUnit = function (type, name, corporation, playerIndex, combatType, armor, defenseRoll, defaultHealth, defaultActions, defaultSteps, sector, cell, imgPath, firstTimeLoad) {
//    var unit = new Object();

//    //drawing/graphics data
//    var texture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + imgPath);
//    unit = new PIXI.Sprite(texture);

//    unit.width = Board.Sectors.CELLWIDTH;
//    unit.height = Board.Sectors.CELLHEIGHT;
//    unit.position.x = cell.x * Board.Sectors.CELLWIDTH;
//    unit.position.y = cell.y * Board.Sectors.CELLHEIGHT;

//    unit.boardLocation = new Object();
//    unit.boardLocation.x = cell.x;
//    unit.boardLocation.y = cell.y;
//    unit.boardLocation.sectorIndex = sector.index;

//    unit.interactive = true;
//    unit.on('click', Units.SelectUnit);
//    unit.on('rightclick', Units.TargetUnit);
//    //unit.on('mousedown', Units.SelectUnit);

//    //game logic/data
//    unit.type = type;
//    unit.name = name;
//    unit.corporation = corporation;
//    unit.playerIndex = playerIndex;
//    unit.combatType = combatType;
//    unit.armor = armor;
//    unit.defenseRoll = defenseRoll;
//    unit.maxHealth = defaultHealth;
//    unit.remainingHealth = defaultHealth;
//    unit.dead = false;
//    unit.actionsUsed = 0;
//    unit.actionsPerTurn = defaultActions;
//    unit.remainingActions = defaultActions;
//    unit.stepsPerAction = defaultSteps;
//    unit.remainingSteps = 0;
//    unit.items = Items.CreateDefaultItems(type, combatType);
//    unit.itemCount = 0;

//    //save to array and find index
//    unit.index = Units.unitList.length;   //the length will find the index that the new unit will be pushed to
//    Units.unitList.push(unit);

//    //register the unit on the sector
//    //sector.cells[cell.x][cell.y] = new Object();
//    sector.cells[cell.x][cell.y].type = unit.type;
//    sector.cells[cell.x][cell.y].index = Units.unitList.length - 1;

//    GameGlobals.stage.addChild(unit);

//    if (firstTimeLoad == true) {
//        Setup.loadingStep++;
//        Setup.ProcessLoadingQueue();
//    } else {
//        return unit.index;
//    }
//}

Units.AddNewUnit = function (name, playerIndex, sector, cell, firstTimeLoad) {
    if (name != "Unknown") {
        var unit = new Object();

        $.ajax({
            url: "/Home/GetUnitData",
            type: "POST",
            data: { 'ObjectIdentifier': name },
            dataType: "json",
            success: function (result) {
                switch (result.Result) {
                    case true:
                        //from database
                        var texture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + result.Data.ImgFigurePath);
                        unit = new PIXI.Sprite(texture);

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

                        //other
                        unit.interactive = true;
                        unit.on('click', Units.SelectUnit);
                        unit.on('rightclick', Units.TargetUnit);

                        unit.width = Board.Sectors.CELLWIDTH;
                        unit.height = Board.Sectors.CELLHEIGHT;
                        unit.position.x = cell.x * Board.Sectors.CELLWIDTH;
                        unit.position.y = cell.y * Board.Sectors.CELLHEIGHT;

                        unit.boardLocation = new Object();
                        unit.boardLocation.x = cell.x;
                        unit.boardLocation.y = cell.y;
                        unit.boardLocation.sectorIndex = sector.index;

                        //save to array and find index
                        unit.index = Units.unitList.length;   //the length will find the index that the new unit will be pushed to
                        Units.unitList.push(unit);

                        //register the unit on the sector
                        sector.cells[cell.x][cell.y].type = unit.type;
                        sector.cells[cell.x][cell.y].index = Units.unitList.length - 1;

                        GameGlobals.stage.addChild(unit);

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

        ////drawing/graphics data


        //unit.width = Board.Sectors.CELLWIDTH;
        //unit.height = Board.Sectors.CELLHEIGHT;
        //unit.position.x = cell.x * Board.Sectors.CELLWIDTH;
        //unit.position.y = cell.y * Board.Sectors.CELLHEIGHT;

        //unit.boardLocation = new Object();
        //unit.boardLocation.x = cell.x;
        //unit.boardLocation.y = cell.y;
        //unit.boardLocation.sectorIndex = sector.index;

        //unit.interactive = true;
        //unit.on('click', Units.SelectUnit);
        //unit.on('rightclick', Units.TargetUnit);
        ////unit.on('mousedown', Units.SelectUnit);

        ////game logic/data
        //unit.type = type;
        //unit.name = name;
        //unit.corporation = corporation;
        //unit.playerIndex = playerIndex;
        //unit.combatType = combatType;
        //unit.armor = armor;
        //unit.defenseRoll = defenseRoll;
        //unit.maxHealth = defaultHealth;
        //unit.remainingHealth = defaultHealth;
        //unit.dead = false;
        //unit.actionsUsed = 0;
        //unit.actionsPerTurn = defaultActions;
        //unit.remainingActions = defaultActions;
        //unit.stepsPerAction = defaultSteps;
        //unit.remainingSteps = 0;
        //unit.items = Items.CreateDefaultItems(type, combatType);
        //unit.itemCount = 0;

        ////save to array and find index
        //unit.index = Units.unitList.length;   //the length will find the index that the new unit will be pushed to
        //Units.unitList.push(unit);

        ////register the unit on the sector
        ////sector.cells[cell.x][cell.y] = new Object();
        //sector.cells[cell.x][cell.y].type = unit.type;
        //sector.cells[cell.x][cell.y].index = Units.unitList.length - 1;

        //GameGlobals.stage.addChild(unit);

        //if (firstTimeLoad == true) {
        //    Setup.loadingStep++;
        //    Setup.ProcessLoadingQueue();
        //} else {
        //    return unit.index;
        //}
    }
}

Units.SelectUnit = function (event) {
    Interaction.SelectUnit(event.data, this);
}

Units.TargetUnit = function (event) {
    Interaction.TargetUnit(event.data, this);
}

Units.AttackUnit = function (attackingUnit, victimUnit, combatType) {
    var results = new Object();

    //filter through items to find the weapon (max 1 weapon per unit)
    var weapon = $.grep(attackingUnit.itemSet.Items, function (e) { return e.Type.toUpperCase() == "WEAPON" })[0];

    //filter based on what type of combat and what rank the attacking player is
    var weaponStats = $.grep(weapon.ItemStats, function (e) { return e.StatType.toUpperCase() == combatType.toUpperCase() })[Players.playerList[attackingUnit.playerIndex].rank];

    results.diceColor = weaponStats.DiceColor;
    results.hits = Combat.RollDice(weaponStats);
    results.damage = Combat.CalculateDamage(results.hits, victimUnit.armorSet.Armor[Players.playerList[attackingUnit.playerIndex].rank].DamageReduction, victimUnit.defenseSet.Defenses[Players.playerList[attackingUnit.playerIndex].rank]);
    console.log(attackingUnit.name + " rolled " + results.hits + " hits and has dealt " + results.damage + " damage to " + victimUnit.name + " using " + results.diceColor + " dice");
    victimUnit.remainingHealth -= results.damage;

    if (victimUnit.remainingHealth <= 0) {
        console.log(attackingUnit.name + " has killed " + victimUnit.name);
        Board.Sectors.sectorList[victimUnit.boardLocation.sectorIndex].cells[victimUnit.boardLocation.x][victimUnit.boardLocation.y].occupied = false;
        victimUnit.dead = true;
        GameGlobals.stage.removeChild(victimUnit);
        results.dead = true;
    } else {
        results.dead = false;
    }

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
    //var oldPosition = Utilities.ConvertCoordToCell(unit.position.x, unit.position.y);
    //fromSector.cells[unit.boardLocation.x].splice(unit.boardLocation.y, 1);
    //fromSector.cells[unit.boardLocation.y].length = 8;
    fromSector.cells[unit.boardLocation.x][unit.boardLocation.y].occupied = false;

    //move to new position
    unit.position.x = destinationCell.x * Board.Sectors.CELLWIDTH;
    unit.position.y = destinationCell.y * Board.Sectors.CELLHEIGHT;
    unit.boardLocation.x = destinationCell.x;
    unit.boardLocation.y = destinationCell.y;

    //register the unit on the sector of the new spot
    //toSector.cells[destinationCell.x][destinationCell.y] = new Object();
    toSector.cells[destinationCell.x][destinationCell.y].occupied = true;
    toSector.cells[destinationCell.x][destinationCell.y].type = unit.type;
    toSector.cells[destinationCell.x][destinationCell.y].index = Units.unitList.length - 1;
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

    //VERIFY THE DESTINATION IS ONE CELL AWAY FROM CURRENT CELL
    var fromCell = new Object ({ x: unit.boardLocation.x, y: unit.boardLocation.y });
    if (Board.Sectors.AreCellsWithinOne(fromCell, destinationCell, fromSector, toSector) == false) {
        return "You must move one square at a time";
    }

    //VERIFY A WALL IS NOT IN THE WAY


    return "Success";
}