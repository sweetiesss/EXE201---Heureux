using System;
using System.Collections.Generic;

namespace Domain.Entities;

public class UserSubscription : BaseEntity
{
    //public int Id { get; set; }

    public int? UserId { get; set; }

    public int? SubscriptionId { get; set; }

    public DateTime? StartDate { get; set; }

    public virtual Subscription? Subscription { get; set; }

    public virtual User? User { get; set; }
}
