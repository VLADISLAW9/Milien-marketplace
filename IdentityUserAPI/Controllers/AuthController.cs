using IdentityUserAPI.Data;
using IdentityUserAPI.Models;
using IdentityUserAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

namespace IdentityUserAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly Context _context;
        private readonly ITokenService _tokenService;

        public AuthController(Context context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost, Route("login")]
        public IActionResult Login([FromBody] LoginModel loginModel)
        {
            var passwordHasher = new PasswordHasher<string>();
            if (loginModel == null)
                return BadRequest("Invalid client response");
            var user = _context.LoginModels.FirstOrDefault(u => u.Login == loginModel.Login);

            var passwordResult = passwordHasher.VerifyHashedPassword(null, user.Password, loginModel.Password);

            if (user is null || passwordResult != PasswordVerificationResult.Success)
                return Unauthorized();

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, loginModel.Login),
            };

            var accessToken = _tokenService.GenerateAccessToken(claims);
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(30);

            _context.SaveChanges();

            return Ok(new AuthenticateResponse
            {
                Token = accessToken,
                RefreshToken = refreshToken
            });
        }
    }
}
