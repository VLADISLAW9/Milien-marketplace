using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace IdentityAPI.Models
{
    [Table("Customers")]
    public class User 
    {
        [Key]
        public int Id { get; set; }
        public string Login { get; set; }
        public string Pass { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public Role Role { get; set; }
        public bool ComfimedEmail { get; set; }
        public string? ConfirmedCode { get; set; }
    }
}
