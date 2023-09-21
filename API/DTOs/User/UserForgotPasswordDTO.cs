/// <summary>
/// Data Transfer Object responsible for sending verification token data from client to server
/// </summary>
namespace AlbumAPI.DTOs.User
{
    public class UserForgotPasswordDTO
    {
        public string email { get; set; } = string.Empty;
    }
}