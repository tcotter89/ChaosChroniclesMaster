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
    public class CorporationRepository : ICorporationRepository
    {
        public List<SharedCorporation> LoadCorporationData() {
            using (var context = new MCGameDataEntities()) {
                var corporations = (from r in context.Corporations
                            select r).ToList();

                List<SharedCorporation> sharedCorporations = new List<SharedCorporation>();
                foreach (var corporation in corporations) {
                    sharedCorporations.Add(corporation.ToSharedModel());
                }

                return sharedCorporations;
            }
        }
    }
}
