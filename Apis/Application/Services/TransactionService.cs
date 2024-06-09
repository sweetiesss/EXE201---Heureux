using Application.Commons;
using Application.Interfaces;
using Application.ViewModels.RequestModels;
using Application.ViewModels.ResponseModels;
using AutoMapper;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly AppConfiguration _configuration;

        public TransactionService(IUnitOfWork unitOfWork, IMapper mapper, AppConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configuration = configuration;
        }



        public async Task<HttpStatusCode> Create(PaymentRequestModel model, int orderCode, QRPaymentResponseModel response)
        {
            //var transaction = _unitOfWork.TransactionRepository.GetByOrderCode(orderCode);

            var user = await _unitOfWork.UserRepository.GetUser(model.BuyerEmail);

            var subcription = await _unitOfWork.SubscriptionRepository.GetByIdAsync(model.SubscriptionId);
            if (user != null && subcription != null)
            {
                var result = new Transaction
                {
                    OrderCode = orderCode,
                    Address = user.Address,
                    Amount = (int)(subcription.Price),
                    BuyerEmail = model.BuyerEmail,
                    BuyerName = user.Username,
                    BuyerPhone = user.Phone,
                    CancellationReason = null,
                    CreateDate = DateTime.UtcNow,
                    Description = model.Description,
                    ItemId = model.SubscriptionId,
                    Status = response.Data.Status,
                };

                await _unitOfWork.TransactionRepository.AddAsync(result);
                await _unitOfWork.SaveChangeAsync();
                return HttpStatusCode.Created;
            }
            else
            {
                return HttpStatusCode.Conflict;
            }
        }

        public async Task<TransactionRequestModel> GetTransaction(int orderId)
        {
            var result = await _unitOfWork.TransactionRepository.GetByOrderCode(orderId);
            var map = _mapper.Map<TransactionRequestModel>(result);
            return map;
        }

        public async Task<HttpStatusCode> Update(string code, int orderCode, string cancel, string Status)
        {
            var transaction = await _unitOfWork.TransactionRepository.GetByOrderCode(orderCode);
            if(transaction != null)
            {
                transaction.Status = Status;
            }
            else
            {
                return HttpStatusCode.NotFound;
            }
            _unitOfWork.TransactionRepository.Update(transaction);
            await _unitOfWork.SaveChangeAsync();
            return HttpStatusCode.OK;
        }
    }
}
