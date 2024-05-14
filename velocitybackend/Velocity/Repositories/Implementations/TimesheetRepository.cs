using Microsoft.EntityFrameworkCore;
using Velocity.Dtos;
using Velocity.Models;
using Velocity.Models.DbContext;
using Velocity.Repositories.Interface;

namespace Velocity.Repositories.Implementations
{
    public class TimesheetRepository : ITimesheetRepository
    {
        private readonly DatabaseContext _context;

        public TimesheetRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TimeSheetViewDTO>> GetTimesheetsAsync()
        {
            var timesheets = await _context.Timesheets.Where(x => x.IsApproved == false)
                .Include(t => t.User)
                .Include(t => t.Project)
                .ThenInclude(p => p.Client)
                .Select(t => new TimeSheetViewDTO
                {
                    Id=t.Id,
                    UserName = t.User.UserId, // Assuming UserId is the username, change if necessary
                    ProjectName = t.Project.Name,
                    UploadedDate = t.UploadedDate,
                    TotalHours = t.TotalHours,
                    TimeSheetStatus = t.TimeSheetStatus,
                    TimeSheetRep = t.TimeSheetRep,
                    UploadedBy = t.UploadedBy,
                    LinkedDate = t.LinkedDate,
                    ApprovedBy = t.ApprovedBy,
                    ApprovedDate = t.ApprovedDate,
                    ApprovedFromClient = t.ApprovedFromClient,
                    LocationName = t.LocationName,
                    FileName = t.FileName,
                    IsApproved = t.IsApproved
                })
                .ToListAsync();

            return timesheets;
        }


        public async Task<TimeSheetViewDTO> GetTimesheetByIdAsync(int id)
        {
            var timesheet = await _context.Timesheets
        .Where(x => x.Id == id)
        .Include(t => t.User)
        .Include(t => t.Project)
            .ThenInclude(p => p.Client)
        .Select(t => new TimeSheetViewDTO
        {
            Id = t.Id,
            UserName = t.User.UserId, // Changed from UserId to UserName
            ProjectName = t.Project.Name,
            UploadedDate = t.UploadedDate,
            TotalHours = t.TotalHours,
            TimeSheetStatus = t.TimeSheetStatus,
            TimeSheetRep = t.TimeSheetRep,
            UploadedBy = t.UploadedBy,
            LinkedDate = t.LinkedDate,
            ApprovedBy = t.ApprovedBy,
            ApprovedDate = t.ApprovedDate,
            ApprovedFromClient = t.ApprovedFromClient,
            LocationName = t.LocationName,
            FileName = t.FileName,
            IsApproved = t.IsApproved
        })
        .FirstOrDefaultAsync();

            return timesheet;
        }

        public async Task<int> AddTimesheetAsync(Timesheet timesheet)
        {
            _context.Timesheets.Add(timesheet);
            await _context.SaveChangesAsync();
            return timesheet.Id;
        }

        public async Task DeleteTimesheetAsync(int id)
        {
            var timesheet = await _context.Timesheets.FindAsync(id);
            if (timesheet != null)
            {
                _context.Timesheets.Remove(timesheet);
                await _context.SaveChangesAsync();
            }
        }

        public async Task ApproveTimesheetAsync(int id)
        {
            var timesheet = await _context.Timesheets.FindAsync(id);
            if (timesheet != null)
            {
                timesheet.IsApproved = true;
                await _context.SaveChangesAsync();
            }
        }
    }
}
