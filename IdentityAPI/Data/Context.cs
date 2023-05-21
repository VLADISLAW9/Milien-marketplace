using IdentityAPI.Models;
using Microsoft.EntityFrameworkCore;
using Npgsql;

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

        static Context() =>
            NpgsqlConnection.GlobalTypeMapper.MapEnum<Role>();
        public DbSet<LoginModel> LoginModels { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
