using System.ComponentModel.DataAnnotations;

namespace Velocity.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int ClientId { get; set; }

        // Navigation properties
        public Client Client { get; set; }
        public ICollection<Timecard> Timecards { get; set; }
        public ICollection<Timesheet> Timesheets { get; set; }
    }
}
