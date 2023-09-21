/// <summary>
/// Authentication repository method declarations
/// </summary>
namespace AlbumAPI.Data
{
    public interface IAuthRepository
    {
        //Method to register user account
        Task<ServiceResponse<int>> Register(User user, string password);
        
        //Method to login
        Task<ServiceResponse<UserDTO>> Login(string userName, string password);

        //Method to verify user
        Task<ServiceResponse<string>> Verify(string verifyToken);

        Task<ServiceResponse<string>> ForgotPassword(string email);

        Task<ServiceResponse<string>> ResetPassword(string resetToken, string password);

        //Method to validate refresh token
        Task<ServiceResponse<string>> ValidateRefreshToken(string refreshToken);
    }
}