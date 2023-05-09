using Microsoft.EntityFrameworkCore;
using MilienAPI.Models;
using Npgsql;

namespace MilienAPI.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options)
            : base(options) 
        {
            
        }

        static Context() => NpgsqlConnection.GlobalTypeMapper.MapEnum<Category>();

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Ad> Ads { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ad>()
                .Property(c => c.Category)
                .HasConversion(typeof(Category));
        }
    }
}
