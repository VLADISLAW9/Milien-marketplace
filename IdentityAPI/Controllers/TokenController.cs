using IdentityAPI.Data;
using IdentityAPI.Models;
using IdentityAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

            var currentIdentityUser = _context.LoginModels.SingleOrDefault(u => u.Login == username);

            if (currentIdentityUser is null || currentIdentityUser.RefreshToken != refreshToken
                || currentIdentityUser.RefreshTokenExpiryTime <= DateTime.Now )
            {
                return Unauthorized();
            }

            var newAccessToken = _tokenService.GenerateAccessToken(principal.Claims);
            var newRefreshToken = _tokenService.GenerateRefreshToken();

            currentIdentityUser.RefreshToken = newRefreshToken;
            _context.SaveChanges();

            return Ok(new AuthenticateResponse()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken,
            });
        }

        [HttpPost]
        [Route("revoke")]
        public async Task<IActionResult> Revoke()
        {
            var currentIdentityUser = User.Identity.Name;

            var loginedUser = await _context.LoginModels.SingleOrDefaultAsync(u => u.Login == currentIdentityUser);

            if (loginedUser is null)
            {
                return BadRequest();
            }

            loginedUser.RefreshToken = null;
            loginedUser.RefreshTokenExpiryTime = null;

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
