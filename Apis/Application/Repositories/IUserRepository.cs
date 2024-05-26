using Domain.Entities;
using System.Net;

namespace Application.Repositories
{
    public interface IUserRepository : IGenericRepository<User>
    {

        
        Task<HttpStatusCode> CheckUserExisted(string email, string hashedPassword);
        //Task<User> GetUserById(int userid);

    }
}
