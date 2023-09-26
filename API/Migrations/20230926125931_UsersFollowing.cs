using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AlbumAPI.API.Migrations
{
    /// <inheritdoc />
    public partial class UsersFollowing : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserFollowing",
                columns: table => new
                {
                    FollowerID = table.Column<int>(type: "integer", nullable: false),
                    TargetID = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFollowing", x => new { x.FollowerID, x.TargetID });
                    table.ForeignKey(
                        name: "FK_UserFollowing_Users_FollowerID",
                        column: x => x.FollowerID,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserFollowing_Users_TargetID",
                        column: x => x.TargetID,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserFollowing_TargetID",
                table: "UserFollowing",
                column: "TargetID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserFollowing");
        }
    }
}
