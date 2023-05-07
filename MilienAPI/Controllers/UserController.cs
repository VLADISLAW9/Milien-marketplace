using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MilienAPI.Data;
using MilienAPI.Models;
using System.Data.Entity;

namespace MilienAPI.Controllers
{
    [Route("api/CustomerAPI/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private Context _context;

        public UserController(Context context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newUser = new Customer
            {
                Login = customer.Login,
                Pass = customer.Pass,
                Email = customer.Email,
                FirstName = customer.FirstName,
                LastName = customer.LastName,
                Age = customer.Age,
                PhoneNumber = customer.PhoneNumber,
            };

            _context.Customers.Add(newUser);
            await _context.SaveChangesAsync();


            return Ok();
        }

        [HttpGet]
        public IActionResult GetById(int id)
        {
            var result = _context.Customers.Find(id);

            if (result == null)
                return BadRequest();

            return Ok(result);
        }

        [HttpGet]
        public JsonResult GetAll()
        {
            var result = _context.Customers.ToList();

            return new (Ok(result));
        }
    }
}
