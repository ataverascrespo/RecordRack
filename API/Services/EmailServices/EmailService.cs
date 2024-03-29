// using SendGrid's C# Library
// https://github.com/sendgrid/sendgrid-csharp
using API.Services.EmailServices;
using SendGrid;
using SendGrid.Helpers.Mail;
/// <summary>
/// Service class handles data retrieval from auth controller and repository
/// Uses SendGrid API to email the selected user
/// </summary>
namespace AlbumAPI.Services.EmailServices
{
    public class EmailService : IEmailService
    {

        private readonly IConfiguration _configuration;
        private String _sendgridAPIKey;
        private String _sendgridEmail;

        //Inject Email services configuration
        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
            _sendgridAPIKey = _configuration.GetSection("SendgridSettings:ApiKey").Value!;
            _sendgridEmail = _configuration.GetSection("SendgridSettings:FromEmail").Value!;
        }


        //Method that accesses instance of EmailService to compose and send a verification email
        public void CreateVerificationEmail(User user) {
            // Create user registration confirmation email fields
            string emailSubject = "Record Rack Account Verification";
            string emailUsername = user.UserName;
            string toEmail = user.Email;
            string emailMessage = "<p>Hey " + emailUsername + "!</p>\n" +
                "<p>Thanks for signing up for Record Rack! I'm thrilled to have you join.<p>\n" +
                "<p>To complete your registration and start using Record Rack, please confirm your email address:<p> \n" + 
                "<a href='https://recordrack.ca/accounts/verified/?="+user.VerificationToken+"'>Click here to verify your account</a> \n"+
                "<p>See you soon,</p> \n" + "<p>Alex from Record Rack</p>";
                    
            SendEmail(emailSubject, emailMessage, toEmail, emailUsername).Wait();
        }

        //Method that accesses instance of EmailService to compose and send a password reset email
        public void CreatePasswordResetEmail(User user) {
            // Create user password reset  email fields
            string emailSubject = "Record Rack - " + user.UserName + " password reset";
            string emailUsername = user.UserName;
            string toEmail = user.Email;
            string emailMessage = "<p>Hey " + emailUsername + "!</p>\n" +
                "<p>A request has been received to reset the password for your Record Rack account.<p>\n" +
                "<p>You have <strong>one day</strong> from the time of receiving this email to reset your password via the following URL:<p> \n" + 
                "<a href='https://recordrack.ca/accounts/reset-password/?="+user.PasswordResetToken+"'>Click here to reset your password</a> \n"+
                "<p>If you did not request a reset, you can safely ignore this email.<p> \n" + 
                "<p>See you soon,</p> \n" + "<p>Alex from Record Rack</p>";
                    
            SendEmail(emailSubject, emailMessage, toEmail, emailUsername).Wait();
        }

        //Method to send an email
        public async Task SendEmail(string subject, string message, string toEmail, string username)
        {
            //Create a new client using config API key
            var client = new SendGridClient(_sendgridAPIKey);

            //temp email format
            var from = new EmailAddress(_sendgridEmail, "Record Rack");
            var to = new EmailAddress(toEmail, username);
            var plainTextContent = "";
            var htmlContent = message;

            //Send the email msg
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            await client.SendEmailAsync(msg);
        }
    }
}