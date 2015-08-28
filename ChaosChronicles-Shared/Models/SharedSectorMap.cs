namespace ChaosChronicles_Shared.Models {
    public class SharedSectorMap {
        public int SectorMapID { get; set; }
        //public int MissionID { get; set; }
        //public int SectorID { get; set; }
        public int LocationX { get; set; }
        public int LocationY { get; set; }
        public bool IsEntranceTBlocked { get; set; }
        public bool IsEntranceTForDoomtroopers { get; set; }
        public bool IsEntranceTForLegion { get; set; }
        public bool IsEntranceRBlocked { get; set; }
        public bool IsEntranceRForDoomtroopers { get; set; }
        public bool IsEntranceRForLegion { get; set; }
        public bool IsEntranceBBlocked { get; set; }
        public bool IsEntranceBForDoomtroopers { get; set; }
        public bool IsEntranceBForLegion { get; set; }
        public bool IsEntranceLBlocked { get; set; }
        public bool IsEntranceLForDoomtroopers { get; set; }
        public bool IsEntranceLForLegion { get; set; }
        public SharedSector Sector { get; set; }
    }
}
