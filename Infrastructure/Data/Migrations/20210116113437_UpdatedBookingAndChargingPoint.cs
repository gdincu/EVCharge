using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Migrations
{
    public partial class UpdatedBookingAndChargingPoint : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChargingPoints_ChargingPointLocations_ChargingPointLocationId",
                table: "ChargingPoints");

            migrationBuilder.DropIndex(
                name: "IX_ChargingPoints_ChargingPointLocationId",
                table: "ChargingPoints");

            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "ChargingPoints",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedTimestamp",
                table: "Bookings",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "ChargingPoints");

            migrationBuilder.DropColumn(
                name: "CreatedTimestamp",
                table: "Bookings");

            migrationBuilder.CreateIndex(
                name: "IX_ChargingPoints_ChargingPointLocationId",
                table: "ChargingPoints",
                column: "ChargingPointLocationId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChargingPoints_ChargingPointLocations_ChargingPointLocationId",
                table: "ChargingPoints",
                column: "ChargingPointLocationId",
                principalTable: "ChargingPointLocations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
