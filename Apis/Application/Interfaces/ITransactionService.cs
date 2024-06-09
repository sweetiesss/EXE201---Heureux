using Application.Commons;
using Application.ViewModels.RequestModels;
using Application.ViewModels.ResponseModels;
using System.Net;

namespace Application.Interfaces
{
    public interface ITransactionService
    {
        Task<Pagination<TransactionRequestModel>> GetTransactions(int pageIndex, int pageSize);
        Task<Pagination<TransactionRequestModel>> GetTransactionsByEmail(int pageIndex, int pageSize, string email);
        Task<TransactionRequestModel> GetTransaction(int orderCode);
        Task<HttpStatusCode> Create(PaymentRequestModel model, int orderCode, QRPaymentResponseModel response);
        Task<HttpStatusCode> Update(string code, int orderCode, string cancel, string Status);
    }
}
