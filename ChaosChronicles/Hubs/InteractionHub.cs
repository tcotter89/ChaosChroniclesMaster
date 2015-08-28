using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChaosChronicles.Hubs {
    public class InteractionHub : Hub {
        //public void SendDoomtrooperMove(int doomtrooperIndex, int toSectorIndex, int gridCellX, int gridCellY) {
        //    Clients.All.sendDoomtrooperMove(doomtrooperIndex, toSectorIndex, gridCellX, gridCellY);
        //}
        public void SendUnitMove(int unitIndex, int toSectorIndex, int gridCellX, int gridCellY) {
            Clients.All.sendUnitMove(unitIndex, toSectorIndex, gridCellX, gridCellY);
        }
    }
}