using Application.Commons;
using Application.Interfaces;
using Application.ViewModels.RequestModels;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;
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

        [HttpGet]
        public async Task<Pagination<TransactionRequestModel>> GetAllTransactions([FromQuery][DefaultValue(0)] int pageIndex,
                                                               [FromQuery][DefaultValue(10)] int pageSize) => await _transactionService.GetTransactions(pageIndex, pageSize);

        [HttpGet("{email}")]
        public async Task<Pagination<TransactionRequestModel>> GetTransactionsByEmail([FromQuery][DefaultValue(0)] int pageIndex,
                                                               [FromQuery][DefaultValue(10)] int pageSize,
                                                               string email) => await _transactionService.GetTransactionsByEmail(pageIndex, pageSize, email);

        [HttpGet("{orderCode}")]
        public async Task<TransactionRequestModel> GetTransaction(int orderCode) => await _transactionService.GetTransaction(orderCode);

        [HttpPut]
        public async Task<HttpStatusCode> UpdateTransaction(string code, int orderCode, string cancel, string status) => await _transactionService.Update(code, orderCode, cancel, status);
    }
}
