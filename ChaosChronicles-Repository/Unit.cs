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
    
    public partial class Unit
    {
        public int UnitID { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public Nullable<int> CorporationID { get; set; }
        public string CombatType { get; set; }
        public Nullable<int> ArmorSetID { get; set; }
        public int DefenseSetID { get; set; }
        public Nullable<int> DefaultHealth { get; set; }
        public Nullable<int> DefaultActions { get; set; }
        public Nullable<int> DefaultStepsPerAction { get; set; }
        public Nullable<int> DefaultItemSetID { get; set; }
        public Nullable<int> KillPromotionPoints { get; set; }
        public Nullable<int> DamagePromotionPoints { get; set; }
        public string ImgFigurePath { get; set; }
        public string ImgPosterPath { get; set; }
        public string ImgIconPath { get; set; }
        public string ImgAlternatePath { get; set; }
    
        public virtual ArmorSet ArmorSet { get; set; }
        public virtual Corporation Corporation { get; set; }
        public virtual DefenseSet DefenseSet { get; set; }
        public virtual ItemSet ItemSet { get; set; }
    }
}