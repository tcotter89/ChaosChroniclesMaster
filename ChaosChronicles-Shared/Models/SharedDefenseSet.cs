using System.Collections.Generic;

namespace ChaosChronicles_Shared.Models {
    public class SharedDefenseSet {
        public int DefenseSetID { get; set; }
        public string Name { get; set; }

        public List<SharedDefense> Defenses { get; set; }
    }
}
