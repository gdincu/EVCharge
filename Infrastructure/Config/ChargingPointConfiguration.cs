using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    class ChargingPointConfiguration : IEntityTypeConfiguration<ChargingPoint>
    {
        public void Configure(EntityTypeBuilder<ChargingPoint> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Description).IsRequired();
            builder.Property(p => p.Price).HasColumnType("decimal(18,2)");
            builder.HasOne(b => b.ChargingPointLocation).WithMany()
                .HasForeignKey(p => p.ChargingPointLocationId);
            builder.HasOne(t => t.ChargingPointType).WithMany()
                .HasForeignKey(p => p.ChargingPointTypeId);
        }
    }
}
