using Microsoft.AspNetCore.Identity;

namespace MilienAPI.Data
{
    public class PasswordHasher
    {
        private static PasswordHasher<string> _passwordHasher = new PasswordHasher<string>();
        public static string HashPassword(string password)
        {
            return _passwordHasher.HashPassword(null, password).ToString();
        }

        public static bool UnHashPassword(string password)
        {
            string hashedPassword = _passwordHasher.HashPassword(null, password);
            var passwordVerificationResult = _passwordHasher.VerifyHashedPassword(null, hashedPassword, password);

            return (passwordVerificationResult == PasswordVerificationResult.Success);
        }
    }
}
