using Microsoft.EntityFrameworkCore;
using IdentityAPI.Models;
using Npgsql;

namespace IdentityAPI.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options)
    : base(options)
        {

        }

        public DbSet<User> Users { get; set; }

        static Context()
            => NpgsqlConnection.GlobalTypeMapper.MapEnum<Role>();
    }
}
