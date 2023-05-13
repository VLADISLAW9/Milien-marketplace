using System.ComponentModel.DataAnnotations.Schema;

namespace IdentityUserAPI.Models
{
    [Table("Customers")]
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Pass { get; set; }
        public Role Role { get; set; }
    }
}
