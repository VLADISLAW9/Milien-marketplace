using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MilienAPI.Data;
using MilienAPI.Models.DTO;
using MilienAPI.Models;
using Microsoft.AspNetCore.Authorization;

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
        public IActionResult GetAdsByCustomerId(int customerId)
        {
            var res = _context.Ads
                .Where(ad => ad.CustomerId == customerId)
                .ToList();

            if (res.Count == 0)
                return BadRequest();

            return Ok(res);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = _context.Ads.ToList();

            return Ok(result);
        }

        [HttpGet]
        public ActionResult GetAdById(int id)
        {
            var res = _context.Ads.Find(id);

            if (res == null)
                return NotFound();
            return Ok(res);
        }

        [HttpGet]
        public IActionResult GetAdsByCategory(string category)
        {
            Category typeOfCategory = (Category)Enum.Parse(typeof(Category), category);

            var res = _context.Ads.Where(a => a.Category.Equals(typeOfCategory));

            return Ok(res);
        }
    }
}
