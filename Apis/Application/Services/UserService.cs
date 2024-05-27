using Application;
using Application.Commons;
using Application.Interfaces;
using Application.Utils;
using Application.ViewModels.UserViewModels;
using AutoMapper;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;
using System.Net;

namespace Infrastructures.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly AppConfiguration _configuration;

        public UserService(IUnitOfWork unitOfWork, IMapper mapper, AppConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configuration= configuration;
        }

        public async Task<Pagination<UserListDTO>> GetListUsers(int pageIndex, int pageSize)
        {
            
            var list = await _unitOfWork.UserRepository.GetAllAsync();
            var result = _mapper.Map<List<UserListDTO>>(list);
            return await ListPagination<UserListDTO>.PaginateList(result, pageIndex, pageSize);
        }

        public Task<Pagination<User>> GetListUsersTESTAPI()
        {
            throw new NotImplementedException();
        }

        public async Task<HttpStatusCode> Login(UserLoginDTO userLoginDTO)
        {
            string Email = userLoginDTO.Email;
            string Password = userLoginDTO.Password;
            if(Email != null && Password != null)
            {
                var result = await _unitOfWork.UserRepository.CheckLogin(Email, Password);
                switch (result)
                {
                    case true:
                        return HttpStatusCode.OK;
                    case false:
                        return HttpStatusCode.NotFound;
                }
            }
            return HttpStatusCode.BadRequest;
        }

        public async Task<HttpStatusCode> Register(UserRegisterDTO userRegisterDTO)
        {
            var checkExists = await _unitOfWork.UserRepository.CheckUserExisted(userRegisterDTO.Email);
            if(checkExists == true)
            {
                throw new Exception("Email already exists.");
            }

            var user = new User
            {
                Email = userRegisterDTO.Email,
                Password = userRegisterDTO.Password,
                Address = userRegisterDTO.Address,
                Dob = userRegisterDTO.Dob,
                Gender = userRegisterDTO.Gender,
                Phone = userRegisterDTO.Phone,
                Roleid = userRegisterDTO.Roleid,
                Username = userRegisterDTO.Username,
                Status = "Test",
            };
            await _unitOfWork.UserRepository.AddAsync(user);
            await _unitOfWork.SaveChangeAsync();
            return HttpStatusCode.OK;
        }

        public async Task<HttpStatusCode> UserExists(string email)
        {
            //tam thoi chua hash password

            //

            var result = await _unitOfWork.UserRepository.CheckUserExisted(email);
            switch (result)
            {
                case true:
                    return HttpStatusCode.OK;
                case false:
                    return HttpStatusCode.NotFound;
            }
        }

        //public async Task<string> LoginAsync(UserLoginDTO userObject)
        //{
        //    var user = await _unitOfWork.UserRepository.GetUserByUserNameAndPasswordHash(userObject.UserName, userObject.Password.Hash());
        //    return user.GenerateJsonWebToken(_configuration.JWTSecretKey, _currentTime.GetCurrentTime());
        //}

        //public async Task RegisterAsync(UserLoginDTO userObject)
        //{
        //    // check username exited
        //    var isExited = await _unitOfWork.UserRepository.CheckUserNameExited(userObject.UserName);

        //    if(isExited)
        //    {
        //        throw new Exception("Username exited please try again");
        //    }

        //    var newUser = new User
        //    {
        //        UserName = userObject.UserName,
        //        PasswordHash = userObject.Password.Hash()
        //    };

        //    await _unitOfWork.UserRepository.AddAsync(newUser);
        //    await _unitOfWork.SaveChangeAsync();
        //}
    }
}
