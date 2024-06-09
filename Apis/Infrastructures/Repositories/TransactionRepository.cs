using Application.Repositories;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructures.Repositories
{
    public class TransactionRepository : GenericRepository<Transaction>, ITransactionRepository
    {
        public TransactionRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<Transaction> GetByOrderCode(int id)
        {
            var result = await _dbSet.FirstOrDefaultAsync(x => x.OrderCode == id);
            if (result == null)
            {
                return null;
            }
            return result;
        }
    }
}
