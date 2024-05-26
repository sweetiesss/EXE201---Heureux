using System;
using System.Collections.Generic;

namespace Domain.Entities;

public class Class : BaseEntity
{
    //public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? CreateBy { get; set; }

    public DateTime? CreateDate { get; set; }

    public virtual ICollection<ClassProject> ClassProjects { get; } = new List<ClassProject>();

    public virtual ICollection<ClassUser> ClassUsers { get; } = new List<ClassUser>();

    public virtual ICollection<Team> Teams { get; } = new List<Team>();
}
