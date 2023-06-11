using Microsoft.AspNetCore.Mvc;
using Yandex.Checkout.V3;

namespace ServiceAPI.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    //[Authorize]
    public class PaymentController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public PaymentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult CreatePayment()
        {
            //Client client = new Client(_configuration.GetSection("YooKassa:ShopId").Value,
            //_configuration.GetSection("YooKassa:SecretKey").Value);

            Client client = new Client("985078", "test_RU37ABpXDmq91JZq5iJ1ts5jRORUoh3L0_I1DgHFxTI");
            var newPayment = new NewPayment
            {
                Amount = new Amount { Value = 50.00m, Currency = "RUB" },
                Confirmation = new Confirmation
                {
                    Type = ConfirmationType.Redirect,
                    ReturnUrl = "http://localhost:3000/payment-success"
                },
                Capture = true
            };

            Payment payment = client.CreatePayment(newPayment);
            string paymentUrl = payment.Confirmation.ConfirmationUrl;
            return Ok(new { PaymentUrl = paymentUrl, PaymentId = payment.Id });
        }

        [HttpGet]
        public bool CheckPayment(string paymentId)
        {
            //Client client = new Client(_configuration.GetSection("YooKassa:ShopId").Value,
            //_configuration.GetSection("YooKassa:SecretKey").Value);
            Client client = new Client("985078", "test_RU37ABpXDmq91JZq5iJ1ts5jRORUoh3L0_I1DgHFxTI");
            try
            {
                var paymentInfo = client.GetPayment(paymentId);

                if (paymentInfo.Status == PaymentStatus.Succeeded)
                    return true;
                else
                    return false;
            }
            catch
            {
                return false;
            }
        }
    }
}
