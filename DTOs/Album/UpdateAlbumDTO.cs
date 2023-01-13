/// <summary>
/// Data Transfer Object responsible for sending data from client to server - updating 
/// </summary>
namespace AlbumAPI.DTOs.Album
{
    public class UpdateAlbumDTO
    {
        public int ID { get; set; }
        public string AlbumName { get; set; } = string.Empty;
        public string ArtistName { get; set; } = string.Empty;
        public string YearReleased { get; set; } = string.Empty;
        public string AlbumGenre { get; set; } = string.Empty;
        public string AlbumDescription { get; set; } = string.Empty;
        public int AlbumRating { get; set; } 
        public string photoURL { get; set; } = string.Empty;
        public string publicID { get; set; } = string.Empty;
    }
}