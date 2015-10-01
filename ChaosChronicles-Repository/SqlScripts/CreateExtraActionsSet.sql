/* To prevent any potential data loss issues, you should review this script in detail before running it outside the context of the database designer.*/
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
CREATE TABLE dbo.ExtraActionsSet
	(
	ExtraActionsSetID int NOT NULL IDENTITY (1, 1),
	Name nvarchar(50) NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.ExtraActionsSet ADD CONSTRAINT
	PK_ExtraActionsSet PRIMARY KEY CLUSTERED 
	(
	ExtraActionsSetID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.ExtraActionsSet SET (LOCK_ESCALATION = TABLE)
GO

ALTER TABLE Corporation
ADD CONSTRAINT FK_ExtraActionsSet
FOREIGN KEY (ExtraActionsSetID)
REFERENCES ExtraActionsSet(ExtraActionsSetID)

ALTER TABLE ExtraActions
ADD CONSTRAINT FK_ExtraActionsSetExtraActions
FOREIGN KEY (ExtraActionsSetID)
REFERENCES ExtraActionsSet(ExtraActionsSetID)

COMMIT
