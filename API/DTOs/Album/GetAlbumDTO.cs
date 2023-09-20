/// <summary>
/// Data Transfer Object responsible for returning data to the client
/// </summary>
namespace AlbumAPI.DTOs.Album
{
    public class GetAlbumDTO
    {
        public int ID { get; set; }
        public string AlbumName { get; set; } = string.Empty;
        public string ArtistName { get; set; } = string.Empty;
        public string ReleaseDate { get; set; } = string.Empty;
        public string AlbumType { get; set; } = string.Empty;
        public string AlbumDescription { get; set; } = string.Empty;
        public DateTime? DateAdded { get; set; }
        public string PhotoURL { get; set; } = string.Empty;
        public string SpotifyID { get; set; } = string.Empty;
        public bool isPrivate { get; set; }

        // Include a property for User information
        public UserDTO? User { get; set; }
    }
}