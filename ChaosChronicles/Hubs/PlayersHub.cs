using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChaosChronicles.Hubs {
    public class PlayersHub : Hub {
        public void SendPlayerCorporation(int playerIndex, int corporationIndex, int nextPlayerIndex) {
            Clients.All.sendPlayerCorporation(playerIndex, corporationIndex, nextPlayerIndex);
        }
    }
}