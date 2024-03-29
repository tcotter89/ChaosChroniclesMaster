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
CREATE TABLE dbo.Corporation
	(
	CorporationID int NOT NULL IDENTITY (1, 1),
	Name nvarchar(50) NULL,
	Description nvarchar(MAX) NULL,
	ImgLogoPath nvarchar(MAX) NULL,
	ImgSplashPath nvarchar(MAX) NULL,
	ImgAlternatePath nvarchar(MAX) NULL,
	ImgTrayPath nvarchar(MAX) NULL,
	ImgTurnMarkerPath nvarchar(MAX) NULL,
	ImgPerkPath nvarchar(MAX) NULL,
	BonusName nvarchar(50) NULL,
	BonusDescription nvarchar(MAX) NULL,
	ExtraActionsSetID int NOT NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.Corporation ADD CONSTRAINT
	PK_Corporation PRIMARY KEY CLUSTERED 
	(
	CorporationID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.Corporation SET (LOCK_ESCALATION = TABLE)
GO

ALTER TABLE Unit
ADD CONSTRAINT FK_Corporation
FOREIGN KEY (CorporationID)
REFERENCES Corporation(CorporationID)

COMMIT
