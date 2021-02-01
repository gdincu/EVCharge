using Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Reflection;

namespace Infrastructure
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<ChargingPoint> ChargingPoints { get; set; }
        public DbSet<ChargingPointLocation> ChargingPointLocations { get; set; }
        public DbSet<ChargingPointType> ChargingPointTypes { get; set; }
        public DbSet<Booking> Bookings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            if (Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
            {
                foreach (var entityType in modelBuilder.Model.GetEntityTypes())
                {
                    var properties = entityType.ClrType.GetProperties().Where(p => p.PropertyType == typeof(decimal));
                    var dateTimeProperties = entityType.ClrType.GetProperties()
                        .Where(p => p.PropertyType == typeof(DateTimeOffset));

                    foreach (var property in properties)
                    {
                        modelBuilder.Entity(entityType.Name).Property(property.Name).HasConversion<double>();
                    }

                }
            }
        }

    }
}
