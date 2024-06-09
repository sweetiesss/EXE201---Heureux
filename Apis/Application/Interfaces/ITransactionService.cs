using Application.ViewModels.RequestModels;
using Application.ViewModels.ResponseModels;
using System.Net;

namespace Application.Interfaces
{
    public interface ITransactionService
    {
        Task<TransactionRequestModel> GetTransaction(int orderId);
        Task<HttpStatusCode> Create(PaymentRequestModel model, int orderCode, QRPaymentResponseModel response);
        Task<HttpStatusCode> Update(string code, int orderCode, string cancel, string Status);
    }
}
