using Application;
using Application.Commons;
using Application.Interfaces;
using Application.Utils;
using Application.ViewModels.RequestModels;
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
            _configuration = configuration;
        }

        public async Task<Pagination<UserListDTO>> GetListUsers(int pageIndex, int pageSize)
        {

            var list = await _unitOfWork.UserRepository.GetAllAsync();
            var result = _mapper.Map<List<UserListDTO>>(list);
            return await ListPagination<UserListDTO>.PaginateList(result, pageIndex, pageSize);
        }

        public async Task<UserListDTO> GetUserByEmail(string email)
        {
            var user = await _unitOfWork.UserRepository.GetUser(email);
            if (user != null)
            {
                var result = _mapper.Map<UserListDTO>(user);
                return result;
            }
            else
            {
                throw new Exception("User does not exists");
            }

        }

        public async Task<HttpStatusCode> Login(LoginRequestModel loginRequestModel)
        {
            string Email = loginRequestModel.Email;
            string Password = loginRequestModel.Password;
            if (Email != null && Password != null)
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

        public async Task<HttpStatusCode> Register(RegisterRequestModel registerRequestModel)
        {
            var checkExists = await _unitOfWork.UserRepository.GetUser(registerRequestModel.Email);
            if (checkExists != null)
            {
                throw new Exception("Email already exists.");
            }

            var role = await _unitOfWork.RoleRepository.GetByName(registerRequestModel.RoleCode);
            if (role == null)
            {
                throw new Exception("Role does not exists");
            }

            var user = new User
            {
                Email = registerRequestModel.Email,
                Password = registerRequestModel.Password,
                Address = registerRequestModel.Address,
                Dob = registerRequestModel.Dob,
                Gender = registerRequestModel.Gender,
                Phone = registerRequestModel.Phone,
                Roleid = role.Id,
                Username = registerRequestModel.Username,
                Status = "Test",
            };
            await _unitOfWork.UserRepository.AddAsync(user);
            await _unitOfWork.SaveChangeAsync();
            return HttpStatusCode.OK;
        }

        public async Task<List<User>> GetListUser()
        {
            var list = await _unitOfWork.UserRepository.GetAllAsync();
            return list;
        }

        public async Task<HttpStatusCode> DeleteUser(string email)
        {
            var user = await _unitOfWork.UserRepository.GetUser(email);
            if (user == null)
            {
                return HttpStatusCode.NotFound;
            }
            _unitOfWork.UserRepository.Delete(user);
            await _unitOfWork.SaveChangeAsync();
            return HttpStatusCode.OK;
        }

        public async Task<HttpStatusCode> UpdateUser(RegisterRequestModel registerRequestModel)
        {
            var user = await _unitOfWork.UserRepository.GetUser(registerRequestModel.Email);
            if (user == null)
            {
                return HttpStatusCode.NotFound;
            }

            if (!String.IsNullOrEmpty(registerRequestModel.Password) || !registerRequestModel.Password.Equals("string"))
            {
                user.Password = registerRequestModel.Password;
            }
            if (!String.IsNullOrEmpty(registerRequestModel.Username) || !registerRequestModel.Username.Equals("string"))
            {
                user.Username = registerRequestModel.Username;
            }
            if (!String.IsNullOrEmpty(registerRequestModel.Gender) || !registerRequestModel.Gender.Equals("string"))
            {
                user.Gender = registerRequestModel.Gender;
            }
            if (!String.IsNullOrEmpty(registerRequestModel.Address) || !registerRequestModel.Address.Equals("string"))
            {
                user.Address = registerRequestModel.Address;
            }

            if (!String.IsNullOrEmpty(registerRequestModel.Phone) || !registerRequestModel.Phone.Equals("string"))
            {
                user.Phone = registerRequestModel.Phone;
            }
            if (!String.IsNullOrEmpty(registerRequestModel.RoleCode) || registerRequestModel.RoleCode.Equals("string"))
            {
                var role = await _unitOfWork.RoleRepository.GetByName(registerRequestModel.RoleCode);
                if (role != null)
                {

                    user.Roleid = role.Id;
                }
                else
                {
                    throw new Exception("Role not found.");
                }
            }

            _unitOfWork.UserRepository.Update(user);
            await _unitOfWork.SaveChangeAsync();
            return HttpStatusCode.OK;
        }
    }
}
