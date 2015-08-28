SET IDENTITY_INSERT DefenseSet ON

INSERT INTO DefenseSet (DefenseSetID, Name)
                VALUES (1, 'No Defense')
INSERT INTO DefenseRoll (DefenseSetID, Rank, DiceCount, DiceColor)
                 VALUES (           1,    1,         0,   'White')
INSERT INTO DefenseRoll (DefenseSetID, Rank, DiceCount, DiceColor)
                 VALUES (           1,    2,         0,   'White')
INSERT INTO DefenseRoll (DefenseSetID, Rank, DiceCount, DiceColor)
                 VALUES (           1,    3,         0,   'Red')
INSERT INTO DefenseRoll (DefenseSetID, Rank, DiceCount, DiceColor)
                 VALUES (           1,    4,         0,   'Red')
INSERT INTO DefenseRoll (DefenseSetID, Rank, DiceCount, DiceColor)
                 VALUES (           1,    5,         0,   'Black')
INSERT INTO DefenseRoll (DefenseSetID, Rank, DiceCount, DiceColor)
                 VALUES (           1,    6,         0,   'Black')
INSERT INTO DefenseSet (DefenseSetID, Name)
                VALUES (2, 'Standard Doomtrooper')
INSERT INTO DefenseRoll (DefenseSetID, Rank, DiceCount, DiceColor)
                 VALUES (           2,    1,         1,   'White')
INSERT INTO DefenseRoll (DefenseSetID, Rank, DiceCount, DiceColor)
                 VALUES (           2,    2,         1,   'White')
INSERT INTO DefenseRoll (DefenseSetID, Rank, DiceCount, DiceColor)
                 VALUES (           2,    3,         1,   'Red')
INSERT INTO DefenseRoll (DefenseSetID, Rank, DiceCount, DiceColor)
                 VALUES (           2,    4,         1,   'Red')
INSERT INTO DefenseRoll (DefenseSetID, Rank, DiceCount, DiceColor)
                 VALUES (           2,    5,         1,   'Black')
INSERT INTO DefenseRoll (DefenseSetID, Rank, DiceCount, DiceColor)
                 VALUES (           2,    6,         1,   'Black')
INSERT INTO DefenseSet (DefenseSetID, Name)
                VALUES (3, 'Advanced Doomtrooper')
INSERT INTO DefenseRoll (DefenseSetID, Rank, DiceCount, DiceColor)
                 VALUES (           3,    1,         2,   'White')
INSERT INTO DefenseRoll (DefenseSetID, Rank, DiceCount, DiceColor)
                 VALUES (           3,    2,         2,   'White')
INSERT INTO DefenseRoll (DefenseSetID, Rank, DiceCount, DiceColor)
                 VALUES (           3,    3,         2,   'Red')
INSERT INTO DefenseRoll (DefenseSetID, Rank, DiceCount, DiceColor)
                 VALUES (           3,    4,         2,   'Red')
INSERT INTO DefenseRoll (DefenseSetID, Rank, DiceCount, DiceColor)
                 VALUES (           3,    5,         2,   'Black')
INSERT INTO DefenseRoll (DefenseSetID, Rank, DiceCount, DiceColor)
                 VALUES (           3,    6,         2,   'Black')

SET IDENTITY_INSERT DefenseSet OFF