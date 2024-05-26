using System;
using System.Collections.Generic;

namespace Domain.Entities;

public class Role : BaseEntity
{
    //public int Id { get; set; }

    public string RoleCode { get; set; } = null!;

    public virtual ICollection<User> Users { get; } = new List<User>();
}
