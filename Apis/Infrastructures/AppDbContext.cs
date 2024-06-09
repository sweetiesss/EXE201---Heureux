using Domain.Entities;
using Domain.Models;
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

        public virtual DbSet<Transaction> Transactions { get; set; }

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
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasColumnType("datetime")
                    .HasColumnName("create_date");
                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<ClassProject>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("class_project");

                entity.HasIndex(e => e.Classid, "classid");

                entity.HasIndex(e => e.Projectid, "projectid");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Classid).HasColumnName("classid");
                entity.Property(e => e.Projectid).HasColumnName("projectid");

                entity.HasOne(d => d.Class).WithMany(p => p.ClassProjects)
                    .HasForeignKey(d => d.Classid)
                    .HasConstraintName("class_project_ibfk_1");

                entity.HasOne(d => d.Project).WithMany(p => p.ClassProjects)
                    .HasForeignKey(d => d.Projectid)
                    .HasConstraintName("class_project_ibfk_2");
            });

            modelBuilder.Entity<ClassUser>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("class_user");

                entity.HasIndex(e => e.Classid, "classid");

                entity.HasIndex(e => e.Userid, "userid");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Classid).HasColumnName("classid");
                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.HasOne(d => d.Class).WithMany(p => p.ClassUsers)
                    .HasForeignKey(d => d.Classid)
                    .HasConstraintName("class_user_ibfk_1");

                entity.HasOne(d => d.User).WithMany(p => p.ClassUsers)
                    .HasForeignKey(d => d.Userid)
                    .HasConstraintName("class_user_ibfk_2");
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
                    .HasColumnType("text")
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

                entity.HasIndex(e => e.Teamid, "teamid");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.CreateDate)
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasColumnType("timestamp")
                    .HasColumnName("create_date");
                entity.Property(e => e.Description)
                    .HasColumnType("text")
                    .HasColumnName("description");
                entity.Property(e => e.Status)
                    .HasMaxLength(50)
                    .HasColumnName("status");
                entity.Property(e => e.Teamid).HasColumnName("teamid");

                entity.HasOne(d => d.Team).WithMany(p => p.Reports)
                    .HasForeignKey(d => d.Teamid)
                    .HasConstraintName("report_ibfk_1");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("role");

                entity.HasIndex(e => e.RoleCode, "RoleCode").IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.RoleCode).HasMaxLength(50);
            });

            modelBuilder.Entity<Subscription>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("subscription");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Description)
                    .HasColumnType("text")
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

                entity.HasIndex(e => e.Teamid, "teamid");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Assignee)
                    .HasMaxLength(100)
                    .HasColumnName("assignee");
                entity.Property(e => e.Description)
                    .HasColumnType("text")
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
                    .HasConstraintName("task_ibfk_1");
            });

            modelBuilder.Entity<Team>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("team");

                entity.HasIndex(e => e.Classid, "classid");

                entity.HasIndex(e => e.Projectid, "projectid");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Classid).HasColumnName("classid");
                entity.Property(e => e.Flag).HasColumnName("flag");
                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");
                entity.Property(e => e.Projectid).HasColumnName("projectid");
                entity.Property(e => e.Size).HasColumnName("size");

                entity.HasOne(d => d.Class).WithMany(p => p.Teams)
                    .HasForeignKey(d => d.Classid)
                    .HasConstraintName("team_ibfk_2");

                entity.HasOne(d => d.Project).WithMany(p => p.Teams)
                    .HasForeignKey(d => d.Projectid)
                    .HasConstraintName("team_ibfk_1");
            });

            modelBuilder.Entity<Transaction>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("transaction");

                entity.HasIndex(e => e.BuyerEmail, "buyerEmail");

                entity.HasIndex(e => e.ItemId, "itemId");

                entity.HasIndex(e => e.OrderCode, "orderCode").IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Address)
                    .HasColumnType("text")
                    .HasColumnName("address");
                entity.Property(e => e.Amount).HasColumnName("amount");
                entity.Property(e => e.BuyerEmail)
                    .HasMaxLength(50)
                    .HasColumnName("buyerEmail");
                entity.Property(e => e.BuyerName)
                    .HasMaxLength(50)
                    .HasColumnName("buyerName");
                entity.Property(e => e.BuyerPhone)
                    .HasMaxLength(20)
                    .HasColumnName("buyerPhone");
                entity.Property(e => e.CancellationReason)
                    .HasColumnType("text")
                    .HasColumnName("cancellationReason");
                entity.Property(e => e.CreateDate)
                    .HasColumnType("date")
                    .HasColumnName("createDate");
                entity.Property(e => e.Description)
                    .HasColumnType("text")
                    .HasColumnName("description");
                entity.Property(e => e.ItemId).HasColumnName("itemId");
                entity.Property(e => e.OrderCode).HasColumnName("orderCode");
                entity.Property(e => e.Status)
                    .HasMaxLength(10)
                    .HasColumnName("status");

                entity.HasOne(d => d.BuyerEmailNavigation).WithMany(p => p.Transactions)
                    .HasPrincipalKey(p => p.Email)
                    .HasForeignKey(d => d.BuyerEmail)
                    .HasConstraintName("transaction_ibfk_1");

                entity.HasOne(d => d.Item).WithMany(p => p.Transactions)
                    .HasForeignKey(d => d.ItemId)
                    .HasConstraintName("transaction_ibfk_2");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("user");

                entity.HasIndex(e => e.Email, "email").IsUnique();

                entity.HasIndex(e => e.Roleid, "roleid");

                entity.HasIndex(e => e.Username, "username").IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Address)
                    .HasColumnType("text")
                    .HasColumnName("address");
                entity.Property(e => e.Dob)
                    .HasColumnType("date")
                    .HasColumnName("DOB");
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
                    .HasConstraintName("user_ibfk_1");
            });

            modelBuilder.Entity<UserSubscription>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("user_subscription");

                entity.HasIndex(e => e.SubscriptionId, "subscription_id");

                entity.HasIndex(e => e.UserId, "user_id");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.StartDate)
                    .HasColumnType("date")
                    .HasColumnName("start_date");
                entity.Property(e => e.SubscriptionId).HasColumnName("subscription_id");
                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Subscription).WithMany(p => p.UserSubscriptions)
                    .HasForeignKey(d => d.SubscriptionId)
                    .HasConstraintName("user_subscription_ibfk_2");

                entity.HasOne(d => d.User).WithMany(p => p.UserSubscriptions)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("user_subscription_ibfk_1");
            });

            modelBuilder.Entity<UserTeam>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("user_team");

                entity.HasIndex(e => e.Teamid, "teamid");

                entity.HasIndex(e => e.Userid, "userid");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.IsLeader).HasColumnName("isLeader");
                entity.Property(e => e.Teamid).HasColumnName("teamid");
                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.HasOne(d => d.Team).WithMany(p => p.UserTeams)
                    .HasForeignKey(d => d.Teamid)
                    .HasConstraintName("user_team_ibfk_2");

                entity.HasOne(d => d.User).WithMany(p => p.UserTeams)
                    .HasForeignKey(d => d.Userid)
                    .HasConstraintName("user_team_ibfk_1");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }

}
