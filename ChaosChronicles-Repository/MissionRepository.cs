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
    public class MissionRepository : IMissionRepository
    {
        public SharedMission LoadMissionData(string missionNumber) {
            using (var context = new MCGameDataEntities()) {
                var mission = (from r in context.Missions
                               where (r.MissionNumber == missionNumber)
                               select r).FirstOrDefault();
                return mission.ToSharedModel();
            }
        }
    }
}
