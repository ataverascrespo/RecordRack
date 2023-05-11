/// <summary>
/// Authentication repository method declarations
/// </summary>
namespace AlbumAPI.Data
{
    public interface IAuthRepository
    {
        //Method to register user account
        Task<ServiceResponse<int>> Register(User user, string password);
        //Method to sign user in with specified params.
        Task<ServiceResponse<string>> Login(string userName, string password);
        //Method to return user account existance status
        Task<bool> UserExists(string userName);
        //Method to validate refresh token
        Task<ServiceResponse<string>> ValidateRefreshToken(string refreshToken);
    }
}