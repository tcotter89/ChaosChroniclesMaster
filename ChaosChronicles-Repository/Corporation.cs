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
    
    public partial class Corporation
    {
        public Corporation()
        {
            this.Units = new HashSet<Unit>();
        }
    
        public int CorporationID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImgLogoPath { get; set; }
        public string ImgSplashPath { get; set; }
        public string ImgAlternatePath { get; set; }
        public string ImgTrayPath { get; set; }
        public string ImgTurnMarkerPath { get; set; }
        public string BonusDescription { get; set; }
        public string BonusName { get; set; }
    
        public virtual ICollection<Unit> Units { get; set; }
    }
}
