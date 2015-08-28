using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using ChaosChronicles_Shared.Models;
using ChaosChronicles_Repository.Converters;
using ChaosChronicles_Shared.Interfaces.Repository;

namespace ChaosChronicles_Repository
{
    public class UnitRepository : IUnitRepository
    {
        public SharedUnit LoadUnitData(string name) {
            using (var context = new MCGameDataEntities()) {
                var unit = (from r in context.Units
                            where (r.Name == name)
                            select r).FirstOrDefault();
                return unit.ToSharedModel();
            }
        }
    }
}
