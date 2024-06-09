using Application.ViewModels.RequestModels;
using Application.ViewModels.ResponseModels;
using Microsoft.AspNetCore.Mvc;

namespace Application.Interfaces
{
    public interface IPaymentService
    {
        Task<QRPaymentResponseModel> CreatePaymentLink(PaymentRequestModel model);

        Task<IActionResult> GetPaymentInfo(string paymentId);

        Task<IActionResult> CancelPayment(string paymentId, string cancelReason);
    }
}
