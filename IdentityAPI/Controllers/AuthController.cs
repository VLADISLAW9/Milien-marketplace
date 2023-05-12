using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using IdentityAPI.Data;
using IdentityAPI.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using MilienAPI.Data;
using Microsoft.AspNetCore.Identity;
using Auth.Common;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace IdentityAPI.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private PasswordHasher<string> _passwordHasher = new PasswordHasher<string>();
        private Context _context;
        private readonly JwtSettings _options;

        public AuthController(Context context, IOptions<JwtSettings> optAccess)
        {
            _context = context;
            _options = optAccess.Value;
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] Login request)
        {
            var savedHashedPassword = _context.Users.Where(u => u.Email == request.Email).FirstOrDefault();
            var passwordVerificationResult = _passwordHasher.VerifyHashedPassword(null, savedHashedPassword.Pass, request.Password);
            switch (passwordVerificationResult)
            {
                case PasswordVerificationResult.Success:
                    var user = AutheticateUser(request.Email, savedHashedPassword.Pass);
                    var token = GenerateJWt(user);

                    return Ok(new
                    {
                        access_token = token,
                    });
            }
            return Unauthorized();
        }

        private User AutheticateUser(string email, string password)
        {
            return _context.Users.SingleOrDefault(u => u.Email == email && u.Pass == password);
        }

        private string GenerateJWt(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim("role", user.Role.ToString())
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
    }
}
