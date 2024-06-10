using Application.Commons;
using Application.Interfaces;
using Application.ViewModels.RequestModels;
using Application.ViewModels.UserViewModels;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Steeltoe.Discovery;
using System.ComponentModel;

namespace WebAPI.Controllers
{
    public class UserSubscriptionController : BaseController
    {
        private readonly IUserSubscriptionService _userSubscriptionService;
        private readonly IDiscoveryClient _discoveryClient;

        public UserSubscriptionController(IUserSubscriptionService userSubscriptionService, IDiscoveryClient discoveryClient) : base(discoveryClient)
        {
            _userSubscriptionService = userSubscriptionService;
        }

        [HttpGet]
        public async Task<Pagination<UserSubscriptionListDTO>> GetUserSubscription([FromQuery][DefaultValue(0)] int pageIndex,
                                                                                      [FromQuery][DefaultValue(10)] int pageSize)
        {
            return await _userSubscriptionService.GetUserSubscription(pageIndex, pageSize);
        }
        [HttpGet("{id}")]
        public async Task<UserSubscriptionListDTO> GetUserSubscriptionById(int id)
        {
            return await _userSubscriptionService.GetUserSubscriptionById(id);
        }

        [HttpPost]
        public async Task<UserSubscription> CreateUserSubscription([FromForm]UserSubscriptionRequest userSubscription)
        {
            return await _userSubscriptionService.CreateUserSubscription(userSubscription);
        }
        [HttpPut]
        public async Task<UserSubscription> UpdateUserSubscription(int id, [FromForm]UserSubscriptionRequest userSubscription)
        {
            return await _userSubscriptionService.UpdateUserSubscription(id,userSubscription);
        }
        [HttpDelete("{id}")]
        public async Task<UserSubscription> DeleteUserSubscription(int id)
        {
            return await _userSubscriptionService.DeleteUserSubscription(id);
        }
    }
}
