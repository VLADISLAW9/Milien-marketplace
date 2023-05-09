using Microsoft.AspNetCore.Mvc;
using MilienAPI.Data;
using MilienAPI.Models;

namespace MilienAPI.Controllers
{
    [Route("api/Ad/[controller]/[action]")]
    [ApiController]
    public class AdController : ControllerBase
    {
        private Context _context;

        public AdController(Context context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Ad>> CreateAd([FromBody] Ad ad)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Ads.Add(ad);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{customerId}")]
        public IActionResult GetAdsByCustomerId(int customerId)
        {
            var customer =_context.Customers.FirstOrDefault(c => c.Id == customerId);

            var ads = _context.Ads.Where(a => a.CustomerId == customerId).ToList();

            if (ads.Count == 0)
                return BadRequest();

            return Ok(ads);
        }
    }
}
