using Application.Commons;
using Application.ViewModels.RequestModels;
using Application.ViewModels.UserViewModels;
using System.Net;

namespace Application.Interfaces
{
    public interface IRoleService
    {
        Task<Pagination<RoleListDTO>> GetRoles(int pageIndex, int pageSize);
        Task<HttpStatusCode> AddRole(RoleRequestModel roleRequestModel);
        Task<HttpStatusCode> DeleteRole(string roleName);

    }
}
