using System.ComponentModel.DataAnnotations;

namespace Velocity.Models
{
    public class Client
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        // Navigation property
        public ICollection<Project> Projects { get; set; }
    }
}
