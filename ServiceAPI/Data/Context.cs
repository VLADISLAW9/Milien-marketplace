using Microsoft.EntityFrameworkCore;
using ServiceAPI.Models.DTO;

namespace ServiceAPI.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options) 
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
            AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
        }

        public DbSet<PaidAdDTO> PaidAds { get; set; }
    }
}
