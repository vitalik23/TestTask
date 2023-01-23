using AutoMapper;
using TestTask.BusinessLayer.Models.Customers;
using TestTask.DataAccessLayer.Entities;

namespace TestTask.BusinessLayer.MapperProfiles;

public class CustomerProfile : Profile
{
    public CustomerProfile()
    {
        CreateMap<CreateCustomerModel, Customer>();
        CreateMap<Customer, CreateCustomerModel>();

        CreateMap<GetCustomerModel, Customer>();
        CreateMap<Customer, GetCustomerModel>();
    }
}
