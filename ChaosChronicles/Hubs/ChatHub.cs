using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChaosChronicles.Hubs {
    public class ChatHub : Hub {
        public void SendMessage(string name, string message) {
            Clients.All.sendMessage(name, message);
        }
    }
}