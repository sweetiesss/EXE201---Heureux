using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Infrastructures
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Class> Class { get; set; }

        public DbSet<ClassProject> class_project { get; set; }

        public DbSet<ClassUser> class_user { get; set; }

        public DbSet<Project> Project { get; set; }

        public DbSet<Report> Report { get; set; }

        public DbSet<Role> Role { get; set; }

        public DbSet<Subscription> Subscription { get; set; }

        public DbSet<Domain.Entities.Task> Task { get; set; }

        public DbSet<Team> Team { get; set; }

        public DbSet<User> User { get; set; }

        public DbSet<UserSubscription> user_subscription { get; set; }

        public DbSet<UserTeam> user_team { get; set; }



    }

}
