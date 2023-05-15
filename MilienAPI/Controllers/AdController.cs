using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MilienAPI.Data;
using MilienAPI.Models.DTO;
using MilienAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace MilienAPI.Controllers
{
    [Route("[controller]/[action]")]
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
        [Authorize(Roles = "User")]
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
        public async Task<IActionResult> GetAdsByCustomerId(int customerId)
        {
            var res = await _context.Ads
                .Where(ad => ad.CustomerId == customerId)
                .ToListAsync();

            if (res.Count == 0)
                return BadRequest();

            return Ok(res);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _context.Ads.ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAdById(int id)
        {
            var res = await _context.Ads.FindAsync(id);

            if (res == null)
                return NotFound();
            return Ok(res);
        }

        [HttpGet]
        public async Task<IActionResult> GetAdsByCategory(string category)
        {
            Category typeOfCategory = (Category)Enum.Parse(typeof(Category), category);

            var res = await _context.Ads.Where(a => a.Category.Equals(typeOfCategory)).ToListAsync();

            return Ok(res);
        }
    }
}
