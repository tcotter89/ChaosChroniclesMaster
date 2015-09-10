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
CREATE TABLE dbo.Item
	(
	ItemID int NOT NULL IDENTITY (1, 1),
	Type nvarchar(50) NOT NULL,
	Name nvarchar(50) NOT NULL,
	Description nvarchar(MAX) NULL,
	Cost int NOT NULL,
	RankRequired int NULL,
	CorporationRequired nvarchar(50) NULL,
	ItemSetRequired nvarchar(50) NULL,
	ImgShopPath nvarchar(MAX) NULL,
	ImgIconPath nvarchar(MAX) NULL,
	ImgLargePath nvarchar(MAX) NULL,
	ImgAlternatePath nvarchar(MAX) NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.Item ADD CONSTRAINT
	PK_Item PRIMARY KEY CLUSTERED 
	(
	ItemID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.Item SET (LOCK_ESCALATION = TABLE)
GO

COMMIT
