using Domain.Models;

namespace Application.Repositories
{
    public interface ITransactionRepository : IGenericRepository<Transaction>
    {
        Task<List<Transaction>> GetByEmail(string email);
        Task<Transaction> GetByOrderCode(int id);

    }
}
