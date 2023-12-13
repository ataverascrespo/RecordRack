using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlbumAPI.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        //Inject data context, needed for DB access
        public UserRepository(DataContext context)
        {
            _context = context;
        }

        //General method to save DB changes
        public async Task SaveChanges() {
            //Save changes to database table
            await _context.SaveChangesAsync();
        }

        //Repo method to get all users
        public async Task<List<User>> GetUsers() {
            var users = await _context.Users.Include(u => u.Followers).Include(u => u.Followings).ToListAsync();
            return users;
        }

        //Repo method to get the user by username field
        public async Task<User> GetUserByName(string userName) {
            //Get the first or default instance where logged in existing username is equal to user name
            var user = await _context.Users.Include(u => u.Followers).Include(u => u.Followings)
                                            .FirstOrDefaultAsync(u => u.UserName.ToLower() == userName.ToLower());
            return user!;
        }

        //Repo method to get the current user
        public async Task<User> GetCurrentUser(int userID) {
            //Get the first or default instance where logged in existing user IDs is equal to user ID
            var user = await _context.Users.Include(u => u.Followers).Include(u => u.Followings).
                                            FirstOrDefaultAsync(u => u.ID == userID);
            return user!;
        }
        
        //Repo method to get a given user by passed ID, with followers collection included
        public async Task<User> GetUserByIDWithFollowers(int userID) {
            // Retrieve the user by userId with their Followers collection loaded
            var user = await _context.Users.Include(u => u.Followers).FirstOrDefaultAsync(u => u.ID == userID);
            return user!;
        }

        public async Task<List<UserDTO>> GetFollowers(int targetID, int userID) {
            // Map the Followers collection to UserDTOs
            var followers = await _context.UserFollowing.Where(u => u.Target!.ID == targetID)
                            .Select(u => u.Follower)
                            .Select(u => new
                            {
                                User = u!,
                                FollowersCount = u!.Followers.Count(),
                                FollowingCount = u.Followings.Count(),
                                IsFollowing = u.Followers.Any(f => f.Follower!.ID == userID),
                                Url = u.ImageURL
                            })
                            .Select(u => new UserDTO
                            {
                                ID = u.User.ID,
                                UserName = u.User.UserName,
                                FollowersCount = u.FollowersCount,
                                FollowingCount = u.FollowingCount,
                                Following = u.IsFollowing,
                                ImageURL = u.Url
                            })
                            .ToListAsync();

            return followers!;
        }

        public async Task<List<UserDTO>> GetFollowings(int followerID, int userID) {
            // Map the Followers collection to UserDTOs
            var following = await _context.UserFollowing.Where(u => u.Follower!.ID == followerID)
                            .Select(u => u.Target)
                            .Select(u => new
                            {
                                User = u!,
                                FollowersCount = u!.Followers.Count(),
                                FollowingCount = u.Followings.Count(),
                                IsFollowed = u.Followers.Any(f => f.Follower!.ID == userID),
                                Url = u.ImageURL
                            })
                            .Select(u => new UserDTO
                            {
                                ID = u.User.ID,
                                UserName = u.User.UserName,
                                FollowersCount = u.FollowersCount,
                                FollowingCount = u.FollowingCount,
                                Following = u.IsFollowed,
                                ImageURL = u.Url
                            })
                            .ToListAsync();

            return following!;
        }
        
        //Repo method to get the follower when following another user
        public async Task<User> FollowUserGetFollower(int userID) {
            var follower = await _context.Users.FirstOrDefaultAsync(f => f.ID == userID);
            return follower!;
        }

        //Repo method to get the target when following another user
        public async Task<User> FollowUserGetTarget(int userID) {
            var target = await _context.Users.FirstOrDefaultAsync(t => t.ID == userID);
            return target!;
        }

        //Repo method to find whether a user is currently following the target
        public async Task<UserFollowing> FindFollowing(int followerID, int targetID) {
            var following = await _context.UserFollowing.FindAsync(followerID, targetID);
            return following!;
        }

        //Repo method to add a user following
        public async Task AddFollowing(UserFollowing following) {
            await _context.UserFollowing.AddAsync(following);
        }

        //Repo method to remove a user following
        public async Task RemoveFollowing(UserFollowing following) {
            _context.UserFollowing.Remove(following);
            await SaveChanges();
        }

        //Repo method to get a given user's following list
        public async Task<bool> GetUserFollowing(int userID, int targetID) {
            var following = await _context.UserFollowing.AnyAsync(uf => uf.FollowerID == userID && uf.TargetID == targetID);
            return following;
        }

        //Repo method to get a given user's following count
        public async Task<int> GetUserFollowingCount(int targetID) {
            var count = await _context.UserFollowing.CountAsync(uf => uf.TargetID == targetID);
            return count;
        }

        //Repo method to get a given user's followers count
        public async Task<int> GetUserFollowersCount(int followerID) {
            var count = await _context.UserFollowing.CountAsync(uf => uf.FollowerID == followerID);
            return count;
        }
       
    }
}