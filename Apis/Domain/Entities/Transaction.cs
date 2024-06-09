using Domain.Entities;
using System;
using System.Collections.Generic;

namespace Domain.Models;

public class Transaction : BaseEntity
{
    //public int Id { get; set; }

    public int? OrderCode { get; set; }

    public int? ItemId { get; set; }

    public int? Amount { get; set; }

    public string? Description { get; set; }

    public string? BuyerName { get; set; }

    public string? BuyerEmail { get; set; }

    public string? BuyerPhone { get; set; }

    public string? Address { get; set; }

    public DateTime? CreateDate { get; set; }

    public string? Status { get; set; }

    public string? CancellationReason { get; set; }

    public virtual User? BuyerEmailNavigation { get; set; }

    public virtual Subscription? Item { get; set; }
}
