using Application.Commons;
using Application.ViewModels.RequestModels;
using Application.ViewModels.UserViewModels;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface ISubscriptionService
    {
        Task<Subscription> CreateSubscription(SubscriptionRequest subscription);
        Task<Subscription> GetSubscriptionById(int id);
        Task<Pagination<SubscriptionListDTO>> GetSubscription(int pageIndex, int pageSize);
        System.Threading.Tasks.Task UpdateSubscription(int id, SubscriptionRequest subscription);
        Task<Subscription> DeleteSubscription(int id);
    }
}
