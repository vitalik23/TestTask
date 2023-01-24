using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TestTask.DataAccessLayer.AppContext;
using TestTask.DataAccessLayer.Entities;
using TestTask.DataAccessLayer.Initialization;
using TestTask.DataAccessLayer.Repositories;
using TestTask.DataAccessLayer.Repositories.Interfaces;

namespace TestTask.DataAccessLayer;

public static class StartupExtention
{
    public static void DataAccessInitializer(this IServiceCollection service, IConfiguration configuration)
    {
        service.AddDbContext<ApplicationContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

        service.AddIdentity<User, IdentityRole>(opts =>
        {
            opts.Password.RequiredLength = 5;
            opts.Password.RequireNonAlphanumeric = false;
            opts.Password.RequireLowercase = false;
            opts.Password.RequireUppercase = false;
            opts.Password.RequireDigit = false;

            opts.User.RequireUniqueEmail = true;
            opts.User.AllowedUserNameCharacters = null;
        })
            .AddEntityFrameworkStores<ApplicationContext>()
            .AddTokenProvider<DataProtectorTokenProvider<User>>(TokenOptions.DefaultProvider);

        service.AddTransient<ICustomerRepository, CustomerRepository>();
        service.AddTransient<CreateStoreProcedures>();

        service.InitializationAsync().Wait();
    }
}