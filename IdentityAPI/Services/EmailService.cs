using IdentityAPI.Models;
using MailKit.Net.Smtp;
using System.Net;
using System.Net.Mail;

namespace IdentityAPI.Services
{
    public class EmailService
    {
        public string SendEmailAsync(string email, string subject)
        {
            Guid guid = Guid.NewGuid();
            string formattedGuid = guid.ToString("N").Substring(0, 6);
            var emailMessage = new MailMessage("rumilien@gmail.com", email);

            emailMessage.Subject = subject;
            emailMessage.Body = $"Для подтверждения регистрация введите данный код: {formattedGuid}";
            emailMessage.IsBodyHtml = true;

            using (var client = new System.Net.Mail.SmtpClient("smtp.gmail.com", 587))
            {
                client.Credentials = new NetworkCredential("rumilien@gmail.com", "hukjsgyqoxxgissx");
                client.EnableSsl = true;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Send(emailMessage);
            }

            return formattedGuid;
        }
    }
}
