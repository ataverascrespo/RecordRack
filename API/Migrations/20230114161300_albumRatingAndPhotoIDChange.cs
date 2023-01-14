using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AlbumAPI.Migrations
{
    /// <inheritdoc />
    public partial class albumRatingAndPhotoIDChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "photoID",
                table: "Albums");

            migrationBuilder.AlterColumn<double>(
                name: "AlbumRating",
                table: "Albums",
                type: "float",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "AlbumRating",
                table: "Albums",
                type: "int",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AddColumn<int>(
                name: "photoID",
                table: "Albums",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
