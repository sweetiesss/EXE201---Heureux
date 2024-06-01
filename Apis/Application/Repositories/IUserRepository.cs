using Domain.Entities;
using System.Net;

namespace Application.Repositories
{
    public interface IUserRepository : IGenericRepository<User>
    {

        
        Task<User> GetUser(string email);
        Task<bool> CheckLogin(string email, string Hashedpassword);
        //Task<User> GetUserById(int userid);

    }
}
