using TestTask.Shared.Options;
using TestTask.Shared.Constants;
using TestTask.PresentationLayer.Middlewares;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;
var configuration = builder.Configuration;

services.Configure<JwtConnectionOptions>(configuration.GetSection(Constants.AppSettings.JwtConfiguration));
services.Configure<ConnectionStrings>(configuration.GetSection(Constants.AppSettings.ConnectionStrings));

TestTask.BusinessLayer.StartupExtention.BusinessLogicInitializer(services, configuration);

services.AddControllers();

services.AddEndpointsApiExplorer();

services.AddCors();
services.AddSwaggerGen();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(builder =>
{
    builder.WithOrigins("http://localhost:4200")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
