using Infrastructures;
using WebAPI.Middlewares;
using WebAPI;
using Application.Commons;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Steeltoe.Discovery.Client;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration.Get<AppConfiguration>();
#pragma warning disable CS8602 // Dereference of a possibly null reference.
builder.Services.AddInfrastructuresService(configuration.DatabaseConnection);
#pragma warning restore CS8602 // Dereference of a possibly null reference.
builder.Services.AddWebAPIService();
builder.Services.AddSingleton(configuration);


builder.Services.AddSingleton(configuration);
//builder.Services.Configure<MomoConfig>(builder.Configuration.GetSection(MomoConfig.ConfigName)
//    );
builder.Services.AddDiscoveryClient(builder.Configuration);

var app = builder.Build();

app.UseCors(builder =>
       builder.WithOrigins("*")
           .AllowAnyMethod()
           .AllowAnyHeader());

app.UseSwagger();
    app.UseSwaggerUI();


app.UseMiddleware<GlobalExceptionMiddleware>();
app.UseMiddleware<PerformanceMiddleware>();
app.UseDiscoveryClient();
app.MapHealthChecks("/healthchecks");
app.UseHttpsRedirection();
app.UseAuthorization();


app.MapControllers();

app.Run();

public partial class Program { }