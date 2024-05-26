using System;
using System.Collections.Generic;

namespace Domain.Entities;

public class UserTeam : BaseEntity
{
    //public int Id { get; set; }

    public int? Userid { get; set; }

    public int? Teamid { get; set; }

    public bool? IsLeader { get; set; }

    public virtual Team? Team { get; set; }

    public virtual User? User { get; set; }
}
