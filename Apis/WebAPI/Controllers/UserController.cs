using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Application.ViewModels.UserViewModels;
using AutoMapper.Configuration.Conventions;
using System.Net;
using Application.Commons;
using System.ComponentModel;
using Application.ViewModels.RequestModels;
using Domain.Entities;

namespace WebAPI.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
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
        public async Task<HttpStatusCode> Register(RegisterRequestModel registerRequestModel) => await _userService.Register(registerRequestModel);

        [HttpPut]
        public async Task<HttpStatusCode> UpdateUser(RegisterRequestModel registerRequestModel) => await _userService.UpdateUser(registerRequestModel);

        [HttpDelete("{email}")]
        public async Task<HttpStatusCode> DeleteUser(string email) => await _userService.DeleteUser(email);



    }
}