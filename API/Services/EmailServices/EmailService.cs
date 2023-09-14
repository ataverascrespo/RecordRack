// using SendGrid's C# Library
// https://github.com/sendgrid/sendgrid-csharp
using SendGrid;
using SendGrid.Helpers.Mail;
/// <summary>
/// Service class handles data retrieval from auth controller and repository
/// Uses SendGrid API to email the selected user
/// </summary>
namespace AlbumAPI.Services.EmailServices
{
    public class EmailService
    {
        public async Task SendEmail(string subject, string message, string toEmail, string username)
        {
            //Test api key
            var apiKey = "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";
            var client = new SendGridClient(apiKey);

            //temp email format
            var from = new EmailAddress("alexmanuelt@hotmail.com", "Record Rack");
            var to = new EmailAddress(toEmail, username);
            var plainTextContent = "";
            var htmlContent = message;

            //Send the email msg
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            await client.SendEmailAsync(msg);
        }
    }
}