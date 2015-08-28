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
    public class SectorRepository : ISectorRepository
    {
        public SharedSector LoadSectorData(string sectorNumber) {
            using (var context = new MCGameDataEntities()) {
                var sector = (from r in context.Sectors
                              where (r.SectorNumber == sectorNumber)
                              select r).FirstOrDefault();
                return sector.ToSharedModel();
            }
        }
    }
}
