using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MilienAPI.Models
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }

        public string Login { get; set; }
        public string Pass { get; set; }

        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; } 
        public int Age { get; set; }
        public string PhoneNumber { get; set; }
    }
}
