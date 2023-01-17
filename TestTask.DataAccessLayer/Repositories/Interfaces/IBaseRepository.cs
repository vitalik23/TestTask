namespace TestTask.DataAccessLayer.Repositories.Interfaces;

public interface IBaseRepository<TEntity> where TEntity : class
{
    public Task UpdateAsync(TEntity item);
    public Task CreateAsync(TEntity item);
    public Task<IEnumerable<TEntity>> GetAllAsync();
    public Task DeleteAsync(TEntity item);
}
