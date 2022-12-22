
/// <summary>
/// Encapsulates logic required to access data sources
/// No SQL queries required thanks to LINQ (language integrated query)
/// </summary>
namespace AlbumAPI.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        //Inject data context, needed for DB access
        public AuthRepository(DataContext context)
        {
            _context = context;
        }

        public Task<ServiceResponse<string>> Login(string userName, string password)
        {
            throw new NotImplementedException();
        }

        //Method to add new user + user info, and return generated ID
        public async Task<ServiceResponse<int>> Register(User user, string password)
        {
            //Call method to create a hashed and salted password
            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            //add computed passwords to user object
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            //Add user to DB Users table
            _context.Users.Add(user);

            //Wait for changes to be saved
            await _context.SaveChangesAsync();
            var serviceResponse = new ServiceResponse<int>();

            //Save user ID to wrapper object Data
            serviceResponse.Data = user.ID;
            return serviceResponse;
        }

        public Task<bool> UserExists(string userName)
        {
            throw new NotImplementedException();
        }

        //Method to create a hashed and salted password
        //Out values mean we don't have to return anything
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            //Create an instance of HMACSHA512 cryptography algorithm 
            //Generates a key automatically
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                //Use auto-generated key as password salt
                passwordSalt = hmac.Key;

                //Compute the hash
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }   

    }
}