using Microsoft.EntityFrameworkCore;
using MilienAPI.Models;

namespace MilienAPI.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options)
            : base(options) { }

        public DbSet<Customer> Customers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>()
            .Property(o => o.Status)
            .HasColumnType("status")
            .HasConversion<string>();
        }
    }
}
