using Velocity.Models;

namespace Velocity.Repositories.Interface
{
    public interface IUserRepository
    {
        Task<User> GetUserByUserIDAsync(string userID);
        Task<List<User>> GetUserListAsync();
    }
   
}
