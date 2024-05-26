using Application;
using Application.Repositories;

namespace Infrastructures
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _dbContext;
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;


        public UnitOfWork(AppDbContext dbContext,
            IUserRepository userRepository,
            IRoleRepository roleRepository)
        {
            _dbContext = dbContext;
            _userRepository = userRepository;
            _roleRepository = roleRepository;
        }

        public IUserRepository UserRepository => _userRepository;
        public IRoleRepository RoleRepository => _roleRepository;

  
        public async Task<int> SaveChangeAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }
    }
}
