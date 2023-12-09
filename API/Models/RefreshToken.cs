/// <summary>
/// Generic type wrapper object returned with every service call
/// </summary>
namespace AlbumAPI.Models
{
    public class RefreshToken
    {
        public string Token { get; set; } = string.Empty;
        public DateTime RefreshTokenExpiration { get; set; }
    }
}