using System.Web;
using System.Web.Optimization;

namespace ChaosChronicles {
    public class BundleConfig {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles) {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/signalr").Include(
                        "~/Scripts/jquery.signalR-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/game").Include(
                      "~/Scripts/game/pixi.js",
                      "~/Scripts/game/variables.js",
                      "~/Scripts/game/networking.js",
                      "~/Scripts/Game/utilities.js",
                      "~/Scripts/game/mission.js",
                      "~/Scripts/game/board.js",
                      "~/Scripts/game/sector.js",
                      "~/Scripts/game/player.js",
                      "~/Scripts/game/item.js",
                      "~/Scripts/game/combat.js",
                      "~/Scripts/game/unit.js",
                      //"~/Scripts/game/doomtrooper.js",
                      //"~/Scripts/game/legion.js",
                      //"~/Scripts/game/legionnaire.js",
                      "~/Scripts/game/engine.js",
                      "~/Scripts/game/interaction.js",
                      "~/Scripts/game/notifications.js",
                      "~/Scripts/game/setup.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
        }
    }
}
