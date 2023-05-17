namespace IdentityAPI.Models
{
    public class AuthenticateResponse
    {
        public string? Token { get; set; }
        public string? RefreshToken { get; set; }
        public Customer Customer { get; set; }
    }
}
