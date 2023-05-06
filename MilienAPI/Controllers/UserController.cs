using Microsoft.AspNetCore.Mvc;
using MilienAPI.Data;
using System.Data.Entity;

namespace MilienAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private Context _context;

        public UserController(Context context)
        {
            _context = context;
        }

        [HttpGet("")]
        public JsonResult GetAll()
        {
            var result = _context.Customers.ToList();

            return new (Ok(result));
        }
    }
}
