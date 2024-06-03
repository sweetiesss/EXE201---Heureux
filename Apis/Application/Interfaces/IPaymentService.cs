using Application.ViewModels.RequestModels;
using Application.ViewModels.ResponseModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IPaymentService
    {
        Task<QRPaymentResponseModel> CreatePaymentLink(PaymentRequestModel model);

        Task<IActionResult> GetPaymentInfo(string paymentId);

        Task<IActionResult> CancelPayment(string paymentId, string cancelReason);
    }
}
