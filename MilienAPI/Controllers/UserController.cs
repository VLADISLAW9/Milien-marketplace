using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MilienAPI.Data;
using MilienAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Data;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace MilienAPI.Controllers
{
    [Route("Customer/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private Context _context;
        private IMapper _mapper;

        public UserController(Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var userWiithIndividualId = await _context.Customers.FindAsync(id);

            if (userWiithIndividualId == null)
                return BadRequest();

            var dataForAccount = _mapper.Map<Customer, Account>(userWiithIndividualId);

            return Ok(dataForAccount);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetOwnAds()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var authorizedUser = await _context.Customers.FindAsync(Convert.ToInt32(userId));

            var userAds = await _context.Ads.Where(a => a.CustomerId == authorizedUser.Id)
                .OrderByDescending(a => a.Id)
                .ToListAsync();
            
            return Ok(new { User = authorizedUser, UserAds = userAds });
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> EditProfile([FromBody] Account accountDetail)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var userDto = _context.Customers.Find(Convert.ToInt32(userId));

            try
            {
                if (userDto != null)
                {
                    userDto.FirstName = accountDetail.FirstName;
                    userDto.LastName = accountDetail.LastName;
                    userDto.AboutMe = accountDetail.AboutMe;

                    await _context.SaveChangesAsync();
                    return Ok();
                }
            }
            catch
            {
                return BadRequest("Логин уже занят другим пользователем!");
            }

            return BadRequest("Произошла ошибка при редактировании пользователя!");
        }
    }
}
