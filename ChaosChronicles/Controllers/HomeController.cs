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
        private readonly ICorporationRepository _corporationRepository;
        private readonly ISectorRepository _sectorRepository;
        private readonly IUnitRepository _unitRepository;
        private readonly IItemRepository _itemRepository;

        public HomeController(IMissionRepository missionRepository, ICorporationRepository corporationRepository, ISectorRepository sectorRepository, 
                              IUnitRepository unitRepository, IItemRepository itemRepository) {
            _missionRepository = missionRepository;
            _corporationRepository = corporationRepository;
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
        public JsonResult GetCorporationData() {
            var corporations = _corporationRepository.LoadCorporationData();
            return Json(new BasicJsonMessage { Data = corporations, Result = true });
        }

        [HttpPost]
        [ValidateInput(false)]
        public JsonResult GetSectorData(JsonString jsonString) {
            var sector = _sectorRepository.LoadSectorData(jsonString.ObjectIdentifier);
            return Json(new BasicJsonMessage { Data = sector, Result = true });
        }

        [HttpPost]
        [ValidateInput(false)]
        public JsonResult GetUnitData() {
            var units = _unitRepository.LoadUnitData();
            return Json(new BasicJsonMessage { Data = units, Result = true });
        }

        [HttpPost]
        [ValidateInput(false)]
        public JsonResult GetSpecificUnitData(JsonString jsonString) {
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