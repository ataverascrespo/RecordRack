/// <summary>
/// Authentication repository method declarations
/// </summary>
namespace AlbumAPI.Data
{
    public interface IAuthService
    {
        //Method to register user account
        Task<ServiceResponse<int>> Register(User user, string password);
        
        //Method to login
        Task<ServiceResponse<UserDTO>> Login(string userName, string password);

        //Method to logout
        Task<ServiceResponse<string>> Logout(string refreshToken);

        //Method to verify user
        Task<ServiceResponse<string>> Verify(string verifyToken);

        //Method to begin password reset process
        Task<ServiceResponse<string>> ForgotPassword(string email);

        //Method to reset password
        Task<ServiceResponse<string>> ResetPassword(string resetToken, string password);

        //Method to change existing password
        Task<ServiceResponse<string>> ChangePassword(string email, string oldPassword, string newPassword);

        //Method to validate refresh token
        Task<ServiceResponse<string>> ValidateRefreshToken(string refreshToken);
    }
}