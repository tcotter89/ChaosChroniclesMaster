﻿var Combat = {};

GameConstants.DICEWHITEPROBABILITY = 2;   //how many sides of a D6 dice are hits
GameConstants.DICEREDPROBABILITY =   3;   //how many sides of a D6 dice are hits
GameConstants.DICEBLACKPROBABILITY = 4;   //how many sides of a D6 dice are hits

Combat.RollDice = function (weaponStats, bufferStats) {
    var hits = 0;
    var probability = Combat.GetDiceProbability(weaponStats.DiceColor);

    var diceCount = weaponStats.DiceCount;
    for (i = 0; i < bufferStats.length; i++) {
        if (typeof (bufferStats[i].DiceCount) != "undefined") {
            diceCount += bufferStats[i].DiceCount;
        }
    }

    for (i = 0; i < weaponStats.DiceCount; i++) {
        if (Combat.PerformDiceRoll(probability, 6) == true) {
            hits++;
        }
    }

    var diceRerolls = weaponStats.DiceReroll;
    for (i = 0; i < bufferStats.length; i++) {
        if (typeof (bufferStats[i].DiceReroll) != "undefined") {
            diceRerolls += bufferStats[i].DiceReroll;
        }
    }

    for (i = 0; i < diceCount - hits && diceRerolls > 0; i++) {
        if (Combat.PerformDiceRoll(probability, 6) == true) {
            hits++;
        }
        diceRerolls--;
    }

    return hits;
}

Combat.PerformDiceRoll = function (probability, diceSides) {
    var randomD6 = Math.floor((Math.random() * diceSides) + 1);
    if (randomD6 <= probability) {
        return true;
    }
}

Combat.GetDiceProbability = function (color) {
    var probability = 0;

    if (color.toUpperCase() == 'WHITE') {
        probability = GameConstants.DICEWHITEPROBABILITY;
    } else if (color.toUpperCase() == 'RED') {
        probability = GameConstants.DICEREDPROBABILITY;
    } else if (color.toUpperCase() == 'BLACK') {
        probability = GameConstants.DICEBLACKPROBABILITY;
    }

    return probability;
}

Combat.CalculateDamage = function (hits, victimArmor, victimDefense) {
    var runningDamage = hits;
    runningDamage -= victimArmor;

    probability = Combat.GetDiceProbability(victimDefense.DiceColor);
    for (var i = 0; i < victimDefense.DiceCount; i++) {
        if (Combat.PerformDiceRoll(probability, 6) == true) {
            runningDamage--;
        }
    }

    //DO NOT allow negative damage (healing)
    if (runningDamage < 0) {
        runningDamage = 0;
    }

    return runningDamage;
}