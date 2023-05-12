using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MilienAPI.Models.DTO
{
    [Table("Customers")]
    public class CustomerDTO
    {
        [MaxLength(100)]
        public string Login { get; set; }

        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,15}$", ErrorMessage = "Invalid Password")]
        [MinLength(8)]
        public string Pass { get; set; }

        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        [Required]
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [Range(18, 99, ErrorMessage = "Invalid Age")]
        public int Age { get; set; }
        public string PhoneNumber { get; set; }
        public Role Role { get; set; }
    }
}
