using TestTask.BusinessLayer.Models.Customers;

namespace TestTask.BusinessLayer.Services.Interfaces;

public interface ICustomerService
{
    Task<GetCustomerModel> CreateAsync(CreateCustomerModel model);
    Task<GetCustomerModel> UpdateAsync(UpdateCustomerModel model);
    Task DeleteAsync(string id);
    Task<GetCustomerModel> GetCustomerAsync(string id);
    Task<List<GetCustomerModel>> GetCustomersAsync();
}
