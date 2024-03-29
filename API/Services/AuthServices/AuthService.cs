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
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;

        //Inject data context, needed for DB access
        //Inject IConfiguration, needed to access JSON token
        public AuthService(IAuthRepository authRepository, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _authRepository = authRepository;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        //Method to login based on user params
        public async Task<ServiceResponse<UserDTO>> Login(string email, string password)
        {
            var serviceResponse = new ServiceResponse<UserDTO>();

            //Find first or default instance where passed username is equal to existing username
            var user = await _authRepository.Login(email);
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

                await _authRepository.SaveChanges();
            }
            
            return serviceResponse;
        }

        //Method to add new user + user info, and return generated ID
        public async Task<ServiceResponse<int>> Register(User user, string password)
        {
            var serviceResponse = new ServiceResponse<int>();

            //Assess if the email is already registered
            if (await _authRepository.EmailExists(user.Email))
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "That email address has already been used.";
                return serviceResponse;
            }
            if (await _authRepository.UserExists(user.UserName)) 
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "That username has already been used.";
                return serviceResponse;
            }
            if (password == null || password.Length <= 0)
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "Provide a password.";
                return serviceResponse;
            }

            //Call method to create a hashed and salted password
            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            //add computed fields to user object
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.Created = DateTime.UtcNow;
            user.VerificationToken = CreateRandomToken();

            //Create an EmailService instance and call the method that creates the email for verification
            EmailService emailer = new EmailService(_configuration);
            emailer.CreateVerificationEmail(user);

            //Add user to DB Users table
            await _authRepository.Register(user);

            //Wait for changes to be saved
            await _authRepository.SaveChanges();

            //Save user ID to wrapper object Data
            serviceResponse.Data = user.ID;
            return serviceResponse;
        }

        // Method to log user out
        // User logout is actually handled client-side - but this removes the refresh token associated with login
        public async Task<ServiceResponse<string>> Logout(string refreshToken)
        {
            var serviceResponse = new ServiceResponse<string>();
            
            // Look up the current refresh token in the DB for the associated user to find a match
            var user = await _authRepository.FindRefreshToken(refreshToken);

            if (user == null)
            {
                serviceResponse.Success = false;

                //Error message
                serviceResponse.ReturnMessage = "That user could not be found.";
            }
            else
            {
                // Remove refresh token from user column
                await _authRepository.RemoveRefreshToken(user, refreshToken);

                serviceResponse.ReturnMessage = "Logged user out.";

                // Save the changes in the DB
                _authRepository.MarkUserChanges(user);
                await _authRepository.SaveChanges();
            }
            
            return serviceResponse;
        }

        //Method to validate refresh token
        public async Task<ServiceResponse<string>> ValidateRefreshToken(string refreshToken)
        {
            var serviceResponse = new ServiceResponse<string>();

            // Look up the current refresh token in the DB for the associated user to find a match
            var user = await _authRepository.FindRefreshToken(refreshToken);

            // Refresh token not found
            if (user == null)
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "This refresh token does not exist.";
            }
            // Refresh token is found in list, and is valid.
            else if (user != null && user.RefreshTokens!.Any(rt => rt.RefreshTokenExpiration > DateTime.UtcNow))
            {
                string token = CreateToken(user);
                var newRefreshToken = GenerateRefreshToken();
                SetRefreshToken(user, newRefreshToken);

                //Save changes to DB table
                await _authRepository.SaveChanges();

                UserDTO currentUser = CreateUserDTO(user);
                currentUser.Token = token;

                serviceResponse.Success = true;
                serviceResponse.ReturnMessage = "This refresh token is valid.";
                serviceResponse.Data = token;
            }

            return serviceResponse;
        }

        // Method to verify user registration
        public async Task<ServiceResponse<string>> Verify(string verifyToken)
        {
            var serviceResponse = new ServiceResponse<string>();

            // Find first or default instance where verification tokens match
            var user = await _authRepository.FindUserByVerificationToken(verifyToken);

            if (user == null)
            {
                // Failure
                serviceResponse.Success = false;
                // Error message
                serviceResponse.ReturnMessage = "Invalid verification token.";
            }
            else
            {
                user.VerifiedAt = DateTime.UtcNow;
                // Save changes to DB table
                await _authRepository.SaveChanges();

                serviceResponse.Success = true;
                serviceResponse.ReturnMessage = "User has been verified.";
            }
            
            return serviceResponse;
        }

        // Method to start password reset process
        public async Task<ServiceResponse<string>> ForgotPassword(string email)
        {
            var serviceResponse = new ServiceResponse<string>();

            // Find first or default instance where passed email is equal to existing email
            var user = await _authRepository.FindUserByEmail(email);

            if (user == null)
            {
                // Failure
                serviceResponse.Success = false;
                // Error message
                serviceResponse.ReturnMessage = "User not found.";
            }
            else
            {
                user.PasswordResetToken = CreateRandomToken();
                user.ResetTokenExpires = DateTime.UtcNow.AddDays(1);

                // Create an EmailService instance and call the method that creates the email for verification
                EmailService emailer = new EmailService(_configuration);
                emailer.CreatePasswordResetEmail(user);

                //Save changes to DB table
                await _authRepository.SaveChanges();

                serviceResponse.Success = true;
                serviceResponse.ReturnMessage = "Reset password process started";
            }
            
            return serviceResponse;
        }

        //Method to reset user password
        public async Task<ServiceResponse<string>> ResetPassword(string resetToken, string password)
        {
            var serviceResponse = new ServiceResponse<string>();

            //Find first or default instance where passed token is equal to existing token
            var user = await _authRepository.FindUserByPasswordResetToken(resetToken);

            if (user == null)
            {
                serviceResponse.Success = false;
                //Error message
                serviceResponse.ReturnMessage = "No reset token found.";
            }
            else if (user.ResetTokenExpires < DateTime.UtcNow)
            {
                serviceResponse.Success = false;
                //Error message
                serviceResponse.ReturnMessage = "Invalid reset token.";
            }
            else if (password == null || password.Length <= 0)
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "Provide a password.";
                return serviceResponse;
            }
            else
            {
                //Call method to create a hashed and salted password
                CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

                //Make changes to acquired user
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.PasswordResetToken = "";
                user.ResetTokenExpires = null;
                
                // Empty the list of refresh tokens, and generate a new refresh token for the user
                user.RefreshTokens = new List<RefreshToken>();
                var newRefreshToken = GenerateRefreshToken();
                SetRefreshToken(user, newRefreshToken);

                //Save changes to DB table
                await _authRepository.SaveChanges();

                serviceResponse.Success = true;
                serviceResponse.ReturnMessage = "Your password has been sucessfully reset.";
            }
            
            return serviceResponse;
        }

        //Method to reset user password
        public async Task<ServiceResponse<string>> ChangePassword(string email, string oldPassword, string newPassword)
        {
            var serviceResponse = new ServiceResponse<string>();

            //Find first or default instance where passed email is equal to existing email
            var user = await _authRepository.FindUserByEmail(email);

            if (user == null)
            {
                serviceResponse.Success = false;

                //Error message
                serviceResponse.ReturnMessage = "That user was not found.";
            }
            //If password for user does not match
            else if (!VerifyPasswordHash(oldPassword, user.PasswordHash, user.PasswordSalt))
            {
                serviceResponse.Success = false;

                //Error message
                serviceResponse.ReturnMessage = "Incorrect password entered.";
            }
            else if (newPassword == null || newPassword.Length <= 0)
            {
                serviceResponse.Success = false;
                serviceResponse.ReturnMessage = "Provide a password.";
                return serviceResponse;
            }
            else
            {
                //Call method to create a hashed and salted password
                CreatePasswordHash(newPassword, out byte[] passwordHash, out byte[] passwordSalt);

                //Make changes to acquired user
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;

                // Empty the list of refresh tokens, and generate a new refresh token for the user
                user.RefreshTokens = new List<RefreshToken>();
                var newRefreshToken = GenerateRefreshToken();
                SetRefreshToken(user, newRefreshToken);

                await _authRepository.SaveChanges();

                serviceResponse.Success = true;
                serviceResponse.ReturnMessage = "Your password has been sucessfully changed.";
            }
            
            return serviceResponse;
        }

        /*
                Helper methods for AuthRepository below.
        */

        // Method to create a hashed and salted password
        // Out values mean we don't have to return anything
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

        // Method to verify that password for specified user is correct
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

        // Method to create a UserDTO to return upon login
        private UserDTO CreateUserDTO(User user)
        {
            return new UserDTO
            {
                ID = user.ID,
                Email = user.Email,
                UserName = user.UserName,
                Token = "",
                ImageURL = user.ImageURL,
                ImageID = user.ImageID,
                Following = false,
                FollowersCount = user.Followers.Count,
                FollowingCount = user.Followings.Count
            };
        }

        // Method to create to create a JSON web token
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

        private RefreshTokenDTO GenerateRefreshToken()
        {
            var refreshToken = new RefreshTokenDTO
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.UtcNow.AddDays(7),
                Created = DateTime.UtcNow
            };

            return refreshToken;
        }

        private void SetRefreshToken(User user, RefreshTokenDTO newRefreshToken)
        {
            //Create an HTTP only cookie
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            };
           
            //Append the refresh token to the cookie of the client
            _httpContextAccessor.HttpContext?.Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

            // If the refresh tokens are null, initialize the object
            user.RefreshTokens ??= new List<RefreshToken>();
            // Set the refresh token in the user list
            user.RefreshTokens!.Add(new RefreshToken
            {
                Token = newRefreshToken.Token,
                RefreshTokenExpiration = newRefreshToken.Expires
            });

            _authRepository.MarkUserChanges(user);
        }

        private string CreateRandomToken()
        {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
        }
    }
}
