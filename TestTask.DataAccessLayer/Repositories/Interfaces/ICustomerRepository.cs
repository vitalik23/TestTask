using TestTask.DataAccessLayer.Entities;
using TestTask.DataAccessLayer.Models.Customers;
using TestTask.DataAccessLayer.Models.Pagination;

namespace TestTask.DataAccessLayer.Repositories.Interfaces;

public interface ICustomerRepository : IBaseRepository<Customer>
{
    Task<Customer> GetCustomerByNameAsync(string customerName);
    Task<Customer> GetCustomerByIdAsync(string customerId);
    Task<PagedResponse<Customer>> GetFilteredAndPagedAsync(CustomerFilterModel filter, PaginationFilterModel pagination);
}
