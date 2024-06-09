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

        public async Task<User?> GetUser(string email)
        {
            if(email == null)
            {
                throw new Exception("null"); //400
            }
            var user = await _dbSet.FirstOrDefaultAsync(x => x.Email == email) ;
            if(user == null)
            {
                return null;
            }
            
            return user; //200

        }

        public async Task<bool> CheckLogin(string email, string Hashedpassword)
        {
            if (email == null || Hashedpassword == null)
            {
                throw new Exception("Missing fields"); //400
            }
            var user = await _dbSet.FirstOrDefaultAsync(x => x.Email == email && x.Password == Hashedpassword);
            if (user == null)
            {
                return false; //404
            }

            return true; //200

        }


    }
}