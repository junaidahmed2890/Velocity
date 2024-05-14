using Velocity.Dtos;

namespace Velocity.Services.Interface
{
    public interface ITimesheetService
    {
        Task<IEnumerable<TimeSheetViewDTO>> GetTimesheetsAsync();
        Task<TimeSheetViewDTO> GetTimesheetByIdAsync(int id);
        Task<int> UploadTimesheetAsync(TimesheetDTO timesheetDTO);
        Task DeleteTimesheetAsync(int id);
        Task ApproveTimesheetAsync(int id);
    }
}
