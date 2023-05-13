using IdentityAPI.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IdentityAPI.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class Admincontroller : ControllerBase
    {
        private int _id => int.Parse(User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value);
        private readonly Context _context;

        public Admincontroller(Context context)
        {
            _context = context;
        }

        [HttpDelete]
        [Authorize]
        public IActionResult GetAd(int id)
        {
            var res = _context.Ads.Find(id);

            _context.Ads.Remove(res);
            _context.SaveChangesAsync();

            return Ok();
        }

    }
}
