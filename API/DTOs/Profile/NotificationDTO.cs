/// <summary>
/// Data Transfer Object responsible for sending data from client to server
/// </summary>
namespace AlbumAPI.DTOs.Profile
{
    public class NotificationDTO
    {
        public string Type { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty; 
        public DateTime Time { get; set; }
        public string AlbumID { get; set; } = string.Empty;
        public GetAlbumDTO? Album { get; set; }
        public UserDTO? User { get; set; }
    }
}