using AutoMapper;
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
    //[Authorize]
    public class PaymentController : ControllerBase
    {
        static private readonly Client _client = new Client("985078", "test_RU37ABpXDmq91JZq5iJ1ts5jRORUoh3L0_I1DgHFxTI");
        private readonly Context _context;
        private IMapper _mapper;

        public PaymentController(Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult CreatePayment()
        {
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

            Payment payment = _client.CreatePayment(newPayment);
            string paymentUrl = payment.Confirmation.ConfirmationUrl;
            return Ok(new { PaymentUrl = paymentUrl, PaymentId = payment.Id });
        }

        [HttpGet]
        public bool CheckPayment(string paymentId)
        {
            try
            {
                var paymentInfo = _client.GetPayment(paymentId);

                if (paymentInfo.Status == PaymentStatus.Succeeded)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
