
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.UserViewModels
{
    public class UserSubscriptionListDTO
    {
        public int Id { get; set; }
        public DateTime? StartDate { get; set; }

        public int? SubscriptionId { get; set; }

        public int? UserId { get; set; }
    }
}
