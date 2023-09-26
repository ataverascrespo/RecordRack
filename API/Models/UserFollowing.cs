/// <summary>
/// API model 
/// Enables model-view-controller architectural pattern
/// User entity
/// </summary>
namespace AlbumAPI.Models
{
    public class UserFollowing
    {
        //The user who is going to follow another user
        public int FollowerID { get; set; } 
        public User? Follower { get; set; }

        //The user who is getting followed
        public int TargetID { get; set; }
        public User? Target { get; set; }
    }
}