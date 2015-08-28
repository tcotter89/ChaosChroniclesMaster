using System.Collections.Generic;

namespace ChaosChronicles_Shared.Models {
    public class SharedItemSet {
        public int ItemSetID { get; set; }
        public string Name { get; set; }

        public List<SharedItem> Items { get; set; }
    }
}
