BEGIN TRANSACTION
SET QUOTED_IDENTIFIER ON
SET ARITHABORT ON
SET NUMERIC_ROUNDABORT OFF
SET CONCAT_NULL_YIELDS_NULL ON
SET ANSI_NULLS ON
SET ANSI_PADDING ON
SET ANSI_WARNINGS ON
COMMIT
BEGIN TRANSACTION
GO
CREATE TABLE dbo.SectorMap
	(
	SectorMapID int NOT NULL IDENTITY (1, 1),
	MissionID int NOT NULL,
	SectorID int NOT NULL,
	LocationX int NULL,
	LocationY int NULL,
	IsEntranceTBlocked bit NULL,
	IsEntranceTForDoomtroopers bit NULL,
	IsEntranceTForLegion bit NULL,
	IsEntranceRBlocked bit NULL,
	IsEntranceRForDoomtroopers bit NULL,
	IsEntranceRForLegion bit NULL,
	IsEntranceBBlocked bit NULL,
	IsEntranceBForDoomtroopers bit NULL,
	IsEntranceBForLegion bit NULL,
	IsEntranceLBlocked bit NULL,
	IsEntranceLForDoomtroopers bit NULL,
	IsEntranceLForLegion bit NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.SectorMap ADD CONSTRAINT
	PK_SectorMap PRIMARY KEY CLUSTERED 
	(
	SectorMapID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.SectorMap SET (LOCK_ESCALATION = TABLE)
GO

ALTER TABLE SectorMap
ADD CONSTRAINT FK_SectorMapMission
FOREIGN KEY (MissionID)
REFERENCES Mission(MissionID)

ALTER TABLE SectorMap
ADD CONSTRAINT FK_SectorMapSector
FOREIGN KEY (SectorID)
REFERENCES Sector(SectorID)

COMMIT
