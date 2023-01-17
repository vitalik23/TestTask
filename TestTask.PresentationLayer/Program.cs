
var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;

TestTask.BusinessLayer.StartupExtention.BusinessLogicInitializer(services, builder.Configuration);

// Add services to the container.

services.AddControllers();

services.AddEndpointsApiExplorer();
services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
