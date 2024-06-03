using Application.Interfaces;
using Application.ViewModels.RequestModels;
using Application.ViewModels.ResponseModels;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    public class PaymentController : BaseController
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpGet("{paymentId}")]
        public async Task<IActionResult> GetPaymentInfo(string paymentId) => await _paymentService.GetPaymentInfo(paymentId);
        [HttpPost]
        public async Task<QRPaymentResponseModel> CreatePaymentLink(PaymentRequestModel model) => await _paymentService.CreatePaymentLink(model);
        [HttpPost("{paymentId}")]
        public async Task<IActionResult> CancelPayment(string paymentId, string cancelReason) => await _paymentService.CancelPayment(paymentId, cancelReason);

    }
}
