using IdentityAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace IdentityAPI.Data
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
        public DbSet<Customer> Customers { get; set; }
    }
}
