/// <summary>
/// Authentication repository method declarations
/// </summary>
namespace AlbumAPI.Data
{
    public interface IAuthRepository
    {
        //Method to get all users
        Task<ServiceResponse<List<UserDTO>>> GetUsers();

        //Method to get current user by passed ID
        Task<ServiceResponse<UserDTO>> GetUserByName(string userName);

        //Method to get current user
        Task<ServiceResponse<UserDTO>> GetCurrentUser();

        //Method to register user account
        Task<ServiceResponse<int>> Register(User user, string password);
        
        //Method to login
        Task<ServiceResponse<UserDTO>> Login(string userName, string password);

        //Method to verify user
        Task<ServiceResponse<string>> Verify(string verifyToken);

        //Method to return user account existance status
        Task<bool> UserExists(string Email);
        
        //Method to validate refresh token
        Task<ServiceResponse<string>> ValidateRefreshToken(string refreshToken);
    }
}