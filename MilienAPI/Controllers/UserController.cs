using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MilienAPI.Data;
using MilienAPI.Models;
using System.Data.Entity;

namespace MilienAPI.Controllers
{
    [Route("api/[controller]/[action]")]
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

            var user = _mapper.Map<CustomerDTO, Customer>(customer);

            _context.Customers.Add(user);
            await _context.SaveChangesAsync();


            return Ok();
        }

        [HttpGet("")]
        public JsonResult GetAll()
        {
            var result = _context.Customers.ToList();

            return new (Ok(result));
        }
    }
}
