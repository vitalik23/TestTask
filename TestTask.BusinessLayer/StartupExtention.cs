using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TestTask.BusinessLayer.Services.Interfaces;
using TestTask.BusinessLayer.Services;
using TestTask.BusinessLayer.Providers;
using AutoMapper;
using TestTask.BusinessLayer.MapperProfiles;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TestTask.Shared.Constants;

namespace TestTask.BusinessLayer;

public static class StartupExtention
{
    public static void BusinessLogicInitializer(this IServiceCollection service, IConfiguration configuration)
    {
        DataAccessLayer.StartupExtention.DataAccessInitializer(service, configuration);

        service.AddTransient<IAccountService, AccountService>();
        service.AddTransient<JwtProvider>();

        var mapperConfig = new MapperConfiguration(config =>
        {
            config.AddProfile(new UserProfile());
        });

        IMapper mapper = mapperConfig.CreateMapper();
        service.AddSingleton(mapper);

        service.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
          .AddJwtBearer(options =>
          {
              options.RequireHttpsMetadata = false;
              options.TokenValidationParameters = new TokenValidationParameters
              {
                  ClockSkew = TimeSpan.FromMinutes(0),
                  ValidateIssuer = true,
                  ValidIssuer = configuration[$"{Constants.AppSettings.JwtConfiguration}:Issuer"],
                  ValidateAudience = true,
                  ValidAudience = configuration[$"{Constants.AppSettings.JwtConfiguration}:Audience"],
                  ValidateLifetime = true,
                  IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configuration[$"{Constants.AppSettings.JwtConfiguration}:SecretKey"])),
                  ValidateIssuerSigningKey = true,
              };
          });
    }
}