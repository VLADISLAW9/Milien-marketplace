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
        private IConfiguration _configuration;

        public AdController(Context context, IMapper mapper, IWebHostEnvironment hostEnvironment,
            IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _hostingEnvironment = hostEnvironment;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<ActionResult<Ad>> CreateAd([FromForm] AdResponse ad)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var pathToServer = _configuration.GetSection("Endpoints:Http:Url").Value;
            ///var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

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
                    uniqueFileNames.Add($"{pathToServer}/images/{uniqueFileName}");
                }
            }
            var createdAd = _mapper.Map<AdResponse, Ad>(ad);
            createdAd.PhotoPath = uniqueFileNames.ToArray();
            createdAd.CustomerId = 25;
            _context.Ads.Add(createdAd);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{customerId}")]
        public async Task<IActionResult> GetAdsByCustomerId(int customerId)
        {
            var allAdsForCurrentCustomers = await _context.Ads
                .Where(ad => ad.CustomerId == customerId)
                .ToListAsync();

            if (allAdsForCurrentCustomers.Count == 0)
                return BadRequest();

            return Ok(allAdsForCurrentCustomers);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var allAds = await _context.Ads.ToListAsync();

            return Ok(allAds);
        }

        [HttpGet]
        public async Task<IActionResult> GetAdById(int id)
        {
            var adWithIndividualId = await _context.Ads.FindAsync(id);

            if (adWithIndividualId == null)
                return NotFound();
            return Ok(adWithIndividualId);
        }

        [HttpGet]
        public async Task<IActionResult> GetAdsByCategory(string category)
        {
            var allAdsWithSelectedCategory = await _context.Ads.Where(a => a.Category == category).ToListAsync();

            return Ok(allAdsWithSelectedCategory);
        }

        [HttpGet]
        public IActionResult Test()
        {
            return Ok(_configuration.GetSection("Endpoints:Http:Url").Value);
        }
    }
}
