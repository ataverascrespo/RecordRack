using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using AlbumAPI.Services.EmailServices;
using Microsoft.IdentityModel.Tokens;

/// <summary>
/// Encapsulates logic required to access data sources
/// No SQL queries required thanks to LINQ (language integrated query)
/// </summary>
namespace AlbumAPI.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;


        //Inject data context, needed for DB access
        //Inject IConfiguration, needed to access JSON token
        public AuthRepository(IMapper mapper, DataContext context, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _mapper = mapper;
            _context = context;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        //Method to login based on user params
        public async Task<ServiceResponse<UserDTO>> Login(string email, string password)
        {
            var serviceResponse = new ServiceResponse<UserDTO>();

            //Find first or default instance where passed username is equal to existing username
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower().Equals(email.ToLower()));
            if (user == null)
            {
                serviceResponse.Success = false;

                //Error message
                serviceResponse.ReturnMessage = "That user could not be found.";
            }
             //If password for user does not match
            else if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                serviceResponse.Success = false;

                //Error message
                serviceResponse.ReturnMessage = "Incorrect password entered.";
            }
            else if (user.VerifiedAt == null)
            {
                serviceResponse.Success = false;

                //Error message
                serviceResponse.ReturnMessage = "User has not yet verified their account";
            }
            else
            {
                UserDTO loggedInUser = CreateUserDTO(user);
                loggedInUser.Token = CreateToken(user);

                //Generate refresh token
                var newRefreshToken = GenerateRefreshToken();
                SetRefreshToken(user, newRefreshToken);
                
                //Store DTO in service data
                serviceResponse.Data = loggedInUser;

                //Save changes to DB table
                await _context.SaveChangesAsync();
            }
            
            return serviceResponse;
        }

        //Method to add new user + user info, and return generated ID
        public async Task<ServiceResponse<int>> Register(User user, string password)
        {
            var serviceResponse = new ServiceResponse<int>();

            //Assess if the email is already registered
            if (await EmailExists(user.Email))
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "That email address has already been used.";
                return serviceResponse;
            }
            if (await UserExists(user.UserName)) 
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "That username has already been used.";
                return serviceResponse;
            }

            //Call method to create a hashed and salted password
            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            //add computed fields to user object
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.Created = DateTime.UtcNow;
            user.VerificationToken = CreateRandomToken();

            //Call the method that creates the email for verification
            CreateVerificationEmail(user);

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
            return await _context.Users.AnyAsync(u => u.UserName.ToLower() == userName.ToLower());
        }

        //Method to assess whether passed email exists upon registration
        public async Task<bool> EmailExists(string Email)
        {
            //Return true if passed username is in database
            //Cast both to lower to ignore case
            return await _context.Users.AnyAsync(u => u.Email.ToLower() == Email.ToLower());
        }

        //Method to validate refresh token
        public async Task<ServiceResponse<string>> ValidateRefreshToken(string refreshToken)
        {
            var serviceResponse = new ServiceResponse<string>();

            // Look up the refresh token in the database
            var user = await _context.Users.SingleOrDefaultAsync(u => u.RefreshToken.Equals(refreshToken));

            // Check if the refresh token was found and has not expired
            if (user == null){
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "This refresh token does not exist.";
            }
            else if (user != null && user.RefreshTokenExpiration < DateTime.UtcNow)
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "This refresh token is expired.";
            }
            else if (user != null && user.RefreshTokenExpiration > DateTime.UtcNow)
            {
                string token = CreateToken(user);
                var newRefreshToken = GenerateRefreshToken();
                SetRefreshToken(user, newRefreshToken);

                //Save changes to DB table
                await _context.SaveChangesAsync();

                UserDTO currentUser = CreateUserDTO(user);
                currentUser.Token = token;

                serviceResponse.Success = true;
                serviceResponse.ReturnMessage = "This refresh token is valid.";
                serviceResponse.Data = token;
            }

            return serviceResponse;
        }

         public async Task<ServiceResponse<string>> Verify(string verifyToken)
        {
            var serviceResponse = new ServiceResponse<string>();

            //Find first or default instance where passed username is equal to existing username
            var user = await _context.Users.FirstOrDefaultAsync(u => u.VerificationToken.Equals(verifyToken));
            if (user == null)
            {
                serviceResponse.Success = false;

                //Error message
                serviceResponse.ReturnMessage = "Invalid verification token.";
            }
            else
            {
                user.VerifiedAt = DateTime.UtcNow;
                //Save changes to DB table
                await _context.SaveChangesAsync();

                serviceResponse.Success = true;
                serviceResponse.ReturnMessage = "User has been verified.";
            }
            
            return serviceResponse;
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

        //Method to create a UserDTO to return upon login
        private UserDTO CreateUserDTO(User user)
        {
            return new UserDTO
            {
                ID = user.ID,
                Email = user.Email,
                UserName = user.UserName,
                Token = "",   //when possible, use the method to create JWT   
                //Eventually image
            };
        }

        //Method to create to create a JSON web token
        private string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                //Set claim identifier of JWT to user object ID
                new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()),

                //Set claim name of JWT to user name
                new Claim(ClaimTypes.Name, user.UserName)
            };

            //Access the app settings token from appsetting.json
            var appSettingsToken = _configuration.GetSection("AppSettings:Token").Value;
            if (appSettingsToken == null)
            {
                throw new Exception("AppSettings Token is null");
            }

            //Create a cryptographic symmetric security key 
            SymmetricSecurityKey key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(appSettingsToken));

            //Create a signing credential, using symmetric key and HMACSHA 512 digital signature
            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            //Placeholder object for all issued token attributes
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                //Set expiration to a day after creation
                Expires = DateTime.Now.AddMinutes(10),
                NotBefore = DateTime.Now,
                SigningCredentials = creds
            };
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            //Create a token using the token handler and token attribute object
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            //Serializes the security token into a JSON web token
            return tokenHandler.WriteToken(token);
        }

        public RefreshTokenDTO GenerateRefreshToken()
        {
            var refreshToken = new RefreshTokenDTO
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.UtcNow.AddDays(1),
                Created = DateTime.UtcNow
            };

            return refreshToken;
        }

        public void SetRefreshToken(User user, RefreshTokenDTO newRefreshToken)
        {
            //Create an HTTP only cookie
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            };
            user.RefreshToken = newRefreshToken.Token;
            user.RefreshTokenExpiration = newRefreshToken.Expires;

            //Append the refresh token to the cookie of the client
            _httpContextAccessor.HttpContext.Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);
        }

        private string CreateRandomToken()
        {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
        }

        //Method that accesses instance of EmailService to compose and send a verification email
        private void CreateVerificationEmail(User user) {
            // EMAIL CONFIRMATION
            // Create user registration confirmation email fields
            string emailSubject = "Record Rack Account Verification";
            string emailUsername = user.UserName;
            string toEmail = user.Email;
            string emailMessage = "<p>Hey " + emailUsername + "!</p>\n" +
                "<p>Thanks for signing up for Record Rack! I'm thrilled to have you join.<p>\n" +
                "<p>To complete your registration and start using Record Rack, please confirm your email address:<p> \n" + 
                "<a href='http://localhost:5173/verified/?="+user.VerificationToken+"'>Click here to verify your account</a> \n"+
                "<p>See you soon,</p> \n" + "<p>Alex from Record Rack</p>";
                    
            //Create the emailservice object and send the email
            EmailService emailer = new EmailService();
            emailer.SendEmail(emailSubject, emailMessage, toEmail, emailUsername).Wait();
        }
    }
}
