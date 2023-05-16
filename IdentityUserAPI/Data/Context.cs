using Microsoft.EntityFrameworkCore;
using IdentityUserAPI.Models;
using Npgsql;

namespace IdentityUserAPI.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) :
            base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
            AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
        }

        public DbSet<LoginModel> LoginModels { get; set; }
    }
}
