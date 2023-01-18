using TestTask.Shared.Options;
using TestTask.Shared.Constants;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;
TestTask.BusinessLayer.StartupExtention.BusinessLogicInitializer(services, builder.Configuration);

services.Configure<JwtConnectionOptions>(builder.Configuration.GetSection(Constants.AppSettings.JwtConfiguration));

services.AddControllers();

services.AddEndpointsApiExplorer();

services.AddCors();
services.AddSwaggerGen();

var app = builder.Build();

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
