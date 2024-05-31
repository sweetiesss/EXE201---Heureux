using System;
using System.Collections.Generic;

namespace Domain.Entities;

public class ClassUser : BaseEntity
{
    public int? Classid { get; set; }

    public ulong? Flag { get; set; }

    public int? Userid { get; set; }

    public virtual Class? Class { get; set; }

    public virtual User? User { get; set; }
}
