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
    
    public partial class Armor
    {
        public int ArmorID { get; set; }
        public int ArmorSetID { get; set; }
        public int Rank { get; set; }
        public Nullable<int> DamageReduction { get; set; }
    
        public virtual ArmorSet ArmorSet { get; set; }
    }
}
