using Application;
using Application.Repositories;

namespace Infrastructures
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _dbContext;
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;
        private readonly ISubscriptionRepository _subscriptionRepository;
        private readonly IUserSubsciptionRepository _userSubsciptionRepository;
        private readonly IPaymentRepository _paymentRepository;
        private readonly ITransactionRepository _transactionRepository;


        public UnitOfWork(AppDbContext dbContext,
            IUserRepository userRepository,
            IRoleRepository roleRepository,
            ISubscriptionRepository subscriptionRepository,
            IUserSubsciptionRepository userSubsciptionRepository,
            IPaymentRepository paymentRepository,
            ITransactionRepository transactionRepository)
        {
            _dbContext = dbContext;
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _subscriptionRepository = subscriptionRepository;
            _userSubsciptionRepository = userSubsciptionRepository;
            _paymentRepository = paymentRepository;
            _transactionRepository = transactionRepository;
        }

        public IUserRepository UserRepository => _userRepository;
        public IRoleRepository RoleRepository => _roleRepository;
        public ISubscriptionRepository SubscriptionRepository => _subscriptionRepository;
        public IUserSubsciptionRepository UserSubsciptionRepository => _userSubsciptionRepository;
        public IPaymentRepository PaymentRepository => _paymentRepository;

        public ITransactionRepository TransactionRepository => _transactionRepository;

        public async Task<int> SaveChangeAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }
    }
}
