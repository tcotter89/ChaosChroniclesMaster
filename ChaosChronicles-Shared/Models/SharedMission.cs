using System.Collections.Generic;

namespace ChaosChronicles_Shared.Models {
    public class SharedMission {
        public int MissionID { get; set; }
        public string MissionNumber { get; set; }
        public string Name { get; set; }
        public string TextBriefing { get; set; }
        public string TextDescription { get; set; }
        public string TextTimeLimit { get; set; }
        public string TextDarkLegion { get; set; }
        public string TextRewards { get; set; }
        public int Difficulty { get; set; }
        public bool IsSecondaryMissions { get; set; }
        public string ImgMissionPath { get; set; }
        public string ImgMapPath { get; set; }
        public int RewardDoomtrooperCredits { get; set; }
        public int RewardDoomtrooperPromotionPoints { get; set; }
        public int RewardDoomtrooperItemID { get; set; }
        public int RewardLegionCredits { get; set; }
        public int RewardLegionPromotionPoints { get; set; }
        public int RewardLegionItemID { get; set; }

        public List<SharedObjective> Objectives { get; set; }
        public List<SharedSectorMap> SectorMaps { get; set; }
    }
}
