namespace ChaosChronicles_Shared.Models {
    public class SharedItemStat {
        public int ItemStatID { get; set; }
        public int ItemID { get; set; }
        public string StatType { get; set; }
        public int Rank { get; set; }
        public int DiceCount { get; set; }
        public int DiceReroll { get; set; }
        public string DiceColor { get; set; }
        public int ArmorPenetration { get; set; }
        public string Special { get; set; }
    }
}
