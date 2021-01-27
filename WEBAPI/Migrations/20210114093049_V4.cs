using Microsoft.EntityFrameworkCore.Migrations;

namespace Projekat2021_WEB.Migrations
{
    public partial class V4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rezervisan",
                table: "Sto");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Rezervisan",
                table: "Sto",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
