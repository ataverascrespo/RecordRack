using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AlbumAPI.Migrations
{
    /// <inheritdoc />
    public partial class UserAlbumRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "Albums",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Albums_UserID",
                table: "Albums",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Albums_Users_UserID",
                table: "Albums",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Albums_Users_UserID",
                table: "Albums");

            migrationBuilder.DropIndex(
                name: "IX_Albums_UserID",
                table: "Albums");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "Albums");
        }
    }
}
