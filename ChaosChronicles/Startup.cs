using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(ChaosChronicles.Startup))]
[assembly: OwinStartupAttribute(typeof(ChaosChronicles.Startup))]
namespace ChaosChronicles
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
            ConfigureAuth(app);
        }
    }
}
