using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System.Linq;
using System.Text;
using TestTask.DataAccessLayer.AppContext;
using TestTask.DataAccessLayer.Entities;
using TestTask.DataAccessLayer.Models.Customers;
using TestTask.DataAccessLayer.Models.Pagination;
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

    public async Task<PagedResponse<Customer>> GetFilteredAndPagedAsync(CustomerFilterModel filter, PaginationFilterModel pagination)
    {

        string defaultOrderBy = "Id";

        var name = new SqlParameter("@Name", string.IsNullOrWhiteSpace(filter.Name) ? string.Empty : filter.Name);
        var email = new SqlParameter("@Email", string.IsNullOrWhiteSpace(filter.Email) ? string.Empty : filter.Email);
        var phone = new SqlParameter("@Phone", string.IsNullOrWhiteSpace(filter.Phone) ? string.Empty : filter.Phone);
        var companyName = new SqlParameter("@CompanyName", string.IsNullOrWhiteSpace(filter.CompanyName) ? string.Empty : filter.CompanyName);
        var orderBy = new SqlParameter("@OrderBy", string.IsNullOrWhiteSpace(filter.OrderBy) ? defaultOrderBy : filter.OrderBy);
        var orderByAsc = new SqlParameter("@OrderByAsc", filter.IsAsc ? "ASC" : "DESC");
        var pageNumber = new SqlParameter("@PageNumber", pagination.PageNumber);
        var pageSize = new SqlParameter("@PageSize", pagination.PageSize);

        var customers = await _dbSet.FromSqlRaw("GetCustomers @Name, @Email, @Phone, @CompanyName, @OrderBy, @OrderByAsc, @PageNumber, @PageSize",
            name, email, phone, companyName, orderBy, orderByAsc, pageNumber, pageSize).ToListAsync();

        return new PagedResponse<Customer>
        {
            Data = customers
        };
    }
}
