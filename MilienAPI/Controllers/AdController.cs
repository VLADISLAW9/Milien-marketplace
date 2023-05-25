using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using MilienAPI.Data;
using MilienAPI.Models.DTO;
using MilienAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace MilienAPI.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class AdController : ControllerBase
    {
        private Context _context;
        private IMapper _mapper;
        private IWebHostEnvironment _hostingEnvironment;

        public AdController(Context context, IMapper mapper, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _mapper = mapper;
            _hostingEnvironment = hostEnvironment;
        }

        [HttpPost]
        public async Task<ActionResult<Ad>> CreateAd([FromForm] AdResponse ad)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            List<string> uniqueFileNames = new List<string>();
            string uniqueFileName = null;

            if (ad.Images != null && ad.Images.Count > 0)
            {
                foreach (var item in ad.Images)
                {
                    string uploadFolder = Path.Combine(_hostingEnvironment.WebRootPath, "images");
                    uniqueFileName = Guid.NewGuid().ToString() + "_" + item.FileName;
                    string filePath = Path.Combine(uploadFolder, uniqueFileName);
                    item.CopyTo(new FileStream(filePath, FileMode.Create));
                    uniqueFileNames.Add("http://192.168.0.160:5137/images/" + uniqueFileName);
                }
            }
            var res = _mapper.Map<AdResponse, Ad>(ad);
            res.PhotoPath = uniqueFileNames.ToArray();
            //res.CustomerId = Convert.ToInt32(userId);
            res.CustomerId = 10;
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
