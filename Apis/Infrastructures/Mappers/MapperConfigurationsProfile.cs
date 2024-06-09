using AutoMapper;
using Application.Commons;
using Domain.Entities;
using Application.ViewModels.UserViewModels;
using Microsoft.EntityFrameworkCore;
using Application.ViewModels.RequestModels;
using Domain.Models;

namespace Infrastructures.Mappers
{
    public class MapperConfigurationsProfile : Profile
    {
        public MapperConfigurationsProfile()
        {
            //CreateMap<UserListDTO, User>();
            //CreateMap(typeof(Pagination<>), typeof(Pagination<>));
            //CreateMap<User, UserListDTO>();
            CreateMap<UserListDTO, User>();
            CreateMap<SubscriptionListDTO, Subscription>();
            CreateMap<UserSubscriptionListDTO, UserSubscription>();
            CreateMap<RoleListDTO, Role>();
            CreateMap<TransactionRequestModel, Transaction>();
            CreateMap(typeof(Pagination<>), typeof(Pagination<>));
            CreateMap<Subscription, SubscriptionListDTO>();
            CreateMap<User, UserListDTO>()
                .ForMember(dest => dest.RoleCode, opt => opt.MapFrom<CustomRoleCodeResolver>());
            CreateMap<UserSubscription, UserSubscriptionListDTO>()
                 .ForMember(dest => dest.SubscriptionName, opt => opt.MapFrom<CustomSubscriptionNameResolver>())
                 .ForMember(dest => dest.UserEmail, opt => opt.MapFrom<CustomEmailResolver>());
            CreateMap<Role, RoleListDTO>();
            CreateMap<Transaction, TransactionRequestModel>();
        }
    }
}
