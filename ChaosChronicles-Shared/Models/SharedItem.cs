using System.Collections.Generic;

namespace ChaosChronicles_Shared.Models {
    public class SharedItem {
        public int ItemID { get; set; }
        public int ItemSetID { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Cost { get; set; }
        public int RankRequired { get; set; }
        public string CorporationRequired { get; set; }
        public bool IsSoldInShop { get; set; }
        public string ImgShopPath { get; set; }
        public string ImgIconPath { get; set; }
        public string ImgLargePath { get; set; }
        public string ImgAlternatePath { get; set; }

        public List<SharedItemStat> ItemStats { get; set; }
    }
}
