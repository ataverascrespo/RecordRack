
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

        public async Task<ServiceResponse<string>> Login(string userName, string password)
        {
            var serviceResponse = new ServiceResponse<string>();

            //Find first or default instance where passed username is equal to existing username
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName.ToLower().Equals(userName.ToLower()));
            if (user == null)
            {
                serviceResponse.Success = false;
                
                //Error message
                serviceResponse.ReturnMessage = "User not found.";
            }
            //If password for user does not match
            else if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                serviceResponse.Success = false;

                //Error message
                serviceResponse.ReturnMessage = "Wrong password.";
            }
            else
            {
                //Set the response data to the user ID
                serviceResponse.Data = user.ID.ToString();
            }

            return serviceResponse;
        }

        //Method to add new user + user info, and return generated ID
        public async Task<ServiceResponse<int>> Register(User user, string password)
        {
            var serviceResponse = new ServiceResponse<int>();

            //Assess if the username is already registered
            if (await UserExists(user.UserName))
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "User already exists";
                return serviceResponse;
            }

            //Call method to create a hashed and salted password
            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            //add computed passwords to user object
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            //Add user to DB Users table
            _context.Users.Add(user);

            //Wait for changes to be saved
            await _context.SaveChangesAsync();

            //Save user ID to wrapper object Data
            serviceResponse.Data = user.ID;
            return serviceResponse;
        }

        //Method to assess whether passed user exists upon registration
        public async Task<bool> UserExists(string userName)
        {
            //Return true if passed username is in database
            //Cast both to lower to ignore case
            if(await _context.Users.AnyAsync(u => u.UserName.ToLower() == userName.ToLower()))
            {
                return true;
            }
            return false;
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

        //Method to verify that password for specified user is correct
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            //Create an instance of HMACSHA512 cryptography algorithm 
            //Generates a key automatically
            using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                //Compute the hash
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

                //Return the result of the computed + password Hash comparison
                return computedHash.SequenceEqual(passwordHash);
            }

        }

    }
}