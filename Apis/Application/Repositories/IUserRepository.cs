using Domain.Entities;
using System.Net;

namespace Application.Repositories
{
    public interface IUserRepository : IGenericRepository<User>
    {

        
        Task<bool> CheckUserExisted(string email);
        Task<bool> CheckLogin(string email, string Hashedpassword);
        //Task<User> GetUserById(int userid);

    }
}
