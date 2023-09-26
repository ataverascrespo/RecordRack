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

        public async Task<ServiceResponse<List<UserDTO>>> GetUsers(){

            var serviceResponse = new ServiceResponse<List<UserDTO>>();

            //Get all the users in the database
            var users = await _context.Users.Include(u => u.Followers).Include(u => u.Followings).ToListAsync();
            
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
                UserDTO searchedUser = CreateUserDTO(user);
                
                //Store DTO in service data
                serviceResponse.Data = searchedUser;
            }
            return serviceResponse;
        }

        //Method to retrieve the current signed in user
        public async Task<ServiceResponse<UserDTO>> GetCurrentUser(){

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
        public async Task<ServiceResponse<UserDTO>> AddProfilePhoto(ImageUploadResult result) {

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
        public async Task<ServiceResponse<List<AlbumLikesDTO>>> FollowUser(int TargetID) 
        {
            //Create wrapper model for album DTO list
            var serviceResponse = new ServiceResponse<List<AlbumLikesDTO>>();

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

                    _context.UserFollowing.Count();

                    _context.UserFollowing.Add(following);
                    //If following does not exist
                    serviceResponse.Success = true;
                    serviceResponse.ReturnMessage = "Followed user.";
                }
                //If the user does already follow target
                else 
                {
                    _context.UserFollowing.Remove(following);
                    //If following does not exist
                    serviceResponse.Success = true;
                    serviceResponse.ReturnMessage = "Unfollowed user.";
                }
            }

            //Save the changes in DB and return the service response
            await _context.SaveChangesAsync();
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
                FollowersCount = user.Followers.Count,
                FollowingCount = user.Followings.Count
            };
        }
    }
}
