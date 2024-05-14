using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Velocity.Dtos;
using Velocity.Services.Interface;
using Velocity.Utility;

namespace Velocity.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TimesheetController : ControllerBase
    {
        private readonly ITimesheetService _timesheetService;

        public TimesheetController(ITimesheetService timesheetService)
        {
            _timesheetService = timesheetService;
        }

        [HttpGet]
        public async Task<IActionResult> GetTimesheets()
        {
            var timesheets = await _timesheetService.GetTimesheetsAsync();
            return Ok(ApiResponse.Success(timesheets));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTimesheetById(int id)
        {
            var timesheet = await _timesheetService.GetTimesheetByIdAsync(id);
            if (timesheet == null)
            {
                return NotFound(ApiResponse.Fail("Timesheet not found"));
            }
            return Ok(ApiResponse.Success(timesheet));
        }

        [HttpPost]
        public async Task<IActionResult> UploadTimesheet([FromForm] TimesheetDTO timesheetDTO)
        {
            if (timesheetDTO.File == null || timesheetDTO.File.Length == 0)
                return BadRequest(ApiResponse.Fail("No file uploaded."));

            var timesheetId = await _timesheetService.UploadTimesheetAsync(timesheetDTO);

            if (timesheetId != null)
            {
                return Ok(ApiResponse.Success(new { id = timesheetId }, "Successfully added timesheet."));
            }
            else
            {
                return BadRequest(ApiResponse.Fail("Failed to add timesheet."));
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTimesheet(int id)
        {
            await _timesheetService.DeleteTimesheetAsync(id);
            return NoContent();
        }

        [HttpPost("{id}/approve")]
        public async Task<IActionResult> ApproveTimesheet(int id)
        {
            await _timesheetService.ApproveTimesheetAsync(id);
            return Ok(ApiResponse.Success("Timesheet approved successfully."));
        }
    }
}
