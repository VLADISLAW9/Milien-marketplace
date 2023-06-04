using IdentityUserAPI.Models;
using Microsoft.EntityFrameworkCore;
using MilienAPI.Models;
using MilienAPI.Models.DTO;
using Npgsql;

namespace MilienAPI.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options)
            : base(options)
        {

        }

        static Context()
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
            AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
            NpgsqlConnection.GlobalTypeMapper.MapEnum<Role>();
        }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Ad> Ads { get; set; }
        public DbSet<LoginModel> LoginModels { get; set; }
        public DbSet<FavoriteAd> FavoriteAds { get; set; }
        public DbSet<PaidAdDTO> PaidAds { get; set; }
    }
}
