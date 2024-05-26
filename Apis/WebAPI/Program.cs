using Infrastructures;
using WebAPI.Middlewares;
using WebAPI;
using Application.Commons;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

var builder = WebApplication.CreateBuilder(args);

// parse the configuration in appsettings
var configuration = builder.Configuration.Get<AppConfiguration>();
#pragma warning disable CS8602 // Dereference of a possibly null reference.
builder.Services.AddInfrastructuresService(configuration.DatabaseConnection);
#pragma warning restore CS8602 // Dereference of a possibly null reference.
builder.Services.AddWebAPIService();
builder.Services.AddSingleton(configuration);

/*
    register with singleton life time
    now we can use dependency injection for AppConfiguration
*/
builder.Services.AddSingleton(configuration);
//builder.Services.Configure<MomoConfig>(builder.Configuration.GetSection(MomoConfig.ConfigName)
//    );


var app = builder.Build();

app.UseCors(builder =>
       builder.WithOrigins("*")
           .AllowAnyMethod()
           .AllowAnyHeader());
// Configure the HTTP request pipeline.

app.UseSwagger();
    app.UseSwaggerUI();


app.UseMiddleware<GlobalExceptionMiddleware>();
app.UseMiddleware<PerformanceMiddleware>();
app.MapHealthChecks("/healthchecks");
app.UseHttpsRedirection();
// todo authentication
app.UseAuthorization();

app.MapControllers();

app.Run();

// this line tell intergrasion test
// https://stackoverflow.com/questions/69991983/deps-file-missing-for-dotnet-6-integration-tests
public partial class Program { }