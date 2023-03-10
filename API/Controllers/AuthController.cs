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

        //HTTP POST metod
        //Adds a user to the database
        [HttpPost("Register")]
        public async Task<ActionResult<ServiceResponse<int>>> Register(UserRegisterDTO request)
        {

            var serviceResponse = await _authRepo.Register(
                //Create a new username object with passed params
                new User { UserName = request.UserName }, request.Password
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

            var serviceResponse = await _authRepo.Login(request.UserName, request.Password);

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