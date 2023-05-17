using IdentityAPI.Data;
using IdentityAPI.Models;
using IdentityAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IdentityAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly Context _context;
        private readonly ITokenService _tokenService;

        public TokenController(Context context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost]
        [Route("refresh")]
        public IActionResult Refresh(TokenApiModel tokenApiModel)
        {
            if (tokenApiModel is null)
                return BadRequest("Invalid client request");

            string accessToken = tokenApiModel.AccessToken;
            string refreshToken = tokenApiModel.RefreshToken;

            var principal = _tokenService.GetPrincipalFromExpiredToken(accessToken);
            var username = principal.Identity.Name;

            var user = _context.LoginModels.SingleOrDefault(u => u.Login == username);

            if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
            {
                return BadRequest("Invalid client response");
            }

            var newAccessToken = _tokenService.GenerateAccessToken(principal.Claims);
            var newRefreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            _context.SaveChanges();

            return Ok(new AuthenticateResponse()
            {
                Token = newAccessToken,
                RefreshToken = newRefreshToken,
            });
        }

        [HttpPost, Authorize]
        [Route("revoke")]
        public IActionResult Revoke()
        {
            var username = User.Identity.Name;

            var user = _context.LoginModels.SingleOrDefault(u => u.Login == username);

            if (user is null)
            {
                return BadRequest();
            }

            user.RefreshToken = null;
            user.RefreshTokenExpiryTime = null;

            _context.SaveChanges();

            return NoContent();
        }
    }
}
