namespace IdentityUserAPI.Models
{
    public class AuthenticateResponse
    {
        public string? Token { get; set; }
        public string? RefreshToken { get; set; }
    }
}
