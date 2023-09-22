/// <summary>
/// Data Transfer Object responsible for sending data from client to server
/// </summary>
namespace AlbumAPI.DTOs.User
{
    public class UserChangePasswordDTO
    {
        public string Email { get; set; } = string.Empty;
        public string OldPassword { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }
}