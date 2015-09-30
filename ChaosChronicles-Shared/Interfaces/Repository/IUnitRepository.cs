using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ChaosChronicles_Shared.Models;

namespace ChaosChronicles_Shared.Interfaces.Repository {
    public interface IUnitRepository {
        List<SharedUnit> LoadUnitData();
        SharedUnit LoadUnitData(string name);
    }
}
