namespace TestTask.DataAccessLayer.Repositories.Interfaces;

public interface IBaseRepository<TEntity> where TEntity : class
{
    Task UpdateAsync(TEntity item);
    Task CreateAsync(TEntity item);
    Task<IEnumerable<TEntity>> GetAllAsync();
    Task DeleteAsync(TEntity item);
    Task<int> CountAsync();
}
