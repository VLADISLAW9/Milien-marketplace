using Microsoft.EntityFrameworkCore;
using IdentityUserAPI.Models;
using Npgsql;

namespace IdentityUserAPI.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) :
            base(options){ }

        public DbSet<User> Users { get; set; }

        static Context()
        {
            NpgsqlConnection.GlobalTypeMapper.MapEnum<Role>();
        }
    }
}
