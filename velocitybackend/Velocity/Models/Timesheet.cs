﻿using System.ComponentModel.DataAnnotations;

namespace Velocity.Models
{
    public class Timesheet
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProjectId { get; set; }
        public DateTime UploadedDate { get; set; }
        public double TotalHours { get; set; }
        public string TimeSheetStatus { get; set; }
        public string TimeSheetRep { get; set; }
        public string UploadedBy { get; set; }
        public DateTime LinkedDate { get; set; }
        public string ApprovedBy { get; set; }
        public DateTime ApprovedDate { get; set; }
        public string ApprovedFromClient { get; set; }
        public string LocationName { get; set; }
        public string FileName { get; set; }
        public bool IsApproved { get; set; }

        // Navigation properties
        public User User { get; set; }
        public Project Project { get; set; }
    }
}
