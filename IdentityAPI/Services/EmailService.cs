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
            Guid uniqueCode = Guid.NewGuid();
            string formattedGuid = uniqueCode.ToString("N").Substring(0, 6);
            var fromAddress = new MailAddress("rumilien@gmail.com", "Milien");
            var toAddress = new MailAddress(email);
            var emailMessage = new MailMessage(fromAddress, toAddress);
            string body = "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<title>Письмо</title>" +
                "</head>" +
                "<body>" +
                "<div style='font-family: 'Open Sans', sans-serif; background-color: rgb(245, 245, 244); display: flex; justify-content: center; align-items: center;'>" +
                "<div style= '--tw-shadow-color: #e7e5e4; --tw-shadow: var(--tw-shadow-colored); --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color); box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow); margin: 0; position: absolute; top: 50%; left: 50%; margin-right: -50%; transform: translate(-50%, -50%); border-radius: 1rem; background-color: rgb(255, 255, 255); padding: 30px; width: 600px;'>" +
                "<div style='text-align: center;'>" +
                "<img width='250' alt='logo' src='https://sun9-79.userapi.com/impg/M6TGYAzcI4c88WT8RnoTpLXqfVTPPQtAZ_R8gg/ZEQpNFj1Ltg.jpg?size=1280x483&quality=96&sign=30879f5cb15a7d639dd925583b6a2e7f&type=album' />" +
                "</div>" +
                "<div style='margin-top: 3rem; margin-bottom: 4rem;'>" +
                "<h1 style='font-weight: 700; font-size: 30px;'>Ваш проверочный код:</h1>" +
                "<div style='display: flex; justify-content: center; background-color: rgb(245, 245, 244); border-radius: 1rem;'>" +
                $"<h1 style='font-size: 18px; color: rgb(22, 100, 48); padding: 10px;'>{formattedGuid}</h1>" +
                "</div>" +
                "</div>" +
                "<div>" +
                $"<p style='color: rgb(122, 125, 128); font-weight: 500;'>Здравствуйте,{user.FirstName}!</p>" +
                "<p style='color: rgb(122, 125, 128); font-weight: 500;'>Нам пришел запрос на проверку безопасности вашей учетной записи. Пожалуйста, введите указанный выше код, чтобы подтвердить владение данной учетной записью.</p>" +
                "<p style='color: rgb(122, 125, 128); font-weight: 500; font-size: 13px;'>*Если это письмо пришло к Вам по ошибке, просто проигнорируйте его.</p>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";

            emailMessage.Subject = subject;
            emailMessage.Body = body;
            emailMessage.IsBodyHtml = true;

            using (var client = new System.Net.Mail.SmtpClient("smtp.gmail.com", 587))
            {
                client.EnableSsl = true;
                client.Credentials = new NetworkCredential("rumilien@gmail.com", "sfgsmphctxcrqska");
                client.Send(emailMessage);
            }

            return formattedGuid;

        }
    }
}
