using TestTask.DataAccessLayer.Entities;

namespace TestTask.DataAccessLayer.Repositories.Interfaces;

public interface ICustomerRepository : IBaseRepository<Customer>
{
    Task<Customer> GetCustomerByNameAsync(string customerName);
    Task<Customer> GetCustomerByIdAsync(string customerId);
}
