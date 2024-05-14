using Velocity.Dtos;

namespace Velocity.Services.Interface
{
    public interface IUserService
    {
        Task<UserDTO> AuthenticateAsync(string userID, string password);
        Task<List<UserViewDTO>> GetUserListAsync();

    }
}
