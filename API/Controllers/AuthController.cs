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
        private readonly IAuthService _authService;

        //Inject the IAuthService interface
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        //HTTP POST method
        //Adds a user to the database
        [HttpPost("Register")]
        public async Task<ActionResult<ServiceResponse<int>>> Register(UserRegisterDTO request)
        {
            var serviceResponse = await _authService.Register(
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


        //HTTP POST method
        //Logs user into account
        [HttpPost("Login")]
        public async Task<ActionResult<ServiceResponse<int>>> Login(UserLoginDTO request)
        {

            var serviceResponse = await _authService.Login(request.Email, request.Password);

            if(!serviceResponse.Success)
            {
                //Return a bad request response 
                return BadRequest(serviceResponse);
            }

            //Return status code response
            return Ok(serviceResponse);
        }

        //HTTP POST method
        //Logs user out
        // User logout is actually handled client-side - but this removes the refresh token associated with login
        [HttpPost("Logout")]
        public async Task<ActionResult<ServiceResponse<string>>> Logout()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            var serviceResponse = await _authService.Logout(refreshToken!);
            //Return status code response
            return Ok(serviceResponse);
        }

        //HTTP POST method
        //Verifies user account
        [HttpPost("Verify")]
        public async Task<ActionResult<ServiceResponse<int>>> Verify(UserVerificationTokenDTO request)
        {
            var serviceResponse = await _authService.Verify(request.Token);

            if(!serviceResponse.Success)
            {
                //Return a bad request response 
                return BadRequest(serviceResponse);
            }

            //Return status code response
            return Ok(serviceResponse);
        }

        //HTTP POST method
        //Generates a refresh token
        [HttpPost("RefreshToken")]
        public async Task<ActionResult<string>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            var serviceResponse = await _authService.ValidateRefreshToken(refreshToken!);

            if(!serviceResponse.Success)
            {
                //Return a bad request response 
                return BadRequest(serviceResponse);
            }

            //Return status code response
            return Ok(serviceResponse);
        }

        //HTTP POST method
        //Starts password reset process
        [HttpPost("ForgotPassword")]
        public async Task<ActionResult<ServiceResponse<int>>> ForgotPassword(UserForgotPasswordDTO user)
        {

            var serviceResponse = await _authService.ForgotPassword(user.email);

            if(!serviceResponse.Success)
            {
                //Return a bad request response 
                return BadRequest(serviceResponse);
            }

            //Return status code response
            return Ok(serviceResponse);
        }

        //HTTP POST method
        //Resets password for user
        [HttpPost("ResetPassword")]
        public async Task<ActionResult<ServiceResponse<int>>> ResetPassword(UserResetPasswordDTO reset)
        {

            var serviceResponse = await _authService.ResetPassword(reset.ResetToken, reset.Password);

            if(!serviceResponse.Success)
            {
                //Return a bad request response 
                return BadRequest(serviceResponse);
            }

            //Return status code response
            return Ok(serviceResponse);
        }

        //HTTP POST method
        //Changes the user's existing password
        //Chose to POST instead of PUT because this call wouldnt be idempotent
        [HttpPost("ChangePassword")]
        [Authorize]
        public async Task<ActionResult<ServiceResponse<int>>> ChangePassword(UserChangePasswordDTO request)
        {

            var serviceResponse = await _authService.ChangePassword(request.Email, request.OldPassword, request.NewPassword);

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