using Application.Commons;
using Application.ViewModels.RequestModels;
using Application.ViewModels.UserViewModels;
using Domain.Entities;
using System.Net;

namespace Application.Interfaces
{
    public interface IUserService
    {
        //System.Threading.Tasks.Task Login(UserLoginDTO userLoginDTO);

        Task<HttpStatusCode> Login(LoginRequestModel loginRequestModel);
        Task<HttpStatusCode> Register(RegisterRequestModel registerRequestModel);

        Task<Pagination<User>> GetListUsersTESTAPI();
        Task<Pagination<UserListDTO>> GetListUsers(int pageIndex, int pageSize);

        Task<HttpStatusCode> UserExists(string email);   


        
    }
}
