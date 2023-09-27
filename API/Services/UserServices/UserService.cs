using System.Security.Claims;
/// <summary>
/// Implementation of dependency injection
/// Service class handles data retrieval from the database
/// Forwards the results to the controller
/// </summary>
namespace AlbumAPI.Services.UserServices
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        //AutoMapper Constructor
        //Inject data context for DB access
        //Inject HTTP context accessor
        public UserService(IMapper mapper, DataContext context, IHttpContextAccessor httpContextAccessor)
        {
            _mapper = mapper;
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        //Return User ID
        private int GetUserID() => int.Parse(_httpContextAccessor.HttpContext!.User
            .FindFirstValue(ClaimTypes.NameIdentifier)!);

        public async Task<ServiceResponse<List<UserDTO>>> GetUsers()
        {

            var serviceResponse = new ServiceResponse<List<UserDTO>>();

            //Get all the users in the database
            var users = await _context.Users.Include(u => u.Followers).Include(u => u.Followings).ToListAsync();
            
            // Map all User models to UserDTOs w/ AutoMapper
            serviceResponse.Data = users.Select(u =>
            {
                var userDto = _mapper.Map<UserDTO>(u);
                userDto.FollowersCount = u.Followers.Count;
                userDto.FollowingCount = u.Followings.Count;
                userDto.Following = u.Followers.Any(f => f.Follower!.ID == GetUserID());

                return userDto;
            }).ToList();

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<UserDTO>>> GetUsersSearch(string searchQuery)
        {

            var serviceResponse = new ServiceResponse<List<UserDTO>>();

            // Get users from the database where their names contain the search query
            var users = await _context.Users
                .Include(u => u.Followers)
                .Include(u => u.Followings)
                .Where(u => u.UserName.Contains(searchQuery)) 
                .ToListAsync();

            //Return error if no users found
            if (users == null || users.Count == 0) 
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "No users exist with those search terms.";
                return serviceResponse;
            }
            
            // Map all User models to UserDTOs w/ AutoMapper
            serviceResponse.Data = users.Select(u =>
            {
                var userDto = _mapper.Map<UserDTO>(u);
                userDto.FollowersCount = u.Followers.Count;
                userDto.FollowingCount = u.Followings.Count;
                return userDto;
            }).ToList();

            return serviceResponse;
        }
        
        public async Task<ServiceResponse<UserDTO>> GetUserByName(string userName)
        {
            var serviceResponse = new ServiceResponse<UserDTO>();

            //Get the first or default instance where logged in existing username is equal to user name
            var user = await _context.Users.Include(u => u.Followers).Include(u => u.Followings)
                                            .FirstOrDefaultAsync(u => u.UserName.ToLower() == userName.ToLower());
            if (user == null)
            {
                serviceResponse.Success = false;
                //Error message
                serviceResponse.ReturnMessage = "That user does not exist.";
            }
            else {
                var searchedUser = _mapper.Map<UserDTO>(user);
                searchedUser.FollowersCount = user.Followers.Count;
                searchedUser.FollowingCount = user.Followings.Count;
                searchedUser.Following = _context.UserFollowing.Any(uf => uf.FollowerID == GetUserID() && uf.TargetID == user.ID);

                //Store DTO in service data
                serviceResponse.Data = searchedUser;
            }
            return serviceResponse;
        }

        //Method to retrieve the current signed in user
        public async Task<ServiceResponse<UserDTO>> GetCurrentUser() 
        {

            var serviceResponse = new ServiceResponse<UserDTO>();

            //Get the first or default instance where logged in existing user IDs is equal to user ID
            var user = await _context.Users.Include(u => u.Followers).Include(u => u.Followings).
                                            FirstOrDefaultAsync(u => u.ID == GetUserID());
            if (user == null)
            {
                serviceResponse.Success = false;

                //Error message
                serviceResponse.ReturnMessage = "There is no current user signed in.";
            }
            else {
                UserDTO currentUser = CreateUserDTO(user);
                
                //Store DTO in service data
                serviceResponse.Data = currentUser;
            }
            
            return serviceResponse;
        }

        //Method to retrieve the current signed in user
        public async Task<ServiceResponse<UserDTO>> AddProfilePhoto(ImageUploadResult result) 
        {

            var serviceResponse = new ServiceResponse<UserDTO>();

            //Get the first or default instance where logged in existing user IDs is equal to user ID
            var user = await _context.Users.Include(u => u.Followers).Include(u => u.Followings)
                                            .FirstOrDefaultAsync(u => u.ID == GetUserID());
            if (user == null)
            {
                serviceResponse.Success = false;
                //Error message
                serviceResponse.ReturnMessage = "There is no current user signed in.";
            }
            else {

                user.ImageURL = result.SecureUrl.AbsoluteUri;
                user.ImageID = result.PublicId;

                UserDTO currentUser = CreateUserDTO(user);
                //Store DTO in service data
                serviceResponse.Data = currentUser;

                //Save changes to database table
                await _context.SaveChangesAsync();
            }
            
            return serviceResponse;
        }

         //Method to follow a user
        public async Task<ServiceResponse<UserDTO>> FollowUser(int TargetID) 
        {
            //Create wrapper model for album DTO list
            var serviceResponse = new ServiceResponse<UserDTO>();

            var follower = await _context.Users.FirstOrDefaultAsync(f => f.ID == GetUserID());

            var target = await _context.Users.FirstOrDefaultAsync(t => t.ID == TargetID);
            if (target == null || follower == null) 
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "Could not follow that user.";
            }
            else 
            {
                var following = await _context.UserFollowing.FindAsync(follower.ID, target.ID);

                //If the user does not already follow target
                if (following == null) 
                {
                    following = new UserFollowing
                    {
                        Follower = follower,
                        Target = target,
                    };

                    _context.UserFollowing.Add(following);
                    await _context.SaveChangesAsync();

                    //If following does not exist
                    //Map UserDTO to return
                    UserDTO user = CreateUserDTO(target);
                    user.FollowersCount = _context.UserFollowing.Count(uf => uf.TargetID == user.ID);
                    user.FollowingCount = _context.UserFollowing.Count(uf => uf.FollowerID == user.ID);
                    user.Following = _context.UserFollowing.Any(uf => uf.FollowerID == GetUserID() && uf.TargetID == user.ID);

                    serviceResponse.Data = user;
                    serviceResponse.Success = true;
                    serviceResponse.ReturnMessage = "Followed user.";
                }
                //If the user does already follow target
                else 
                {
                    _context.UserFollowing.Remove(following);
                    await _context.SaveChangesAsync();

                    //If following does not exist
                    //Map UserDTO to return
                    UserDTO user = CreateUserDTO(target);
                    user.FollowersCount = _context.UserFollowing.Count(uf => uf.TargetID == user.ID);
                    user.FollowingCount = _context.UserFollowing.Count(uf => uf.FollowerID == user.ID);
                    user.Following = _context.UserFollowing.Any(uf => uf.FollowerID == GetUserID() && uf.TargetID == user.ID);

                    serviceResponse.Data = user;
                    serviceResponse.Success = true;
                    serviceResponse.ReturnMessage = "Unfollowed user.";
                }
            }

            //Save the changes in DB and return the service response
            return serviceResponse;
        }

        //Method to return a list of followers for a given user
        public async Task<ServiceResponse<List<UserDTO>>> GetFollowers(int UserID)
        {
            var serviceResponse = new ServiceResponse<List<UserDTO>>();

            // Retrieve the user by userId with their Followers collection loaded
            var user = await _context.Users.Include(u => u.Followers).FirstOrDefaultAsync(u => u.ID == UserID);
            if (user == null)
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "User not found.";
                return serviceResponse;
            }

            // Map the Followers collection to UserDTOs
            var followers = await _context.UserFollowing.Where(u => u.Target!.ID == UserID)
                                                        .Select(u => u.Follower)
                                                        .Select(u => new
                                                        {
                                                            User = u!,
                                                            FollowersCount = u!.Followers.Count(),
                                                            FollowingCount = u.Followings.Count(),
                                                            IsFollowing = u.Followers.Any(f => f.Follower!.ID == GetUserID()),
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
                                                        

            serviceResponse.Data = followers;
            return serviceResponse;
        }

        //Method to return a list of followed users for a given user
        public async Task<ServiceResponse<List<UserDTO>>> GetFollowing(int UserID)
        {
            var serviceResponse = new ServiceResponse<List<UserDTO>>();

            // Retrieve the user by userId with their Followers collection loaded
            var user = await _context.Users.Include(u => u.Followers).FirstOrDefaultAsync(u => u.ID == UserID);
            if (user == null)
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "User not found.";
                return serviceResponse;
            }

            // Map the Followers collection to UserDTOs
            var following = await _context.UserFollowing.Where(u => u.Follower!.ID == UserID)
                                                        .Select(u => u.Target)
                                                        .Select(u => new
                                                        {
                                                            User = u!,
                                                            FollowersCount = u!.Followers.Count(),
                                                            FollowingCount = u.Followings.Count(),
                                                            IsFollowed = u.Followers.Any(f => f.Follower!.ID == GetUserID()),
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
            serviceResponse.Data = following;
            return serviceResponse;
        }


        //Method to create a UserDTO to return upon login
        private UserDTO CreateUserDTO(User user)
        {
            return new UserDTO
            {
                ID = user.ID,
                Email = user.Email,
                UserName = user.UserName,
                Token = "",
                ImageURL = user.ImageURL,
                ImageID = user.ImageID,
                Following = false,
                FollowersCount = user.Followers.Count,
                FollowingCount = user.Followings.Count
            };
        }
    }
}
