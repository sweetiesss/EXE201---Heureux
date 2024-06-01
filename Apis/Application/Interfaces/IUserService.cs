using Application.Commons;
using Application.ViewModels.RequestModels;
using Application.ViewModels.UserViewModels;
using Domain.Entities;
using System.Net;

namespace Application.Interfaces
{
    public interface IUserService
    { 
        //GET
        Task<UserListDTO> GetUserByEmail(string email);
        Task<Pagination<UserListDTO>> GetListUsers(int pageIndex, int pageSize);

        //POST
        Task<HttpStatusCode> Login(LoginRequestModel loginRequestModel);
        Task<HttpStatusCode> Register(RegisterRequestModel registerRequestModel);

        //PUT
        Task<HttpStatusCode> UpdateUser(RegisterRequestModel registerRequestModel);

        //DELETE
        Task<HttpStatusCode> DeleteUser(string email);
        
        //TEST
        Task<List<User>> GetListUser();



        
    }
}
