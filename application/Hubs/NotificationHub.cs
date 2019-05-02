using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace application.Hubs
{
    public class NotificationHub : Hub
    {
        public async Task Notify(Notification notification)
        {
            await Clients.All.SendAsync("onNotify", notification);
        }
    }

    public class Notification
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
