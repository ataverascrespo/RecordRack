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

        //HTTP POST metod
        //Adds a user to the database
        [HttpPost("Register")]
        public async Task<ActionResult<ServiceResponse<int>>> Register(UserRegisterDTO request)
        {
            var serviceResponse = await _authRepo.Register(
                //Create a new user object with passed params
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

        //HTTP POST metod
        //Generates a refresh token
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

        //HTTP POST metod
        //Starts password reset process
        [HttpPost("ForgotPassword")]
        public async Task<ActionResult<ServiceResponse<int>>> ForgotPassword(UserForgotPasswordDTO user)
        {

            var serviceResponse = await _authRepo.ForgotPassword(user.email);

            if(!serviceResponse.Success)
            {
                //Return a bad request response 
                return BadRequest(serviceResponse);
            }

            //Return status code response
            return Ok(serviceResponse);
        }

        //HTTP POST metod
        //Starts password reset process
        [HttpPost("ResetPassword")]
        public async Task<ActionResult<ServiceResponse<int>>> ResetPassword(UserResetPasswordDTO reset)
        {

            var serviceResponse = await _authRepo.ResetPassword(reset.ResetToken, reset.Password);

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