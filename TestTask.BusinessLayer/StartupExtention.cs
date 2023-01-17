using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace TestTask.BusinessLayer;

public static class StartupExtention
{
    public static void BusinessLogicInitializer(this IServiceCollection service, IConfiguration configuration)
    {
        DataAccessLayer.StartupExtention.DataAccessInitializer(service, configuration);
    }
}