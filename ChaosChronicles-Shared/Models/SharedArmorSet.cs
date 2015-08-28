using System.Collections.Generic;

namespace ChaosChronicles_Shared.Models {
    public class SharedArmorSet {
        public int ArmorSetID { get; set; }
        public string Name { get; set; }

        public List<SharedArmor> Armor { get; set; }
    }
}
