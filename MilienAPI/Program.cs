using Microsoft.EntityFrameworkCore;
using MilienAPI.Data;
using System.Text.Json.Serialization;
using MilienAPI.Helpers;
using Auth.Common;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var dataBaseConnection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<Context>(option => option.UseNpgsql(dataBaseConnection));
builder.Services.AddControllers().AddJsonOptions(opt =>
{
    opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
builder.Services.AddControllers();
builder.Services.AddAutoMapper(typeof(MappingProfile));
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

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors(builder =>
{
    builder.AllowAnyOrigin();
    builder.AllowAnyMethod();
    builder.AllowAnyHeader();
});

app.MapControllers();

app.Run();
