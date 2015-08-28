SET IDENTITY_INSERT Unit ON

INSERT INTO Unit (UnitID,      Name,          Type, CorporationID, CombatType, ArmorSetID, DefenseSetID, DefaultHealth, DefaultActions, DefaultStepsPerAction, DefaultItemSetID, KillPromotionPoints, DamagePromotionPoints,          ImgFigurePath, ImgPosterPath, ImgIconPath, ImgAlternatePath)
          VALUES (     1, 'Steiner', 'Doomtrooper',             1,   'Ranged',          1,            2,             5,              2,                     3,                1,                   0,                     1, 'doomtroopers/dt1.gif',          null,        null,             null)
INSERT INTO Unit (UnitID,      Name,          Type, CorporationID, CombatType, ArmorSetID, DefenseSetID, DefaultHealth, DefaultActions, DefaultStepsPerAction, DefaultItemSetID, KillPromotionPoints, DamagePromotionPoints,          ImgFigurePath, ImgPosterPath, ImgIconPath, ImgAlternatePath)
          VALUES (     2, 'Valerie', 'Doomtrooper',             1,     'Both',          1,            2,             5,              2,                     3,                3,                   0,                     1, 'doomtroopers/dt2.gif',          null,        null,             null)
INSERT INTO Unit (UnitID,          Name,          Type, CorporationID, CombatType, ArmorSetID, DefenseSetID, DefaultHealth, DefaultActions, DefaultStepsPerAction, DefaultItemSetID, KillPromotionPoints, DamagePromotionPoints,   ImgFigurePath, ImgPosterPath, ImgIconPath, ImgAlternatePath)
          VALUES (    19, 'Legionnaire', 'Legionnaire',            10,     'Both',          2,            1,             1,              2,                     3,                4,                   1,                     0, 'legion/L1.gif',          null,        null,             null)

SET IDENTITY_INSERT Unit OFF