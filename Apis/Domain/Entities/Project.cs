using System;
using System.Collections.Generic;

namespace Domain.Entities;

public class Project : BaseEntity
{

    public string? Status { get; set; }

    public string? CreateBy { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<ClassProject> ClassProjects { get; } = new List<ClassProject>();

    public virtual ICollection<Team> Teams { get; } = new List<Team>();
}
