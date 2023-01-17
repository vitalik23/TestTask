using TestTask.DataAccessLayer.AppContext;
using TestTask.DataAccessLayer.Entities;
using TestTask.DataAccessLayer.Repositories.Interfaces;

namespace TestTask.DataAccessLayer.Repositories;

public class CustomerRepository : BaseRepository<Customer>, ICustomerRepository
{
    public CustomerRepository(ApplicationContext context) : base(context)
    {
    }
}
