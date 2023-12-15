/// <summary>
/// Authentication repository method declarations
/// </summary>
namespace AlbumAPI.Data
{
    public interface IAuthRepository
    {

        //General method to save DB changes
        Task SaveChanges(); 

        // Method to mark DB changes have been made when user state has been modified
        void MarkUserChanges(User user); 

        //Method to login
        Task<User> Login(string userName, string password);
         
        //Method to register user account
        Task Register(User user);

        //Method to assess whether passed user exists upon registration
        Task<bool> UserExists(string userName);

        //Method to assess whether passed email exists upon registration
        Task<bool> EmailExists(string Email);

        //Method to find if the passed refresh token exists in DB JSON
        Task<User> FindRefreshToken(string refreshToken);
        
        //Method to remove refresh token from DB JSON column
        Task RemoveRefreshToken(User user, string refreshToken);

        //Method that returns the user from the DB based on matching verification token
        Task<User> FindUserByVerificationToken(string verifyToken);

        //Method that returns the user from the DB based on matching email address
        Task<User> FindUserByEmail(string email);

        //Method that returns the user from the DB based on matching reset token
        Task<User> FindUserByPasswordResetToken(string resetToken);
    }
}