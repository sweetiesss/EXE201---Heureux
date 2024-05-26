using Application.Interfaces;
using Application.Repositories;

namespace Application
{
    public interface IUnitOfWork
    {
        public IUserRepository UserRepository { get; }

        public IRoleRepository RoleRepository { get; }

        public Task<int> SaveChangeAsync();
    }
}
