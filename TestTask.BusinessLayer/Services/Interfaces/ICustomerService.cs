using TestTask.BusinessLayer.Models.Customers;
using TestTask.DataAccessLayer.Models.Pagination;

namespace TestTask.BusinessLayer.Services.Interfaces;

public interface ICustomerService
{
    Task<GetCustomerModel> CreateAsync(CreateCustomerModel model);
    Task<GetCustomerModel> UpdateAsync(UpdateCustomerModel model);
    Task DeleteAsync(string id);
    Task<GetCustomerModel> GetCustomerAsync(string id);
    Task<PagedResponse<GetCustomerModel>> GetCustomersAsync(FilteredAndPagedCustomers model);
    Task<List<GetCustomerModel>> GetAllAsync();
}
