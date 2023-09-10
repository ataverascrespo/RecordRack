using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AlbumAPI.API.Migrations
{
    /// <inheritdoc />
    public partial class AlbumModelUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AlbumRating",
                table: "Albums");

            migrationBuilder.RenameColumn(
                name: "photoURL",
                table: "Albums",
                newName: "PhotoURL");

            migrationBuilder.RenameColumn(
                name: "publicID",
                table: "Albums",
                newName: "SpotifyID");

            migrationBuilder.RenameColumn(
                name: "YearReleased",
                table: "Albums",
                newName: "ReleaseDate");

            migrationBuilder.RenameColumn(
                name: "AlbumGenre",
                table: "Albums",
                newName: "AlbumType");

            migrationBuilder.AddColumn<bool>(
                name: "isPrivate",
                table: "Albums",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isPrivate",
                table: "Albums");

            migrationBuilder.RenameColumn(
                name: "PhotoURL",
                table: "Albums",
                newName: "photoURL");

            migrationBuilder.RenameColumn(
                name: "SpotifyID",
                table: "Albums",
                newName: "publicID");

            migrationBuilder.RenameColumn(
                name: "ReleaseDate",
                table: "Albums",
                newName: "YearReleased");

            migrationBuilder.RenameColumn(
                name: "AlbumType",
                table: "Albums",
                newName: "AlbumGenre");

            migrationBuilder.AddColumn<double>(
                name: "AlbumRating",
                table: "Albums",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
