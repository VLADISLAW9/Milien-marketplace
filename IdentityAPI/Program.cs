using IdentityAPI.Data;
using IdentityAPI.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var dataBaseConnection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<Context>(option => option.UseNpgsql(dataBaseConnection));
builder.Services.AddControllers();
var authOptionConfiguration = builder.Configuration.GetSection("Auth");
builder.Services.Configure<AuthOptions>(authOptionConfiguration);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.UseCors(builder =>
{
    builder.AllowAnyOrigin();
    builder.AllowAnyMethod();
    builder.AllowAnyHeader();
});

app.MapControllers();

app.Run();
