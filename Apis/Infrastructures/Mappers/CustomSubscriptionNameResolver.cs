using Application.ViewModels.UserViewModels;
using AutoMapper;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructures.Mappers
{
    public class CustomSubscriptionNameResolver : IValueResolver<UserSubscription, UserSubscriptionListDTO, string>
    {
        private readonly AppDbContext _context;

        public CustomSubscriptionNameResolver(AppDbContext context)
        {
            _context = context;
        }

        public string Resolve(UserSubscription source, UserSubscriptionListDTO destination, string destMember, ResolutionContext context)
        {
            var subscription = _context.Subscriptions
                .FirstOrDefault(s => s.Id == source.SubscriptionId);

            return subscription?.Name;
        }
    }

}
