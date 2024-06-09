using Application.Interfaces;
using Application.Repositories;

namespace Application
{
    public interface IUnitOfWork
    {
        public IUserRepository UserRepository { get; }
        public IRoleRepository RoleRepository { get; }
        public ISubscriptionRepository SubscriptionRepository { get; }
        public IUserSubsciptionRepository UserSubsciptionRepository { get; }
        public IPaymentRepository PaymentRepository { get; }
        public ITransactionRepository TransactionRepository { get; }
        public Task<int> SaveChangeAsync();
    }
}
