/// <summary>
/// Authentication repository method declarations
/// </summary>
namespace AlbumAPI.Data
{
    public interface IUserRepository
    {
        //General method to save DB changes
        Task SaveChanges(); 

        //Repo method to get all users
        Task<List<User>> GetUsers();

        //Repo method to get the user by username field
        Task<User> GetUserByName(string userName);

        //Repo method to get the current user
        Task<User> GetCurrentUser(int userID);

        //Repo method to get a given user by passed ID, with followers collection included
        Task<User> GetUserByIDWithFollowers(int userID);

        //Repo method to get the list of followers for a given user
        Task<List<UserDTO>> GetFollowers(int targetID, int userID);

        //Repo method to get the list of followings for a given user
        Task<List<UserDTO>> GetFollowings(int targetID, int userID);
        
        //Repo method to get the follower when following another user
        Task<User> FollowUserGetFollower(int userID);

        //Repo method to get the follower when following another user
        Task<User> FollowUserGetTarget(int userID);

        //Repo method to get the target when following another user
        Task<UserFollowing> FindFollowing(int followerID, int targetID);

        //Repo method to get the target when following another user
        Task AddFollowing(UserFollowing following);

        //Repo method to get the target when following another user
        Task RemoveFollowing(UserFollowing following);

        //Repo method to get a given user's following list
        Task<bool> GetUserFollowing(int userID, int targetID);

        //Repo method to get a given user's following count
        Task<int> GetUserFollowingCount(int targetID);

        //Repo method to get a given user's followers count
        Task<int> GetUserFollowersCount(int followerID);  

        //Repo method to get all the user followings for a specified target
        Task<List<UserFollowing>> GetUserFollowingsForTarget(int userID);

        //Repo method to get all the album likes for a specified user
        Task<List<AlbumLike>> GetAlbumLikesForUser(int userID);
    }
}