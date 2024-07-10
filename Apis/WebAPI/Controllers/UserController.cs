using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Application.ViewModels.UserViewModels;
using AutoMapper.Configuration.Conventions;
using System.Net;
using Application.Commons;
using System.ComponentModel;
using Application.ViewModels.RequestModels;
using Domain.Entities;
using Steeltoe.Discovery;

namespace WebAPI.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUserService _userService;
        private readonly IDiscoveryClient _discoveryClient;


        public UserController(IUserService userService, IDiscoveryClient discoveryClient) : base(discoveryClient)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<Pagination<UserListDTO>> GetUsers([FromQuery][DefaultValue(0)] int pageIndex,
                                                               [FromQuery][DefaultValue(10)] int pageSize) 
                                                    => await _userService.GetListUsers(pageIndex, pageSize);

        [HttpGet("{email}")]
        public async Task<UserListDTO> GetUser(string email) => await _userService.GetUserByEmail(email);

        [HttpPost]
        public async Task<HttpStatusCode> Login(LoginRequestModel loginRequestModel) => await _userService.Login(loginRequestModel);

        [HttpPost]
        public async Task<HttpStatusCode> Register([FromBody] RegisterRequestModel registerRequestModel)
        {
            if(!ModelState.IsValid)
            {
                throw new Exception(ModelState.ToString());
            }

            return await _userService.Register(registerRequestModel);
        }

        [HttpPost]
        public async Task<HttpStatusCode> UpdateUser([FromBody] RegisterRequestModel registerRequestModel)
        {
            if (!ModelState.IsValid)
            {
                throw new Exception(ModelState.ToString());
            }

            return await _userService.UpdateUser(registerRequestModel);
        }

        [HttpPost("{email}")]
        public async Task<HttpStatusCode> DeleteUser(string email) => await _userService.DeleteUser(email);



    }
}