using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ChaosChronicles_Shared;
using ChaosChronicles_Shared.Models;

namespace ChaosChronicles_Repository.Converters {
    public static class RepositoryConverters {

        internal static SharedObjective ToSharedModel(this Objective repo) {
            return new SharedObjective() {
                ObjectiveID = repo.ObjectiveID,
                MissionID = repo.MissionID,
                Type = repo.Type,
                Name = RemoveNullable(repo.Name),
                Description = RemoveNullable(repo.Description),
                TimeLimitRound = RemoveNullable(repo.TimeLimitRound, 0),
                TimeLimitIsStartOfRound = RemoveNullable(repo.TimeLimitIsStartOfRound),
                RequiredCount1 = RemoveNullable(repo.RequiredCount1, 0),
                RequiredCount2 = RemoveNullable(repo.RequiredCount2, 0),
                RequiredCount3 = RemoveNullable(repo.RequiredCount3, 0),
                RequiredUnitType1 = RemoveNullable(repo.RequiredUnitType1),
                RequiredUnitType2 = RemoveNullable(repo.RequiredUnitType2),
                RequiredUnitType3 = RemoveNullable(repo.RequiredUnitType3),
                RequiredSectorID1 = RemoveNullable(repo.RequiredSectorID1, 0),
                RequiredSectorID2 = RemoveNullable(repo.RequiredSectorID2, 0),
                RequiredSectorID3 = RemoveNullable(repo.RequiredSectorID3, 0),
                RequiredSectorID4 = RemoveNullable(repo.RequiredSectorID4, 0),
                RequiredCellX = RemoveNullable(repo.RequiredCellX, 0),
                RequiredCellY = RemoveNullable(repo.RequiredCellY, 0),
                Special1 = RemoveNullable(repo.Special1),
                Special2 = RemoveNullable(repo.Special2),
                Special3 = RemoveNullable(repo.Special3)
            };
        }

        internal static SharedSectorMap ToSharedModel(this SectorMap repo) {
            return new SharedSectorMap() {
                SectorMapID = repo.SectorMapID,
                LocationX = RemoveNullable(repo.LocationX, 0),
                LocationY = RemoveNullable(repo.LocationY, 0),
                IsEntranceTBlocked = RemoveNullable(repo.IsEntranceTBlocked, true),
                IsEntranceTForDoomtroopers = RemoveNullable(repo.IsEntranceTForDoomtroopers),
                IsEntranceTForLegion = RemoveNullable(repo.IsEntranceTForLegion),
                IsEntranceRBlocked = RemoveNullable(repo.IsEntranceTBlocked, true),
                IsEntranceRForDoomtroopers = RemoveNullable(repo.IsEntranceRForDoomtroopers),
                IsEntranceRForLegion = RemoveNullable(repo.IsEntranceRForLegion),
                IsEntranceBBlocked = RemoveNullable(repo.IsEntranceTBlocked, true),
                IsEntranceBForDoomtroopers = RemoveNullable(repo.IsEntranceBForDoomtroopers),
                IsEntranceBForLegion = RemoveNullable(repo.IsEntranceBForLegion),
                IsEntranceLBlocked = RemoveNullable(repo.IsEntranceTBlocked, true),
                IsEntranceLForDoomtroopers = RemoveNullable(repo.IsEntranceLForDoomtroopers),
                IsEntranceLForLegion = RemoveNullable(repo.IsEntranceLForLegion),
                Sector = repo.Sector.ToSharedModel()
            };
        }

        internal static SharedMission ToSharedModel(this Mission repo) {
            var sharedObjectives = new List<SharedObjective>();
            foreach (var objective in repo.Objectives) {
                var sharedObjective = objective.ToSharedModel();
                sharedObjectives.Add(sharedObjective);
            }

            var sharedSectorMaps = new List<SharedSectorMap>();
            foreach (var sectorMap in repo.SectorMaps) {
                var sharedSectorMap = sectorMap.ToSharedModel();
                sharedSectorMaps.Add(sharedSectorMap);
            }

            return new SharedMission() {
                MissionID = repo.MissionID,
                MissionNumber = repo.MissionNumber,
                Name = RemoveNullable(repo.Name),
                TextBriefing = RemoveNullable(repo.TextBriefing),
                TextDescription = RemoveNullable(repo.TextDescription),
                TextTimeLimit = RemoveNullable(repo.TextTimeLimit),
                TextDarkLegion = RemoveNullable(repo.TextDarkLegion),
                TextRewards = RemoveNullable(repo.TextRewards),
                Difficulty = RemoveNullable(repo.Difficulty, 0),
                IsSecondaryMissions = RemoveNullable(repo.IsSecondaryMissions),
                ImgMissionPath = RemoveNullable(repo.ImgMissionPath, Constants.MISSING_IMG),
                ImgMapPath = RemoveNullable(repo.ImgMapPath, Constants.MISSING_IMG),
                RewardDoomtrooperCredits = RemoveNullable(repo.RewardDoomtrooperCredits, 0),
                RewardDoomtrooperPromotionPoints = RemoveNullable(repo.RewardDoomtrooperPromotionPoints, 0),
                //RewardDoomtrooperItem = repo.RewardDoomtrooperItem,
                RewardLegionCredits = RemoveNullable(repo.RewardLegionCredits, 0),
                RewardLegionPromotionPoints = RemoveNullable(repo.RewardLegionPromotionPoints, 0),
                //RewardLegionItem = repo.RewardLegionItem,
                Objectives = sharedObjectives,
                SectorMaps = sharedSectorMaps
            };
        }

        internal static SharedCell ToSharedModel(this Cell repo) {
            return new SharedCell() {
                CellID = repo.CellID,
                x = repo.CellX,
                y = repo.CellY,
                HasEastWall = repo.HasEastWall,
                HasNorthWall = repo.HasNorthWall,
                HasSouthWall = repo.HasSouthWall,
                HasWestWall = repo.HasWestWall
            };
        }

        internal static SharedEntrance ToSharedModel(this Entrance repo) {
            return new SharedEntrance() {
                EntranceID = repo.EntranceID,
                SectorID = repo.SectorID,
                Name = repo.Name,
                Cell1X = repo.Cell1X,
                Cell1Y = repo.Cell1Y,
                Cell2X = repo.Cell2X,
                Cell2Y = repo.Cell2Y
            };
        }

        internal static SharedSector ToSharedModel(this Sector repo) {

            int repoWidth;
            if (repo.Width == null) {
                repoWidth = Constants.SECTOR_DEFAULT_WIDTH;
            } else {
                repoWidth = (int)repo.Width;
            }

            int repoHeight;
            if (repo.Height == null) {
                repoHeight = Constants.SECTOR_DEFAULT_HEIGHT;
            } else {
                repoHeight = (int)repo.Height;
            }

            var sharedCells = new SharedCell[repoWidth][];
            for (int x = 0; x < repoWidth; x++) {
                sharedCells[x] = new SharedCell[repoHeight];
                for (int y = 0; y < repoHeight; y++) {
                    //Cells[x][y] = new SharedCell();
                    var cell = repo.Cells.Where(c => c.CellX == x && c.CellY == y).FirstOrDefault();
                    SharedCell sharedCell;
                    if (cell != null) {
                        sharedCell = cell.ToSharedModel();
                    } else {
                        sharedCell = new SharedCell();
                        sharedCell.x = x;
                        sharedCell.y = y;
                    }
                    sharedCells[x][y] = sharedCell;
                }
            }

            var sharedEntrances = new List<SharedEntrance>();
            foreach (var entrance in repo.Entrances) {
                var sharedEntrance = entrance.ToSharedModel();
                sharedEntrances.Add(sharedEntrance);
            }

            return new SharedSector() {
                SectorID = repo.SectorID,
                SectorNumber = repo.SectorNumber,
                SectorName = repo.SectorName,
                SectorDescription = repo.SectorDescription,
                Width = repoWidth,
                Height = repoHeight,
                ImgPath = repo.ImgPath,
                Cells = sharedCells,
                Entrances = sharedEntrances
            };
        }

        internal static SharedArmor ToSharedModel(this Armor repo) {
            return new SharedArmor() {
                ArmorID = repo.ArmorID,
                Rank = repo.Rank,
                DamageReduction = RemoveNullable(repo.DamageReduction, 0)
            };
        }

        internal static SharedArmorSet ToSharedModel(this ArmorSet repo) {

            var sharedArmors = new List<SharedArmor>();
            foreach (var armor in repo.Armors) {
                var sharedArmor = armor.ToSharedModel();
                sharedArmors.Add(sharedArmor);
            }

            return new SharedArmorSet() {
                ArmorSetID = repo.ArmorSetID,
                Name = RemoveNullable(repo.Name),
                Armor = sharedArmors
            };
        }

        internal static SharedDefense ToSharedModel(this Defense repo) {
            return new SharedDefense() {
                DefenseID = repo.DefenseID,
                Rank = repo.Rank,
                DiceCount = repo.DiceCount,
                DiceColor = repo.DiceColor
            };
        }

        internal static SharedDefenseSet ToSharedModel(this DefenseSet repo) {

            var sharedDefenses = new List<SharedDefense>();
            foreach (var defense in repo.Defenses) {
                var sharedDefense = defense.ToSharedModel();
                sharedDefenses.Add(sharedDefense);
            }

            return new SharedDefenseSet() {
                DefenseSetID = repo.DefenseSetID,
                Name = RemoveNullable(repo.Name),
                Defenses = sharedDefenses
            };
        }

        internal static SharedItemStat ToSharedModel(this ItemStat repo) {
            return new SharedItemStat() {
                ItemStatID = repo.ItemStatID,
                ItemID = repo.ItemID,
                StatType = repo.StatType,
                Rank = RemoveNullable(repo.Rank, 1),
                DiceCount = RemoveNullable(repo.DiceCount, 0),
                DiceReroll = RemoveNullable(repo.DiceReroll, 0),
                DiceColor = RemoveNullable(repo.DiceColor, "White"),
                ArmorPenetration = RemoveNullable(repo.ArmorPenetration, 0),
                Special = RemoveNullable(repo.Special, "No Special")
            };
        }

        internal static SharedItem ToSharedModel(this Item repo) {

            var sharedItemStats = new List<SharedItemStat>();
            foreach (var itemStat in repo.ItemStats) {
                var sharedItemStat = itemStat.ToSharedModel();
                sharedItemStats.Add(sharedItemStat);
            }
            return new SharedItem() {
                ItemID = repo.ItemID,
                ItemSetID = RemoveNullable(repo.ItemSetID, 0),
                Type = repo.Type,
                Name = repo.Name,
                Description = RemoveNullable(repo.Description),
                Cost = repo.Cost,
                RankRequired = RemoveNullable(repo.RankRequired, 1),
                ImgShopPath = RemoveNullable(repo.ImgShopPath, "missing.png"),
                ImgIconPath = RemoveNullable(repo.ImgIconPath, "missing.png"),
                ImgLargePath = RemoveNullable(repo.ImgLargePath, "missing.png"),
                ImgAlternatePath = RemoveNullable(repo.ImgAlternatePath, "missing.png"),
                ItemStats = sharedItemStats
            };
        }

        internal static SharedItemSet ToSharedModel(this ItemSet repo) {

            var sharedItems = new List<SharedItem>();
            foreach (var item in repo.Items) {
                var sharedItem = item.ToSharedModel();
                sharedItems.Add(sharedItem);
            }

            return new SharedItemSet() {
                ItemSetID = repo.ItemSetID,
                Name = RemoveNullable(repo.Name),
                Items = sharedItems
            };
        }

        internal static SharedCorporation ToSharedModel(this Corporation repo) {
            return new SharedCorporation() {
                CorporationID = repo.CorporationID,
                Name = RemoveNullable(repo.Name),
                Description = RemoveNullable(repo.Description, "There are no known records of this corporation"),
                ImgLogoPath = RemoveNullable(repo.ImgLogoPath, Constants.MISSING_IMG),
                ImgSplashPath = RemoveNullable(repo.ImgSplashPath, Constants.MISSING_IMG),
                ImgAlternatePath = RemoveNullable(repo.ImgAlternatePath, Constants.MISSING_IMG),
                ImgTrayPath = RemoveNullable(repo.ImgTrayPath, Constants.MISSING_IMG),
                ImgTurnMarkerPath = RemoveNullable(repo.ImgTurnMarkerPath, Constants.MISSING_IMG),
                BonusDescription = RemoveNullable(repo.BonusDescription, "Unknown Bonus")
            };
        }

        internal static SharedUnit ToSharedModel(this Unit repo) {

            var repoCorporation = repo.Corporation.ToSharedModel();
            var repoArmorSet = repo.ArmorSet.ToSharedModel();
            var repoDefenseSet = repo.DefenseSet.ToSharedModel();
            var repoItemSet = repo.ItemSet.ToSharedModel();

            return new SharedUnit() {
                UnitID = repo.UnitID,
                Name = RemoveNullable(repo.Name),
                Type = repo.Type,
                CombatType = RemoveNullable(repo.CombatType),
                DefaultHealth = RemoveNullable(repo.DefaultHealth, Constants.UNIT_DEFAULT_HEALTH),
                DefaultActions = RemoveNullable(repo.DefaultActions, Constants.UNIT_DEFAULT_ACTIONS),
                DefaultStepsPerAction = RemoveNullable(repo.DefaultStepsPerAction, Constants.UNIT_DEFAULT_STEPS_PER_ACTION),
                KillPromotionPoints = RemoveNullable(repo.KillPromotionPoints, 0),
                DamagePromotionPoints = RemoveNullable(repo.DamagePromotionPoints, 0),
                Corporation = repoCorporation,
                ArmorSet = repoArmorSet,
                DefenseSet = repoDefenseSet,
                ItemSet = repoItemSet,
                ImgFigurePath = RemoveNullable(repo.ImgFigurePath, Constants.MISSING_IMG),
                ImgPosterPath = RemoveNullable(repo.ImgPosterPath, Constants.MISSING_IMG),
                ImgIconPath = RemoveNullable(repo.ImgIconPath, Constants.MISSING_IMG),
                ImgAlternatePath = RemoveNullable(repo.ImgAlternatePath, Constants.MISSING_IMG)
            };
        }

        internal static bool RemoveNullable(Nullable<bool> repoBool) {
            if (repoBool != null) {
                return (bool)repoBool;
            } else {
                return false;
            }
        }
        internal static bool RemoveNullable(Nullable<bool> repoBool, bool defaultVal) {
            if (repoBool != null) {
                return (bool)repoBool;
            } else {
                return defaultVal;
            }
        }
        internal static int RemoveNullable(Nullable<int> repoInt, int defaultVal) {
            if (repoInt != null) {
                return (int)repoInt;
            } else {
                return defaultVal;
            }
        }
        internal static string RemoveNullable(string repoString) {
            if (repoString != null || repoString == "") {
                return (string)repoString;
            } else {
                return "Unknown";
            }
        }
        internal static string RemoveNullable(string repoString, string defaultVal) {
            if (repoString != null || repoString == "") {
                return (string)repoString;
            } else {
                return defaultVal;
            }
        }
        
    }
}
