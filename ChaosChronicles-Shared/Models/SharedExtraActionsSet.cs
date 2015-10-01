using System.Collections.Generic;

namespace ChaosChronicles_Shared.Models {
    public class SharedExtraActionsSet {
        public int ExtraActionsSetID { get; set; }
        public string Name { get; set; }

        public List<SharedExtraActions> ExtraActions { get; set; }
    }
}
