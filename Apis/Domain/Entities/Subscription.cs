using System;
using System.Collections.Generic;

namespace Domain.Entities;

public class Subscription : BaseEntity
{
    //public int Id { get; set; }

    public string? Description { get; set; }

    public string Name { get; set; } = null!;

    public int Duration { get; set; }

    public decimal Price { get; set; }

    public virtual ICollection<UserSubscription> UserSubscriptions { get; } = new List<UserSubscription>();
}
