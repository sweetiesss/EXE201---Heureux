using Application.Commons;
using Application.Interfaces;
using Application.ViewModels.RequestModels;
using Application.ViewModels.ResponseModels;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace Application.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly AppConfiguration _configuration;

        public PaymentService(IUnitOfWork unitOfWork, IMapper mapper, AppConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configuration = configuration;
        }

        public async Task<QRPaymentResponseModel> CreatePaymentLink(PaymentRequestModel model)
        {
            var result = await _unitOfWork.PaymentRepository.CreatePaymentLink(model);
            return result;

        }

        public async Task<IActionResult> GetPaymentInfo(string paymentId)
        {
            var result = await _unitOfWork.PaymentRepository.GetPaymentInfo(paymentId);
            return result;
        }

        public async Task<IActionResult> CancelPayment(string paymentId, string cancelReason)
        {
            var result = await _unitOfWork.PaymentRepository.CancelPayment(paymentId, cancelReason);
            ContentResult result1 = result as ContentResult;
            string a = result1.Content;

            JObject json = JObject.Parse(a);
            string code = json["code"].ToString();
            if (code.Equals("101"))
            {
                return result;
            }
            else if(code.Equals("00"))
            {
                int orderCode = json["data"]["orderCode"].ToObject<int>();
                string reason = json["data"]["cancellationReason"].ToString();
                string status = json["data"]["status"].ToString();
                var transaction = await _unitOfWork.TransactionRepository.GetByOrderCode(orderCode);
                if(transaction != null)
                {
                    transaction.CancellationReason = reason;
                    transaction.Status = status;
                }
                _unitOfWork.TransactionRepository.Update(transaction);
                await _unitOfWork.SaveChangeAsync();
            }

            return result;
        }
    }
}
