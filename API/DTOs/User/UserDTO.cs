/// <summary>
/// Data Transfer Object responsible for sending data from client to server
/// </summary>
namespace AlbumAPI.DTOs.User
{
    public class UserDTO
    {
        public int ID { get; set; }
        public string Email { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public string ImageURL { get; set; } = string.Empty;
        public string ImageID{ get; set; } = string.Empty;
    }
}