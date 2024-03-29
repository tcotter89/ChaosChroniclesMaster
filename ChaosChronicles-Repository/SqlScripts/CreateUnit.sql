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
CREATE TABLE dbo.Unit
	(
	UnitID int NOT NULL IDENTITY (1, 1),
	Name nvarchar(50) NULL,
	Type nvarchar(50) NOT NULL,
	CorporationID int NULL,
	CombatType nvarchar(50) NULL,
	ArmorSetID int NULL,
	DefenseSetID int NOT NULL,
	DefaultHealth int NULL,
	DefaultActions int NULL,
	DefaultStepsPerAction int NULL,
	DefaultItemSetID int NULL,
	KillPromotionPoints int NULL,
	DamagePromotionPoints int NULL,
	ImgFigurePath nvarchar(MAX) NULL,
	ImgPosterPath nvarchar(MAX) NULL,
	ImgIconPath nvarchar(MAX) NULL,
	ImgAlternatePath nvarchar(MAX) NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Unit ADD CONSTRAINT
	PK_Unit PRIMARY KEY CLUSTERED 
	(
	UnitID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.Unit SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
