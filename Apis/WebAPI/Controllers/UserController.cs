using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Application.ViewModels.UserViewModels;
using AutoMapper.Configuration.Conventions;
using System.Net;
using Application.Commons;
using System.ComponentModel;

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
        public async Task<Pagination<UserListDTO>> GetUserList([FromQuery][DefaultValue(0)] int pageIndex,
                                                               [FromQuery][DefaultValue(10)] int pageSize) 
                                                    => await _userService.GetListUsers(pageIndex, pageSize);

        [HttpPost]
        public async Task<HttpStatusCode> Login(UserLoginDTO loginDTO) => await _userService.Login(loginDTO);

        [HttpPost]
        public async Task<HttpStatusCode> Register(UserRegisterDTO userRegisterDTO) => await _userService.Register(userRegisterDTO);


        [HttpPost]
        public async Task<HttpStatusCode> CheckUserExisted(string email) => await _userService.UserExists(email);

    }
}