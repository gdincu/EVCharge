using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Migrations
{
    public partial class UpdatedTheChargingPointEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ChargingPoints_ChargingPointLocationId",
                table: "ChargingPoints",
                column: "ChargingPointLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_ChargingPoints_ChargingPointTypeId",
                table: "ChargingPoints",
                column: "ChargingPointTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChargingPoints_ChargingPointLocations_ChargingPointLocationId",
                table: "ChargingPoints",
                column: "ChargingPointLocationId",
                principalTable: "ChargingPointLocations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ChargingPoints_ChargingPointTypes_ChargingPointTypeId",
                table: "ChargingPoints",
                column: "ChargingPointTypeId",
                principalTable: "ChargingPointTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChargingPoints_ChargingPointLocations_ChargingPointLocationId",
                table: "ChargingPoints");

            migrationBuilder.DropForeignKey(
                name: "FK_ChargingPoints_ChargingPointTypes_ChargingPointTypeId",
                table: "ChargingPoints");

            migrationBuilder.DropIndex(
                name: "IX_ChargingPoints_ChargingPointLocationId",
                table: "ChargingPoints");

            migrationBuilder.DropIndex(
                name: "IX_ChargingPoints_ChargingPointTypeId",
                table: "ChargingPoints");
        }
    }
}
