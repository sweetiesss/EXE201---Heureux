using Application.Commons;
using Application.Interfaces;
using Application.ViewModels.RequestModels;
using Application.ViewModels.ResponseModels;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MySqlX.XDevAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            return result;
        }
    }
}
