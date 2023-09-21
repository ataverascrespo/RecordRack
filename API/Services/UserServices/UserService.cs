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
            var users = await _context.Users.ToListAsync();
            
            //Map all Album models to GetAlbumDTO w/ AutoMapper
            serviceResponse.Data = users.Select(u => _mapper.Map<UserDTO>(u)).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<UserDTO>> GetUserByName(string userName)
        {
            var serviceResponse = new ServiceResponse<UserDTO>();

            //Get the first or default instance where logged in existing user IDs is equal to user ID
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName.ToLower() == userName.ToLower());
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
            var user = await _context.Users.FirstOrDefaultAsync(u => u.ID == GetUserID());
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
            var user = await _context.Users.FirstOrDefaultAsync(u => u.ID == GetUserID());
            if (user == null)
            {
                serviceResponse.Success = false;
                //Error message
                serviceResponse.ReturnMessage = "There is no current user signed in.";
            }
            else {

                user.ProfilePhotoURL = result.SecureUrl.AbsoluteUri;
                user.ProfilePhotoID = result.PublicId;

                UserDTO currentUser = CreateUserDTO(user);
                //Store DTO in service data
                serviceResponse.Data = currentUser;
            }
            
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
                ProfilePhotoURL = user.ProfilePhotoURL,
                ProfilePhotoID = user.ProfilePhotoID   
            };
        }
    }
}
