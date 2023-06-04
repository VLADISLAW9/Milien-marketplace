using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using MilienAPI.Data;
using MilienAPI.Models.DTO;
using MilienAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore.Internal;
using MilienAPI.Models.Responses;

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
        [Authorize]
        public async Task<ActionResult<Ad>> CreateAd([FromForm] AdResponse ad)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var pathToServer = _configuration.GetSection("Endpoints:Http:Url").Value;
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
                    uniqueFileNames.Add($"{pathToServer}/images/{uniqueFileName}");
                }
            }
            var createdAd = _mapper.Map<AdResponse, Ad>(ad);
            createdAd.PhotoPath = uniqueFileNames.ToArray();
            createdAd.CustomerId = Convert.ToInt32(userId);

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
        public IActionResult GetAll()
        {
            var allAds = _context.Ads.ToList();

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
        public IActionResult Search(string query)
        {
            List<Ad> adList = _context.Ads
                .Where(a => a.Title.Contains(query))
                .OrderBy(x => EF.Functions.Random())
                .Take(5)
                .ToList();

            return Ok(adList);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddToFavorite(int adId)
        {
            var authorizedUser = User.FindFirstValue(ClaimTypes.NameIdentifier);
            FavoriteAdResponse favoriteAd = new FavoriteAdResponse
            {
                AdId = adId,
                CustomerId = Convert.ToInt32(authorizedUser)
            };

            var favoriteAdDB = _mapper.Map<FavoriteAdResponse, FavoriteAd>(favoriteAd);
            await _context.FavoriteAds.AddAsync(favoriteAdDB);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetFavoritesAds()
        {
            var authorizedUser = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var ads = _context.Ads.Join(_context.FavoriteAds,
                                        ad => ad.Id,
                                        favorite => favorite.AdId,
                                        (ad, favorite) => new { Ad = ad, Favorite = favorite })
                                  .Where(joinResult => joinResult.Favorite.CustomerId == Convert.ToInt32(authorizedUser))
                                  .Select(joinResult => joinResult.Ad)
                                  .ToList();
            return Ok(ads);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreatePaidAd([FromForm] AdResponse ad)
        {
            PaidAdDTO paidAd = new PaidAdDTO();
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var res = _context.Ads
                              .Where(a => a.Title == ad.Title && a.CustomerId == Convert.ToInt32(userId))
                              .OrderByDescending(a => a.Id)
                              .FirstOrDefault();

            res.Premium = true;
            paidAd.ExpiryTime = DateTime.Now.AddDays(10);
            paidAd.AdId = res.Id;
            await _context.PaidAds.AddAsync(paidAd);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> EditAd(Ad ad)
        {
            var currentAd = _context.Ads.Find(ad.Id);

            if(currentAd != null)
            {
                currentAd.Title = ad.Title;
                currentAd.Description = ad.Description;
                currentAd.Price = ad.Price;
                currentAd.Adress = ad.Adress;
                currentAd.Category = ad.Category;
                currentAd.Subcategory = ad.Subcategory;

                _context.SaveChanges();
                return Ok();
            }

            return BadRequest();
        }
    }
}
