using Application.Interfaces;
using Application.ViewModels.RequestModels;
using Application.ViewModels.ResponseModels;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    public class PaymentController : BaseController
    {
        private readonly IPaymentService _paymentService;
        private readonly ITransactionService _transactionService;

        public PaymentController(IPaymentService paymentService, ITransactionService transactionService)
        {
            _paymentService = paymentService;
            _transactionService = transactionService;
        }

        [HttpGet]
        public async Task<TransactionRequestModel> GetByOrderCode(int orderCode) => await _transactionService.GetTransaction(orderCode);

        [HttpGet("{paymentId}")]
        public async Task<IActionResult> GetPaymentInfo(string paymentId) => await _paymentService.GetPaymentInfo(paymentId);
        [HttpPost]
        public async Task<QRPaymentResponseModel> CreatePaymentLink(PaymentRequestModel model)
        {
           var response = await _paymentService.CreatePaymentLink(model);

           await _transactionService.Create(model, response.Data.OrderCode, response);
           return response;

        }
        [HttpPost("{paymentId}")]
        public async Task<IActionResult> CancelPayment(string paymentId, string cancelReason) => await _paymentService.CancelPayment(paymentId, cancelReason);

    }
}
