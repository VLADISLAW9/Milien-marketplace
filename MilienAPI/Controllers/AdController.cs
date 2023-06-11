using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using MilienAPI.Data;
using MilienAPI.Models.DTO;
using MilienAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using MilienAPI.Models.Responses;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel;
using System.Reflection;
using Microsoft.Extensions.Caching.Memory;
using System.Security.Policy;

namespace MilienAPI.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class AdController : ControllerBase
    {
        private List<Ad> mergedAds;
        private readonly IMemoryCache _cache;
        private Context _context;
        private IMapper _mapper;
        private IWebHostEnvironment _hostingEnvironment;
        private IConfiguration _configuration;

        public AdController(Context context, IMapper mapper, IWebHostEnvironment hostEnvironment,
            IConfiguration configuration, IMemoryCache cache)
        {
            _context = context;
            _mapper = mapper;
            _hostingEnvironment = hostEnvironment;
            _configuration = configuration;
            _cache = cache;
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
                    uniqueFileName = Guid.NewGuid().ToString() + "_" + item.FileName;
                    string filePath = Path.Combine("/var/images", uniqueFileName);
                    using (FileStream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        item.CopyTo(fileStream);
                    }
                    uniqueFileNames.Add($"/var/images/{uniqueFileName}");
                }
            }

            var createdAd = _mapper.Map<AdResponse, Ad>(ad);
            createdAd.PhotoPath = uniqueFileNames.ToArray();
            createdAd.CustomerId = Convert.ToInt32(userId);

            _context.Ads.Add(createdAd);
            await _context.SaveChangesAsync();
            return Ok(createdAd);
        }

        [HttpGet("{customerId}")]
        public async Task<IActionResult> GetAdsByCustomerId(int customerId)
        {
            var allAdsForCurrentCustomers = await _context.Ads
                .Where(ad => ad.CustomerId == customerId)
                .OrderByDescending(a => a.Id)
                .ToListAsync();

            if (allAdsForCurrentCustomers.Count == 0)
                return BadRequest();

            return Ok(allAdsForCurrentCustomers);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(int limit, int page, bool refreshAds = false)
        {
            if (refreshAds || !_cache.TryGetValue("cacheAds", out List<Ad> cachedAds))
            {
                Random random = new Random();
                cachedAds = await _context.Ads.OrderByDescending(a => EF.Functions.Random()).ToListAsync();
                var premiumAds = cachedAds.Where(a => a.Premium).ToList();
                var regularAds = cachedAds.Where(a => !a.Premium).ToList();

                var mergedAds = new List<Ad>();

                int number = random.Next(1, 5);
                for (int i = 0; i < regularAds.Count; i++)
                {
                    mergedAds.Add(regularAds[i]);

                    if ((i + 1) % number == 0 && premiumAds.Count > 0)
                    {
                        mergedAds.Add(premiumAds[0]);
                        premiumAds.RemoveAt(0);
                        number = random.Next(1, 5);
                    }
                }
                _cache.Set("cacheAds", mergedAds, new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes(15)));
            }

            var cahceValue = (List<Ad>)_cache.Get("cacheAds");
            var paginatedData = cahceValue.Skip((page - 1) * limit).Take(limit).ToList();

            Response.Headers.Add("count", $"{cahceValue.Count}");

            return Ok(paginatedData);
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
        public async Task<IActionResult> Search(string query)
        {
            var adList = await _context.Ads
                .Where(a => a.Title.ToLower().Contains(query.ToLower()))
                .OrderBy(x => EF.Functions.Random())
                .Take(5)
                .ToListAsync();

            var array = Enum.GetNames(typeof(Category));

            var categories = array.Where(
                a => a.IndexOf(query, StringComparison.OrdinalIgnoreCase) >= 0).ToList();

            var descriptionAttributes = new List<string>();

            if (categories.Any())
            {
                var enumType = typeof(Category);

                foreach (var categoryName in categories)
                {
                    var descriptionField = enumType.GetField(categoryName);
                    var descriptionAttribute = descriptionField?.
                        GetCustomAttribute<DescriptionAttribute>(false)?.Description;

                    if (!string.IsNullOrEmpty(descriptionAttribute))
                    {
                        descriptionAttributes.Add(descriptionAttribute);
                    }
                }

            }

            return Ok(new { Ads = adList, Categories = descriptionAttributes });
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddToFavorite([FromBody] int id)
        {
            var authorizedUser = User.FindFirstValue(ClaimTypes.NameIdentifier);
            FavoriteAdResponse favoriteAd = new FavoriteAdResponse
            {
                CustomerId = Convert.ToInt32(Convert.ToInt32(authorizedUser)),
                AdId = id
            };

            var favoriteAdDB = _mapper.Map<FavoriteAdResponse, Favorite>(favoriteAd);
            await _context.FavoriteAds.AddAsync(favoriteAdDB);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> RemoveFromFavorite(int id)
        {
            var authorizedUser = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var ad = await _context.FavoriteAds.Where(a => a.AdId == id &&
            a.CustomerId == Convert.ToInt32(authorizedUser)).FirstOrDefaultAsync();

            if (ad != null)
            {
                _context.FavoriteAds.Remove(ad);
                await _context.SaveChangesAsync();
                return Ok();
            }

            return BadRequest("Что то пошло не так!");
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetFavoriteAds()
        {
            var authorizedUser = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var ads = await _context.Ads.Join(_context.FavoriteAds,
                                        ad => ad.Id,
                                        favorite => favorite.AdId,
                                        (ad, favorite) => new { Ad = ad, Favorite = favorite })
                                  .Where(joinResult => joinResult.Favorite.CustomerId == Convert.ToInt32(authorizedUser))
                                  .Select(joinResult => joinResult.Ad)
                                  .ToListAsync();
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

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> UpgradeToPremium([FromBody] int id)
        {
            PaidAdDTO paidAd = new PaidAdDTO();
            var res = await _context.Ads.FindAsync(id);

            res.Premium = true;
            paidAd.ExpiryTime = DateTime.Now.AddDays(10);
            paidAd.AdId = res.Id;

            await _context.PaidAds.AddAsync(paidAd);

            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> EditAd([FromForm] List<string> urls, [FromForm] AdResponse ad)
        {
            var currentAd = await _context.Ads.FindAsync(ad.Id);
            var pathToServer = _configuration.GetSection("Endpoints:Http:Url").Value;

            if (currentAd != null)
            {
                if (currentAd.PhotoPath.Length > 0)
                {
                    foreach (var image in currentAd.PhotoPath)
                    {
                        if (!urls.Contains(image))
                        {
                            System.IO.File.Delete(image);
                        }
                    }
                }

                List<string> uniqueFileNames = urls;
                string uniqueFileName = null;

                if (ad.Images != null && ad.Images.Count > 0)
                {
                    foreach (var item in ad.Images)
                    {
                        uniqueFileName = Guid.NewGuid().ToString() + "_" + item.FileName;
                        string filePath = Path.Combine("/var/images", uniqueFileName);
                        using (FileStream fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            item.CopyTo(fileStream);
                        }
                        uniqueFileNames.Add($"/var/images/{uniqueFileName}");
                    }
                }


                currentAd.Title = ad.Title;
                currentAd.Description = ad.Description;
                currentAd.Price = ad.Price;
                currentAd.Adress = ad.Adress;
                currentAd.Category = ad.Category;
                currentAd.Subcategory = ad.Subcategory;
                currentAd.PhotoPath = uniqueFileNames.ToArray();

                await _context.SaveChangesAsync();
                return Ok();
            }

            return BadRequest("Произошла ошибка при редактировании объявления!");
        }

        [HttpGet]
        [Authorize]
        public async Task<bool> IsFavoite(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var isFavorite = await _context.FavoriteAds.Where(a => a.AdId == id &&
            a.CustomerId == Convert.ToInt32(userId)).FirstOrDefaultAsync();

            return isFavorite != null ? true : false;
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteAd(int id)
        {
            var ad = await _context.Ads.FindAsync(id);

            if (ad != null)
            {
                var premium = _context.PaidAds.Where(p => p.AdId == ad.Id).FirstOrDefault();

                if (premium != null)
                    _context.PaidAds.Remove(premium);

                if (ad.PhotoPath.Length > 0)
                {
                    foreach (var image in ad.PhotoPath)
                    {
                        System.IO.File.Delete(image);
                    }
                }
                _context.Ads.Remove(ad);
                await _context.SaveChangesAsync();
                return Ok();

            }

            return BadRequest("Что то пошло не так!");
        }

        [HttpGet]
        public async Task<IActionResult> SearchByQuery(string query, int page, int limit)
        {
            var ads = await _context.Ads
                .Where(a => a.Title.ToLower().Contains(query.ToLower())
                    || a.Category.ToLower().Contains(query.ToLower())
                    || a.Subcategory.ToLower().Contains(query.ToLower()))
                .OrderByDescending(x => x.Premium)
                .ThenByDescending(x => x.Id)
                .ToListAsync();

            Response.Headers.Add("count", $"{ads.Count}");

            var paginatedData = ads.Skip((page - 1) * limit).Take(limit).ToList();

            return Ok(paginatedData);
        }

        [HttpGet]
        public async Task<IActionResult> Filtration(int limit, int page, string category = null, string subcategory = null,
            int min = 0, int max = int.MaxValue)
        {
            var adsQuery = _context.Ads
                    .Where(a =>
                    (category == null || a.Category.ToLower() == category.ToLower())
                    && (subcategory == null || a.Subcategory.ToLower() == subcategory.ToLower())
                    && a.Price >= min && a.Price <= max);

            var ads = await adsQuery.OrderByDescending(x => x.Id).ToListAsync();

            var res = ads.Skip((page - 1) * limit).Take(limit).ToList();

            Response.Headers.Add("count", $"{res.Count}");
            return Ok(ads);
        }

        [HttpGet]
        public async Task<IActionResult> GetNewAds()
        {
            DateTime threeDaysAgo = DateTime.Today.AddDays(-3);
            var randomAdvertisements = await _context.Ads
                                .Where(a => a.DateOfCreation >= threeDaysAgo)
                                .OrderBy(x => EF.Functions.Random())
                                .Take(6)
                                .ToListAsync();

            return Ok(randomAdvertisements);
        }

        [HttpGet]
        public async Task<IActionResult> GetNewServices()
        {
            var randomAdvertisements = await _context.Ads
                    .Where(a => a.Category == "Услуги")
                    .OrderBy(x => EF.Functions.Random())
                    .Take(6)
                    .ToListAsync();

            return Ok(randomAdvertisements);
        }
    }
}
