using Application.Commons;
using Application.ViewModels.RequestModels;
using Application.ViewModels.UserViewModels;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUserSubscriptionService
    {
        Task<UserSubscription> CreateUserSubscription(UserSubscriptionRequest userSubscription);
        Task<UserSubscriptionListDTO> GetUserSubscriptionById(int id);
        Task<Pagination<UserSubscriptionListDTO>> GetUserSubscription(int pageIndex, int pageSize);
        Task<UserSubscription> UpdateUserSubscription(int id ,UserSubscriptionRequest userSubscription);
        Task<UserSubscription> DeleteUserSubscription(int id);
    }
}
