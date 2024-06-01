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
    public class CustomEmailResolver : IValueResolver<UserSubscription, UserSubscriptionListDTO, string>
    {
        private readonly AppDbContext _context;

        public CustomEmailResolver(AppDbContext context)
        {
            _context = context;
        }

        public string Resolve(UserSubscription source, UserSubscriptionListDTO destination, string destMember, ResolutionContext context)
        {
            var user = _context.Users
                .FirstOrDefault(u => u.Id == source.UserId);

            return user?.Email;
        }
    }

}
