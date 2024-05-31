using System;
using System.Collections.Generic;

namespace Domain.Entities;

public class ClassProject :BaseEntity
{
    public int? Classid { get; set; }


    public int? Projectid { get; set; }

    public virtual Class? Class { get; set; }

    public virtual Project? Project { get; set; }
}
