﻿// <auto-generated />
using System;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastructure.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.2");

            modelBuilder.Entity("Core.Entities.Booking", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("ChargingPointId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedTimestamp")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("End")
                        .HasColumnType("TEXT");

                    b.Property<double>("Price")
                        .HasColumnType("REAL");

                    b.Property<DateTime>("Start")
                        .HasColumnType("TEXT");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("Core.Entities.ChargingPoint", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("ChargingPointLocationId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ChargingPointTypeId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<double>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("ChargingPointLocationId");

                    b.HasIndex("ChargingPointTypeId");

                    b.ToTable("ChargingPoints");
                });

            modelBuilder.Entity("Core.Entities.ChargingPointLocation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("City")
                        .HasColumnType("TEXT");

                    b.Property<string>("HouseNumber")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Postcode")
                        .HasColumnType("TEXT");

                    b.Property<string>("Street")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("ChargingPointLocations");
                });

            modelBuilder.Entity("Core.Entities.ChargingPointType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<double>("PowerRatingKW")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.ToTable("ChargingPointTypes");
                });

            modelBuilder.Entity("Core.Entities.ChargingPoint", b =>
                {
                    b.HasOne("Core.Entities.ChargingPointLocation", "ChargingPointLocation")
                        .WithMany()
                        .HasForeignKey("ChargingPointLocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.ChargingPointType", "ChargingPointType")
                        .WithMany()
                        .HasForeignKey("ChargingPointTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ChargingPointLocation");

                    b.Navigation("ChargingPointType");
                });
#pragma warning restore 612, 618
        }
    }
}
