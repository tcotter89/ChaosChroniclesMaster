using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ChaosChronicles.Models;
using ChaosChronicles_Shared.Interfaces.Repository;

namespace ChaosChronicles.Controllers {
    public class HomeController : Controller {

        private readonly IMissionRepository _missionRepository;
        private readonly ISectorRepository _sectorRepository;
        private readonly IUnitRepository _unitRepository;
        private readonly IItemRepository _itemRepository;

        public HomeController(IMissionRepository missionRepository, ISectorRepository sectorRepository, IUnitRepository unitRepository, IItemRepository itemRepository) {
            _missionRepository = missionRepository;
            _sectorRepository = sectorRepository;
            _unitRepository = unitRepository;
            _itemRepository = itemRepository;
        }

        public ActionResult Index() {
            return View();
        }

        public ActionResult About() {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact() {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public JsonResult GetMissionData(JsonString jsonString) {
            var mission = _missionRepository.LoadMissionData(jsonString.ObjectIdentifier);
            return Json(new BasicJsonMessage { Data = mission, Result = true });
        }

        [HttpPost]
        [ValidateInput(false)]
        public JsonResult GetSectorData(JsonString jsonString) {
            var sector = _sectorRepository.LoadSectorData(jsonString.ObjectIdentifier);
            return Json(new BasicJsonMessage { Data = sector, Result = true });
        }

        [HttpPost]
        [ValidateInput(false)]
        public JsonResult GetUnitData(JsonString jsonString) {
            var unit = _unitRepository.LoadUnitData(jsonString.ObjectIdentifier);
            return Json(new BasicJsonMessage { Data = unit, Result = true });
        }

        [HttpPost]
        [ValidateInput(false)]
        public JsonResult GetItemData() {
            var items = _itemRepository.LoadItemData();
            return Json(new BasicJsonMessage { Data = items, Result = true });
        }
    }
}