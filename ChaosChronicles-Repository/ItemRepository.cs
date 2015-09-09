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
    public class ItemRepository : IItemRepository
    {
        public List<SharedItem> LoadItemData() {
            using (var context = new MCGameDataEntities()) {
                var items = (from r in context.Items
                            select r).ToList();

                List<SharedItem> sharedItems = new List<SharedItem>();
                foreach (var item in items) {
                    sharedItems.Add(item.ToSharedModel());
                }

                return sharedItems;
            }
        }
    }
}
