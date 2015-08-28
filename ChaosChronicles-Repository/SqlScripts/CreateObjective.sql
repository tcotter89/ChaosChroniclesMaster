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
CREATE TABLE dbo.Objective
	(
	ObjectiveID int NOT NULL IDENTITY (1, 1),
	MissionID int NOT NULL,
	Type nvarchar(50) NOT NULL,
	Name nvarchar(50) NULL,
	Description nvarchar(MAX) NULL,
	TimeLimitRound int NULL,
	TimeLimitIsStartOfRound bit NULL,
	RequiredCount1 int NULL,
	RequiredCount2 int NULL,
	RequiredCount3 int NULL,
	RequiredUnitType1 nvarchar(50) NULL,
	RequiredUnitType2 nvarchar(50) NULL,
	RequiredUnitType3 nvarchar(50) NULL,
	RequiredSectorID1 int NULL,
	RequiredSectorID2 int NULL,
	RequiredSectorID3 int NULL,
	RequiredSectorID4 int NULL,
	RequiredCellX int NULL,
	RequiredCellY int NULL,
	Special1 nvarchar(MAX) NULL,
	Special2 nvarchar(MAX) NULL,
	Special3 nvarchar(MAX) NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.Objective ADD CONSTRAINT
	PK_Objective PRIMARY KEY CLUSTERED 
	(
	ObjectiveID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.Objective SET (LOCK_ESCALATION = TABLE)
GO

ALTER TABLE Objective
ADD CONSTRAINT FK_Mission
FOREIGN KEY (MissionID)
REFERENCES Mission(MissionID)

COMMIT
