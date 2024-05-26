﻿using System;
using System.Collections.Generic;

namespace Domain.Entities;

public class Task : BaseEntity
{
    //public int Id { get; set; }

    public string? Description { get; set; }

    public string Name { get; set; } = null!;

    public string? Assignee { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public string? Status { get; set; }

    public string? Priority { get; set; }

    public int? Teamid { get; set; }

    public virtual Team? Team { get; set; }
}
