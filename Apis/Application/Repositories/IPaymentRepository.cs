using Application.ViewModels.RequestModels;
using Application.ViewModels.ResponseModels;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repositories
{
    public interface IPaymentRepository : IGenericRepository<BaseEntity>
    {
        Task<IActionResult> GetPaymentInfo(string paymentId);
        Task<QRPaymentResponseModel> CreatePaymentLink(PaymentRequestModel model);

        Task<IActionResult> CancelPayment(string paymentId, string cancelReason);
    }
}
