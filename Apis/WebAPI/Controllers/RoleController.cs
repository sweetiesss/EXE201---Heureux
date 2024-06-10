using Application.Commons;
using Application.Interfaces;
using Application.ViewModels.RequestModels;
using Application.ViewModels.UserViewModels;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Steeltoe.Discovery;
using System.ComponentModel;
using System.Net;

namespace WebAPI.Controllers
{
    public class RoleController : BaseController
    {
        private readonly IRoleService _roleService;
        private readonly IDiscoveryClient _discoveryClient;

        public RoleController(IRoleService roleService, IDiscoveryClient discoveryClient) : base(discoveryClient)
        {
            _roleService = roleService;
            _discoveryClient = discoveryClient;
        }

        [HttpGet]
        public async Task<Pagination<RoleListDTO>> GetRoles([FromQuery][DefaultValue(0)] int pageIndex,
                                                            [FromQuery][DefaultValue(10)] int pageSize) 
                                                            => await _roleService.GetRoles(pageIndex, pageSize);

        [HttpPost]
        public async Task<HttpStatusCode> AddRole(RoleRequestModel model) => await _roleService.AddRole(model);

        [HttpDelete("{roleName}")]
        public async Task<HttpStatusCode> DeleteRole(string roleName) => await _roleService.DeleteRole(roleName);
    }
}
