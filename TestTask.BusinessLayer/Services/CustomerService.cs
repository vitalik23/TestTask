using AutoMapper;
using TestTask.BusinessLayer.Models.Customers;
using TestTask.BusinessLayer.Services.Interfaces;
using TestTask.DataAccessLayer.Entities;
using TestTask.DataAccessLayer.Repositories.Interfaces;
using TestTask.Shared.Exceptions;
using TestTask.DataAccessLayer.Models.Pagination;
using System.Net;

namespace TestTask.BusinessLayer.Services;

public class CustomerService : ICustomerService
{

    private readonly ICustomerRepository _customerRepository;
    private readonly IMapper _mapper;

    public CustomerService(
        ICustomerRepository customerRepository, 
        IMapper mapper)
    {
        _customerRepository = customerRepository;
        _mapper = mapper;
    }

    public async Task<GetCustomerModel> CreateAsync(CreateCustomerModel model)
    {
        var customer = await _customerRepository.GetCustomerByNameAsync(model.Name);

        if (customer is not null)
        {
            throw new ServerException("Сustomer with that name exists!", HttpStatusCode.BadRequest);
        }

        var entity = _mapper.Map<Customer>(model);
        await _customerRepository.CreateAsync(entity);

        return _mapper.Map<GetCustomerModel>(entity);
    }

    public async Task DeleteAsync(string id)
    {
        var customer = await _customerRepository.GetCustomerByIdAsync(id);

        if (customer is null)
        {
            throw new ServerException("Customer does not exist!", HttpStatusCode.NotFound);
        }

        await _customerRepository.DeleteAsync(customer);
    }

    public async Task<GetCustomerModel> GetCustomerAsync(string id)
    {
        var result = await _customerRepository.GetCustomerByIdAsync(id);
        return _mapper.Map<GetCustomerModel>(result);
    }

    public async Task<PagedResponse<GetCustomerModel>> GetCustomersAsync(FilteredAndPagedCustomers model)
    {
        var result = await _customerRepository.GetFilteredAndPagedAsync(model.Filters, model.Pagination);

        var countCustomers = await _customerRepository.CountAsync();

        var customers = _mapper.Map<List<GetCustomerModel>>(result.Data);

        return new PagedResponse<GetCustomerModel> 
        {
            Data = customers,
            PageNumber = model.Pagination.PageNumber,
            PageSize = model.Pagination.PageSize,
            TotalItems = countCustomers
        };
    }

    public async Task<GetCustomerModel> UpdateAsync(UpdateCustomerModel model)
    {
        var customer = await _customerRepository.GetCustomerByIdAsync(model.Id);

        if (customer is null)
        {
            throw new ServerException("Customer does not exist!", HttpStatusCode.NotFound);
        }

        if (!string.IsNullOrWhiteSpace(model.Name) && !customer.Name.Equals(model.Name))
        {
            customer.Name = model.Name;
        }

        if (!string.IsNullOrWhiteSpace(model.Email))
        {
            customer.Email = model.Email;
        }

        if (!string.IsNullOrWhiteSpace(model.Phone))
        {
            customer.Phone = model.Phone;
        }

        if (!string.IsNullOrWhiteSpace(model.CompanyName))
        {
            customer.CompanyName = model.CompanyName;
        }

        await _customerRepository.UpdateAsync(customer);

        return _mapper.Map<GetCustomerModel>(customer);
    }
}
