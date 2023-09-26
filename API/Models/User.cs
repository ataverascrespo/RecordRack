/// <summary>
/// API model 
/// Enables model-view-controller architectural pattern
/// User entity
/// </summary>
namespace AlbumAPI.Models
{
    public class User
    {
        public int ID { get; set; }
        public string Email { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; } = new byte[0];
        public byte[] PasswordSalt { get; set; } = new byte[0]; 
        public DateTime Created { get; set; }
        public string VerificationToken { get; set; } = string.Empty;
        public DateTime? VerifiedAt { get; set; }
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime RefreshTokenExpiration { get; set; }
        public string PasswordResetToken { get; set; } = string.Empty;
        public DateTime? ResetTokenExpires { get; set; }
        public string ImageURL { get; set; } = string.Empty;
        public string ImageID { get; set; } = string.Empty;
        public List<Album>? Albums { get; set; }
    }
}