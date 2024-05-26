using Application.Commons;
using Application.Interfaces;
using Application.Repositories;
using Application.ViewModels.UserViewModels;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

namespace Infrastructures.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {

        public UserRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<HttpStatusCode> CheckUserExisted(string email, string Hashedpassword)
        {
            var user = await _dbSet.FirstOrDefaultAsync(x => x.Email == email && x.Password == Hashedpassword) ;
            if(user == null)
            {
                return HttpStatusCode.NotFound; //404
            }
            return HttpStatusCode.OK; //200

        }

       
    }
}