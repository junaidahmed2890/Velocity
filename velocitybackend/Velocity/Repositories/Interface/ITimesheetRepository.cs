using Velocity.Dtos;
using Velocity.Models;

namespace Velocity.Repositories.Interface
{
    public interface ITimesheetRepository
    {
        Task<IEnumerable<TimeSheetViewDTO>> GetTimesheetsAsync();
        Task<TimeSheetViewDTO> GetTimesheetByIdAsync(int id);
        Task<int> AddTimesheetAsync(Timesheet timesheet);
        Task DeleteTimesheetAsync(int id);
        Task ApproveTimesheetAsync(int id);
    }
}
