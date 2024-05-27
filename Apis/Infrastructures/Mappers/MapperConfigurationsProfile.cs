﻿using AutoMapper;
using Application.Commons;
using Domain.Entities;
using Application.ViewModels.UserViewModels;

namespace Infrastructures.Mappers
{
    public class MapperConfigurationsProfile : Profile
    {
        public MapperConfigurationsProfile()
        {
            CreateMap<UserListDTO, User>();
            CreateMap(typeof(Pagination<>), typeof(Pagination<>));
            CreateMap<User, UserListDTO>()
                ;
        }
    }
}
