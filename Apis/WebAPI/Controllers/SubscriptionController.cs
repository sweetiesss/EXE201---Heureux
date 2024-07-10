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
    public class SubscriptionController : BaseController
    {
        private readonly ISubscriptionService _subscriptionService;
        private readonly IDiscoveryClient _discoveryClient;

        public SubscriptionController(ISubscriptionService subscriptionService, IDiscoveryClient discoveryClient) : base(discoveryClient)
        {
            _subscriptionService = subscriptionService;
            _discoveryClient = discoveryClient;
        }

        [HttpGet]
        public async Task<Pagination<SubscriptionListDTO>> GetSubcriptions([FromQuery][DefaultValue(0)] int pageIndex,
                                                                           [FromQuery][DefaultValue(10)] int pageSize)
        => await _subscriptionService.GetSubscription(pageIndex, pageSize);
        
        [HttpGet("{id}")]
        public async Task<Subscription> GetSubscription(int id) => await _subscriptionService.GetSubscriptionById(id);

        [HttpPost]
        public async Task<Subscription> CreateSubscription(SubscriptionRequest subscription) => await _subscriptionService.CreateSubscription(subscription);


        [HttpPost("{id}")]
        public async System.Threading.Tasks.Task UpdateSubscription(int id, SubscriptionRequest subscription)
        => await _subscriptionService.UpdateSubscription(id, subscription);
       

        [HttpPost("{id}")]
        public async Task<Subscription> DeleteSubscription(int id)
        {
            return await _subscriptionService.DeleteSubscription(id);
        }

    }
}
