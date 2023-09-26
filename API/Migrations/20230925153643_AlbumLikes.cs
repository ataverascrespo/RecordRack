using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AlbumAPI.API.Migrations
{
    /// <inheritdoc />
    public partial class AlbumLikes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AlbumLikes",
                columns: table => new
                {
                    UserID = table.Column<int>(type: "integer", nullable: false),
                    AlbumID = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AlbumLikes", x => new { x.UserID, x.AlbumID });
                    table.ForeignKey(
                        name: "FK_AlbumLikes_Albums_AlbumID",
                        column: x => x.AlbumID,
                        principalTable: "Albums",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AlbumLikes_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AlbumLikes_AlbumID",
                table: "AlbumLikes",
                column: "AlbumID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AlbumLikes");
        }
    }
}
