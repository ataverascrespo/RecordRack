/// <summary>
/// Authentication repository method declarations
/// </summary>
namespace AlbumAPI.Data
{
    public interface IAuthRepository
    {
        //Method to register user account
        Task<ServiceResponse<int>> Register(User user, string password, string username);
        //Method to sign user in with specified params.
        Task<ServiceResponse<string>> Login(string userName, string password);
        //Method to verify user
        Task<ServiceResponse<string>> Verify(string verifyToken);
        //Method to return user account existance status
        Task<bool> UserExists(string Email);
        //Method to validate refresh token
        Task<ServiceResponse<string>> ValidateRefreshToken(string refreshToken);
    }
}