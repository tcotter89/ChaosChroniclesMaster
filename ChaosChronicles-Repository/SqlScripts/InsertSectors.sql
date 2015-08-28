SET IDENTITY_INSERT Sector ON
INSERT INTO Sector (SectorID, SectorNumber,    SectorName,                                           SectorDescription, Width, Height,         ImgPath) 
            VALUES (       1,            1, 'Antechamber', 'A large gathering room for Dark Legion forces to assemble',     8,      8, 'sectors/1.jpg')
SET IDENTITY_INSERT Sector OFF
SET IDENTITY_INSERT Entrance ON
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (         1,        1,  'T',      3,      0,      4,      0)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (         2,        1,  'R',      7,      3,      7,      4)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (         3,        1,  'B',      3,      7,      4,      7)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (         4,        1,  'L',      0,      3,      0,      4)
SET IDENTITY_INSERT Entrance OFF

SET IDENTITY_INSERT Sector ON
INSERT INTO Sector (SectorID, SectorNumber,    SectorName,                                  SectorDescription, Width, Height,         ImgPath) 
            VALUES (       2,            2,    'Barracks', 'The sleeping quarters for the Dark Legion forces',     8,      8, 'sectors/2.jpg')
SET IDENTITY_INSERT Sector OFF
SET IDENTITY_INSERT Entrance ON
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (         5,        2,  'T',      3,      0,      4,      0)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (         6,        2,  'R',      7,      3,      7,      4)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (         7,        2,  'B',      3,      7,      4,      7)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (         8,        2,  'L',      0,      3,      0,      4)
SET IDENTITY_INSERT Entrance OFF

SET IDENTITY_INSERT Sector ON
INSERT INTO Sector (SectorID, SectorNumber,     SectorName,                                      SectorDescription, Width, Height,         ImgPath) 
            VALUES (       3,            3, 'Laboratories', 'Testing facilities for all sorts of dangerous trials',     8,      8, 'sectors/3.jpg')
SET IDENTITY_INSERT Sector OFF
SET IDENTITY_INSERT Entrance ON
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (         9,        3,  'T',      3,      0,      4,      0)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (        10,        3,  'R',      7,      3,      7,      4)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (        11,        3,  'B',      3,      7,      4,      7)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (        12,        3,  'L',      0,      3,      0,      4)
SET IDENTITY_INSERT Entrance OFF

SET IDENTITY_INSERT Sector ON
INSERT INTO Sector (SectorID, SectorNumber,   SectorName,                                  SectorDescription, Width, Height,         ImgPath) 
            VALUES (       4,            4, 'Stronghold', 'A heavily fortified structure within the citadel',     8,      8, 'sectors/4.jpg')
SET IDENTITY_INSERT Sector OFF
SET IDENTITY_INSERT Entrance ON
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (        13,        4,  'T',      3,      0,      4,      0)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (        14,        4,  'R',      7,      3,      7,      4)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (        15,        4,  'B',      3,      7,      4,      7)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (        16,        4,  'L',      0,      3,      0,      4)
SET IDENTITY_INSERT Entrance OFF

SET IDENTITY_INSERT Sector ON
INSERT INTO Sector (SectorID, SectorNumber,   SectorName,                                          SectorDescription, Width, Height,         ImgPath) 
            VALUES (       5,            5, 'Grand Hall', 'The packing, shipping, and relocation hub of the citadel',     8,      8, 'sectors/5.jpg')
SET IDENTITY_INSERT Sector OFF
SET IDENTITY_INSERT Entrance ON
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (        17,        5,  'T',      3,      0,      4,      0)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (        18,        5,  'R',      7,      3,      7,      4)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (        19,        5,  'B',      3,      7,      4,      7)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (        20,        5,  'L',      0,      3,      0,      4)
SET IDENTITY_INSERT Entrance OFF

SET IDENTITY_INSERT Sector ON
INSERT INTO Sector (SectorID, SectorNumber,      SectorName,                                                                       SectorDescription, Width, Height,         ImgPath) 
            VALUES (       6,            6, 'Service Halls', 'Narrow hallways snaking throughout the citadel providing access to the infrastructure',     8,      8, 'sectors/6.jpg')
SET IDENTITY_INSERT Sector OFF
SET IDENTITY_INSERT Entrance ON
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (        21,        6,  'T',      3,      0,      4,      0)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (        22,        6,  'R',      7,      3,      7,      4)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (        23,        6,  'B',      3,      7,      4,      7)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (        24,        6,  'L',      0,      3,      0,      4)
SET IDENTITY_INSERT Entrance OFF

SET IDENTITY_INSERT Sector ON
INSERT INTO Sector (SectorID, SectorNumber,       SectorName,                                                        SectorDescription, Width, Height,         ImgPath) 
            VALUES (       7,            7, 'Training Rooms', 'Various training rooms for the Dark legion forces to hone their skills',     8,      8, 'sectors/7.jpg')
SET IDENTITY_INSERT Sector OFF
SET IDENTITY_INSERT Entrance ON
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (        25,        7,  'T',      3,      0,      4,      0)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (        26,        7,  'R',      7,      3,      7,      4)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (        27,        7,  'B',      3,      7,      4,      7)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (        28,        7,  'L',      0,      3,      0,      4)
SET IDENTITY_INSERT Entrance OFF

SET IDENTITY_INSERT Sector ON
INSERT INTO Sector (SectorID, SectorNumber,       SectorName,                        SectorDescription, Width, Height,         ImgPath) 
            VALUES (       8,            8, 'Command Center', 'The main command center of the citadel',     8,      8, 'sectors/8.jpg')
SET IDENTITY_INSERT Sector OFF
SET IDENTITY_INSERT Entrance ON
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (        29,        8,  'T',      3,      0,      4,      0)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (        30,        8,  'R',      7,      3,      7,      4)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (        31,        8,  'B',      3,      7,      4,      7)
INSERT INTO Entrance (EntranceID, SectorID, Name, Cell1X, Cell1Y, Cell2X, Cell2Y)
              VALUES (        32,        8,  'L',      0,      3,      0,      4)
SET IDENTITY_INSERT Entrance OFF
