using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Migrations
{
    public partial class UpdatedChargingPointToExcludeQtys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QtyAvailable",
                table: "ChargingPoints");

            migrationBuilder.DropColumn(
                name: "QtyTotal",
                table: "ChargingPoints");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "QtyAvailable",
                table: "ChargingPoints",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "QtyTotal",
                table: "ChargingPoints",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
