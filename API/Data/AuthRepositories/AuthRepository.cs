using System.IdentityModel.Tokens.Jwt;
using System.Runtime.CompilerServices;
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
        private readonly DataContext _context;

        //Inject data context, needed for DB access
        //Inject IConfiguration, needed to access JSON token
        public AuthRepository(DataContext context)
        {
            _context = context;
        }

        //General method to save DB changes
        public async Task SaveChanges() {
            //Save changes to database table
            await _context.SaveChangesAsync();
        }

        // Method to save DB changes when user state has been modified
        public void MarkUserChanges(User user) {
            //Save changes to DB table
            _context.Entry(user).State = EntityState.Modified;
        }

        //Method to login based on user params
        public async Task<User> Login(string email)
        {
            //Find first or default instance where passed username is equal to existing username
            var user = await _context.Users.Include(u => u.Followers).Include(u => u.Followings)
                                            .FirstOrDefaultAsync(u => u.Email.ToLower().Equals(email.ToLower()));
            return user!;
        }

        //Method to add new user + user info, and return generated ID
        public async Task Register(User user)
        {
            //Add user to DB Users table
            await _context.Users.AddAsync(user);
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
        
        //Method to find if the passed refresh token exists in DB JSON
        public async Task<User> FindRefreshToken(string refreshToken) 
        {
            // Properly format the refresh token for searching in JSONB column
            var searchRefreshToken = string.Format("[{{\"Token\": \"{0}\"}}]", refreshToken);
            // Look up the list of refresh tokens in the DB for the associated user to find a match
            var user = await _context.Users
                    .FirstOrDefaultAsync(u => EF.Functions.JsonContains(u.RefreshTokens!, searchRefreshToken));
            return user!;
        }

        //Method to remove refresh token from DB JSON column
        public async Task RemoveRefreshToken(User user, string refreshToken) 
        {
            // Remove the refresh tokens from the JSONB column.
            user.RefreshTokens!.Remove(user.RefreshTokens.FirstOrDefault(rt => rt.Token == refreshToken)!);
            await SaveChanges();
        }

         //Method that returns the user from the DB based on matching verification token
        public async Task<User> FindUserByVerificationToken(string verifyToken)
        {
            //Find first or default instance where verification tokens match
            var user = await _context.Users.FirstOrDefaultAsync(u => u.VerificationToken.Equals(verifyToken));
            return user!;
        }

        //Method that returns the user from the DB based on matching email address
        public async Task<User> FindUserByEmail(string email)
        {
            //Find first or default instance where passed email is equal to existing email
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower().Equals(email.ToLower()));
            return user!;
        }

        //Method that returns the user from the DB based on matching reset token
        public async Task<User> FindUserByPasswordResetToken(string resetToken)
        {
            //Find first or default instance where passed token is equal to existing token
            var user = await _context.Users.FirstOrDefaultAsync(u => u.PasswordResetToken.Equals(resetToken));
            return user!;
        }
    }
}
