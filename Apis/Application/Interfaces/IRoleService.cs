using Application.Commons;
using Application.ViewModels.RequestModels;
using Application.ViewModels.UserViewModels;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IRoleService
    {
        Task<Pagination<RoleListDTO>> GetRoles(int pageIndex, int pageSize);
        Task<HttpStatusCode> AddRole(RoleRequestModel roleRequestModel);
        Task<HttpStatusCode> DeleteRole(string roleName);

    }
}
