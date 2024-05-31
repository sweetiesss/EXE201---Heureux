using Application.Commons;
using Application.Interfaces;
using Application.Utils;
using Application.ViewModels.RequestModels;
using Application.ViewModels.UserViewModels;
using AutoMapper;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class UserSubscriptionService : IUserSubscriptionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly AppConfiguration _appConfiguration;

        public UserSubscriptionService(IUnitOfWork unitOfWork, IMapper mapper, AppConfiguration appConfiguration)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _appConfiguration = appConfiguration;
        }

        public async Task<UserSubscription> CreateUserSubscription(UserSubscriptionRequest userSubscription)
        {
            var result = new UserSubscription
            {
                StartDate = userSubscription.StartDate,
                SubscriptionId = userSubscription.SubscriptionId,
                UserId = userSubscription.UserId
            };
            await _unitOfWork.UserSubsciptionRepository.AddAsync(result);
            await _unitOfWork.SaveChangeAsync();
            return result;
        }

        public async Task<UserSubscription> GetUserSubscriptionById(int id)
        {
            return await _unitOfWork.UserSubsciptionRepository.GetByIdAsync(id);
        }
        public async Task<Pagination<UserSubscriptionListDTO>> GetUserSubscription(int pageIndex, int pageSize)
        {
            var list = await _unitOfWork.UserSubsciptionRepository.GetAllAsync();
            var result = _mapper.Map<List<UserSubscriptionListDTO>>(list);
            return await ListPagination<UserSubscriptionListDTO>.PaginateList(result, pageIndex, pageSize);
        }

        public async Task<UserSubscription> UpdateUserSubscription(int id, UserSubscriptionRequest userSubscription)
        {
            try
            {
                var result = await _unitOfWork.UserSubsciptionRepository.GetByIdAsync(id);
                if (result is null)
                {
                    throw new Exception("User Subscription not found");
                }
                else
                {
                    result.StartDate = userSubscription.StartDate;
                    result.SubscriptionId = userSubscription.SubscriptionId;
                    result.UserId = userSubscription.UserId;
                    await _unitOfWork.SaveChangeAsync();
                    return result;
                }

            } catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }
        public async Task<UserSubscription> DeleteUserSubscription(int id)
        {
            var userSubscription = await _unitOfWork.UserSubsciptionRepository.GetByIdAsync(id);
            _unitOfWork.UserSubsciptionRepository.Delete(userSubscription);
            await _unitOfWork.SaveChangeAsync();
            return userSubscription;
        }
        
    }
}
