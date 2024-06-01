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
    public class CustomRoleCodeResolver : IValueResolver<User, UserListDTO, string>
    {
        private readonly AppDbContext _context;

        public CustomRoleCodeResolver(AppDbContext context)
        {
            _context = context;
        }

        public string Resolve(User source, UserListDTO destination, string destMember, ResolutionContext context)
        {
            var role = _context.Roles.FirstOrDefault(r => r.Id == source.Roleid);
            return role != null ? role.RoleCode : null;
        }
    }

}
