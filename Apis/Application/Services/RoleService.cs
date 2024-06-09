using Application.Commons;
using Application.Interfaces;
using Application.Utils;
using Application.ViewModels.RequestModels;
using Application.ViewModels.UserViewModels;
using AutoMapper;
using Domain.Entities;
using System.Net;

namespace Application.Services
{
    public class RoleService : IRoleService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public RoleService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<HttpStatusCode> AddRole(RoleRequestModel roleRequestModel)
        {
            var role = await _unitOfWork.RoleRepository.GetAllAsync();
            foreach (Role r in role)
            {
                if (r.RoleCode.Equals(roleRequestModel.RoleCode, StringComparison.OrdinalIgnoreCase))
                {
                    return HttpStatusCode.Found;
                }
            }
            var result = new Role
            {
                RoleCode = roleRequestModel.RoleCode.ToUpper(),
            };

            await _unitOfWork.RoleRepository.AddAsync(result);
            await _unitOfWork.SaveChangeAsync();
            return HttpStatusCode.Created;
        }

        public async Task<HttpStatusCode> DeleteRole(string roleName)
        {
            var roles = await _unitOfWork.RoleRepository.GetAllAsync();
            foreach (Role r in roles)
            {
                if (r.RoleCode.Equals(roleName, StringComparison.OrdinalIgnoreCase))
                {
                    _unitOfWork.RoleRepository.Delete(r);
                    await _unitOfWork.SaveChangeAsync();
                    return HttpStatusCode.OK;
                }

            }
            return HttpStatusCode.NotFound;
        }

        public async Task<Pagination<RoleListDTO>> GetRoles(int pageIndex, int pageSize)
        {
            var roles = await _unitOfWork.RoleRepository.GetAllAsync();
            var result = _mapper.Map<List<RoleListDTO>>(roles);
            return await ListPagination<RoleListDTO>.PaginateList(result, pageIndex, pageSize);
        }
    }
}
