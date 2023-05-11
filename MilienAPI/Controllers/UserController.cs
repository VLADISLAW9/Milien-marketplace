using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MilienAPI.Data;
using MilienAPI.Models;
using MilienAPI.Models.DTO;
using System.Data.Entity;

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

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CustomerDTO customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            customer.Pass = md5.hashPassword(customer.Pass);
            var user = _mapper.Map<CustomerDTO, Customer>(customer);
            _context.Customers.Add(user);
            await _context.SaveChangesAsync();


            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var result = _context.Customers.Find(id);

            if (result == null)
                return BadRequest();

            return Ok(result);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = _context.Customers.ToList();

            return Ok(result);
        }
    }
}
