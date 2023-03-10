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
        public string YearReleased { get; set; } = string.Empty;
        public string AlbumGenre { get; set; } = string.Empty;
        public string AlbumDescription { get; set; } = string.Empty;
        public double AlbumRating { get; set; } 
        public string photoURL { get; set; } = string.Empty;
        public string publicID { get; set; } = string.Empty;
        public User? User { get; set; }
    }
}