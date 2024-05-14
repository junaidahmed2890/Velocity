using Microsoft.EntityFrameworkCore;
using Velocity.Models;
using Velocity.Models.DbContext;
using Velocity.Repositories.Interface;

namespace Velocity.Repositories.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly DatabaseContext _context;

        public UserRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByUserIDAsync(string userID)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserId == userID);
        }
      
        public async Task<List<User>> GetUserListAsync()
        {
            return  await _context.Users.ToListAsync();
        }
    }
}
