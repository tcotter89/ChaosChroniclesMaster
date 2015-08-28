var Items = {};
Items.itemList = [];

GameConstants.WEAPONINDEX = 0;    //the weapon is always the first item added to a unit

//types = weapon, attachment,
Items.AddNewItem = function (type, name, fireCombatArray, meleeCombatArray, cost) {
    var item = new Object();

    item.type = type;
    item.name = name;
    item.fireCombat = fireCombatArray;
    item.meleeCombat = meleeCombatArray;
    //item.fireCombatDiceR1 = fireCombatDiceR1Count;
    //item.fireCombatDiceR3 = fireCombatDiceR3;
    //item.fireCombatDiceR5 = fireCombatDiceR5;
    //item.meleeCombatDiceR1 = meleeCombatDiceR1;
    //item.meleeCombatDiceR3 = meleeCombatDiceR3;
    //item.meleeCombatDiceR5 = meleeCombatDiceR5;
    item.cost = cost;

    return item;
}

Items.CreateDefaultItems = function (type, combatType) {
    var results = new Object();
    results.itemList = [];
    results.itemCount = 0;
    if (type === 'doomtrooper') {
        if (combatType = 'both') {
            var fireCombatArray = new Array(GameConstants);
            fireCombatArray[0] = new Object();
            fireCombatArray[1] = new Object();
            fireCombatArray[1].diceCount = 3;
            fireCombatArray[1].diceColor = 'white';
            fireCombatArray[2] = new Object();
            fireCombatArray[2].diceCount = 3;
            fireCombatArray[2].diceColor = 'white';
            fireCombatArray[3] = new Object();
            fireCombatArray[3].diceCount = 3;
            fireCombatArray[3].diceColor = 'red';
            fireCombatArray[4] = new Object();
            fireCombatArray[4].diceCount = 3;
            fireCombatArray[4].diceColor = 'red';
            fireCombatArray[5] = new Object();
            fireCombatArray[5].diceCount = 3;
            fireCombatArray[5].diceColor = 'black';
            fireCombatArray[6] = new Object();
            fireCombatArray[6].diceCount = 3;
            fireCombatArray[6].diceColor = 'black';

            var meleeCombatArray = new Array(GameConstants);
            meleeCombatArray[0] = new Object();
            meleeCombatArray[1] = new Object();
            meleeCombatArray[1].diceCount = 3;
            meleeCombatArray[1].diceColor = 'white';
            meleeCombatArray[2] = new Object();
            meleeCombatArray[2].diceCount = 3;
            meleeCombatArray[2].diceColor = 'white';
            meleeCombatArray[3] = new Object();
            meleeCombatArray[3].diceCount = 3;
            meleeCombatArray[3].diceColor = 'red';
            meleeCombatArray[4] = new Object();
            meleeCombatArray[4].diceCount = 3;
            meleeCombatArray[4].diceColor = 'red';
            meleeCombatArray[5] = new Object();
            meleeCombatArray[5].diceCount = 3;
            meleeCombatArray[5].diceColor = 'black';
            meleeCombatArray[6] = new Object();
            meleeCombatArray[6].diceCount = 3;
            meleeCombatArray[6].diceColor = 'black';
            results.itemList.push(Items.AddNewItem('weapon', 'Punisher Combo', fireCombatArray, meleeCombatArray, 2));
            //results.items.push(Items.AddNewItem('weapon', 'Punisher Combo', 3, 'white', 3, 'red', 3, 'black', 3, 'white', 3, 'red', 3, 'black', 2));
            results.itemCount++;
        } else if (combatType = 'melee') {
            var fireCombatArray = new Array(GameConstants);
            fireCombatArray[0] = new Object();
            fireCombatArray[1] = new Object();
            fireCombatArray[1].diceCount = 0;
            fireCombatArray[1].diceColor = 'white';
            fireCombatArray[2] = new Object();
            fireCombatArray[2].diceCount = 0;
            fireCombatArray[2].diceColor = 'white';
            fireCombatArray[3] = new Object();
            fireCombatArray[3].diceCount = 0;
            fireCombatArray[3].diceColor = 'red';
            fireCombatArray[4] = new Object();
            fireCombatArray[4].diceCount = 0;
            fireCombatArray[4].diceColor = 'red';
            fireCombatArray[5] = new Object();
            fireCombatArray[5].diceCount = 0;
            fireCombatArray[5].diceColor = 'black';
            fireCombatArray[6] = new Object();
            fireCombatArray[6].diceCount = 0;
            fireCombatArray[6].diceColor = 'black';

            var meleeCombatArray = new Array(GameConstants);
            meleeCombatArray[0] = new Object();
            meleeCombatArray[1] = new Object();
            meleeCombatArray[1].diceCount = 3;
            meleeCombatArray[1].diceColor = 'white';
            meleeCombatArray[2] = new Object();
            meleeCombatArray[2].diceCount = 3;
            meleeCombatArray[2].diceColor = 'white';
            meleeCombatArray[3] = new Object();
            meleeCombatArray[3].diceCount = 3;
            meleeCombatArray[3].diceColor = 'red';
            meleeCombatArray[4] = new Object();
            meleeCombatArray[4].diceCount = 3;
            meleeCombatArray[4].diceColor = 'red';
            meleeCombatArray[5] = new Object();
            meleeCombatArray[5].diceCount = 3;
            meleeCombatArray[5].diceColor = 'black';
            meleeCombatArray[6] = new Object();
            meleeCombatArray[6].diceCount = 3;
            meleeCombatArray[6].diceColor = 'black';
            results.itemList.push(Items.AddNewItem('weapon', 'Punisher Sword', fireCombatArray, meleeCombatArray, 0));
            //results.items.push(Items.AddNewItem('weapon', 'Punisher Sword', 0, 'white', 0, 'red', 0, 'black', 3, 'white', 3, 'red', 3, 'black', 0));
            results.itemCount++;
        } else if (combatType = 'ranged') {
            var fireCombatArray = new Array(GameConstants);
            fireCombatArray[0] = new Object();
            fireCombatArray[1] = new Object();
            fireCombatArray[1].diceCount = 3;
            fireCombatArray[1].diceColor = 'white';
            fireCombatArray[2] = new Object();
            fireCombatArray[2].diceCount = 3;
            fireCombatArray[2].diceColor = 'white';
            fireCombatArray[3] = new Object();
            fireCombatArray[3].diceCount = 3;
            fireCombatArray[3].diceColor = 'red';
            fireCombatArray[4] = new Object();
            fireCombatArray[4].diceCount = 3;
            fireCombatArray[4].diceColor = 'red';
            fireCombatArray[5] = new Object();
            fireCombatArray[5].diceCount = 3;
            fireCombatArray[5].diceColor = 'black';
            fireCombatArray[6] = new Object();
            fireCombatArray[6].diceCount = 3;
            fireCombatArray[6].diceColor = 'black';

            var meleeCombatArray = new Array(GameConstants);
            meleeCombatArray[0] = new Object();
            meleeCombatArray[1] = new Object();
            meleeCombatArray[1].diceCount = 1;
            meleeCombatArray[1].diceColor = 'white';
            meleeCombatArray[2] = new Object();
            meleeCombatArray[2].diceCount = 1;
            meleeCombatArray[2].diceColor = 'white';
            meleeCombatArray[3] = new Object();
            meleeCombatArray[3].diceCount = 1;
            meleeCombatArray[3].diceColor = 'red';
            meleeCombatArray[4] = new Object();
            meleeCombatArray[4].diceCount = 1;
            meleeCombatArray[4].diceColor = 'red';
            meleeCombatArray[5] = new Object();
            meleeCombatArray[5].diceCount = 1;
            meleeCombatArray[5].diceColor = 'black';
            meleeCombatArray[6] = new Object();
            meleeCombatArray[6].diceCount = 1;
            meleeCombatArray[6].diceColor = 'black';
            results.itemList.push(Items.AddNewItem('weapon', 'Punisher Rifle', fireCombatArray, meleeCombatArray, 0));
            //results.items.push(Items.AddNewItem('weapon', 'Punisher Rifle', 3, 'white', 3, 'red', 3, 'black', 0, 'white', 0, 'red', 0, 'black', 0));
            results.itemCount++;
        }
    } else if (type === 'legionnaire') {
        var fireCombatArray = new Array(GameConstants);
        fireCombatArray[0] = new Object();
        fireCombatArray[1] = new Object();
        fireCombatArray[1].diceCount = 3;
        fireCombatArray[1].diceColor = 'white';
        fireCombatArray[2] = new Object();
        fireCombatArray[2].diceCount = 3;
        fireCombatArray[2].diceColor = 'white';
        fireCombatArray[3] = new Object();
        fireCombatArray[3].diceCount = 3;
        fireCombatArray[3].diceColor = 'white';
        fireCombatArray[4] = new Object();
        fireCombatArray[4].diceCount = 3;
        fireCombatArray[4].diceColor = 'white';
        fireCombatArray[5] = new Object();
        fireCombatArray[5].diceCount = 3;
        fireCombatArray[5].diceColor = 'red';
        fireCombatArray[6] = new Object();
        fireCombatArray[6].diceCount = 3;
        fireCombatArray[6].diceColor = 'red';

        var meleeCombatArray = new Array(GameConstants);
        meleeCombatArray[0] = new Object();
        meleeCombatArray[1] = new Object();
        meleeCombatArray[1].diceCount = 2;
        meleeCombatArray[1].diceColor = 'red';
        meleeCombatArray[2] = new Object();
        meleeCombatArray[2].diceCount = 2;
        meleeCombatArray[2].diceColor = 'red';
        meleeCombatArray[3] = new Object();
        meleeCombatArray[3].diceCount = 2;
        meleeCombatArray[3].diceColor = 'red';
        meleeCombatArray[4] = new Object();
        meleeCombatArray[4].diceCount = 2;
        meleeCombatArray[4].diceColor = 'red';
        meleeCombatArray[5] = new Object();
        meleeCombatArray[5].diceCount = 2;
        meleeCombatArray[5].diceColor = 'black';
        meleeCombatArray[6] = new Object();
        meleeCombatArray[6].diceCount = 2;
        meleeCombatArray[6].diceColor = 'black';
        results.itemList.push(Items.AddNewItem('weapon', 'Terror Pistol', fireCombatArray, meleeCombatArray, 0));
        //results.items.push(Items.AddNewItem('weapon', 'Terror Pistol', 3, 'white', 3, 'white', 3, 'red', 2, 'red', 2, 'red', 2, 'black', 0));
        results.itemCount++;
    } else if (type === 'necromutant') {
        //results.itemList.push(Items.AddNewItem('weapon', 'Barbed Rifle', 2, 'red', 2, 'black', 2, 'black', 3, 'white', 3, 'red', 3, 'red', 0));
        //results.itemCount++;
    } else if (type === 'centurion') {
        //results.itemList.push(Items.AddNewItem('weapon', "Officer's Combo", 4, 'white', 4, 'white', 4, 'red', 3, 'white', 3, 'red', 3, 'black', 0));
        //results.itemCount++;
    } else if (type === 'razide') {
        //results.itemList.push(Items.AddNewItem('weapon', "Heavy Bolter", 4, 'white', 4, 'red', 4, 'red', 3, 'red', 3, 'black', 3, 'black', 0));
        //results.itemCount++;
    } else if (type === 'nepharite') {
        //results.itemList.push(Items.AddNewItem('weapon', "Buzzsaw", 5, 'white', 4, 'red', 5, 'red', 4, 'red', 5, 'red', 4, 'black', 0));
        //results.itemCount++;
    } else if (type === 'ezoghoul') {
        //results.itemList.push(Items.AddNewItem('weapon', "Berserker's Arms", 5, 'white', 4, 'red', 4, 'red', 4, 'red', 5, 'black', 5, 'black', 0));
        //results.itemCount++;
    }
    return results;
}