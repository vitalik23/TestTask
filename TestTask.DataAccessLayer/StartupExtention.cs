using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace TestTask.DataAccessLayer;

public static class StartupExtention
{
    public static void DataAccessInitializer(this IServiceCollection service, IConfiguration configuration)
    {
    }
}