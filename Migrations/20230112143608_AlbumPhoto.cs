using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AlbumAPI.Migrations
{
    /// <inheritdoc />
    public partial class AlbumPhoto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "photoID",
                table: "Albums",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "photoURL",
                table: "Albums",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "publicID",
                table: "Albums",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "photoID",
                table: "Albums");

            migrationBuilder.DropColumn(
                name: "photoURL",
                table: "Albums");

            migrationBuilder.DropColumn(
                name: "publicID",
                table: "Albums");
        }
    }
}
