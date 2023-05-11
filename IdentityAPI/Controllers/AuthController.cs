using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using IdentityAPI.Data;
using IdentityAPI.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace IdentityAPI.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private Context _context;
        private readonly IOptions<AuthOptions> _options;

        public AuthController(Context context, IOptions<AuthOptions> authOptions)
        {
            _context = context;
            _options = authOptions;
            
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody]Login request)
        {
            var user = AutheticateUser(request.Email, request.Password);

            if (user == null)
                return Unauthorized();

            var token = GenerateJWt(user);

            return Ok(new
            {
                access_token = token,
            });
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
