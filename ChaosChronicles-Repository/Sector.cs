//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ChaosChronicles_Repository
{
    using System;
    using System.Collections.Generic;
    
    public partial class Sector
    {
        public Sector()
        {
            this.Cells = new HashSet<Cell>();
            this.Entrances = new HashSet<Entrance>();
            this.SectorMaps = new HashSet<SectorMap>();
        }
    
        public int SectorID { get; set; }
        public string SectorNumber { get; set; }
        public string SectorName { get; set; }
        public string SectorDescription { get; set; }
        public Nullable<int> Width { get; set; }
        public Nullable<int> Height { get; set; }
        public string ImgPath { get; set; }
    
        public virtual ICollection<Cell> Cells { get; set; }
        public virtual ICollection<Entrance> Entrances { get; set; }
        public virtual ICollection<SectorMap> SectorMaps { get; set; }
    }
}