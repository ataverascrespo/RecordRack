/// <summary>
/// API model 
/// Enables model-view-controller architectural pattern
/// Album likes entity
/// </summary>
namespace AlbumAPI.Models
{
    public class AlbumLike
    {
        public int UserID { get; set; }
        public User? User { get; set; }
        public int AlbumID { get; set; }
        public Album? Album { get; set; }
    }
}