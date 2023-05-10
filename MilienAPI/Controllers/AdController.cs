using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MilienAPI.Data;
using MilienAPI.Models.DTO;
using MilienAPI.Models;

namespace MilienAPI.Controllers
{
    [Route("Ad/[controller]/[action]")]
    [ApiController]
    public class AdController : ControllerBase
    {
        private Context _context;
        private IMapper _mapper;

        public AdController(Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<Ad>> CreateAd([FromBody] AdDTO ad)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var res = _mapper.Map<AdDTO, Ad>(ad);
            _context.Ads.Add(res);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{customerId}")]
        public IActionResult GetAdsByCustomerId(int customerId)
        {
            var res = _context.Ads
                .Where(ad => ad.CustomerId == customerId)
                .ToList();

            if (res.Count == 0)
                return BadRequest();

            return Ok(res);
        }
    }
}
