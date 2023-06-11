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
using Microsoft.EntityFrameworkCore;

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

            var userFromLoginModel = _context.LoginModels.FirstOrDefault(u => u.Login == loginModel.Login);

            if (userFromLoginModel == null)
                return NotFound("Неверный логин или пароль!");

            var passwordResult = passwordHasher.VerifyHashedPassword(null, userFromLoginModel.Password, loginModel.Password);

            if (userFromLoginModel is null || passwordResult != PasswordVerificationResult.Success)
                return Unauthorized("Неверный логин или пароль!");


            User userForLogin = await _context.Users.FirstOrDefaultAsync(c => c.Login == loginModel.Login);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, loginModel.Login),
                new Claim(ClaimTypes.NameIdentifier, userForLogin.Id.ToString())
            };

            var accessToken = _tokenService.GenerateAccessToken(claims);
            var refreshToken = _tokenService.GenerateRefreshToken();

            userFromLoginModel.RefreshToken = refreshToken;
            userFromLoginModel.RefreshTokenExpiryTime = DateTime.Now.AddDays(15);

            await _context.SaveChangesAsync();

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

            string passForCustomer = PasswordHasher.HashPassword(customer.Pass);
            customer.Pass = passForCustomer;

            LoginModel loginModel = new LoginModel
            {
                Login = customer.Login,
                Password = customer.Pass,
            };

            var createdUser = _mapper.Map<UserDTO, User>(customer);
            EmailService emailService = new EmailService();
            createdUser.ConfirmedCode = emailService.SendEmailAsync(createdUser.Email, "Подтверждение регистрации", createdUser);
            createdUser.Role = Role.User;
            _context.Users.Add(createdUser);
            _context.LoginModels.Add(loginModel);
            await _context.SaveChangesAsync();

            return Content("Для завершения регистрации проверьте электронную почту!");
        }

        [HttpGet]
        public IActionResult ConfirmEmail(string code, string email)
        {
            var userForCheckingEmail = _context.Users.FirstOrDefault(c => c.Email == email);

            if (userForCheckingEmail.ConfirmedCode == code)
            {
                userForCheckingEmail.ComfimedEmail = true;
                userForCheckingEmail.ConfirmedCode = null;
                _context.SaveChanges();
                return Ok("Почта подтверждена!");
            }

            return BadRequest(new { Message = "Неверный код подтверждения!" });
        }


        [HttpGet]
        [Route("check_code")]
        public bool CheckCode(string code, string email)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == email);

            if(user.ConfirmedCode == code)
            {
                user.ConfirmedCode = null;
                return true;
            }

            return false;
        }
        [HttpGet]
        [Route("check_login")]
        public bool CheckLogin(string login)
        {
            var loginForCheck = _context.Users.FirstOrDefault(l => l.Login == login);

            return loginForCheck == null ? true : false;
        }

        [HttpGet]
        [Route("check_phone")]
        public bool CheckPhoneNumber(string phoneNumber)
        {
            var phoneForCheck = _context.Users.FirstOrDefault(p => p.PhoneNumber == phoneNumber);

            return phoneForCheck == null ? true : false;
        }

        [HttpGet]
        [Route("check_email")]
        public bool CheckPhoneEmail(string email)
        {
            var emailForCheck = _context.Users.FirstOrDefault(p => p.Email == email);

            return emailForCheck == null ? true : false;
        }

        [HttpPut]
        [Route("reset_password")]
        public async Task<IActionResult> ResetPassword(string email)
        {
            var user = await _context.Users.Where(u => u.Email == email).FirstOrDefaultAsync();

            if (user != null)
            {
                EmailService emailService = new EmailService();
                user.ConfirmedCode = emailService.SendEmailAsync(email, "Сброс пароля", user);

                await _context.SaveChangesAsync();
                return Ok();
            }

            return BadRequest("Пользователя с данным почтовым адресом не существует!");
        }

        [HttpPut]
        [Route("create_new_password")]
        public async Task<IActionResult> CreateNewPassword(string password, string email)
        {
            var user = await _context.Users.Where(u => u.Email == email).FirstOrDefaultAsync();
            var login = await _context.LoginModels.Where(l => l.Login == user.Login).FirstOrDefaultAsync();

            string passForCustomer = PasswordHasher.HashPassword(password);
            user.Pass = passForCustomer;

            login.Password = passForCustomer;

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
