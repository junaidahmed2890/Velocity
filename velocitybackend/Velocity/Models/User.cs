using System.ComponentModel.DataAnnotations;

namespace Velocity.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Password { get; set; }

        // Navigation properties
        public ICollection<Timecard> Timecards { get; set; }
        public ICollection<Timesheet> UploadedTimesheets { get; set; }

    }
}
