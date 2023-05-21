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
            var result = await _context.Customers.FindAsync(id);

            if (result == null)
                return BadRequest();

            var res = _mapper.Map<Customer, Account>(result);

            return Ok(res);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _context.Customers.ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        public async Task<Customer> GetCustomerAsync(string login, string password)
        {
            Customer customerPassword = _context.Customers.Where(c => c.Login == login)
                .FirstOrDefault();
            if (customerPassword == null)
                return null;
            if (PasswordHasher.UnHashPassword(customerPassword.Pass))
                return customerPassword;

            return null;
        }
    }
}
