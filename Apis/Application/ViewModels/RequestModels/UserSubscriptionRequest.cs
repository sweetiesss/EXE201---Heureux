using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.RequestModels
{
    public class UserSubscriptionRequest
    {
        public DateTime? StartDate { get; set; }

        public int? SubscriptionId { get; set; }

        public int? UserId { get; set; }
    }
}
