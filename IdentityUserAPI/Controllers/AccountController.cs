using IdentityUserAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using IdentityUserAPI.Data;
using IdentityUserAPI.Helpers;
using Microsoft.AspNetCore.Identity;

namespace IdentityUserAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly JWTSettings _options;
        private readonly Context _context;
        private PasswordHasher<string> _passwordHasher = new PasswordHasher<string>();

        public AccountController(IOptions<JWTSettings> optAccess, Context context)
        {
            _options = optAccess.Value;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] Login request)
        {
            var savedHashedPassword = _context.Users.Where(u => u.Email == request.Email).FirstOrDefault();
            var passwordVerificationResult = _passwordHasher.VerifyHashedPassword(null, savedHashedPassword.Pass, request.Password);
            if(passwordVerificationResult == PasswordVerificationResult.Success)
            {
                var user = AutheticateUser(request.Email, savedHashedPassword.Pass);
                var token = GenerateToken(user);

                return Ok(new
                {
                    access_token = token
                });
            }

            return BadRequest("User not found!");
        }

        private string GenerateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.SecretKey));

            var jwt = new JwtSecurityToken(
                issuer: _options.Issuer,
                audience: _options.Audience,
                claims: claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromHours(1)),
                notBefore: DateTime.UtcNow,
                signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256));

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        private User AutheticateUser(string email, string password)
        {
            return _context.Users.SingleOrDefault(u => u.Email == email && u.Pass == password);
        }
    }
}
