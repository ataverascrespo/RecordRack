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
        public string ImageID { get; set; } = string.Empty;
        public bool Following { get; set; }
        public int FollowersCount { get; set; }
        public int FollowingCount { get; set; }
    }
}