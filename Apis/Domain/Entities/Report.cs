using System;
using System.Collections.Generic;

namespace Domain.Entities;

public class Report : BaseEntity
{

    public int? Teamid { get; set; }

    public DateTime? CreateDate { get; set; }

    public string? Status { get; set; }

    public string? Description { get; set; }

    public virtual Team? Team { get; set; }
}
