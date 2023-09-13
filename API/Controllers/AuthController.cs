using Microsoft.AspNetCore.Authorization;

/// <summary>
/// Serializes authentication data into a proper format
/// </summary>
namespace AlbumAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepo;

        //Inject the IAuthRepository interface
        public AuthController(IAuthRepository authRepo)
        {
            _authRepo = authRepo;
        }

        //HTTP GET method
        //Return current user
        [Authorize]
        [HttpGet("GetCurrentUser")]
        public async Task<ActionResult<ServiceResponse<List<GetAlbumDTO>>>> GetAlbums() 
        {
            //Return status code response upon completion of albumService.GetAllAlbums() thread
            return Ok(await _authRepo.GetCurrentUser());
        }

        //HTTP POST metod
        //Adds a user to the database
        [HttpPost("Register")]
        public async Task<ActionResult<ServiceResponse<int>>> Register(UserRegisterDTO request)
        {

            var serviceResponse = await _authRepo.Register(
                //Create a new email object with passed params
                new User { Email = request.Email, UserName = request.UserName}, request.Password
            );
            
            if(!serviceResponse.Success)
            {
                //Return a bad request response 
                return BadRequest(serviceResponse);
            }

            //Return status code response
            return Ok(serviceResponse);
        }


        //HTTP POST metod
        //Logs user into account
        [HttpPost("Login")]
        public async Task<ActionResult<ServiceResponse<int>>> Login(UserLoginDTO request)
        {

            var serviceResponse = await _authRepo.Login(request.Email, request.Password);

            if(!serviceResponse.Success)
            {
                //Return a bad request response 
                return BadRequest(serviceResponse);
            }

            //Return status code response
            return Ok(serviceResponse);
        }

        
        //HTTP POST metod
        //Verifies user account
        [HttpPost("Verify")]
        public async Task<ActionResult<ServiceResponse<int>>> Verify(UserVerificationTokenDTO request)
        {

            var serviceResponse = await _authRepo.Verify(request.Token);

            if(!serviceResponse.Success)
            {
                //Return a bad request response 
                return BadRequest(serviceResponse);
            }

            //Return status code response
            return Ok(serviceResponse);
        }

        [HttpPost("RefreshToken")]
        public async Task<ActionResult<string>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            var serviceResponse = await _authRepo.ValidateRefreshToken(refreshToken!);

            if(!serviceResponse.Success)
            {
                //Return a bad request response 
                return BadRequest(serviceResponse);
            }

            //Return status code response
            return Ok(serviceResponse);
        }
        
    }
}