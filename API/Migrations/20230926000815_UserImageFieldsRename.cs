using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AlbumAPI.API.Migrations
{
    /// <inheritdoc />
    public partial class UserImageFieldsRename : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProfilePhotoURL",
                table: "Users",
                newName: "ImageURL");

            migrationBuilder.RenameColumn(
                name: "ProfilePhotoID",
                table: "Users",
                newName: "ImageID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImageURL",
                table: "Users",
                newName: "ProfilePhotoURL");

            migrationBuilder.RenameColumn(
                name: "ImageID",
                table: "Users",
                newName: "ProfilePhotoID");
        }
    }
}
