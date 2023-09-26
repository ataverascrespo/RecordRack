using AlbumAPI.DTOs.Profile;

/// <summary>
/// API model 
/// Enables model-view-controller architectural pattern
/// User entity
/// </summary>
namespace AlbumAPI.DTOs.User
{
    public class UserFollowingDTO
    {
        //The user who is going to follow another user
        public int FollowerID { get; set; } 
        public ProfileDTO? Follower { get; set; }

        //The user who is getting followed
        public int TargetID { get; set; }
        public ProfileDTO? Target { get; set; }
    }
}