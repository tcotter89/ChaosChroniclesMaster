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
CREATE TABLE dbo.ArmorSet
	(
	ArmorSetID int NOT NULL IDENTITY (1, 1),
	Name nvarchar(50) NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.ArmorSet ADD CONSTRAINT
	PK_ArmorSet PRIMARY KEY CLUSTERED 
	(
	ArmorSetID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.ArmorSet SET (LOCK_ESCALATION = TABLE)
GO

ALTER TABLE Unit
ADD CONSTRAINT FK_ArmorSet
FOREIGN KEY (ArmorSetID)
REFERENCES ArmorSet(ArmorSetID)

ALTER TABLE Armor
ADD CONSTRAINT FK_ArmorSetArmor
FOREIGN KEY (ArmorSetID)
REFERENCES ArmorSet(ArmorSetID)

COMMIT
