using System.Collections.Generic;

namespace ChaosChronicles_Shared.Models {
    public class SharedSector {
        public int SectorID { get; set; }
        public string SectorNumber { get; set; }
        public string SectorName { get; set; }
        public string SectorDescription { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public string ImgPath { get; set; }
        public SharedCell[][] Cells { get; set; }
        public List<SharedEntrance> Entrances { get; set; }
    }
}
