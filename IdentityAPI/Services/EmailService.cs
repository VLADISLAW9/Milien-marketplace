using IdentityAPI.Models;
using MailKit.Net.Smtp;
using System.Net;
using System.Net.Mail;

namespace IdentityAPI.Services
{
    public class EmailService
    {
        public string SendEmailAsync(string email, string subject, User user)
        {
            string baseUrl = "http://192.168.0.159:3000";
            string confirm = $"{baseUrl}/login";
            var emailMessage = new MailMessage("rumilien@gmail.com", email);

            emailMessage.Subject = subject;
            emailMessage.Body = $"<p>Пожалуйста, подтвердите ваш адрес электронной почты, перейдя по ссылке:</p><p><a href='{confirm}'>{confirm}</a></p>";
            emailMessage.IsBodyHtml = true;

            using (var client = new System.Net.Mail.SmtpClient("smtp.gmail.com", 587))
            {
                client.Credentials = new NetworkCredential("rumilien@gmail.com", "hukjsgyqoxxgissx");
                client.EnableSsl = true;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Send(emailMessage);
            }

            return confirm;
        }

        public bool ConfirmEmail(string url ) 
        {

        }
    }
}
