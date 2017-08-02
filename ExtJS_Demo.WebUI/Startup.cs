using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ExtJS_Demo.WebUI.Startup))]
namespace ExtJS_Demo.WebUI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
