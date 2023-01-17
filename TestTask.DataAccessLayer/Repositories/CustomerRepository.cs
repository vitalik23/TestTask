using Microsoft.EntityFrameworkCore;
using TestTask.DataAccessLayer.AppContext;
using TestTask.DataAccessLayer.Entities;
using TestTask.DataAccessLayer.Repositories.Interfaces;

namespace TestTask.DataAccessLayer.Repositories;

public class CustomerRepository : BaseRepository<Customer>, ICustomerRepository
{
    public CustomerRepository(ApplicationContext context) : base(context)
    {
    }

    public async Task<Customer> GetCustomerByNameAsync(string customerName)
    {
        return await _dbSet.FirstOrDefaultAsync(c => c.Name.Equals(customerName));
    }

    public async Task<Customer> GetCustomerByIdAsync(string customerId)
    {
        return await _dbSet.FirstOrDefaultAsync(c => c.Id.Equals(customerId));
    }
}
