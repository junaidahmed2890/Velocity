using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Velocity.Dtos;
using Velocity.Models;
using Velocity.Services.Implementations;
using Velocity.Services.Interface;

namespace Velocity.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IUserService _userService;

        public AccountController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginModel)
        {
            var user = await _userService.AuthenticateAsync(loginModel.UserId, loginModel.Password);
            if (user != null)
            {
                return Ok(new { user, status="success", message = "successfully logged In.",accessToken=user.AccessToken });
            }
            return Unauthorized(new { status="failed",message= "Incorrect User ID or Password. Please try again." });
        }
        [HttpGet]
        public async Task<IActionResult> GetUsersLists()
        {
            var users = await _userService.GetUserListAsync();
            return Ok(users);
        }
    }
}
