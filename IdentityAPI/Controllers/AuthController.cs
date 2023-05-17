using IdentityAPI.Data;
using IdentityAPI.Models;
using IdentityAPI.Models.DTO;
using IdentityAPI.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IdentityAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly Context _context;
        private readonly ITokenService _tokenService;

        public AuthController(Context context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost, Route("login")]
        public IActionResult Login([FromBody] LoginModelDTO loginModel)
        {
            if (!ModelState.IsValid)
                return BadRequest("Мы ебланы!");
            var passwordHasher = new PasswordHasher<string>();
            if (loginModel == null)
                return BadRequest("Invalid client response");
            var user = _context.LoginModels.FirstOrDefault(u => u.Login == loginModel.Login);
            if (user == null)
                return NotFound();

            var passwordResult = passwordHasher.VerifyHashedPassword(null, user.Password, loginModel.Password);

            if (user is null || passwordResult != PasswordVerificationResult.Success)
                return Unauthorized();

            Customer customer = _context.Customers.FirstOrDefault(c => c.Login == loginModel.Login);
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
                RefreshToken = refreshToken,
                Customer = customer
            });
        }

        [HttpGet, Route("getUser")]
        public IActionResult GetUser(string login)
        {
            var res = _context.Customers.FirstOrDefault(c => c.Login == login);

            if (res != null)
            {
                return Ok(res);
            }

            return BadRequest();
        }
    }
}
