/// <summary>
/// Data Transfer Object responsible for sending data from client to server
/// </summary>
namespace AlbumAPI.DTOs.Profile
{
    public class ProfileDTO
    {
        public int ID { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string ImageURL { get; set; } = string.Empty;
    }
}