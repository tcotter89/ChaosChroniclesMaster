using System.Collections.Generic;

namespace ChaosChronicles_Shared.Models {
    public class SharedItemSetMapping {
        public int ItemSetMappingID { get; set; }

        public SharedItemSet ItemSet { get; set; }
        public SharedItem Item { get; set; }
    }
}
