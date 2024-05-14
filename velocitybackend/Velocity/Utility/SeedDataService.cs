using Velocity.Models;
using Velocity.Models.DbContext;

namespace Velocity.Utility
{
    public class SeedDataService
    {
        private readonly DatabaseContext _context;

        public SeedDataService(DatabaseContext context)
        {
            _context = context;
        }

        public void EnsureSeedData()
        {
            if (!_context.Clients.Any())
            {
                _context.Clients.AddRange(
                    new Client { Name = "Client 1" },
                    new Client { Name = "Client 2" }
                );

                _context.SaveChanges();
            }
            if (!_context.Projects.Any())
            {
                _context.Projects.AddRange(
                    new Project { Name = "Project 1",ClientId=_context.Clients.FirstOrDefault().Id },
                   new Project { Name = "Project 2", ClientId = _context.Clients.FirstOrDefault().Id }
                );

                _context.SaveChanges();
            }
            if (!_context.Users.Any())
            {
                _context.Users.AddRange(
                    new User { UserId = "admin",Password="Test@1234" },
                    new User { UserId = "root",Password = "Test@1234" }
                );

                _context.SaveChanges();
            }
        }
    }

}
