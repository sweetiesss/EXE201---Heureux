using Domain.Models;

namespace Application.Repositories
{
    public interface ITransactionRepository : IGenericRepository<Transaction>
    {
        Task<Transaction> GetByOrderCode(int id);

    }
}
