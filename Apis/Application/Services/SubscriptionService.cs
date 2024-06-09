using Application.Commons;
using Application.Interfaces;
using Application.Repositories;
using Application.Utils;
using Application.ViewModels.RequestModels;
using Application.ViewModels.UserViewModels;
using AutoMapper;
using Domain.Entities;

namespace Application.Services
{
    public class SubscriptionService : ISubscriptionService
    {
        private readonly ISubscriptionRepository _subscriptionRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public SubscriptionService(ISubscriptionRepository subscriptionRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _subscriptionRepository = subscriptionRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }


        public async Task<Subscription> CreateSubscription(SubscriptionRequest subscription)
        {
            var result = new Subscription
            {
                Description = subscription.Description,
                Name = subscription.Name,
                Duration = subscription.Duration,
                Price = subscription.Price

            };
            await _subscriptionRepository.AddAsync(result);
            await _unitOfWork.SaveChangeAsync();
            return result;
        }

        public async Task<Subscription> GetSubscriptionById(int id)
        {
            return await _subscriptionRepository.GetByIdAsync(id);
        }

        public async Task<Pagination<SubscriptionListDTO>> GetSubscription(int pageIndex, int pageSize)
        {
            var list = await _subscriptionRepository.GetAllAsync();
            var result = _mapper.Map<List<SubscriptionListDTO>>(list);
            return await ListPagination<SubscriptionListDTO>.PaginateList(result, pageIndex, pageSize);
        }

        public async System.Threading.Tasks.Task UpdateSubscription(int id, SubscriptionRequest subscription)
        {
            try
            {
                var exist = await _subscriptionRepository.GetByIdAsync(id);
                if (exist is null)
                {
                    throw new Exception("Subscription not found");
                }
                if (!string.IsNullOrEmpty(subscription.Description))
                {
                    exist.Description = subscription.Description;
                }
                if (!string.IsNullOrEmpty(subscription.Name))
                {
                    exist.Name = subscription.Name;
                }
                if (subscription.Price != 0 || subscription.Price.Equals("0"))
                {
                    exist.Price = subscription.Price;
                }
                if (subscription.Duration != 0 || subscription.Duration.Equals("0"))
                {
                    exist.Duration = subscription.Duration;
                }
                _unitOfWork.SubscriptionRepository.Update(exist);
                await _unitOfWork.SaveChangeAsync();

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        public async Task<Subscription> DeleteSubscription(int id)
        {
            var subscription = await _subscriptionRepository.GetByIdAsync(id);
            _unitOfWork.SubscriptionRepository.Delete(subscription);
            await _unitOfWork.SaveChangeAsync();
            return subscription;
        }


    }
}
