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
CREATE TABLE dbo.Armor
	(
	ArmorID int NOT NULL IDENTITY (1, 1),
	ArmorSetID int NOT NULL,
	Rank int NOT NULL,
	DamageReduction int NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Armor ADD CONSTRAINT
	PK_Armor PRIMARY KEY CLUSTERED 
	(
	ArmorID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.Armor SET (LOCK_ESCALATION = TABLE)
GO

COMMIT
