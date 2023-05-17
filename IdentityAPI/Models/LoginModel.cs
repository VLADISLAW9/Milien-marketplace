using System.ComponentModel.DataAnnotations.Schema;

namespace IdentityAPI.Models
{
    [Table("Login")]
    public class LoginModel
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string? Password { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
    }
}
