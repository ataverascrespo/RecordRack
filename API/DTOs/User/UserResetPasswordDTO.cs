/// <summary>
/// Data Transfer Object responsible for sending data from client to server
/// </summary>
namespace AlbumAPI.DTOs
{
    public class UserResetPasswordDTO
    {
        public string ResetToken { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}