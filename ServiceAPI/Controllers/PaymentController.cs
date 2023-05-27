using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceAPI.Data;
using ServiceAPI.Models.AdResponse;
using ServiceAPI.Models.DTO;
using System.Security.Claims;
using Yandex.Checkout.V3;

namespace ServiceAPI.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    [Authorize]
    public class PaymentController : ControllerBase
    {
        static private readonly Client _client = new Client("985078", "test_RU37ABpXDmq91JZq5iJ1ts5jRORUoh3L0_I1DgHFxTI");
        private readonly Context _context;

        public PaymentController(Context context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult CreatePayment()
        {
            var newPayment = new NewPayment
            {
                Amount = new Amount { Value = 50.00m, Currency = "RUB" },
                Confirmation = new Confirmation
                {
                    Type = ConfirmationType.Redirect,
                    ReturnUrl = "http://localhost:3000/payment/success"
                }
            };

            Payment payment = _client.CreatePayment(newPayment);
            string paymentUrl = payment.Confirmation.ConfirmationUrl;
            return Ok(paymentUrl);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePaidAd([FromBody]AdResponse ad)
        {
            PaidAdDTO paidAd = new PaidAdDTO();
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var lastCreatedAdFromUser = _context.Ads.Where(a => a.Title == ad.Title && a.CustomerId == Convert.ToInt32(userId))
                .LastOrDefault();
            paidAd.ExpiryTime = DateTime.Now.AddDays(10);
            paidAd.AdId = lastCreatedAdFromUser.Id;
            await _context.PaidAds.AddAsync(paidAd);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
