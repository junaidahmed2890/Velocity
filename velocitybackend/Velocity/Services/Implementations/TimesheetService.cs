using Velocity.Dtos;
using Velocity.Repositories.Interface;
using Velocity.Services.Interface;

namespace Velocity.Services.Implementations
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Velocity.Models;

    public class TimesheetService : ITimesheetService
    {
        private readonly ITimesheetRepository _timesheetRepository;

        public TimesheetService(ITimesheetRepository timesheetRepository)
        {
            _timesheetRepository = timesheetRepository ?? throw new ArgumentNullException(nameof(timesheetRepository));
        }

        public async Task<IEnumerable<TimeSheetViewDTO>> GetTimesheetsAsync()
        {
            var timesheets = await _timesheetRepository.GetTimesheetsAsync();
         
            return timesheets;
        }

        public async Task<TimeSheetViewDTO> GetTimesheetByIdAsync(int id)
        {
            var timesheet = await _timesheetRepository.GetTimesheetByIdAsync(id);
            if (timesheet == null)
            {
                return null;
            }

            return timesheet;
        }

        public async Task<int> UploadTimesheetAsync(TimesheetDTO timesheetDTO)
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles", timesheetDTO.File.FileName);
            using (var stream = new FileStream(path, FileMode.Create))
            {
                await timesheetDTO.File.CopyToAsync(stream);
            }
            var timesheet = new Timesheet
            {
                UserId = 1,
                ProjectId = 2,
                UploadedDate = DateTime.Now,
                TotalHours = 8.5,
                TimeSheetStatus = "Pending",
                TimeSheetRep = "Weekly Report",
                UploadedBy = timesheetDTO.UploadedBy,
                LinkedDate = DateTime.Now.AddDays(-7),
                ApprovedBy = "Manager",
                ApprovedDate = DateTime.Now.AddDays(-1),
                ApprovedFromClient = "",
                LocationName = "Office",
                FileName = timesheetDTO.File.FileName,
                IsApproved = false
            };


            var timesheetId = await _timesheetRepository.AddTimesheetAsync(timesheet);
            return timesheetId;
        }

        public async Task DeleteTimesheetAsync(int id)
        {
            await _timesheetRepository.DeleteTimesheetAsync(id);
        }

        public async Task ApproveTimesheetAsync(int id)
        {
            await _timesheetRepository.ApproveTimesheetAsync(id);
        }
    }


}
