using AutoMapper;
using IdentityAPI.Data;
using IdentityAPI.Helpers;
using IdentityAPI.Models;
using IdentityAPI.Models.DTO;
using IdentityAPI.Services;
using Microsoft.AspNetCore.Identity;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace IdentityAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly Context _context;
        private readonly ITokenService _tokenService;
        private IMapper _mapper;

        public AuthController(Context context, ITokenService tokenService, IMapper mapper)
        {
            _context = context;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        [HttpPost, Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModelDTO loginModel)
        {
            var passwordHasher = new PasswordHasher<string>();

            if (loginModel == null)
                return BadRequest("Invalid client response");

            var user = _context.LoginModels.FirstOrDefault(u => u.Login == loginModel.Login);

            if (user == null)
                return NotFound("Неверный логин или пароль!");

            var passwordResult = passwordHasher.VerifyHashedPassword(null, user.Password, loginModel.Password);

            if (user is null || passwordResult != PasswordVerificationResult.Success)
                return Unauthorized("Неверный логин или пароль!");


            User userForLogin = _context.Users.FirstOrDefault(c => c.Login == loginModel.Login);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, loginModel.Login),
                new Claim(ClaimTypes.NameIdentifier, userForLogin.Id.ToString())
            };

            var accessToken = _tokenService.GenerateAccessToken(claims);
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(15);

            _context.SaveChanges();

            return Ok(new AuthenticateResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                User = userForLogin
            });
        }

        [HttpPost, Route("register")]
        public async Task<IActionResult> Register([FromBody] UserDTO customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string pass = PasswordHasher.HashPassword(customer.Pass);
            customer.Pass = pass;

            LoginModel loginModel = new LoginModel
            {
                Login = customer.Login,
                Password = customer.Pass,
            };

            var user = _mapper.Map<UserDTO, User>(customer);
            EmailService emailService = new EmailService();
            user.ConfirmedCode = emailService.SendEmailAsync(user.Email, "Подтверждение регистрации", user);
            user.Role = Role.User;
            _context.Users.Add(user);
            _context.LoginModels.Add(loginModel);
            await _context.SaveChangesAsync();

            return Content("Для завершения регистрации проверьте электронную почту!");
        }

        [HttpGet]
        public IActionResult ConfirmEmail(string code, string email)
        {
            var res = _context.Users.FirstOrDefault(c => c.Email == email);

            if(res.ConfirmedCode == code)
            {
                res.ComfimedEmail = true;
                _context.SaveChanges();
                return Ok("Почта подтверждена!");
            }

            return BadRequest(new {Message = "Неверный код подтверждения!"});
        }

        [HttpGet]
        [Route("check_login")]
        public bool CheckLogin(string login)
        {
            var loginDB = _context.Users.FirstOrDefault(l => l.Login == login);

            return loginDB == null ? true : false;
        }

        [HttpGet]
        [Route("check_phone")]
        public bool CheckPhoneNumber(string phoneNumber)
        {
            var phone = _context.Users.FirstOrDefault(p => p.PhoneNumber == phoneNumber);

            return phone == null ? true : false;
        }

        [HttpGet]
        [Route("check_email")]
        public bool CheckPhoneEmail(string email)
        {
            var emailDB = _context.Users.FirstOrDefault(p => p.Email == email);

            return emailDB == null ? true : false;
        }
    }
}
