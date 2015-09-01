namespace ChaosChronicles_Shared.Models {
    public class SharedCell {
        public int CellID { get; set; }
        public int x { get; set; }
        public int y { get; set; }
        public bool HasNorthWall { get; set; }
        public bool HasWestWall { get; set; }
        public bool HasSouthWall { get; set; }
        public bool HasEastWall { get; set; }
    }
}
