using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Velocity.Dtos;
using Velocity.Models;
using Velocity.Repositories.Interface;
using Velocity.Services.Interface;

namespace Velocity.Services.Implementations
{


    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;
        private IConfiguration _configuration;


        public UserService(IUserRepository userRepository, IConfiguration configuration, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _tokenService = tokenService;
        }

        public async Task<UserDTO> AuthenticateAsync(string userID, string password)
        {
            var user = await _userRepository.GetUserByUserIDAsync(userID);
            if (user != null && password == user.Password)
            {
                return new UserDTO { UserId = user.UserId, AccessToken = (_tokenService.GenerateToken(user)) };
            }
            return null;
        }

        public async Task<List<UserViewDTO>> GetUserListAsync()
        {
            var users = await _userRepository.GetUserListAsync();

            // Convert the list of User objects to a list of UserDTO objects
            var userDTOs = users.Select(u => new UserViewDTO
            {
                Id=u.Id,
                UserId = u.UserId,
            }).ToList();

            return userDTOs;
        }

    }

}
