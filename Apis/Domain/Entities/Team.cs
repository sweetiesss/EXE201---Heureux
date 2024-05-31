using System;
using System.Collections.Generic;

namespace Domain.Entities;

public class Team : BaseEntity
{
    public int? Classid { get; set; }

    public ulong? Flag { get; set; }

    public int? Projectid { get; set; }

    public int? Size { get; set; }

    public string Name { get; set; } = null!;

    public virtual Class? Class { get; set; }

    public virtual Project? Project { get; set; }

    public virtual ICollection<Report> Reports { get; } = new List<Report>();

    public virtual ICollection<Task> Tasks { get; } = new List<Task>();

    public virtual ICollection<UserTeam> UserTeams { get; } = new List<UserTeam>();
}
