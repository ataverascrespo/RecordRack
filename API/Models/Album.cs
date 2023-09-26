/// <summary>
/// API model 
/// Enables model-view-controller architectural pattern
/// Album entity
/// </summary>
namespace AlbumAPI.Models
{
    public class Album
    {
        public int ID { get; set; }
        public string AlbumName { get; set; } = string.Empty;
        public string ArtistName { get; set; } = string.Empty;
        public string ReleaseDate { get; set; } = string.Empty;
        public string AlbumType { get; set; } = string.Empty;
        public string AlbumDescription { get; set; } = string.Empty;
        public DateTime DateAdded { get; set; }
        public string PhotoURL { get; set; } = string.Empty;
        public string SpotifyID { get; set; } = string.Empty;
        public bool isPrivate { get; set; }
        public User? User { get; set; }
        public List<AlbumLike> Likes { get; set; } = new List<AlbumLike>();
    }
}