namespace ChaosChronicles_Shared.Models {
    public class SharedUnit {
        public int UnitID { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        //public int CorporationID { get; set; }
        public string CombatType { get; set; }
        //public int ArmorSetID { get; set; }
        //public int DefenseSetID { get; set; }
        public int DefaultHealth { get; set; }
        public int DefaultActions { get; set; }
        public int DefaultStepsPerAction { get; set; }
        //public int DefaultItemSetID { get; set; }
        public int KillPromotionPoints { get; set; }
        public int DamagePromotionPoints { get; set; }
        public string ImgFigurePath { get; set; }
        public string ImgPosterPath { get; set; }
        public string ImgIconPath { get; set; }
        public string ImgAlternatePath { get; set; }

        public SharedArmorSet ArmorSet { get; set; }
        public SharedCorporation Corporation { get; set; }
        public SharedDefenseSet DefenseSet { get; set; }
        public SharedItemSet ItemSet { get; set; }
    }
}
