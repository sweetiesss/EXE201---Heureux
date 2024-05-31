using System;
using System.Collections.Generic;

namespace Domain.Entities;

public class User : BaseEntity
{
    public DateTime? Dob { get; set; }


    public int? Roleid { get; set; }

    public string? Gender { get; set; }

    public string? Phone { get; set; }

    public string? Status { get; set; }

    public string Username { get; set; } = null!;

    public string? Avatar { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Address { get; set; }

    public virtual ICollection<ClassUser> ClassUsers { get; } = new List<ClassUser>();

    public virtual Role? Role { get; set; }

    public virtual ICollection<UserSubscription> UserSubscriptions { get; } = new List<UserSubscription>();

    public virtual ICollection<UserTeam> UserTeams { get; } = new List<UserTeam>();
}
