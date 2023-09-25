/// <summary>
/// Data Transfer Object responsible for sending data from client to server - updating 
/// </summary>
namespace AlbumAPI.DTOs.Album
{
    public class UpdateAlbumDTO
    {
        public int ID { get; set; }
        public string AlbumDescription { get; set; } = string.Empty;
        public bool isPrivate { get; set; }
    }
}