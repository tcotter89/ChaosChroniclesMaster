namespace ChaosChronicles_Shared.Models {
    public class SharedObjective {
        public int ObjectiveID { get; set; }
        public int MissionID { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int TimeLimitRound { get; set; }
        public bool TimeLimitIsStartOfRound { get; set; }
        public int RequiredCount1 { get; set; }
        public int RequiredCount2 { get; set; }
        public int RequiredCount3 { get; set; }
        public string RequiredUnitType1 { get; set; }
        public string RequiredUnitType2 { get; set; }
        public string RequiredUnitType3 { get; set; }
        public int RequiredSectorID1 { get; set; }
        public int RequiredSectorID2 { get; set; }
        public int RequiredSectorID3 { get; set; }
        public int RequiredSectorID4 { get; set; }
        public int RequiredCellX { get; set; }
        public int RequiredCellY { get; set; }
        public string Special1 { get; set; }
        public string Special2 { get; set; }
        public string Special3 { get; set; }
    }
}
