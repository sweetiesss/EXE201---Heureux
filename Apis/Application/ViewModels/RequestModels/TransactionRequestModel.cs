using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.RequestModels
{
    public class TransactionRequestModel
    {
        public int OrderCode { get; set; }

        public int ItemId { get; set; }

        public int Amount { get; set; }

        public string Description { get; set; }

        public string BuyerName { get; set; }

        public string BuyerEmail { get; set; }

        public string BuyerPhone { get; set; }

        public string Address { get; set; }

        public DateTime CreateDate { get; set; }

        public string Status { get; set; }

        public string CancellationReason { get; set; }
    }
}
