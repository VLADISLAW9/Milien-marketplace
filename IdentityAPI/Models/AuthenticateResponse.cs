namespace IdentityAPI.Models
{
    public class AuthenticateResponse
    {
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
        public User User { get; set; }
    }
}
