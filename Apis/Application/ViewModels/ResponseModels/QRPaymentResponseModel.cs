﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.ResponseModels
{
    public class QRPaymentResponseModel
    {
        public string Code { get; set; }
        public string Description { get; set; }
        public PaymentResponseData Data { get; set; }
        public string Signature { get; set; }
    }

    public class PaymentResponseData
    {
        public string Bin { get; set; }
        public string AccountNumber { get; set; }
        public string AccountName { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public int OrderCode { get; set; }
        public string Currency { get; set; }
        public string PaymentLinkId { get; set; }
        public string Status { get; set; }
        public string CheckoutUrl { get; set; }
        public string QrCode { get; set; }
    }
}
