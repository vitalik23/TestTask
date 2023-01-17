using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using TestTask.DataAccessLayer.Entities;
using TestTask.Shared.Exceptions;

namespace TestTask.DataAccessLayer.Initialization;

public static class DefaultDataInitialization
{
    public static async Task InitializationAsync(this IServiceCollection service)
    {
        var userManager = service.BuildServiceProvider().GetRequiredService<UserManager<User>>();

        string userEmail = "test@gmail.com";
        string password = "password";

        var user = await userManager.FindByNameAsync(userEmail);

        if (user is null)
        {
            var newUser = new User
            {
                Email = userEmail,
                UserName = userEmail,
                EmailConfirmed = true
            };

            var resultCreate = await userManager.CreateAsync(newUser, password);

            if (!resultCreate.Succeeded)
            {
                throw new ServerException("User is not registered!");
            }
        }
    }
}
