using Microsoft.EntityFrameworkCore;
using TestTask.DataAccessLayer.AppContext;
using TestTask.DataAccessLayer.Repositories.Interfaces;

namespace TestTask.DataAccessLayer.Repositories;

public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
{
    protected readonly ApplicationContext _context;
    protected readonly DbSet<TEntity> _dbSet;

    public BaseRepository(ApplicationContext context)
    {
        _context = context;
        _dbSet = context.Set<TEntity>();
    }

    public async Task CreateAsync(TEntity item)
    {
        await _dbSet.AddAsync(item);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(TEntity item)
    {
        _dbSet.Remove(item);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<TEntity>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public async Task UpdateAsync(TEntity item)
    {
        _context.Entry(item).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task<int> CountAsync()
    {
        return await _dbSet.CountAsync();
    }
}
