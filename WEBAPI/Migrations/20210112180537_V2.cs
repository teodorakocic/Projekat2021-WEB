using Microsoft.EntityFrameworkCore.Migrations;

namespace Projekat2021_WEB.Migrations
{
    public partial class V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "KapacitetStola",
                table: "Restoran",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "RadnoVremeDo",
                table: "Restoran",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "KapacitetStola",
                table: "Restoran");

            migrationBuilder.DropColumn(
                name: "RadnoVremeDo",
                table: "Restoran");
        }
    }
}
