/// <summary>
/// Data Transfer Object responsible for sending Refresh token data from client to server
/// </summary>
namespace AlbumAPI.DTOs.User
{
    public class RefreshTokenDTO
    {
        public string Token { get; set; } = string.Empty;
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime Expires { get; set; } 
    }
}