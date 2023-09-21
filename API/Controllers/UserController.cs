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
        //Private album service field
        private readonly IUserService _userService;

        //Inject the IUserService interface
        public UserController(IUserService userService)
        {
            _userService = userService;
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
        //Return current user
        [HttpGet("GetCurrentUser")]
        public async Task<ActionResult<ServiceResponse<UserDTO>>> GetCurrentUser() 
        {
            //Return status code response upon completion
            return Ok(await _userService.GetCurrentUser());
        }

        //HTTP POST method
        //Return user with given name
        [HttpPost("GetUserByName")]
        public async Task<ActionResult<ServiceResponse<UserDTO>>> GetUserByName(string userName) 
        {
            //Return status code response upon completion
            return Ok(await _userService.GetUserByName(userName));
        }

    }
}