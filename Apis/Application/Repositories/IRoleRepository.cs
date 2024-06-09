using Domain.Entities;

namespace Application.Repositories
{
    public interface IRoleRepository : IGenericRepository<Role>
    {
        Task<Role?> GetByName(string name);
    }
}
