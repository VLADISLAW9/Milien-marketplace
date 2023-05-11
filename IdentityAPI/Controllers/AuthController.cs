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

namespace IdentityAPI.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private PasswordHasher<string> _passwordHasher = new PasswordHasher<string>();
        private Context _context;
        private readonly IOptions<AuthOptions> _options;

        public AuthController(Context context, IOptions<AuthOptions> authOptions)
        {
            _context = context;
            _options = authOptions;

        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] Login request)
        {
            var savedHashedPassword = _context.Users.Where(u => u.Pass == request.Password).FirstOrDefault();
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
                case PasswordVerificationResult.Failed:
                    return Unauthorized();
            }
            return Unauthorized();

        }

        private User AutheticateUser(string email, string password)
        {
            return _context.Users.SingleOrDefault(u => u.Email == email && u.Pass == password);
        }

        private string GenerateJWt(User user)
        {
            var authParams = _options.Value;

            var securityKey = authParams.GetSymmetricSecurityKey();
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim("role", user.Role.ToString())
            };

            var token = new JwtSecurityToken(authParams.Issuer,
                authParams.Audience,
                claims,
                expires: DateTime.Now.AddSeconds(authParams.TokenLifetime),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
