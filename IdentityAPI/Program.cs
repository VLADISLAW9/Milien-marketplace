using IdentityAPI.Data;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using IdentityAPI.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var dataBaseConnection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<Context>(option => option.UseNpgsql(dataBaseConnection));
builder.Services.AddControllers();
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Auth"));

var secretKey = builder.Configuration.GetSection("Auth:SecretKey").Value;
var issuer = builder.Configuration.GetSection("Auth:Issuer").Value;
var audience = builder.Configuration.GetSection("Auth:Audience").Value;
var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = issuer,

            ValidateAudience = true,
            ValidAudience = audience,

            ValidateLifetime = true,

            IssuerSigningKey = signingKey,
            ValidateIssuerSigningKey = true
        };
    });
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
