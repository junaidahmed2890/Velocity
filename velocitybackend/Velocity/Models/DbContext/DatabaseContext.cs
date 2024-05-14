using Microsoft.EntityFrameworkCore;

namespace Velocity.Models.DbContext
{
    public partial class DatabaseContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DatabaseContext()
        {
        }
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
            
        }
        public virtual DbSet<User>? Users { get; set; }
        public virtual DbSet<Timesheet>? Timesheets { get; set; }
        public virtual DbSet<Client>? Clients { get; set; }
        public virtual DbSet<Project>? Projects { get; set; }
        public virtual DbSet<Timecard>? Timecards { get; set; }



        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
        public void EnsureDatabaseCreated()
        {
            Database.Migrate();
        }
    }
}
