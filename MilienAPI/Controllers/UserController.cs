using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MilienAPI.Data;
using MilienAPI.Models;
using MilienAPI.Models.DTO;
using Microsoft.EntityFrameworkCore;
using System.Data;
using IdentityUserAPI.Models;
using MilienAPI.Helpers;

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
        public async Task<IActionResult> GetAll()
        {
            var allCusomers = await _context.Customers.ToListAsync();

            return Ok(allCusomers);
        }
    }
}
