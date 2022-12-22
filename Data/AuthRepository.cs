
/// <summary>
/// Encapsulates logic required to access data sources
/// No SQL queries required thanks to LINQ (language integrated query)
/// </summary>
namespace AlbumAPI.Data
{
    public class AuthRepository : IAuthRepository
    {
        public Task<ServiceResponse<string>> Login(string userName, string password)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<int>> Register(User user, string password)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UserExists(string userName)
        {
            throw new NotImplementedException();
        }
    }
}