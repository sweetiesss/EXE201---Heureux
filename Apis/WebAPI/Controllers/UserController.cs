using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Application.ViewModels.UserViewModels;
using AutoMapper.Configuration.Conventions;
using System.Net;

namespace WebAPI.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }


        [HttpPost]
        public async Task<HttpStatusCode> CheckUserExisted(string email, string password) => await _userService.UserExists(email, password);

    }
}