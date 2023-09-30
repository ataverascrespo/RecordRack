using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services.EmailServices
{
    public interface IEmailService
    {
        //Method that accesses instance of EmailService to compose and send a verification email
        void CreateVerificationEmail(User user);

        //Method that accesses instance of EmailService to compose and send a password reset email
        void CreatePasswordResetEmail(User user);

        //Method to send an email
        Task SendEmail(string subject, string message, string toEmail, string username);
    }
}