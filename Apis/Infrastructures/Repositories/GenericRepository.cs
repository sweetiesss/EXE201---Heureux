using Application.Interfaces;
using Application.Repositories;
using Application.Commons;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructures.Repositories
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : BaseEntity
    {
        protected DbSet<TEntity> _dbSet;

        public GenericRepository(AppDbContext context)
        {
            _dbSet = context.Set<TEntity>();
        }
        public Task<List<TEntity>> GetAllAsync() => _dbSet.ToListAsync();

        public async Task<TEntity?> GetByIdAsync(int id)
        {
            var result = await _dbSet.FirstOrDefaultAsync(x => x.Id == id);
            if (result == null)
            {
                throw new Exception("Not found");
            }
            return result;
        }

        public async System.Threading.Tasks.Task AddAsync(TEntity entity)
        {
            await _dbSet.AddAsync(entity);
        }

        //public void SoftRemove(TEntity entity)
        //{
        //    entity.IsDeleted = true;
        //    entity.DeleteBy = _claimsService.GetCurrentUserId;
        //    _dbSet.Update(entity);
        //}

        public void Update(TEntity entity)
        {
            _dbSet.Update(entity);
        }

        public void Delete(TEntity entity)
        {
            _dbSet.Remove(entity);
        }

        public async System.Threading.Tasks.Task AddRangeAsync(List<TEntity> entities)
        {
            await _dbSet.AddRangeAsync(entities);
        }

        //public void SoftRemoveRange(List<TEntity> entities)
        //{
        //    foreach (var entity in entities)
        //    {
        //        entity.IsDeleted = true;
        //        entity.DeletionDate = _timeService.GetCurrentTime();
        //        entity.DeleteBy = _claimsService.GetCurrentUserId;
        //    }
        //    _dbSet.UpdateRange(entities);
        //}

        //public Task<Pagination<TEntity>> PaginateList(List<TEntity> list, int pageIndex = 0, int pageSize = 10)
        //{
        //    var itemCount = list.Count;
        //    var items = list.Skip(pageIndex * pageSize)
        //                    .Take(pageSize)
        //                    .ToList();

        //    var result = new Pagination<TEntity>()
        //    {
        //        PageIndex = pageIndex,
        //        PageSize = pageSize,
        //        TotalItemsCount = itemCount,
        //        Items = items,
        //    };

        //    return System.Threading.Tasks.Task.FromResult(result);
        //}

        public Task<Pagination<TEntity>> PaginateList(List<TEntity> list, int pageIndex = 0, int pageSize = 10)
        {
            var itemCount = list.Count;
            var items = list.Skip(pageIndex * pageSize)
                            .Take(pageSize)
                            .ToList();

            var result = new Pagination<TEntity>()
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                TotalItemsCount = itemCount,
                Items = items,
            };

            return System.Threading.Tasks.Task.FromResult(result);
        }


        public async Task<Pagination<TEntity>> ToPagination(int pageIndex = 0, int pageSize = 10)
        {
            var itemCount = await _dbSet.CountAsync();
            var items = await _dbSet/*.OrderByDescending(x => x.CreationDate)*/
                                    .Skip(pageIndex * pageSize)
                                    .Take(pageSize)
                                    .AsNoTracking()
                                    .ToListAsync();

            var result = new Pagination<TEntity>()
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                TotalItemsCount = itemCount,
                Items = items,
            };

            return result;
        }

        public void UpdateRange(List<TEntity> entities)
        {
            _dbSet.UpdateRange(entities);
        }
    }
}
