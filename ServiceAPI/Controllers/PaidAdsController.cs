using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceAPI.Data;

namespace ServiceAPI.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class PaidAdsController : ControllerBase
    {
        private readonly Context _context;

        public PaidAdsController(Context context)
        {
            _context = context;
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteExpiredRows()
        {
            DateTime currentTime = DateTime.Now;
            
            var expiredAds = await _context.PaidAds.Where(a => a.ExpiryTime < currentTime).ToListAsync();

            _context.PaidAds.RemoveRange(expiredAds);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
