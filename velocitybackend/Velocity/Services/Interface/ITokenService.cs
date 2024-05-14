using Velocity.Models;

namespace Velocity.Services.Interface
{
    public interface ITokenService
    {
        public string GenerateToken(User user);
    }
}
