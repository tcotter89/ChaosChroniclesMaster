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
CREATE TABLE dbo.Mission
	(
	MissionID int NOT NULL IDENTITY (1, 1),
	MissionNumber nvarchar(50) NOT NULL,
	Name nvarchar(50) NULL,
	TextBriefing nvarchar(MAX) NULL,
	TextDescription nvarchar(MAX) NULL,
	TextTimeLimit nvarchar(MAX) NULL,
	TextDarkLegion nvarchar(MAX) NULL,
	TextRewards nvarchar(MAX) NULL,
	Difficulty int NULL,
	IsSecondaryMissions bit NULL,
	ImgMissionPath nvarchar(max) NULL,
	ImgMapPath nvarchar(max) NULL,
	RewardDoomtrooperCredits int NULL,
	RewardDoomtrooperPromotionPoints int NULL,
	RewardDoomtrooperItemID int NULL,
	RewardLegionCredits int NULL,
	RewardLegionPromotionPoints int NULL,
	RewardLegionItemID int NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.Mission ADD CONSTRAINT
	PK_Mission PRIMARY KEY CLUSTERED 
	(
	MissionID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.Mission SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
