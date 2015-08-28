SET IDENTITY_INSERT Corporation ON

INSERT INTO Corporation (CorporationID,      Name,                     Description, ImgLogoPath, ImgSplashPath, ImgAlternatePath, ImgTrayPath, ImgTurnMarkerPath,     BonusName,                                 BonusDescription)
                 VALUES (            1, 'Bauhaus', 'The crack shots of the galaxy',        null,          null,             null,        null,              null, 'Crack Shots', 'Roll 1 additional dice in all firearms attacks')
INSERT INTO Corporation (CorporationID,      Name,                                Description, ImgLogoPath, ImgSplashPath, ImgAlternatePath, ImgTrayPath, ImgTurnMarkerPath,   BonusName,               BonusDescription)
                 VALUES (            2, 'Imperial', 'Proud warriors of their sovereign queen',        null,          null,             null,        null,              null, 'Intuition', 'Gain 1 extra action per turn')
INSERT INTO Corporation (CorporationID,      Name,                              Description, ImgLogoPath, ImgSplashPath, ImgAlternatePath, ImgTrayPath, ImgTurnMarkerPath,    BonusName,                      BonusDescription)
                 VALUES (            3, 'Capitol', 'Patriotic zealots that stop at nothing',        null,          null,             null,        null,              null, 'Tacticians', 'Start with 1 extra doomtrooper card')
INSERT INTO Corporation (CorporationID,      Name,                 Description, ImgLogoPath, ImgSplashPath, ImgAlternatePath, ImgTrayPath, ImgTurnMarkerPath,   BonusName,                BonusDescription)
                 VALUES (            4, 'Mishima', 'The fastest ninjas around',        null,          null,             null,        null,              null, 'Fleetfeet', 'Move 1 extra space per action')
INSERT INTO Corporation (CorporationID,          Name,                                                 Description, ImgLogoPath, ImgSplashPath, ImgAlternatePath, ImgTrayPath, ImgTurnMarkerPath,     BonusName,                       BonusDescription)
                 VALUES (            5, 'Cybertronic', 'Mechanically-enhanced humans weilding powerful technology',        null,          null,             null,        null,              null, 'Power Armor', 'Roll 1 additional die when defending')
INSERT INTO Corporation (CorporationID,          Name,                                                  Description, ImgLogoPath, ImgSplashPath, ImgAlternatePath, ImgTrayPath, ImgTurnMarkerPath,     BonusName,                                                         BonusDescription)
                 VALUES (            6, 'Brotherhood', 'Relgious fanatics intent on eradicating the Legion scourge',        null,          null,             null,        null,              null, 'Flexibility', 'Use 2 turn markers instead of 1 and pick which turn to take when drawn')
INSERT INTO Corporation (CorporationID,     Name,                                    Description, ImgLogoPath, ImgSplashPath, ImgAlternatePath, ImgTrayPath, ImgTurnMarkerPath,     BonusName,                                      BonusDescription)
                 VALUES (           10, 'Legion', 'The never-ending armies from galaxies beyond',        null,          null,             null,        null,              null, 'Dark Symmetry', 'The legion needs no bonus with its endless hordes')

SET IDENTITY_INSERT Corporation OFF