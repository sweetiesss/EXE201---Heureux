using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace WebAPI.Controllers
{
    public class TransactionController : BaseController
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpPut]
        public async Task<HttpStatusCode> UpdateTransaction(string code, int orderCode, string cancel, string status) => await _transactionService.Update(code, orderCode, cancel, status);
    }
}
