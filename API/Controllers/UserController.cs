using Microsoft.AspNetCore.Authorization;

/// <summary>
/// Serializes user data into a proper format
/// </summary>
namespace AlbumAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        //Private user service field
        private readonly IUserService _userService;

        //Private photo service field
        private readonly IPhotoService _photoService;

        //Inject the IUserService interface
        public UserController(IUserService userService, IPhotoService photoService)
        {
            _userService = userService;
            _photoService = photoService;
        }

        //HTTP GET method
        //Return all users
        [HttpGet("GetUsers")]
        public async Task<ActionResult<ServiceResponse<List<UserDTO>>>> GetUsers() 
        {
            //Return status code response upon completion
            return Ok(await _userService.GetUsers());
        }

        //HTTP GET method
        //Return all users
        [HttpGet("GetUsersSearch/{SearchQuery}")]
        public async Task<ActionResult<ServiceResponse<List<UserDTO>>>> GetUsersSearch(string SearchQuery) 
        {
            //Return status code response upon completion
            return Ok(await _userService.GetUsersSearch(SearchQuery));
        }

        //HTTP GET method
        //Return current user
        [HttpGet("GetCurrentUser")]
        public async Task<ActionResult<ServiceResponse<UserDTO>>> GetCurrentUser() 
        {
            //Return status code response upon completion
            return Ok(await _userService.GetCurrentUser());
        }

        //HTTP POST method
        //Return user with given name
        [HttpGet("GetUserByName/{UserName}")]
        public async Task<ActionResult<ServiceResponse<UserDTO>>> GetUserByName(string UserName) 
        {
            //Return status code response upon completion
            return Ok(await _userService.GetUserByName(UserName));
        }

        //HTTP POST method
        //Adds profile picure to specified user
        [HttpPost("ProfilePhoto")]
        //Specify Content-Type header for client
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<ServiceResponse<UserDTO>>> AddUserProfilePhoto([FromForm] IFormFile file)
        {
            var result = await _photoService.AddPhotoAsync(file);
            if (result.Error != null) return BadRequest(result.Error.Message);

            //Return status code response upon completion of albumService.AddAlbum() thread
            return Ok(await _userService.AddProfilePhoto(result));
        }

        [HttpDelete("DeletePhoto")]
        public  async Task<ActionResult<ServiceResponse<GetAlbumDTO>>> DeletePhoto(string ID)
        {
            //Return status code response upon completion of photoService.deletePhotoAsync thread
            return Ok(await _photoService.DeletePhotoAsync(ID));
        }

        [HttpPost("FollowUser/{UserID}")]
        public async Task<ActionResult<ServiceResponse<UserDTO>>> FollowUser(int UserID)
        {
             //Return status code response upon completion of albumService.LikeAlbum() thread
            return Ok(await _userService.FollowUser(UserID));
        }

        //HTTP GET method
        //Return a single album based on passed parameter user ID
        [HttpGet("GetFollowers/{UserID}")]
        public async Task<ActionResult<ServiceResponse<List<AlbumLikesDTO>>>> GetFollowers(int UserID)
        {
            //Return status code response and model upon completion of albumService.GetAlbums() thread
            return Ok(await _userService.GetFollowers(UserID));
        }

        //HTTP GET method
        //Return a single album based on passed parameter user ID
        [HttpGet("GetFollowing/{UserID}")]
        public async Task<ActionResult<ServiceResponse<List<AlbumLikesDTO>>>> GetFollowing(int UserID)
        {
            //Return status code response and model upon completion of albumService.GetAlbums() thread
            return Ok(await _userService.GetFollowing(UserID));
        }
    }
}