using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Infrastructures
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Class> Classes { get; set; }

        public DbSet<ClassProject> ClassProjects { get; set; }

        public DbSet<ClassUser> ClassUsers { get; set; }

        public   DbSet<Project> Projects { get; set; }

        public DbSet<Report> Reports { get; set; }

        public   DbSet<Role> Roles { get; set; }

        public   DbSet<Subscription> Subscriptions { get; set; }

        public  DbSet<Domain.Entities.Task> Tasks { get; set; }

        public DbSet<Team> Teams { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<UserSubscription> UserSubscriptions { get; set; }

        public DbSet<UserTeam> UserTeams { get; set; }

     

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Class>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("class");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.CreateBy)
                    .HasMaxLength(100)
                    .HasColumnName("create_by");
                entity.Property(e => e.CreateDate)
                    .HasColumnType("date")
                    .HasColumnName("create_date");
                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<ClassProject>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("class_project");

                entity.HasIndex(e => e.Classid, "FK584r5fmjqd248p9qcailkg7n1");

                entity.HasIndex(e => e.Projectid, "FKpgqhpqffqw617we75wl5b0uq7");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Classid).HasColumnName("classid");
                entity.Property(e => e.Projectid).HasColumnName("projectid");

                entity.HasOne(d => d.Class).WithMany(p => p.ClassProjects)
                    .HasForeignKey(d => d.Classid)
                    .HasConstraintName("FK584r5fmjqd248p9qcailkg7n1");

                entity.HasOne(d => d.Project).WithMany(p => p.ClassProjects)
                    .HasForeignKey(d => d.Projectid)
                    .HasConstraintName("FKpgqhpqffqw617we75wl5b0uq7");
            });

            modelBuilder.Entity<ClassUser>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("class_user");

                entity.HasIndex(e => e.Classid, "FK9wus2uosdf5qtmjf375l7j7y4");

                entity.HasIndex(e => e.Userid, "FKfk2jf49f5ubk0ukc4r0igt8bs");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Classid).HasColumnName("classid");
                entity.Property(e => e.Flag)
                    .HasColumnType("bit(1)")
                    .HasColumnName("flag");
                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.HasOne(d => d.Class).WithMany(p => p.ClassUsers)
                    .HasForeignKey(d => d.Classid)
                    .HasConstraintName("FK9wus2uosdf5qtmjf375l7j7y4");

                entity.HasOne(d => d.User).WithMany(p => p.ClassUsers)
                    .HasForeignKey(d => d.Userid)
                    .HasConstraintName("FKfk2jf49f5ubk0ukc4r0igt8bs");
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("project");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.CreateBy)
                    .HasMaxLength(100)
                    .HasColumnName("create_by");
                entity.Property(e => e.Description)
                    .HasColumnType("tinytext")
                    .HasColumnName("description");
                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");
                entity.Property(e => e.Status)
                    .HasMaxLength(50)
                    .HasColumnName("status");
            });

            modelBuilder.Entity<Report>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("report");

                entity.HasIndex(e => e.Teamid, "FKjjhjld317w3hqfymt2weyimie");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.CreateDate)
                    .HasMaxLength(6)
                    .HasColumnName("create_date");
                entity.Property(e => e.Description)
                    .HasColumnType("tinytext")
                    .HasColumnName("description");
                entity.Property(e => e.Status)
                    .HasMaxLength(50)
                    .HasColumnName("status");
                entity.Property(e => e.Teamid).HasColumnName("teamid");

                entity.HasOne(d => d.Team).WithMany(p => p.Reports)
                    .HasForeignKey(d => d.Teamid)
                    .HasConstraintName("FKjjhjld317w3hqfymt2weyimie");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("role");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.RoleCode)
                    .HasMaxLength(50)
                    .HasColumnName("role_code");
            });

            modelBuilder.Entity<Subscription>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("subscription");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Description)
                    .HasColumnType("tinytext")
                    .HasColumnName("description");
                entity.Property(e => e.Duration).HasColumnName("duration");
                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");
                entity.Property(e => e.Price)
                    .HasPrecision(10)
                    .HasColumnName("price");
            });

            modelBuilder.Entity<Domain.Entities.Task>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("task");

                entity.HasIndex(e => e.Teamid, "FKdy615hoexarbq57jhuvi4ytsk");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Assignee)
                    .HasMaxLength(100)
                    .HasColumnName("assignee");
                entity.Property(e => e.Description)
                    .HasColumnType("tinytext")
                    .HasColumnName("description");
                entity.Property(e => e.EndDate)
                    .HasColumnType("date")
                    .HasColumnName("end_date");
                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");
                entity.Property(e => e.Priority)
                    .HasMaxLength(50)
                    .HasColumnName("priority");
                entity.Property(e => e.StartDate)
                    .HasColumnType("date")
                    .HasColumnName("start_date");
                entity.Property(e => e.Status)
                    .HasMaxLength(50)
                    .HasColumnName("status");
                entity.Property(e => e.Teamid).HasColumnName("teamid");

                entity.HasOne(d => d.Team).WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.Teamid)
                    .HasConstraintName("FKdy615hoexarbq57jhuvi4ytsk");
            });

            modelBuilder.Entity<Team>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("team");

                entity.HasIndex(e => e.Classid, "FKly6xs7lesq2o6rfutjyxnovx8");

                entity.HasIndex(e => e.Projectid, "FKnqeae6pap38n33fcnfrgdheq2");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Classid).HasColumnName("classid");
                entity.Property(e => e.Flag)
                    .HasColumnType("bit(1)")
                    .HasColumnName("flag");
                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");
                entity.Property(e => e.Projectid).HasColumnName("projectid");
                entity.Property(e => e.Size).HasColumnName("size");

                entity.HasOne(d => d.Class).WithMany(p => p.Teams)
                    .HasForeignKey(d => d.Classid)
                    .HasConstraintName("FKly6xs7lesq2o6rfutjyxnovx8");

                entity.HasOne(d => d.Project).WithMany(p => p.Teams)
                    .HasForeignKey(d => d.Projectid)
                    .HasConstraintName("FKnqeae6pap38n33fcnfrgdheq2");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("user");

                entity.HasIndex(e => e.Roleid, "FK2ovmsl4hvm5vu1w8i308r5j6w");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Address)
                    .HasColumnType("tinytext")
                    .HasColumnName("address");
                entity.Property(e => e.Avatar)
                    .HasMaxLength(100)
                    .HasColumnName("avatar");
                entity.Property(e => e.Dob)
                    .HasColumnType("date")
                    .HasColumnName("dob");
                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");
                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .HasColumnName("gender");
                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .HasColumnName("password");
                entity.Property(e => e.Phone)
                    .HasMaxLength(20)
                    .HasColumnName("phone");
                entity.Property(e => e.Roleid).HasColumnName("roleid");
                entity.Property(e => e.Status)
                    .HasMaxLength(50)
                    .HasColumnName("status");
                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .HasColumnName("username");

                entity.HasOne(d => d.Role).WithMany(p => p.Users)
                    .HasForeignKey(d => d.Roleid)
                    .HasConstraintName("FK2ovmsl4hvm5vu1w8i308r5j6w");
            });

            modelBuilder.Entity<UserSubscription>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("user_subscription");

                entity.HasIndex(e => e.SubscriptionId, "FKhaqil7thjcrmntsjy8er8akjy");

                entity.HasIndex(e => e.UserId, "FKpsiiu2nyr0cbxeluuouw474s9");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.StartDate)
                    .HasColumnType("date")
                    .HasColumnName("start_date");
                entity.Property(e => e.SubscriptionId).HasColumnName("subscription_id");
                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Subscription).WithMany(p => p.UserSubscriptions)
                    .HasForeignKey(d => d.SubscriptionId)
                    .HasConstraintName("FKhaqil7thjcrmntsjy8er8akjy");

                entity.HasOne(d => d.User).WithMany(p => p.UserSubscriptions)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FKpsiiu2nyr0cbxeluuouw474s9");
            });

            modelBuilder.Entity<UserTeam>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("user_team");

                entity.HasIndex(e => e.Teamid, "FKe6nng3dddqxth5q9d54dtl1mi");

                entity.HasIndex(e => e.Userid, "FKiuf12h3x55l0e8yq5fm4cacki");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.IsLeader)
                    .HasColumnType("bit(1)")
                    .HasColumnName("is_leader");
                entity.Property(e => e.Teamid).HasColumnName("teamid");
                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.HasOne(d => d.Team).WithMany(p => p.UserTeams)
                    .HasForeignKey(d => d.Teamid)
                    .HasConstraintName("FKe6nng3dddqxth5q9d54dtl1mi");

                entity.HasOne(d => d.User).WithMany(p => p.UserTeams)
                    .HasForeignKey(d => d.Userid)
                    .HasConstraintName("FKiuf12h3x55l0e8yq5fm4cacki");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    }

}
