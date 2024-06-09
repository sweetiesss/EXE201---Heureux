using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.RequestModels
{
    public class PaymentRequestModel
    {
        //public int OrderCode { get; set; }
        public string BuyerEmail { get; set; }
        //public string buyerName { get; set; }
        //public string buyerPhone { get; set; }
        //public string buyerAddress { get; set; }
        //public int Amount { get; set; }
        public string CancelUrl { get; set; }
        public string ReturnUrl { get; set; }
        public string Description { get; set; }
        public int SubscriptionId {  get; set; }
        //public string SubscriptionName { get; set; }
    }
}
