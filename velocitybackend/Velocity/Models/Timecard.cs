using System.ComponentModel.DataAnnotations;

namespace Velocity.Models
{
    public class Timecard
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProjectId { get; set; }
        public DateTime Date { get; set; }
        public double HoursWorked { get; set; }

        // Navigation properties
        public User User { get; set; }
        public Project Project { get; set; }
    }
}
