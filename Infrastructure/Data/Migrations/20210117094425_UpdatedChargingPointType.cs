using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Migrations
{
    public partial class UpdatedChargingPointType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ChargingPointType",
                table: "ChargingPoints",
                newName: "ChargingPointTypeId");

            migrationBuilder.CreateTable(
                name: "ChargingPointTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    PowerRatingKW = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChargingPointTypes", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChargingPointTypes");

            migrationBuilder.RenameColumn(
                name: "ChargingPointTypeId",
                table: "ChargingPoints",
                newName: "ChargingPointType");
        }
    }
}
